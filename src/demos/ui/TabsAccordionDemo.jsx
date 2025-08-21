import React, { useState } from "react";

const TabsAccordionDemo = () => {
   // State cho tabs
   const [activeTab, setActiveTab] = useState("html");

   // State cho accordion
   const [activeAccordions, setActiveAccordions] = useState(["item1"]);

   // State cho tabs với biểu tượng
   const [activeIconTab, setActiveIconTab] = useState("dashboard");

   // State cho tabs dọc
   const [activeVerticalTab, setActiveVerticalTab] = useState("profile");

   // Xử lý toggle accordion
   const toggleAccordion = (id) => {
      setActiveAccordions(prev => {
         if (prev.includes(id)) {
            return prev.filter(item => item !== id);
         } else {
            return [...prev, id];
         }
      });
   };

   // Dữ liệu mẫu cho tabs
   const tabsData = [
      { id: "html", label: "HTML", content: "HTML (HyperText Markup Language) là ngôn ngữ đánh dấu tiêu chuẩn để tạo các trang web. HTML mô tả cấu trúc của một trang web bằng cách sử dụng các thẻ để đánh dấu các phần tử khác nhau của tài liệu." },
      { id: "css", label: "CSS", content: "CSS (Cascading Style Sheets) là ngôn ngữ được sử dụng để tạo kiểu cho tài liệu HTML. CSS mô tả cách các phần tử HTML nên được hiển thị trên màn hình, trên giấy, trong lời nói, hoặc trên các phương tiện khác." },
      { id: "javascript", label: "JavaScript", content: "JavaScript là ngôn ngữ lập trình phía client được sử dụng để làm cho các trang web trở nên tương tác. Nó là một phần của bộ ba công nghệ web cốt lõi (HTML, CSS và JavaScript) và cho phép bạn thêm các tính năng động vào trang web của mình." },
      { id: "react", label: "React", content: "React là một thư viện JavaScript để xây dựng giao diện người dùng. Nó được phát triển bởi Facebook và cho phép bạn tạo các ứng dụng web đơn trang (SPA) với các thành phần có thể tái sử dụng." }
   ];

   // Dữ liệu mẫu cho accordion
   const accordionData = [
      {
         id: "item1",
         title: "React là gì?",
         content: "React là một thư viện JavaScript để xây dựng giao diện người dùng. Nó được phát triển bởi Facebook và cho phép bạn tạo các ứng dụng web đơn trang (SPA) với các thành phần có thể tái sử dụng."
      },
      {
         id: "item2",
         title: "Tại sao nên sử dụng React?",
         content: "React cung cấp nhiều lợi ích như DOM ảo để tối ưu hóa hiệu suất, kiến trúc component-based để tái sử dụng code, và cộng đồng lớn với nhiều thư viện hỗ trợ. Nó cũng dễ học và sử dụng cho các nhà phát triển đã quen với JavaScript."
      },
      {
         id: "item3",
         title: "React Hooks là gì?",
         content: "React Hooks là các hàm đặc biệt cho phép bạn sử dụng các tính năng của React (như state và lifecycle) trong các functional components. Các hooks phổ biến bao gồm useState, useEffect, useContext, useReducer, và nhiều hooks khác."
      },
      {
         id: "item4",
         title: "React so với các framework khác?",
         content: "So với các framework như Angular và Vue, React là một thư viện tập trung vào việc xây dựng UI, không phải một framework đầy đủ. Điều này mang lại sự linh hoạt nhưng cũng đòi hỏi thêm các thư viện bổ sung cho routing, quản lý state, và các tính năng khác."
      }
   ];

   // Dữ liệu mẫu cho tabs với biểu tượng
   const iconTabsData = [
      {
         id: "dashboard",
         label: "Dashboard",
         icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
         ),
         content: "Đây là trang tổng quan hiển thị các thông tin quan trọng và số liệu thống kê của ứng dụng."
      },
      {
         id: "analytics",
         label: "Phân Tích",
         icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
         ),
         content: "Trang phân tích hiển thị các biểu đồ, đồ thị và số liệu thống kê chi tiết về hiệu suất ứng dụng."
      },
      {
         id: "settings",
         label: "Cài Đặt",
         icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
         ),
         content: "Trang cài đặt cho phép bạn tùy chỉnh các tùy chọn và cấu hình của ứng dụng."
      }
   ];

   // Dữ liệu mẫu cho tabs dọc
   const verticalTabsData = [
      { id: "profile", label: "Hồ Sơ", content: "Thông tin cá nhân và hồ sơ người dùng. Bạn có thể cập nhật thông tin liên hệ, mật khẩu và các tùy chọn khác ở đây." },
      { id: "security", label: "Bảo Mật", content: "Cài đặt bảo mật cho tài khoản của bạn. Bạn có thể bật xác thực hai yếu tố, quản lý các phiên đăng nhập và kiểm tra hoạt động gần đây." },
      { id: "notifications", label: "Thông Báo", content: "Quản lý các tùy chọn thông báo. Bạn có thể chọn loại thông báo bạn muốn nhận qua email, push notification hoặc trong ứng dụng." },
      { id: "billing", label: "Thanh Toán", content: "Quản lý thông tin thanh toán và xem lịch sử giao dịch. Bạn có thể cập nhật phương thức thanh toán và xem các hóa đơn trước đây." }
   ];

   return (
      <div className="space-y-6">
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Demo Tabs & Accordion</h1>
            <p className="mb-6">
               Demo này minh họa cách tạo và sử dụng các thành phần Tabs và Accordion trong React,
               giúp tổ chức và hiển thị nội dung theo cách dễ sử dụng và tiết kiệm không gian.
            </p>

            {/* Giải thích code */}
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-6">
               <h3 className="font-bold mb-2">Cách Hoạt Động:</h3>
               <ul className="list-disc pl-5 space-y-2">
                  <li>Sử dụng state để theo dõi tab hoặc accordion đang được mở</li>
                  <li>Tabs hiển thị một nội dung tại một thời điểm, giúp người dùng chuyển đổi giữa các phần nội dung</li>
                  <li>Accordion cho phép mở rộng hoặc thu gọn các phần nội dung, tiết kiệm không gian trên trang</li>
                  <li>Cả hai đều cải thiện trải nghiệm người dùng bằng cách tổ chức nội dung thành các phần có thể quản lý</li>
               </ul>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Tabs */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h2 className="text-xl font-bold mb-4">Tabs Cơ Bản</h2>

               {/* Tabs Navigation */}
               <div className="border-b dark:border-gray-700">
                  <ul className="flex flex-wrap -mb-px">
                     {tabsData.map(tab => (
                        <li key={tab.id} className="mr-2">
                           <button
                              className={`inline-block py-2 px-4 font-medium border-b-2 ${activeTab === tab.id
                                 ? "border-blue-500 text-blue-600 dark:text-blue-400"
                                 : "border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
                                 }`}
                              onClick={() => setActiveTab(tab.id)}
                           >
                              {tab.label}
                           </button>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Tab Content */}
               <div className="py-4">
                  {tabsData.map(tab => (
                     <div
                        key={tab.id}
                        className={`${activeTab === tab.id ? "block" : "hidden"}`}
                     >
                        <p>{tab.content}</p>
                     </div>
                  ))}
               </div>
            </div>

            {/* Accordion */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h2 className="text-xl font-bold mb-4">Accordion</h2>

               <div className="space-y-2">
                  {accordionData.map(item => (
                     <div key={item.id} className="border dark:border-gray-700 rounded">
                        <button
                           className="flex justify-between items-center w-full p-4 text-left font-medium"
                           onClick={() => toggleAccordion(item.id)}
                        >
                           {item.title}
                           <svg
                              className={`w-5 h-5 transition-transform ${activeAccordions.includes(item.id) ? "transform rotate-180" : ""
                                 }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth="2"
                                 d="M19 9l-7 7-7-7"
                              ></path>
                           </svg>
                        </button>
                        <div
                           className={`px-4 pb-4 ${activeAccordions.includes(item.id) ? "block" : "hidden"
                              }`}
                        >
                           <p>{item.content}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tabs with Icons */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h2 className="text-xl font-bold mb-4">Tabs với Biểu Tượng</h2>

               {/* Tabs Navigation */}
               <div className="border-b dark:border-gray-700">
                  <ul className="flex flex-wrap -mb-px">
                     {iconTabsData.map(tab => (
                        <li key={tab.id} className="mr-2">
                           <button
                              className={`inline-flex items-center py-2 px-4 font-medium border-b-2 ${activeIconTab === tab.id
                                 ? "border-blue-500 text-blue-600 dark:text-blue-400"
                                 : "border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
                                 }`}
                              onClick={() => setActiveIconTab(tab.id)}
                           >
                              <span className="mr-2">{tab.icon}</span>
                              {tab.label}
                           </button>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Tab Content */}
               <div className="py-4">
                  {iconTabsData.map(tab => (
                     <div
                        key={tab.id}
                        className={`${activeIconTab === tab.id ? "block" : "hidden"}`}
                     >
                        <p>{tab.content}</p>
                     </div>
                  ))}
               </div>
            </div>

            {/* Vertical Tabs */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h2 className="text-xl font-bold mb-4">Tabs Dọc</h2>

               <div className="flex flex-col md:flex-row">
                  {/* Tabs Navigation */}
                  <div className="md:w-1/3 mb-4 md:mb-0 md:pr-4">
                     <ul className="flex flex-col space-y-1">
                        {verticalTabsData.map(tab => (
                           <li key={tab.id}>
                              <button
                                 className={`w-full text-left py-2 px-4 rounded ${activeVerticalTab === tab.id
                                    ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }`}
                                 onClick={() => setActiveVerticalTab(tab.id)}
                              >
                                 {tab.label}
                              </button>
                           </li>
                        ))}
                     </ul>
                  </div>

                  {/* Tab Content */}
                  <div className="md:w-2/3 border-l dark:border-gray-700 pl-4">
                     {verticalTabsData.map(tab => (
                        <div
                           key={tab.id}
                           className={`${activeVerticalTab === tab.id ? "block" : "hidden"}`}
                        >
                           <h3 className="font-bold mb-2">{tab.label}</h3>
                           <p>{tab.content}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default TabsAccordionDemo;
