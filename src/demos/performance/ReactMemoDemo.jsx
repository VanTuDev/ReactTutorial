import React, { useState, memo, useCallback, useMemo } from "react";

// Demo component không sử dụng memo
const RegularComponent = ({ name, count, onClick }) => {
   console.log(`RegularComponent rendered: ${name}`);

   return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
         <h3 className="font-bold mb-2">{name}</h3>
         <p>Count: {count}</p>
         <button
            onClick={onClick}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
         >
            Tăng
         </button>
      </div>
   );
};

// Demo component sử dụng memo
const MemoizedComponent = memo(({ name, count, onClick }) => {
   console.log(`MemoizedComponent rendered: ${name}`);

   return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
         <h3 className="font-bold mb-2">{name}</h3>
         <p>Count: {count}</p>
         <button
            onClick={onClick}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
         >
            Tăng
         </button>
      </div>
   );
});

// Demo component sử dụng memo với custom comparison function
const MemoizedWithComparison = memo(
   ({ name, count, onClick, user }) => {
      console.log(`MemoizedWithComparison rendered: ${name}`);

      return (
         <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="font-bold mb-2">{name}</h3>
            <p>Count: {count}</p>
            <p>User: {user.name}</p>
            <button
               onClick={onClick}
               className="mt-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
               Tăng
            </button>
         </div>
      );
   },
   (prevProps, nextProps) => {
      // Chỉ re-render khi count hoặc user.name thay đổi
      return (
         prevProps.count === nextProps.count &&
         prevProps.user.name === nextProps.user.name
      );
   }
);

// Demo component với expensive calculation
const ExpensiveComponent = ({ name, count, onClick }) => {
   console.log(`ExpensiveComponent rendered: ${name}`);

   // Mô phỏng tính toán phức tạp
   const expensiveResult = useMemo(() => {
      console.log("Performing expensive calculation...");

      // Mô phỏng tính toán nặng
      let result = 0;
      for (let i = 0; i < 1000000; i++) {
         result += (count * i) % 10;
      }

      return result;
   }, [count]); // Chỉ tính toán lại khi count thay đổi

   return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
         <h3 className="font-bold mb-2">{name}</h3>
         <p>Count: {count}</p>
         <p>Expensive result: {expensiveResult}</p>
         <button
            onClick={onClick}
            className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
         >
            Tăng
         </button>
      </div>
   );
};

