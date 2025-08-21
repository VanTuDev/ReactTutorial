import React from "react";
import { Link, Routes, Route } from "react-router-dom";

// Các trang mẫu để demo navigation
const HomePage = () => (
   <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Trang Chủ</h2>
      <p className="mb-4">Đây là trang chủ của demo điều hướng cơ bản.</p>
      <p>Sử dụng các liên kết bên trên để điều hướng giữa các trang.</p>
   </div>
);

const AboutPage = () => (
   <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Giới Thiệu</h2>
      <p className="mb-4">Đây là trang giới thiệu của ứng dụng demo.</p>
      <p>React Router giúp quản lý điều hướng trong ứng dụng React một cách đơn giản và hiệu quả.</p>
   </div>
);

const ContactPage = () => (
   <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Liên Hệ</h2>
      <p className="mb-4">Thông tin liên hệ:</p>
      <ul className="list-disc pl-5">
         <li>Email: example@example.com</li>
         <li>Điện thoại: (123) 456-7890</li>
         <li>Địa chỉ: 123 Đường ABC, Thành phố XYZ</li>
      </ul>
   </div>
);

const BasicNavigationDemo = () => {
   return (
      <div className="space-y-6">
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Demo Điều Hướng Cơ Bản</h1>
            <p className="mb-6">
               Demo này minh họa cách sử dụng React Router để điều hướng giữa các trang trong ứng dụng React.
               Chúng ta sử dụng các component <code>Link</code>, <code>Routes</code>, và <code>Route</code> từ thư viện react-router-dom.
            </p>

            {/* Navigation Menu */}
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
                        to="about"
                        className="px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition-colors"
                     >
                        Giới Thiệu
                     </Link>
                  </li>
                  <li>
                     <Link
                        to="contact"
                        className="px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition-colors"
                     >
                        Liên Hệ
                     </Link>
                  </li>
               </ul>
            </nav>

            {/* Giải thích code */}
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-6">
               <h3 className="font-bold mb-2">Cách Hoạt Động:</h3>
               <ul className="list-disc pl-5 space-y-2">
                  <li>Component <code>Link</code> tạo các liên kết điều hướng mà không làm tải lại trang</li>
                  <li>Component <code>Routes</code> và <code>Route</code> định nghĩa các đường dẫn và component tương ứng</li>
                  <li>Khi người dùng nhấp vào một liên kết, React Router sẽ hiển thị component tương ứng với đường dẫn đó</li>
               </ul>
            </div>
         </div>

         {/* Route Content */}
         <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded">
            <Routes>
               <Route path="home" element={<HomePage />} />
               <Route path="about" element={<AboutPage />} />
               <Route path="contact" element={<ContactPage />} />
               <Route path="*" element={<HomePage />} />
            </Routes>
         </div>
      </div>
   );
};

export default BasicNavigationDemo;
