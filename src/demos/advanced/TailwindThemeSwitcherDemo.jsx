import React, { useState, useEffect, createContext, useContext } from "react";

// Tạo context cho theme
const ThemeContext = createContext({
   theme: "light",
   setTheme: () => { },
});

// Hook để sử dụng theme
const useTheme = () => {
   const context = useContext(ThemeContext);
   if (!context) {
      throw new Error("useTheme must be used within a ThemeProvider");
   }
   return context;
};

// Provider component
const ThemeProvider = ({ children }) => {
   // Lấy theme từ localStorage hoặc sử dụng theme mặc định
   const [theme, setTheme] = useState(() => {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme || "light";
   });

   // Cập nhật theme trong localStorage khi theme thay đổi
   useEffect(() => {
      localStorage.setItem("theme", theme);

      // Cập nhật class cho html element
      const htmlElement = document.documentElement;

      if (theme === "dark") {
         htmlElement.classList.add("dark");
      } else {
         htmlElement.classList.remove("dark");
      }
   }, [theme]);

   return (
      <ThemeContext.Provider value={{ theme, setTheme }}>
         {children}
      </ThemeContext.Provider>
   );
};

// Component nút chuyển đổi theme
const ThemeToggle = () => {
   const { theme, setTheme } = useTheme();

   const toggleTheme = () => {
      setTheme(theme === "light" ? "dark" : "light");
   };

   return (
      <button
         onClick={toggleTheme}
         className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none"
         aria-label="Toggle Theme"
      >
         {theme === "light" ? (
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
         ) : (
            <svg className="w-6 h-6 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
         )}
      </button>
   );
};

// Component hiển thị theme hiện tại
const ThemeInfo = () => {
   const { theme } = useTheme();

   return (
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
         <h3 className="text-lg font-bold mb-2">Thông Tin Theme</h3>
         <p>Theme hiện tại: <span className="font-bold">{theme}</span></p>
         <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Theme được lưu trong localStorage và sẽ được giữ nguyên khi bạn tải lại trang.
         </p>
      </div>
   );
};

// Component card với các biến thể theo theme
const ThemeCard = ({ title, children }) => {
   return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
         <h3 className="text-lg font-bold mb-2">{title}</h3>
         {children}
      </div>
   );
};

// Component hiển thị các biến thể màu sắc
const ColorPalette = () => {
   const colors = [
      { name: "Gray", light: "bg-gray-500", dark: "bg-gray-600" },
      { name: "Red", light: "bg-red-500", dark: "bg-red-600" },
      { name: "Yellow", light: "bg-yellow-500", dark: "bg-yellow-600" },
      { name: "Green", light: "bg-green-500", dark: "bg-green-600" },
      { name: "Blue", light: "bg-blue-500", dark: "bg-blue-600" },
      { name: "Indigo", light: "bg-indigo-500", dark: "bg-indigo-600" },
      { name: "Purple", light: "bg-purple-500", dark: "bg-purple-600" },
      { name: "Pink", light: "bg-pink-500", dark: "bg-pink-600" },
   ];

   return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
         {colors.map((color) => (
            <div key={color.name} className="text-center">
               <div
                  className={`h-12 rounded-t-lg ${color.light} dark:${color.dark}`}
               ></div>
               <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-b-lg">
                  <span className="text-sm font-medium">{color.name}</span>
               </div>
            </div>
         ))}
      </div>
   );
};

// Component hiển thị các biến thể typography
const Typography = () => {
   return (
      <div className="space-y-4">
         <h1 className="text-3xl font-bold">Heading 1</h1>
         <h2 className="text-2xl font-bold">Heading 2</h2>
         <h3 className="text-xl font-bold">Heading 3</h3>
         <p className="text-base">
            Đây là đoạn văn bản thông thường. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
         </p>
         <p className="text-sm text-gray-600 dark:text-gray-400">
            Đây là đoạn văn bản nhỏ hơn với màu xám.
         </p>
         <a href="#" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
            Đây là một liên kết
         </a>
      </div>
   );
};

