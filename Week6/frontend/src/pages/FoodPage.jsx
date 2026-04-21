import { useEffect, useState } from "react";
import { foodService } from "../services/foodService";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";

const FoodPage = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await foodService.getFoods();
      // Service now correctly parses and returns res.data
      setFoods(res || []);
    } catch (err) {
      console.error(err);
      setError("Không load được danh sách món ăn. Vui lòng kiểm tra lại server.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (food) => {
    dispatch(addToCart(food));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* HEADER */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="text-4xl filter drop-shadow-sm">🍔</span>
            <h1 className="text-2xl font-black bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
              MiniFood
            </h1>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
              <span className="text-sm font-medium text-gray-500">Xin chào,</span>
              <span className="ml-1 text-sm font-bold text-gray-800">{user?.username || 'Khách'}</span>
            </div>

            <button
              onClick={() => navigate("/cart")}
              className="relative p-2.5 bg-gray-50 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors shadow-inner"
            >
              <span className="text-2xl drop-shadow-sm">🛒</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-linear-to-r from-red-500 to-pink-500 text-white text-[11px] w-5 h-5 flex items-center justify-center rounded-full font-black shadow-lg animate-bounce duration-300">
                  {totalItems}
                </span>
              )}
            </button>

            <button
               onClick={() => {
                   dispatch(logout());
                   navigate("/login");
               }}
               className="text-sm font-bold text-gray-400 hover:text-red-500 transition border border-transparent hover:border-red-100 bg-white hover:bg-red-50 px-4 py-2 rounded-full"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-10 text-center sm:text-left sm:flex sm:items-end sm:justify-between">
            <div>
                <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Khám phá món ngon</h2>
                <p className="mt-2 text-gray-500 font-medium">Hàng trăm món ăn hấp dẫn đang chờ bạn thưởng thức.</p>
            </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-2 border-red-100 p-8 rounded-3xl text-center shadow-sm">
            <span className="text-4xl mb-4 block">⚠️</span>
            <p className="text-red-600 font-bold text-lg">{error}</p>
            <button 
              onClick={fetchFoods}
              className="mt-6 bg-red-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-red-700 active:scale-95 transition-all"
            >
              Thử tải lại
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {foods.length > 0 ? foods.map((food) => (
              <div
                key={food.id}
                className="bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group border border-gray-100 hover:border-blue-100"
              >
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 h-48 flex items-center justify-center text-6xl group-hover:scale-110 transition duration-500">
                   🍽️
                </div>
                <div className="p-6 flex flex-col flex-grow bg-white z-10">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight group-hover:text-blue-600 transition-colors">{food.name}</h3>
                  <p className="text-sm text-gray-500 mb-5 line-clamp-2 leading-relaxed flex-grow">
                    {food.description || "Món ngon hấp dẫn không thể chối từ!"}
                  </p>
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50">
                    <span className="text-xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
                      {food.price?.toLocaleString()} đ
                    </span>
                    <button
                      onClick={() => handleAddToCart(food)}
                      className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white h-10 w-10 flex items-center justify-center rounded-xl font-black transition-all shadow-sm hover:shadow-blue-200"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-full py-20 text-center">
                <span className="text-6xl text-gray-200">🍽️</span>
                <p className="mt-4 text-gray-400 font-medium text-lg">Chưa có món ăn nào trong thực đơn.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-white/50 backdrop-blur-sm border-t border-gray-100 py-6 text-center text-gray-400 text-sm font-medium">
         &copy; 2024 MiniFood Ordering System. Crafted with Service-Based Architecture.
      </footer>
    </div>
  );
};

export default FoodPage;
