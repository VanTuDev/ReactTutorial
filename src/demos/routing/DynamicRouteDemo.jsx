import React from "react";
import { Link, Routes, Route, useParams } from "react-router-dom";

// Dữ liệu mẫu cho sản phẩm
const products = [
   { id: 1, name: "iPhone 15", price: "22.990.000đ", description: "Điện thoại thông minh mới nhất từ Apple với camera cải tiến và chip A16 Bionic.", image: "https://placehold.co/300x200?text=iPhone+15" },
   { id: 2, name: "Samsung Galaxy S23", price: "19.990.000đ", description: "Điện thoại Android cao cấp với màn hình AMOLED 120Hz và camera 108MP.", image: "https://placehold.co/300x200?text=Galaxy+S23" },
   { id: 3, name: "MacBook Air M2", price: "26.490.000đ", description: "Laptop siêu mỏng nhẹ với chip M2, màn hình Retina và thời lượng pin cả ngày.", image: "https://placehold.co/300x200?text=MacBook+Air" },
   { id: 4, name: "iPad Pro", price: "23.990.000đ", description: "Máy tính bảng chuyên nghiệp với chip M2 và màn hình Liquid Retina XDR.", image: "https://placehold.co/300x200?text=iPad+Pro" },
   { id: 5, name: "AirPods Pro", price: "6.790.000đ", description: "Tai nghe không dây với khả năng khử tiếng ồn chủ động và âm thanh không gian.", image: "https://placehold.co/300x200?text=AirPods+Pro" },
];

// Trang danh sách sản phẩm
const ProductList = () => {
   return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
         <h2 className="text-2xl font-bold mb-4">Danh Sách Sản Phẩm</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
               <div key={product.id} className="border rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900">
                  <img
                     src={product.image}
                     alt={product.name}
                     className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                     <h3 className="text-lg font-bold">{product.name}</h3>
                     <p className="text-blue-600 dark:text-blue-400 font-bold">{product.price}</p>
                     <Link
                        to={`product/${product.id}`}
                        className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                     >
                        Xem Chi Tiết
                     </Link>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

// Trang chi tiết sản phẩm
const ProductDetail = () => {
   // Lấy tham số từ URL
   const { productId } = useParams();

   // Tìm sản phẩm theo ID
   const product = products.find(p => p.id === parseInt(productId));

   // Nếu không tìm thấy sản phẩm
   if (!product) {
      return (
         <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Không Tìm Thấy Sản Phẩm</h2>
            <p>Sản phẩm với ID {productId} không tồn tại.</p>
            <Link
               to="../"
               className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
               Quay Lại Danh Sách
            </Link>
         </div>
      );
   }

   return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
         <Link
            to="../"
            className="mb-4 inline-block px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
         >
            &larr; Quay Lại Danh Sách
         </Link>

         <div className="flex flex-col md:flex-row gap-6 mt-4">
            <div className="md:w-1/3">
               <img
                  src={product.image}
                  alt={product.name}
                  className="w-full rounded-lg"
               />
            </div>
            <div className="md:w-2/3">
               <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
               <p className="text-2xl text-blue-600 dark:text-blue-400 font-bold mb-4">{product.price}</p>
               <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
                  <h3 className="text-xl font-bold mb-2">Mô Tả Sản Phẩm</h3>
                  <p>{product.description}</p>
               </div>
               <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600">
                  Thêm Vào Giỏ Hàng
               </button>
            </div>
         </div>
      </div>
   );
};

const DynamicRouteDemo = () => {
   return (
      <div className="space-y-6">
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Demo Route Động</h1>
            <p className="mb-6">
               Demo này minh họa cách sử dụng dynamic routes (route động) trong React Router.
               Chúng ta sử dụng tham số URL và hook <code>useParams</code> để hiển thị nội dung dựa trên tham số.
            </p>

            {/* Giải thích code */}
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-6">
               <h3 className="font-bold mb-2">Cách Hoạt Động:</h3>
               <ul className="list-disc pl-5 space-y-2">
                  <li>Route <code>/product/:productId</code> định nghĩa một tham số động <code>productId</code></li>
                  <li>Hook <code>useParams</code> cho phép truy cập vào giá trị của tham số từ URL</li>
                  <li>Dựa vào tham số, chúng ta có thể tải và hiển thị dữ liệu tương ứng</li>
                  <li>Điều này cho phép tạo nhiều trang với cùng một component, nhưng nội dung khác nhau</li>
               </ul>
            </div>
         </div>

         {/* Route Content */}
         <Routes>
            <Route index element={<ProductList />} />
            <Route path="product/:productId" element={<ProductDetail />} />
         </Routes>
      </div>
   );
};

export default DynamicRouteDemo;