// Component hiển thị các biến thể button
const Buttons = () => {
   return (
      <div className="flex flex-wrap gap-2">
         <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Primary
         </button>
         <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
            Secondary
         </button>
         <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Success
         </button>
         <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Danger
         </button>
         <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
            Warning
         </button>
         <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600">
            Light
         </button>
         <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 dark:bg-gray-900 dark:hover:bg-black">
            Dark
         </button>
      </div>
   );
};

// Component hiển thị các biến thể form
const Forms = () => {
   return (
      <div className="space-y-4">
         <div>
            <label htmlFor="input" className="block mb-1 font-medium">
               Input
            </label>
            <input
               type="text"
               id="input"
               className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
               placeholder="Nhập văn bản..."
            />
         </div>

         <div>
            <label htmlFor="select" className="block mb-1 font-medium">
               Select
            </label>
            <select
               id="select"
               className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            >
               <option>Tùy chọn 1</option>
               <option>Tùy chọn 2</option>
               <option>Tùy chọn 3</option>
            </select>
         </div>

         <div>
            <label className="flex items-center">
               <input
                  type="checkbox"
                  className="mr-2"
               />
               Checkbox
            </label>
         </div>

         <div>
            <label className="flex items-center">
               <input
                  type="radio"
                  name="radio"
                  className="mr-2"
               />
               Radio 1
            </label>
            <label className="flex items-center mt-1">
               <input
                  type="radio"
                  name="radio"
                  className="mr-2"
               />
               Radio 2
            </label>
         </div>
      </div>
   );
};

// Component hiển thị các biến thể card
const Cards = () => {
   return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="font-bold mb-2">Card Tiêu Chuẩn</h3>
            <p className="text-gray-600 dark:text-gray-400">
               Đây là một card tiêu chuẩn với nền trắng trong theme sáng
               và nền xám đậm trong theme tối.
            </p>
         </div>

         <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg shadow">
            <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-2">Card Màu</h3>
            <p className="text-blue-700 dark:text-blue-300">
               Đây là một card với màu nền và màu chữ tùy chỉnh cho cả hai theme.
            </p>
         </div>

         <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-lg shadow text-white">
            <h3 className="font-bold mb-2">Card Gradient</h3>
            <p>
               Đây là một card với nền gradient, giữ nguyên trong cả hai theme.
            </p>
         </div>

         <div className="border border-gray-300 dark:border-gray-600 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Card Viền</h3>
            <p className="text-gray-600 dark:text-gray-400">
               Đây là một card chỉ có viền, không có shadow.
            </p>
         </div>
      </div>
   );
};

// Component hiển thị các biến thể alert
const Alerts = () => {
   return (
      <div className="space-y-2">
         <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded">
            <p className="text-blue-800 dark:text-blue-200">
               Đây là một alert thông tin.
            </p>
         </div>

         <div className="bg-green-100 dark:bg-green-900 p-4 rounded">
            <p className="text-green-800 dark:text-green-200">
               Đây là một alert thành công.
            </p>
         </div>

         <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded">
            <p className="text-yellow-800 dark:text-yellow-200">
               Đây là một alert cảnh báo.
            </p>
         </div>

         <div className="bg-red-100 dark:bg-red-900 p-4 rounded">
            <p className="text-red-800 dark:text-red-200">
               Đây là một alert lỗi.
            </p>
         </div>
      </div>
   );
};

