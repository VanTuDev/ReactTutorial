import React, { useState, lazy, Suspense } from "react";

// Import thông thường
import RegularComponent from "../basics/HelloWorldDemo";

// Lazy loading components
const LazyComponent1 = lazy(() => {
   // Mô phỏng độ trễ mạng
   return new Promise(resolve => {
      setTimeout(() => {
         resolve(import("../basics/PropsStateDemo"));
      }, 1500);
   });
});

const LazyComponent2 = lazy(() => {
   // Mô phỏng độ trễ mạng
   return new Promise(resolve => {
      setTimeout(() => {
         resolve(import("../basics/EventHandlingDemo"));
      }, 2000);
   });
});

const LazyComponent3 = lazy(() => {
   // Mô phỏng độ trễ mạng
   return new Promise(resolve => {
      setTimeout(() => {
         resolve(import("../basics/ConditionalRenderingDemo"));
      }, 2500);
   });
});

// Fallback components
const LoadingFallback = () => (
   <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <span className="ml-3">Đang tải component...</span>
   </div>
);

const ErrorFallback = () => (
   <div className="bg-red-100 dark:bg-red-900 p-4 rounded">
      <h3 className="font-bold text-red-800 dark:text-red-200 mb-2">Lỗi tải component</h3>
      <p className="text-red-700 dark:text-red-300">
         Không thể tải component. Vui lòng thử lại sau.
      </p>
      <button
         onClick={() => window.location.reload()}
         className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
         Thử lại
      </button>
   </div>
);

