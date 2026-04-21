import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart, increaseQty, decreaseQty } from "../store/slices/cartSlice";

const CartPage = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex items-center space-x-4 mb-10">
            <button 
                onClick={() => navigate("/foods")}
                className="w-10 h-10 bg-white shadow-sm flex items-center justify-center rounded-full text-gray-500 hover:text-blue-600 hover:shadow-md transition-all"
            >
                ←
            </button>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Giỏ hàng của bạn</h1>
        </div>

        {items.length === 0 ? (
          <div className="bg-white p-16 rounded-[2rem] shadow-sm text-center border border-gray-100">
            <span className="text-7xl block mb-6 filter grayscale opacity-30">🛒</span>
            <p className="text-2xl text-gray-400 font-bold mb-8">Giỏ hàng đang trống.</p>
            <button
              onClick={() => navigate("/foods")}
              className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Xem thực đơn ngay
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* ITEMS LIST */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition flex items-center justify-between border border-gray-100 group">
                  <div className="flex items-center space-x-5">
                    <div className="bg-gray-50 w-20 h-20 rounded-xl flex items-center justify-center text-4xl group-hover:bg-blue-50 transition-colors">
                        🍲
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1 leading-none">{item.name}</h3>
                      <p className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                        {item.price?.toLocaleString()} đ
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 shadow-inner">
                      <button
                        onClick={() => dispatch(decreaseQty(item.id))}
                        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-blue-600 font-bold transition rounded-l-xl hover:bg-white"
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-gray-900 font-black">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(increaseQty(item.id))}
                        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-blue-600 font-bold transition rounded-r-xl hover:bg-white"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="w-10 h-10 flex items-center justify-center text-red-300 hover:bg-red-50 hover:text-red-600 rounded-full font-medium transition"
                      title="Xóa"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-2xl h-fit border border-gray-800">
              <h2 className="text-2xl font-extrabold mb-8">Tổng quan</h2>
              
              <div className="space-y-4 mb-8 text-gray-400 font-medium">
                  <div className="flex justify-between items-center">
                      <span>Tạm tính</span>
                      <span className="text-white font-bold">{total.toLocaleString()} đ</span>
                  </div>
                  <div className="flex justify-between items-center">
                      <span>Phí giao hàng</span>
                      <span className="text-green-400 font-bold bg-green-400/10 px-2 py-0.5 rounded text-sm">Miễn phí</span>
                  </div>
              </div>
              
              <div className="flex justify-between items-end pt-6 border-t border-gray-700 mb-10">
                  <span className="text-lg font-bold text-gray-300">Tổng cộng</span>
                  <span className="text-3xl font-black text-white">
                    {total.toLocaleString()} đ
                  </span>
              </div>
              
              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-2xl font-bold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Tiến hành thanh toán
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;