// Component chính
const TailwindThemeSwitcherDemo = () => {
   return (
      <ThemeProvider>
         <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <div className="flex justify-between items-center mb-4">
                  <h1 className="text-2xl font-bold">Demo Tailwind Theme Switcher</h1>
                  <ThemeToggle />
               </div>

               <p className="mb-6">
                  Demo này minh họa cách triển khai chức năng chuyển đổi theme (sáng/tối) trong React
                  sử dụng Tailwind CSS. Chúng ta sẽ sử dụng Context API để quản lý theme và localStorage
                  để lưu trữ tùy chọn của người dùng.
               </p>

               {/* Giải thích code */}
               <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-6">
                  <h3 className="font-bold mb-2">Cách Hoạt Động:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                     <li>Sử dụng Context API để chia sẻ theme giữa các component</li>
                     <li>Lưu trữ tùy chọn theme trong localStorage để giữ nguyên khi tải lại trang</li>
                     <li>Sử dụng Tailwind CSS dark mode để áp dụng các style khác nhau cho mỗi theme</li>
                     <li>Thêm/xóa class "dark" vào thẻ html để kích hoạt dark mode</li>
                     <li>Sử dụng các utility class của Tailwind để tạo giao diện đáp ứng với cả hai theme</li>
                  </ul>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {/* Theme Info */}
               <div className="md:col-span-1">
                  <ThemeInfo />
               </div>

               {/* Theme Toggle Demo */}
               <div className="md:col-span-2">
                  <ThemeCard title="Các Kiểu Nút Chuyển Đổi Theme">
                     <div className="flex flex-wrap gap-4">
                        <button
                           onClick={() => useTheme().setTheme("light")}
                           className={`px-4 py-2 rounded ${useTheme().theme === "light"
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 dark:bg-gray-700"
                              }`}
                        >
                           Light Mode
                        </button>

                        <button
                           onClick={() => useTheme().setTheme("dark")}
                           className={`px-4 py-2 rounded ${useTheme().theme === "dark"
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 dark:bg-gray-700"
                              }`}
                        >
                           Dark Mode
                        </button>

                        <button
                           onClick={() => useTheme().setTheme(useTheme().theme === "light" ? "dark" : "light")}
                           className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded"
                        >
                           Toggle Theme
                        </button>

                        <div className="flex items-center">
                           <span className="mr-2">Light</span>
                           <div
                              className="w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-600 p-1 cursor-pointer"
                              onClick={() => useTheme().setTheme(useTheme().theme === "light" ? "dark" : "light")}
                           >
                              <div
                                 className={`w-4 h-4 rounded-full bg-white transform transition-transform ${useTheme().theme === "dark" ? "translate-x-6" : ""
                                    }`}
                              ></div>
                           </div>
                           <span className="ml-2">Dark</span>
                        </div>
                     </div>
                  </ThemeCard>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* Color Palette */}
               <ThemeCard title="Bảng Màu">
                  <ColorPalette />
               </ThemeCard>

               {/* Typography */}
               <ThemeCard title="Typography">
                  <Typography />
               </ThemeCard>

               {/* Buttons */}
               <ThemeCard title="Buttons">
                  <Buttons />
               </ThemeCard>

               {/* Forms */}
               <ThemeCard title="Forms">
                  <Forms />
               </ThemeCard>

               {/* Cards */}
               <ThemeCard title="Cards">
                  <Cards />
               </ThemeCard>

               {/* Alerts */}
               <ThemeCard title="Alerts">
                  <Alerts />
               </ThemeCard>
            </div>

            {/* Code Example */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h2 className="text-xl font-bold mb-4">Ví Dụ Code</h2>

               <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded overflow-auto">
                  <pre className="text-sm">
                     {`// Cài đặt Tailwind CSS với dark mode
// tailwind.config.js
module.exports = {
  darkMode: 'class', // Sử dụng class strategy thay vì media query
  theme: {
    extend: {
      // Tùy chỉnh theme nếu cần
    },
  },
  variants: {
    extend: {
      // Thêm dark variant cho các utility classes nếu cần
    },
  },
  plugins: [],
};

// Tạo ThemeContext và ThemeProvider
// ThemeContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Lấy theme từ localStorage hoặc sử dụng theme mặc định
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme || 'light';
    }
    return 'light';
  });
  
  useEffect(() => {
    // Lưu theme vào localStorage
    localStorage.setItem('theme', theme);
    
    // Cập nhật class cho html element
    const htmlElement = document.documentElement;
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook để sử dụng theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Sử dụng ThemeProvider và useTheme
// App.js
import { ThemeProvider } from './ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Header />
        <main className="container mx-auto py-8 px-4">
          <Content />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

// Component nút chuyển đổi theme
// ThemeToggle.js
import { useTheme } from './ThemeContext';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}`}
                  </pre>
               </div>
            </div>
         </div>
      </ThemeProvider>
   );
};

export default TailwindThemeSwitcherDemo;