const ReactMemoDemo = () => {
   // State cho các counter
   const [regularCount, setRegularCount] = useState(0);
   const [memoizedCount, setMemoizedCount] = useState(0);
   const [comparisonCount, setComparisonCount] = useState(0);
   const [expensiveCount, setExpensiveCount] = useState(0);

   // State cho việc re-render parent
   const [parentState, setParentState] = useState(0);

   // State cho user object
   const [user, setUser] = useState({ name: "User 1", age: 30 });

   // Callbacks cho các component
   const handleRegularClick = () => {
      setRegularCount(regularCount + 1);
   };

   // useCallback để tránh tạo mới function mỗi lần render
   const handleMemoizedClick = useCallback(() => {
      setMemoizedCount((prevCount) => prevCount + 1);
   }, []); // Không phụ thuộc vào bất kỳ state nào

   const handleComparisonClick = useCallback(() => {
      setComparisonCount((prevCount) => prevCount + 1);
   }, []);

   const handleExpensiveClick = useCallback(() => {
      setExpensiveCount((prevCount) => prevCount + 1);
   }, []);

   // Xử lý thay đổi tên người dùng
   const handleChangeUserName = () => {
      setUser({
         ...user,
         name: user.name === "User 1" ? "User 2" : "User 1",
      });
   };

   // Xử lý thay đổi tuổi người dùng
   const handleChangeUserAge = () => {
      setUser({
         ...user,
         age: user.age + 1,
      });
   };

   // Memoize user object để tránh tạo mới mỗi lần render
   const memoizedUser = useMemo(() => user, [user.name, user.age]);

   // Đếm số lần render của parent component
   console.log("Parent component rendered");

   return (
      <div className="space-y-6">
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Demo React.memo</h1>
            <p className="mb-6">
               Demo này minh họa cách sử dụng React.memo, useCallback và useMemo để tối ưu hóa hiệu suất
               bằng cách giảm số lần render không cần thiết của component. React.memo là một higher-order component
               giúp bỏ qua việc render lại component nếu props không thay đổi.
            </p>

            {/* Giải thích code */}
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-6">
               <h3 className="font-bold mb-2">Cách Hoạt Động:</h3>
               <ul className="list-disc pl-5 space-y-2">
                  <li>React.memo bỏ qua việc render lại component nếu props không thay đổi</li>
                  <li>useCallback giúp giữ nguyên tham chiếu của hàm giữa các lần render</li>
                  <li>useMemo giúp lưu trữ kết quả tính toán và chỉ tính toán lại khi dependencies thay đổi</li>
                  <li>Custom comparison function cho phép kiểm soát chi tiết việc khi nào component nên re-render</li>
                  <li>Mở Console để xem log về việc các component được render khi nào</li>
               </ul>
            </div>
         </div>

         {/* Controls */}
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Điều Khiển Demo</h2>

            <div className="flex flex-wrap gap-2">
               <button
                  onClick={() => setParentState(parentState + 1)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
               >
                  Re-render Parent ({parentState})
               </button>

               <button
                  onClick={handleChangeUserName}
                  className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
               >
                  Đổi Tên User ({user.name})
               </button>

               <button
                  onClick={handleChangeUserAge}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
               >
                  Tăng Tuổi User ({user.age})
               </button>
            </div>

            <div className="mt-4 bg-gray-50 dark:bg-gray-900 p-3 rounded">
               <p className="text-sm">
                  <strong>Mở Console (F12)</strong> để xem log về việc các component được render khi nào.
                  Thử nhấn các nút trên và quan sát sự khác biệt giữa các component.
               </p>
            </div>
         </div>

         {/* Components */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Regular Component */}
            <div>
               <h2 className="text-xl font-bold mb-4">Component Thông Thường</h2>
               <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded mb-4 text-sm">
                  <p>Component này <strong>không sử dụng</strong> React.memo.</p>
                  <p>Sẽ re-render mỗi khi parent component re-render, ngay cả khi props không thay đổi.</p>
               </div>
               <RegularComponent
                  name="Regular Component"
                  count={regularCount}
                  onClick={handleRegularClick}
               />
            </div>

            {/* Memoized Component */}
            <div>
               <h2 className="text-xl font-bold mb-4">Component với React.memo</h2>
               <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded mb-4 text-sm">
                  <p>Component này <strong>sử dụng</strong> React.memo.</p>
                  <p>Chỉ re-render khi props thay đổi. Sử dụng useCallback để tránh tạo mới function.</p>
               </div>
               <MemoizedComponent
                  name="Memoized Component"
                  count={memoizedCount}
                  onClick={handleMemoizedClick}
               />
            </div>

            {/* Memoized with Custom Comparison */}
            <div>
               <h2 className="text-xl font-bold mb-4">Component với Custom Comparison</h2>
               <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded mb-4 text-sm">
                  <p>Component này sử dụng React.memo với <strong>custom comparison function</strong>.</p>
                  <p>Chỉ re-render khi count hoặc user.name thay đổi, bỏ qua các thay đổi khác.</p>
               </div>
               <MemoizedWithComparison
                  name="Custom Comparison Component"
                  count={comparisonCount}
                  onClick={handleComparisonClick}
                  user={memoizedUser}
               />
            </div>

            {/* Expensive Calculation */}
            <div>
               <h2 className="text-xl font-bold mb-4">Component với Tính Toán Phức Tạp</h2>
               <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded mb-4 text-sm">
                  <p>Component này sử dụng <strong>useMemo</strong> để lưu trữ kết quả tính toán phức tạp.</p>
                  <p>Tính toán chỉ được thực hiện lại khi count thay đổi.</p>
               </div>
               <ExpensiveComponent
                  name="Expensive Component"
                  count={expensiveCount}
                  onClick={handleExpensiveClick}
               />
            </div>
         </div>

         {/* Code Example */}
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Ví Dụ Code</h2>

            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded overflow-auto">
               <pre className="text-sm">
                  {`// React.memo - Tránh render lại component khi props không thay đổi
import React, { memo, useState, useCallback, useMemo } from 'react';

// Component thông thường
const RegularComponent = ({ name, count, onClick }) => {
  console.log(\`RegularComponent rendered: \${name}\`);
  return (
    <div>
      <h3>{name}</h3>
      <p>Count: {count}</p>
      <button onClick={onClick}>Tăng</button>
    </div>
  );
};

// Component với React.memo
const MemoizedComponent = memo(({ name, count, onClick }) => {
  console.log(\`MemoizedComponent rendered: \${name}\`);
  return (
    <div>
      <h3>{name}</h3>
      <p>Count: {count}</p>
      <button onClick={onClick}>Tăng</button>
    </div>
  );
});

// Component với React.memo và custom comparison function
const MemoizedWithComparison = memo(
  ({ name, count, onClick, user }) => {
    console.log(\`MemoizedWithComparison rendered: \${name}\`);
    return (
      <div>
        <h3>{name}</h3>
        <p>Count: {count}</p>
        <p>User: {user.name}</p>
        <button onClick={onClick}>Tăng</button>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Chỉ re-render khi count hoặc user.name thay đổi
    return (
      prevProps.count === nextProps.count &&
      prevProps.user.name === nextProps.user.name
    );
  }
);

// Parent component
function App() {
  const [regularCount, setRegularCount] = useState(0);
  const [memoizedCount, setMemoizedCount] = useState(0);
  const [parentState, setParentState] = useState(0);
  const [user, setUser] = useState({ name: 'User 1', age: 30 });
  
  // useCallback - Tránh tạo mới function mỗi lần render
  const handleMemoizedClick = useCallback(() => {
    setMemoizedCount(prevCount => prevCount + 1);
  }, []);
  
  // useMemo - Lưu trữ object để tránh tạo mới mỗi lần render
  const memoizedUser = useMemo(() => user, [user.name, user.age]);
  
  return (
    <div>
      <button onClick={() => setParentState(parentState + 1)}>
        Re-render Parent ({parentState})
      </button>
      
      <RegularComponent
        name="Regular Component"
        count={regularCount}
        onClick={() => setRegularCount(regularCount + 1)}
      />
      
      <MemoizedComponent
        name="Memoized Component"
        count={memoizedCount}
        onClick={handleMemoizedClick}
      />
      
      <MemoizedWithComparison
        name="Custom Comparison Component"
        count={memoizedCount}
        onClick={handleMemoizedClick}
        user={memoizedUser}
      />
    </div>
  );
}`}
               </pre>
            </div>
         </div>
      </div>
   );
};

export default ReactMemoDemo;