const LazyLoadingDemo = () => {
   // State cho việc hiển thị các component
   const [activeTab, setActiveTab] = useState("regular");

   // State cho việc hiển thị nhiều component cùng lúc
   const [showMultiple, setShowMultiple] = useState(false);

   // State cho việc theo dõi thời gian tải
   const [loadingStartTime, setLoadingStartTime] = useState(null);
   const [loadingTime, setLoadingTime] = useState(null);

   // Xử lý chuyển tab
   const handleTabChange = (tab) => {
      setActiveTab(tab);

      // Bắt đầu đếm thời gian tải
      if (tab !== "regular") {
         setLoadingStartTime(Date.now());
         setLoadingTime(null);
      }
   };

   // Xử lý khi component đã tải xong
   const handleComponentLoaded = () => {
      if (loadingStartTime) {
         const time = Date.now() - loadingStartTime;
         setLoadingTime(time);
      }
   };

   return (
      <div className="space-y-6">
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Demo Lazy Loading</h1>
            <p className="mb-6">
               Demo này minh họa cách sử dụng React.lazy và Suspense để thực hiện lazy loading các component,
               giúp cải thiện hiệu suất ban đầu của ứng dụng bằng cách chỉ tải các component khi cần thiết.
            </p>

            {/* Giải thích code */}
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-6">
               <h3 className="font-bold mb-2">Cách Hoạt Động:</h3>
               <ul className="list-disc pl-5 space-y-2">
                  <li>React.lazy cho phép import động các component khi chúng được render lần đầu tiên</li>
                  <li>Suspense cung cấp fallback UI trong khi component đang được tải</li>
                  <li>Code splitting giúp chia nhỏ bundle JavaScript thành nhiều phần nhỏ hơn</li>
                  <li>Cải thiện thời gian tải ban đầu của ứng dụng</li>
                  <li>Chỉ tải các component khi người dùng thực sự cần đến chúng</li>
               </ul>
            </div>
         </div>

         {/* Controls */}
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Chọn Component</h2>

            {/* Tabs */}
            <div className="border-b dark:border-gray-700 mb-4">
               <ul className="flex flex-wrap -mb-px">
                  <li className="mr-2">
                     <button
                        className={`inline-block py-2 px-4 font-medium border-b-2 ${activeTab === "regular"
                           ? "border-blue-500 text-blue-600 dark:text-blue-400"
                           : "border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
                           }`}
                        onClick={() => handleTabChange("regular")}
                     >
                        Regular Import
                     </button>
                  </li>
                  <li className="mr-2">
                     <button
                        className={`inline-block py-2 px-4 font-medium border-b-2 ${activeTab === "lazy1"
                           ? "border-blue-500 text-blue-600 dark:text-blue-400"
                           : "border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
                           }`}
                        onClick={() => handleTabChange("lazy1")}
                     >
                        Lazy Component 1
                     </button>
                  </li>
                  <li className="mr-2">
                     <button
                        className={`inline-block py-2 px-4 font-medium border-b-2 ${activeTab === "lazy2"
                           ? "border-blue-500 text-blue-600 dark:text-blue-400"
                           : "border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
                           }`}
                        onClick={() => handleTabChange("lazy2")}
                     >
                        Lazy Component 2
                     </button>
                  </li>
                  <li>
                     <button
                        className={`inline-block py-2 px-4 font-medium border-b-2 ${activeTab === "lazy3"
                           ? "border-blue-500 text-blue-600 dark:text-blue-400"
                           : "border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
                           }`}
                        onClick={() => handleTabChange("lazy3")}
                     >
                        Lazy Component 3
                     </button>
                  </li>
               </ul>
            </div>

            {/* Multiple components toggle */}
            <div className="flex items-center mb-4">
               <input
                  type="checkbox"
                  id="showMultiple"
                  checked={showMultiple}
                  onChange={() => setShowMultiple(!showMultiple)}
                  className="mr-2"
               />
               <label htmlFor="showMultiple">
                  Hiển thị tất cả các lazy component cùng lúc
               </label>
            </div>

            {/* Loading time */}
            {loadingTime && (
               <div className="bg-green-100 dark:bg-green-900 p-3 rounded">
                  <p className="text-green-800 dark:text-green-200">
                     Thời gian tải: <strong>{loadingTime}ms</strong>
                  </p>
               </div>
            )}
         </div>

         {/* Component Display */}
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Component Output</h2>

            {/* Regular Component */}
            {activeTab === "regular" && (
               <div className="border dark:border-gray-700 p-4 rounded">
                  <div className="mb-4 bg-blue-100 dark:bg-blue-900 p-3 rounded">
                     <p className="text-blue-800 dark:text-blue-200">
                        <strong>Regular Import:</strong> Component được import trực tiếp và được tải cùng với bundle chính.
                     </p>
                  </div>
                  <RegularComponent />
               </div>
            )}

            {/* Lazy Components */}
            {(activeTab === "lazy1" || showMultiple) && (
               <div className="border dark:border-gray-700 p-4 rounded mb-4">
                  <div className="mb-4 bg-green-100 dark:bg-green-900 p-3 rounded">
                     <p className="text-green-800 dark:text-green-200">
                        <strong>Lazy Component 1:</strong> Component được tải theo yêu cầu khi cần hiển thị.
                     </p>
                  </div>
                  <Suspense fallback={<LoadingFallback />}>
                     <LazyComponent1 onLoad={handleComponentLoaded} />
                  </Suspense>
               </div>
            )}

            {(activeTab === "lazy2" || showMultiple) && (
               <div className="border dark:border-gray-700 p-4 rounded mb-4">
                  <div className="mb-4 bg-green-100 dark:bg-green-900 p-3 rounded">
                     <p className="text-green-800 dark:text-green-200">
                        <strong>Lazy Component 2:</strong> Component được tải theo yêu cầu khi cần hiển thị.
                     </p>
                  </div>
                  <Suspense fallback={<LoadingFallback />}>
                     <LazyComponent2 onLoad={handleComponentLoaded} />
                  </Suspense>
               </div>
            )}

            {(activeTab === "lazy3" || showMultiple) && (
               <div className="border dark:border-gray-700 p-4 rounded">
                  <div className="mb-4 bg-green-100 dark:bg-green-900 p-3 rounded">
                     <p className="text-green-800 dark:text-green-200">
                        <strong>Lazy Component 3:</strong> Component được tải theo yêu cầu khi cần hiển thị.
                     </p>
                  </div>
                  <Suspense fallback={<LoadingFallback />}>
                     <LazyComponent3 onLoad={handleComponentLoaded} />
                  </Suspense>
               </div>
            )}
         </div>

         {/* Code Example */}
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Ví Dụ Code</h2>

            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded overflow-auto">
               <pre className="text-sm">
                  {`// Lazy Loading với React.lazy và Suspense

import React, { lazy, Suspense } from 'react';

// Import thông thường - tải ngay lập tức khi bundle được tải
import RegularComponent from './RegularComponent';

// Lazy loading - chỉ tải khi component được render
const LazyComponent = lazy(() => import('./LazyComponent'));

// Lazy loading với delay mô phỏng
const LazyComponentWithDelay = lazy(() => {
  return new Promise(resolve => {
    // Mô phỏng độ trễ mạng
    setTimeout(() => {
      resolve(import('./LazyComponent'));
    }, 1500);
  });
});

// Lazy loading với route-based code splitting
const LazyPage = lazy(() => import('./pages/LazyPage'));

function App() {
  return (
    <div>
      {/* Component thông thường luôn được tải cùng bundle chính */}
      <RegularComponent />
      
      {/* Lazy component với fallback UI */}
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
      
      {/* Nhiều lazy component trong một Suspense */}
      <Suspense fallback={<div>Loading multiple components...</div>}>
        <LazyComponent />
        <LazyComponentWithDelay />
      </Suspense>
      
      {/* Xử lý lỗi khi tải component */}
      <ErrorBoundary fallback={<div>Error loading component</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyPage />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

// Sử dụng với React Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Lazy load các page components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}`}
               </pre>
            </div>
         </div>
      </div>
   );
};

export default LazyLoadingDemo;
