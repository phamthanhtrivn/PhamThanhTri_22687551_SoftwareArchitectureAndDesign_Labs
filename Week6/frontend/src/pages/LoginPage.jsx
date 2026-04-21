import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/slices/authSlice";
import { userService } from "../services/userService";
import { useNavigate, Navigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", password: "", role: "USER" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/foods" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // Chỉ gửi username và password khi login
        const response = await userService.login({ username: form.username, password: form.password });
        dispatch(setUser(response));
        navigate("/foods");
      } else {
        // Gửi cả role khi register
        await userService.register(form);
        alert("Đăng ký thành công! Hãy đăng nhập để tiếp tục.");
        setIsLogin(true);
        setForm({ ...form, password: "" });
      }
    } catch (err) {
      setError(err?.response?.data?.message || err?.response?.data || "Thông tin không hợp lệ hoặc máy chủ lỗi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 via-white to-blue-50">
      <div className="bg-white/80 backdrop-blur-lg w-full max-w-sm p-8 rounded-3xl shadow-2xl border border-gray-100">
        <div className="text-center mb-8">
          <span className="text-5xl mb-4 block animate-bounce">🍔</span>
          <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            Mini<span className="text-blue-600">Food</span>
          </h2>
          <p className="text-gray-500 mt-2 text-sm font-medium">
            {isLogin ? "Chào mừng bạn quay trở lại!" : "Tạo tài khoản để đặt món ngay."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 pl-1">Tài khoản</label>
            <input
              type="text"
              placeholder="Nhập tên đăng nhập"
              className="w-full bg-gray-50 border-2 border-transparent p-3.5 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-inner"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 pl-1">Mật khẩu</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              className="w-full bg-gray-50 border-2 border-transparent p-3.5 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-inner"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1 pl-1">Phân quyền</label>
              <select
                className="w-full bg-gray-50 border-2 border-transparent p-3.5 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-inner text-gray-700"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="USER">USER - Khách hàng</option>
                <option value="ADMIN">ADMIN - Quản trị viên</option>
              </select>
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 text-sm font-semibold p-3 rounded-xl text-center border border-red-100 animate-pulse">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-xl'} text-white p-4 rounded-2xl font-bold transition-all duration-200`}
          >
            {loading ? "Đang xử lý..." : (isLogin ? "Đăng nhập ngay" : "Đăng ký tài khoản")}
          </button>
        </form>

        <div className="mt-8 text-center bg-gray-50 p-4 rounded-2xl">
          <p className="text-sm font-medium text-gray-600">
            {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
            <button 
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="ml-2 text-blue-600 font-bold hover:text-indigo-700 hover:underline transition"
            >
              {isLogin ? "Đăng ký" : "Đăng nhập"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;