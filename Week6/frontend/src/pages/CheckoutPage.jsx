import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { orderService } from "../services/orderService";
import { paymentService } from "../services/paymentService";
import { clearCart } from "../store/slices/cartSlice";

const CheckoutPage = () => {
    const items = useSelector((state) => state.cart.items);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [method, setMethod] = useState("COD");
    const [loading, setLoading] = useState(false);
    const [successOrder, setSuccessOrder] = useState(null);

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );

    const handleCheckout = async () => {
        if (items.length === 0) return;
        setLoading(true);

        try {
            // 1. Order Service
            const orderPayload = {
                userId: user?.id,
                items: items.map((item) => ({
                    foodId: item.id,
                    quantity: item.quantity,
                    price: item.price
                })),
                total: total
            };

            const orderRes = await orderService.createOrder(orderPayload);
            const orderId = orderRes?.id || Math.floor(Math.random() * 10000); // Because order service might return just the body or we extract `.data` in service layer

            console.log("✅ [OrderService] Order created success:", orderId);

            // 2. Payment Service
            await paymentService.pay({
                orderId: orderId,
                paymentMethod: method,
                amount: total
            });

            console.log("✅ [PaymentService] Payment success with method:", method);

            // 3. Notification Logic
            console.log(`📣 THÔNG BÁO: User ${user?.username || 'Khách'} đã đặt đơn #${orderId} thành công!`);

            // 4. Success State
            dispatch(clearCart());
            setSuccessOrder(orderId);
            
            setTimeout(() => {
                navigate("/foods");
            }, 3000);

        } catch (err) {
            console.error("❌ Checkout error:", err);
            alert("Đã xảy ra lỗi trong quá trình đặt hàng hoặc thanh toán. Vui lòng kiểm tra lại kết nối service!");
        } finally {
            setLoading(false);
        }
    };

    if (successOrder) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center font-sans">
                <div className="bg-white p-12 rounded-[2rem] shadow-2xl border border-gray-100 max-w-md w-full animate-bounce">
                    <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-5xl mx-auto mb-6">
                        ✓
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-2">Thành công!</h2>
                    <p className="text-gray-500 font-medium mb-8">Đơn hàng #{successOrder} của bạn đã được ghi nhận.</p>
                    <p className="text-sm text-gray-400">Đang tự động quay lại trang chủ...</p>
                </div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center font-sans">
                <div className="bg-white p-12 rounded-[2rem] shadow-sm">
                    <span className="text-6xl mb-6 block grayscale opacity-40">🛒</span>
                    <p className="text-2xl text-gray-500 mb-8 font-bold">Giỏ hàng trống.</p>
                    <button 
                        onClick={() => navigate("/foods")}
                        className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg"
                    >
                        Quay lại thực đơn
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-5xl w-full">
                <div className="flex items-center space-x-4 mb-10">
                    <button 
                        onClick={() => navigate("/cart")}
                        className="w-10 h-10 bg-white shadow-sm flex items-center justify-center rounded-full text-gray-500 hover:text-blue-600 hover:shadow-md transition-all"
                    >
                        ←
                    </button>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Thanh toán</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
                    {/* ORDER INFO */}
                    <div className="md:col-span-3 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-fit">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                            <span className="mr-3 text-2xl">📋</span> Danh sách món
                        </h2>
                        
                        <div className="space-y-4 mb-8">
                            {items.map((item) => (
                                <div key={item.id} className="flex justify-between items-center text-gray-600 p-4 bg-gray-50 rounded-2xl">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-xl">🍲</div>
                                        <div>
                                            <p className="font-bold text-gray-900 leading-tight">{item.name}</p>
                                            <p className="text-sm font-medium">Số lượng: <span className="text-blue-600">x{item.quantity}</span></p>
                                        </div>
                                    </div>
                                    <span className="font-black text-gray-900 text-lg">{(item.price * item.quantity).toLocaleString()} đ</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* PAYMENT METHOD & TOTAL */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                <span className="mr-3 text-2xl">💳</span> Phương thức
                            </h2>

                            <div className="space-y-4">
                                {[
                                    { id: "COD", label: "Tiền mặt (COD)", sub: "Thanh toán khi nhận hàng", icon: "💵" },
                                    { id: "BANKING", label: "Chuyển khoản", sub: "Quét mã QR (Banking)", icon: "🏛️" }
                                ].map((opt) => (
                                    <div 
                                        key={opt.id}
                                        onClick={() => setMethod(opt.id)}
                                        className={`p-5 rounded-2xl border-2 cursor-pointer transition flex items-center justify-between ${method === opt.id ? 'border-blue-500 bg-blue-50/50 shadow-inner' : 'border-gray-100 hover:border-gray-300'}`}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <span className="text-3xl">{opt.icon}</span>
                                            <div>
                                                <p className={`font-bold leading-tight ${method === opt.id ? 'text-blue-700' : 'text-gray-900'}`}>{opt.label}</p>
                                                <p className="text-xs text-gray-500 font-medium">{opt.sub}</p>
                                            </div>
                                        </div>
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === opt.id ? 'border-blue-500 bg-blue-500' : 'border-gray-300 bg-white'}`}>
                                            {method === opt.id && <div className="w-2 h-2 rounded-full bg-white"></div>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gray-900 p-8 rounded-3xl shadow-2xl border border-gray-800 text-white">
                            <div className="flex justify-between items-end mb-8">
                                <span className="text-gray-400 font-medium">Tổng thanh toán</span>
                                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">{total.toLocaleString()} đ</span>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={loading}
                                className={`w-full py-5 rounded-2xl font-black text-lg transition-all shadow-xl flex items-center justify-center ${loading ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 hover:-translate-y-0.5'}`}
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-gray-500 border-t-white rounded-full animate-spin mr-3"></div>
                                        Đang xử lý...
                                    </>
                                ) : "Xác nhận đặt hàng"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
