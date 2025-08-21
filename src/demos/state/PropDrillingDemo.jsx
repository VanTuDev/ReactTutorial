import React, { useState } from "react";

// Component cha chứa state
const PropDrillingDemo = () => {
   // State cho theme
   const [theme, setTheme] = useState("light");

   // State cho user
   const [user, setUser] = useState({
      name: "Nguyễn Văn A",
      role: "Admin",
      preferences: {
         language: "vi",
         notifications: true,
         compactMode: false,
      },
   });

   // Hàm thay đổi theme
   const toggleTheme = () => {
      setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
   };

   // Hàm cập nhật tên người dùng
   const updateUserName = (name) => {
      setUser({
         ...user,
         name,
      });
   };

   // Hàm cập nhật vai trò người dùng
   const updateUserRole = (role) => {
      setUser({
         ...user,
         role,
      });
   };

   // Hàm cập nhật tùy chọn người dùng
   const updateUserPreference = (key, value) => {
      setUser({
         ...user,
         preferences: {
            ...user.preferences,
            [key]: value,
         },
      });
   };

   return (
      <div className="space-y-6">
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Demo Prop Drilling</h1>
            <p className="mb-6">
               Demo này minh họa vấn đề "prop drilling" trong React - khi bạn cần truyền dữ liệu
               qua nhiều lớp component để đến component con cần dữ liệu đó. Đây là một vấn đề phổ biến
               trong các ứng dụng React lớn và có thể được giải quyết bằng các giải pháp quản lý state như
               Context API, Redux, Zustand, hoặc các thư viện khác.
            </p>

            {/* Giải thích code */}
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-6">
               <h3 className="font-bold mb-2">Cách Hoạt Động:</h3>
               <ul className="list-disc pl-5 space-y-2">
                  <li>State được định nghĩa ở component cha cấp cao nhất</li>
                  <li>State và các hàm cập nhật được truyền xuống qua props</li>
                  <li>Mỗi component con phải nhận và truyền tiếp props, ngay cả khi không sử dụng</li>
                  <li>Component ở cấp sâu nhất cuối cùng sử dụng dữ liệu hoặc hàm cập nhật</li>
                  <li>Khi state thay đổi, React sẽ re-render các component bị ảnh hưởng</li>
               </ul>
            </div>
         </div>

         {/* App Structure */}
         <div className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow ${theme === "dark" ? "border-2 border-blue-500" : ""
            }`}>
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-xl font-bold">App Component</h2>
               <div className="flex items-center">
                  <span className="mr-2">Theme: {theme}</span>
                  <button
                     onClick={toggleTheme}
                     className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                     Toggle Theme
                  </button>
               </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-2 rounded text-sm mb-4">
               <p>
                  <strong>State:</strong> theme, user, toggleTheme, updateUserName, updateUserRole, updateUserPreference
               </p>
            </div>

            {/* Main Content Component */}
            <MainContent
               theme={theme}
               user={user}
               updateUserName={updateUserName}
               updateUserRole={updateUserRole}
               updateUserPreference={updateUserPreference}
            />
         </div>

         {/* Prop Drilling Problem */}
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Vấn Đề Prop Drilling</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <h3 className="font-bold mb-2">Nhược Điểm:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                     <li>Code dài dòng và khó đọc khi truyền nhiều props qua nhiều lớp component</li>
                     <li>Khó bảo trì khi thêm/xóa props, vì phải cập nhật tất cả các component trung gian</li>
                     <li>Component trung gian phải truyền props mà chúng không sử dụng</li>
                     <li>Dễ gây lỗi khi quên truyền props hoặc đặt tên sai</li>
                     <li>Khó tái sử dụng component vì phụ thuộc vào cấu trúc props cụ thể</li>
                  </ul>
               </div>

               <div>
                  <h3 className="font-bold mb-2">Giải Pháp Thay Thế:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                     <li>
                        <strong>Context API:</strong> Cho phép chia sẻ state mà không cần truyền props
                     </li>
                     <li>
                        <strong>Redux:</strong> Quản lý state tập trung với store, actions và reducers
                     </li>
                     <li>
                        <strong>Zustand:</strong> Thư viện quản lý state đơn giản với hooks API
                     </li>
                     <li>
                        <strong>Recoil:</strong> Quản lý state dựa trên atoms và selectors
                     </li>
                     <li>
                        <strong>Composition:</strong> Sử dụng children props để giảm số lượng props cần truyền
                     </li>
                  </ul>
               </div>
            </div>
         </div>

         {/* Code Example */}
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Ví Dụ Code</h2>

            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded overflow-auto">
               <pre className="text-sm">
                  {`// Giải pháp với Context API thay vì Prop Drilling

import React, { createContext, useContext, useState } from 'react';

// Tạo Context
const AppContext = createContext();

// Hook tùy chỉnh để sử dụng context
const useAppContext = () => useContext(AppContext);

// Provider Component
function AppProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState({
    name: 'Nguyễn Văn A',
    role: 'Admin',
    preferences: {
      language: 'vi',
      notifications: true,
      compactMode: false,
    },
  });

  // Các hàm cập nhật state
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const updateUserName = (name) => {
    setUser({ ...user, name });
  };

  const updateUserRole = (role) => {
    setUser({ ...user, role });
  };

  const updateUserPreference = (key, value) => {
    setUser({
      ...user,
      preferences: {
        ...user.preferences,
        [key]: value,
      },
    });
  };

  // Giá trị được chia sẻ qua context
  const contextValue = {
    theme,
    user,
    toggleTheme,
    updateUserName,
    updateUserRole,
    updateUserPreference,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

// Component con có thể truy cập context trực tiếp
function UserProfile() {
  // Lấy state và hàm từ context
  const { user, updateUserName } = useAppContext();
  
  return (
    <div>
      <h3>User Profile</h3>
      <input
        type="text"
        value={user.name}
        onChange={(e) => updateUserName(e.target.value)}
      />
      <p>Name: {user.name}</p>
    </div>
  );
}

// Component con khác cũng có thể truy cập context
function ThemeToggle() {
  const { theme, toggleTheme } = useAppContext();
  
  return (
    <button onClick={toggleTheme}>
      Toggle Theme (Current: {theme})
    </button>
  );
}

// Sử dụng Provider ở cấp cao nhất
function App() {
  return (
    <AppProvider>
      <div>
        <h1>App with Context</h1>
        <ThemeToggle />
        <UserProfile />
      </div>
    </AppProvider>
  );
}`}
               </pre>
            </div>
         </div>
      </div>
   );
};

// Component con cấp 1
const MainContent = ({ theme, user, updateUserName, updateUserRole, updateUserPreference }) => {
   return (
      <div className={`border-2 border-green-500 p-4 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"
         }`}>
         <h3 className="font-bold mb-2">MainContent Component</h3>

         <div className="bg-white dark:bg-gray-800 p-2 rounded text-sm mb-4">
            <p>
               <strong>Props nhận được:</strong> theme, user, updateUserName, updateUserRole, updateUserPreference
            </p>
            <p>
               <strong>Props sử dụng:</strong> theme
            </p>
            <p>
               <strong>Props truyền tiếp:</strong> user, updateUserName, updateUserRole, updateUserPreference
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sidebar Component */}
            <Sidebar
               user={user}
               updateUserRole={updateUserRole}
               updateUserPreference={updateUserPreference}
            />

            {/* Content Component */}
            <Content
               theme={theme}
               user={user}
               updateUserName={updateUserName}
            />
         </div>
      </div>
   );
};

// Component con cấp 2 - Sidebar
const Sidebar = ({ user, updateUserRole, updateUserPreference }) => {
   return (
      <div className="border-2 border-yellow-500 p-4 rounded-lg bg-white dark:bg-gray-800">
         <h4 className="font-bold mb-2">Sidebar Component</h4>

         <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm mb-4">
            <p>
               <strong>Props nhận được:</strong> user, updateUserRole, updateUserPreference
            </p>
            <p>
               <strong>Props sử dụng:</strong> Không có
            </p>
            <p>
               <strong>Props truyền tiếp:</strong> user, updateUserRole, updateUserPreference
            </p>
         </div>

         {/* UserSettings Component */}
         <UserSettings
            user={user}
            updateUserRole={updateUserRole}
            updateUserPreference={updateUserPreference}
         />
      </div>
   );
};

// Component con cấp 2 - Content
const Content = ({ theme, user, updateUserName }) => {
   return (
      <div className="border-2 border-purple-500 p-4 rounded-lg bg-white dark:bg-gray-800">
         <h4 className="font-bold mb-2">Content Component</h4>

         <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm mb-4">
            <p>
               <strong>Props nhận được:</strong> theme, user, updateUserName
            </p>
            <p>
               <strong>Props sử dụng:</strong> Không có
            </p>
            <p>
               <strong>Props truyền tiếp:</strong> theme, user, updateUserName
            </p>
         </div>

         {/* UserProfile Component */}
         <UserProfile
            theme={theme}
            user={user}
            updateUserName={updateUserName}
         />
      </div>
   );
};

// Component con cấp 3 - UserSettings
const UserSettings = ({ user, updateUserRole, updateUserPreference }) => {
   return (
      <div className="border-2 border-red-500 p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
         <h5 className="font-bold mb-2">UserSettings Component</h5>

         <div className="bg-white dark:bg-gray-800 p-2 rounded text-sm mb-4">
            <p>
               <strong>Props nhận được:</strong> user, updateUserRole, updateUserPreference
            </p>
            <p>
               <strong>Props sử dụng:</strong> Không có
            </p>
            <p>
               <strong>Props truyền tiếp:</strong> user, updateUserRole, updateUserPreference
            </p>
         </div>

         {/* Preferences Component */}
         <Preferences
            preferences={user.preferences}
            updateUserPreference={updateUserPreference}
         />

         {/* RoleSelector Component */}
         <RoleSelector
            role={user.role}
            updateUserRole={updateUserRole}
         />
      </div>
   );
};

// Component con cấp 3 - UserProfile
const UserProfile = ({ theme, user, updateUserName }) => {
   return (
      <div className="border-2 border-blue-500 p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
         <h5 className="font-bold mb-2">UserProfile Component</h5>

         <div className="bg-white dark:bg-gray-800 p-2 rounded text-sm mb-4">
            <p>
               <strong>Props nhận được:</strong> theme, user, updateUserName
            </p>
            <p>
               <strong>Props sử dụng:</strong> user, updateUserName
            </p>
         </div>

         <div className="space-y-2">
            <div>
               <label className="block text-sm font-medium mb-1">Tên người dùng:</label>
               <div className="flex">
                  <input
                     type="text"
                     value={user.name}
                     onChange={(e) => updateUserName(e.target.value)}
                     className="flex-grow p-1 border rounded dark:bg-gray-800 dark:border-gray-600"
                  />
               </div>
            </div>

            <div>
               <p className="text-sm">
                  <strong>Vai trò:</strong> {user.role}
               </p>
               <p className="text-sm">
                  <strong>Theme:</strong> {theme}
               </p>
            </div>
         </div>
      </div>
   );
};

// Component con cấp 4 - Preferences
const Preferences = ({ preferences, updateUserPreference }) => {
   return (
      <div className="border-2 border-pink-500 p-4 rounded-lg bg-white dark:bg-gray-800 mb-4">
         <h6 className="font-bold mb-2">Preferences Component</h6>

         <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm mb-4">
            <p>
               <strong>Props nhận được:</strong> preferences, updateUserPreference
            </p>
            <p>
               <strong>Props sử dụng:</strong> preferences, updateUserPreference
            </p>
         </div>

         <div className="space-y-2">
            <div className="flex items-center">
               <input
                  type="checkbox"
                  id="notifications"
                  checked={preferences.notifications}
                  onChange={(e) => updateUserPreference("notifications", e.target.checked)}
                  className="mr-2"
               />
               <label htmlFor="notifications" className="text-sm">Nhận thông báo</label>
            </div>

            <div className="flex items-center">
               <input
                  type="checkbox"
                  id="compactMode"
                  checked={preferences.compactMode}
                  onChange={(e) => updateUserPreference("compactMode", e.target.checked)}
                  className="mr-2"
               />
               <label htmlFor="compactMode" className="text-sm">Chế độ thu gọn</label>
            </div>

            <div>
               <label htmlFor="language" className="block text-sm mb-1">Ngôn ngữ:</label>
               <select
                  id="language"
                  value={preferences.language}
                  onChange={(e) => updateUserPreference("language", e.target.value)}
                  className="w-full p-1 border rounded dark:bg-gray-800 dark:border-gray-600"
               >
                  <option value="vi">Tiếng Việt</option>
                  <option value="en">English</option>
                  <option value="fr">Français</option>
               </select>
            </div>
         </div>
      </div>
   );
};

// Component con cấp 4 - RoleSelector
const RoleSelector = ({ role, updateUserRole }) => {
   return (
      <div className="border-2 border-orange-500 p-4 rounded-lg bg-white dark:bg-gray-800">
         <h6 className="font-bold mb-2">RoleSelector Component</h6>

         <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm mb-4">
            <p>
               <strong>Props nhận được:</strong> role, updateUserRole
            </p>
            <p>
               <strong>Props sử dụng:</strong> role, updateUserRole
            </p>
         </div>

         <div>
            <label htmlFor="role" className="block text-sm mb-1">Vai trò:</label>
            <select
               id="role"
               value={role}
               onChange={(e) => updateUserRole(e.target.value)}
               className="w-full p-1 border rounded dark:bg-gray-800 dark:border-gray-600"
            >
               <option value="Admin">Admin</option>
               <option value="Editor">Editor</option>
               <option value="Viewer">Viewer</option>
            </select>
         </div>
      </div>
   );
};

export default PropDrillingDemo;
