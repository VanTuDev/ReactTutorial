import React from "react";
import { Link, Routes, Route, Outlet } from "react-router-dom";

// Layout cho phần Products
const ProductsLayout = () => {
   return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
         <h2 className="text-2xl font-bold mb-4">Sản Phẩm</h2>

         {/* Sub-navigation cho Products */}
         <nav className="mb-6">
            <ul className="flex space-x-4 bg-gray-100 dark:bg-gray-700 p-2 rounded">
               <li>
                  <Link
                     to="list"
                     className="px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition-colors"
                  >
                     Danh Sách
                  </Link>
               </li>
               <li>
                  <Link
                     to="featured"
                     className="px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition-colors"
                  >
                     Nổi Bật
                  </Link>
               </li>
               <li>
                  <Link
                     to="new"
                     className="px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition-colors"
                  >
                     Mới Nhất
                  </Link>
               </li>
            </ul>
         </nav>

         {/* Outlet sẽ render các route con */}
         <Outlet />
      </div>
   );
};

// Các component con cho Products
const ProductList = () => (
   <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded">
      <h3 className="text-xl font-bold mb-3">Danh Sách Sản Phẩm</h3>
      <ul className="list-disc pl-5 space-y-2">
         <li>Điện thoại thông minh</li>
         <li>Máy tính xách tay</li>
         <li>Máy tính bảng</li>
         <li>Tai nghe</li>
         <li>Đồng hồ thông minh</li>
      </ul>
   </div>
);

const FeaturedProducts = () => (
   <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded">
      <h3 className="text-xl font-bold mb-3">Sản Phẩm Nổi Bật</h3>
      <div className="space-y-2">
         <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded">iPhone 15 Pro - 28.990.000đ</div>
         <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded">MacBook Air M2 - 26.490.000đ</div>
         <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded">Samsung Galaxy S23 Ultra - 23.990.000đ</div>
      </div>
   </div>
);

const NewProducts = () => (
   <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded">
      <h3 className="text-xl font-bold mb-3">Sản Phẩm Mới Nhất</h3>
      <div className="space-y-2">
         <div className="p-2 bg-green-100 dark:bg-green-900 rounded">iPad Pro M2 - Mới ra mắt</div>
         <div className="p-2 bg-green-100 dark:bg-green-900 rounded">AirPods Pro 2 - Mới ra mắt</div>
         <div className="p-2 bg-green-100 dark:bg-green-900 rounded">Apple Watch Series 9 - Mới ra mắt</div>
      </div>
   </div>
);

const NestedRouteDemo = () => {
   return (
      <div className="space-y-6">
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Demo Route Lồng Nhau</h1>
            <p className="mb-6">
               Demo này minh họa cách sử dụng nested routes (route lồng nhau) trong React Router.
               Chúng ta sử dụng các component <code>Outlet</code> để hiển thị các route con bên trong route cha.
            </p>

            {/* Main Navigation */}
            <nav className="mb-6">
               <ul className="flex space-x-4 bg-gray-100 dark:bg-gray-700 p-2 rounded">
                  <li>
                     <Link
                        to="dashboard"
                        className="px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition-colors"
                     >
                        Trang Chủ
                     </Link>
                  </li>
                  <li>
                     <Link
                        to="products"
                        className="px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition-colors"
                     >
                        Sản Phẩm
                     </Link>
                  </li>
               </ul>
            </nav>

            {/* Giải thích code */}
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-6">
               <h3 className="font-bold mb-2">Cách Hoạt Động:</h3>
               <ul className="list-disc pl-5 space-y-2">
                  <li>Component <code>Outlet</code> đánh dấu vị trí nơi các route con sẽ được render</li>
                  <li>Route cha định nghĩa layout chung và điều hướng con</li>
                  <li>Route con chỉ cần tập trung vào nội dung cụ thể</li>
                  <li>URL sẽ được xây dựng theo cấu trúc lồng nhau, ví dụ: /products/featured</li>
               </ul>
            </div>
         </div>

         {/* Route Content */}
         <div>
            <Routes>
               <Route path="dashboard" element={
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                     <h2 className="text-2xl font-bold mb-4">Trang Chủ</h2>
                     <p>Đây là trang chủ của demo route lồng nhau.</p>
                  </div>
               } />

               {/* Nested Routes */}
               <Route path="products" element={<ProductsLayout />}>
                  <Route index element={<ProductList />} />
                  <Route path="list" element={<ProductList />} />
                  <Route path="featured" element={<FeaturedProducts />} />
                  <Route path="new" element={<NewProducts />} />
               </Route>

               <Route path="*" element={
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                     <h2 className="text-2xl font-bold mb-4">Chọn một mục từ menu</h2>
                     <p>Vui lòng chọn một mục từ menu điều hướng phía trên.</p>
                  </div>
               } />
            </Routes>
         </div>
      </div>
   );
};

export default NestedRouteDemo;
