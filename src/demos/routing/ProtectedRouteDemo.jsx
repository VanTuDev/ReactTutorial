import React, { createContext, useContext, useState } from "react";
import { Link, Routes, Route, Navigate, useLocation } from "react-router-dom";

// Tạo context để quản lý trạng thái đăng nhập
const AuthContext = createContext(null);

// Provider component để quản lý trạng thái đăng nhập
const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);

   const login = (username) => {
      setUser({ username });
   };

   const logout = () => {
      setUser(null);
   };

   return (
      <AuthContext.Provider value={{ user, login, logout }}>
         {children}
      </AuthContext.Provider>
   );
};

// Hook để sử dụng context
const useAuth = () => {
   return useContext(AuthContext);
};

// Component bảo vệ route
const RequireAuth = ({ children }) => {
   const { user } = useAuth();
   const location = useLocation();

   if (!user) {
      // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
      // Lưu lại vị trí hiện tại để sau khi đăng nhập có thể quay lại
      return <Navigate to="login" state={{ from: location }} replace />;
   }

   return children;
};

// Các trang mẫu
const HomePage = () => {
   const { user } = useAuth();

   return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
         <h2 className="text-2xl font-bold mb-4">Trang Chủ</h2>
         <p className="mb-4">Đây là trang chủ công khai, ai cũng có thể truy cập.</p>
         {user ? (
            <p className="text-green-600 dark:text-green-400">
               Bạn đã đăng nhập với tên người dùng: <strong>{user.username}</strong>
            </p>
         ) : (
            <p className="text-yellow-600 dark:text-yellow-400">
               Bạn chưa đăng nhập. Một số tính năng sẽ bị hạn chế.
            </p>
         )}
      </div>
   );
};

const LoginPage = () => {
   const [username, setUsername] = useState("");
   const { login } = useAuth();
   const location = useLocation();

   // Lấy vị trí trước đó từ state, hoặc mặc định là trang chủ
   const from = location.state?.from?.pathname || "/protected-route/dashboard";

   const handleSubmit = (e) => {
      e.preventDefault();
      if (username.trim()) {
         login(username);
         // Chuyển hướng người dùng về trang họ đã cố gắng truy cập
         window.location.href = from;
      }
   };

   return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
         <h2 className="text-2xl font-bold mb-4">Đăng Nhập</h2>
         <form onSubmit={handleSubmit} className="space-y-4">
            <div>
               <label htmlFor="username" className="block mb-1">
                  Tên người dùng:
               </label>
               <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  required
               />
            </div>
            <button
               type="submit"
               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
               Đăng Nhập
            </button>
            <p className="text-sm text-gray-500 dark:text-gray-400">
               (Nhập bất kỳ tên người dùng nào để đăng nhập)
            </p>
         </form>
      </div>
   );
};

const DashboardPage = () => {
   const { user, logout } = useAuth();

   return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
         <h2 className="text-2xl font-bold mb-4">Bảng Điều Khiển</h2>
         <p className="mb-4">
            Đây là trang được bảo vệ. Bạn chỉ có thể thấy trang này nếu đã đăng nhập.
         </p>
         <div className="bg-green-100 dark:bg-green-900 p-3 rounded mb-4">
            <p>
               Chào mừng, <strong>{user.username}</strong>! Bạn đã đăng nhập thành công.
            </p>
         </div>
         <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
         >
            Đăng Xuất
         </button>
      </div>
   );
};

const ProfilePage = () => {
   const { user } = useAuth();

   return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
         <h2 className="text-2xl font-bold mb-4">Hồ Sơ Cá Nhân</h2>
         <div className="mb-4">
            <p className="font-bold">Tên người dùng:</p>
            <p className="ml-4">{user.username}</p>
         </div>
         <div className="mb-4">
            <p className="font-bold">Vai trò:</p>
            <p className="ml-4">Người dùng</p>
         </div>
         <div>
            <p className="font-bold">Ngày tham gia:</p>
            <p className="ml-4">{new Date().toLocaleDateString()}</p>
         </div>
      </div>
   );
};

const ProtectedRouteDemo = () => {
   return (
      <AuthProvider>
         <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h1 className="text-2xl font-bold mb-4">Demo Route Được Bảo Vệ</h1>
               <p className="mb-6">
                  Demo này minh họa cách tạo các route được bảo vệ trong React Router,
                  yêu cầu người dùng phải đăng nhập trước khi truy cập.
               </p>

               {/* Navigation */}
               <nav className="mb-6">
                  <ul className="flex space-x-4 bg-gray-100 dark:bg-gray-700 p-2 rounded">
                     <li>
                        <Link
                           to="home"
                           className="px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition-colors"
                        >
                           Trang Chủ
                        </Link>
                     </li>
                     <li>
                        <Link
                           to="dashboard"
                           className="px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition-colors"
                        >
                           Bảng Điều Khiển
                        </Link>
                     </li>
                     <li>
                        <Link
                           to="profile"
                           className="px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition-colors"
                        >
                           Hồ Sơ
                        </Link>
                     </li>
                     <li>
                        <Link
                           to="login"
                           className="px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition-colors"
                        >
                           Đăng Nhập
                        </Link>
                     </li>
                  </ul>
               </nav>

               {/* Giải thích code */}
               <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-6">
                  <h3 className="font-bold mb-2">Cách Hoạt Động:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                     <li>Sử dụng Context API để quản lý trạng thái đăng nhập trên toàn ứng dụng</li>
                     <li>Component <code>RequireAuth</code> kiểm tra xem người dùng đã đăng nhập chưa</li>
                     <li>Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập</li>
                     <li>Sau khi đăng nhập, chuyển hướng người dùng về trang họ đã cố gắng truy cập</li>
                  </ul>
               </div>
            </div>

            {/* Route Content */}
            <div>
               <Routes>
                  <Route path="home" element={<HomePage />} />
                  <Route path="login" element={<LoginPage />} />
                  <Route
                     path="dashboard"
                     element={
                        <RequireAuth>
                           <DashboardPage />
                        </RequireAuth>
                     }
                  />
                  <Route
                     path="profile"
                     element={
                        <RequireAuth>
                           <ProfilePage />
                        </RequireAuth>
                     }
                  />
                  <Route path="*" element={<HomePage />} />
               </Routes>
            </div>
         </div>
      </AuthProvider>
   );
};

export default ProtectedRouteDemo;
