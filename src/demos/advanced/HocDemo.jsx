import React, { useState, useEffect } from "react";

// HOC để thêm tính năng loading
const withLoading = (WrappedComponent, loadingMessage = "Đang tải...") => {
   return function WithLoadingComponent({ isLoading, ...props }) {
      if (isLoading) {
         return (
            <div className="flex justify-center items-center py-8">
               <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
               <span className="ml-2">{loadingMessage}</span>
            </div>
         );
      }

      return <WrappedComponent {...props} />;
   };
};

// HOC để thêm tính năng theo dõi chuột
const withMousePosition = (WrappedComponent) => {
   return function WithMousePositionComponent(props) {
      const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

      const handleMouseMove = (e) => {
         setMousePosition({
            x: e.clientX,
            y: e.clientY,
         });
      };

      useEffect(() => {
         window.addEventListener("mousemove", handleMouseMove);

         return () => {
            window.removeEventListener("mousemove", handleMouseMove);
         };
      }, []);

      return <WrappedComponent {...props} mousePosition={mousePosition} />;
   };
};

// HOC để thêm tính năng toggle
const withToggle = (WrappedComponent) => {
   return function WithToggleComponent(props) {
      const [isToggled, setIsToggled] = useState(false);

      const toggle = () => {
         setIsToggled(!isToggled);
      };

      return <WrappedComponent {...props} isToggled={isToggled} toggle={toggle} />;
   };
};

// HOC để thêm tính năng đếm
const withCounter = (WrappedComponent, initialCount = 0) => {
   return function WithCounterComponent(props) {
      const [count, setCount] = useState(initialCount);

      const increment = () => {
         setCount(count + 1);
      };

      const decrement = () => {
         setCount(count - 1);
      };

      const reset = () => {
         setCount(initialCount);
      };

      return (
         <WrappedComponent
            {...props}
            count={count}
            increment={increment}
            decrement={decrement}
            reset={reset}
         />
      );
   };
};

// HOC để thêm tính năng fetch data
const withData = (WrappedComponent, dataSource) => {
   return function WithDataComponent(props) {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
         const fetchData = async () => {
            try {
               setLoading(true);

               // Mô phỏng fetch API
               await new Promise(resolve => setTimeout(resolve, 1000));

               // Tạo dữ liệu mẫu
               let mockData;

               if (dataSource === "users") {
                  mockData = [
                     { id: 1, name: "Nguyễn Văn A", email: "nguyenvana@example.com" },
                     { id: 2, name: "Trần Thị B", email: "tranthib@example.com" },
                     { id: 3, name: "Lê Văn C", email: "levanc@example.com" },
                  ];
               } else if (dataSource === "posts") {
                  mockData = [
                     { id: 1, title: "Bài viết 1", body: "Nội dung bài viết 1" },
                     { id: 2, title: "Bài viết 2", body: "Nội dung bài viết 2" },
                     { id: 3, title: "Bài viết 3", body: "Nội dung bài viết 3" },
                  ];
               } else {
                  mockData = { message: "Dữ liệu không có sẵn" };
               }

               setData(mockData);
               setError(null);
            } catch (error) {
               setError("Đã xảy ra lỗi khi tải dữ liệu");
               setData(null);
            } finally {
               setLoading(false);
            }
         };

         fetchData();
      }, []);

      return (
         <WrappedComponent
            {...props}
            data={data}
            loading={loading}
            error={error}
         />
      );
   };
};

// HOC để thêm tính năng theme
const withTheme = (WrappedComponent) => {
   return function WithThemeComponent(props) {
      const [theme, setTheme] = useState("light");

      const toggleTheme = () => {
         setTheme(theme === "light" ? "dark" : "light");
      };

      const themeStyles = {
         light: {
            backgroundColor: "#ffffff",
            color: "#333333",
         },
         dark: {
            backgroundColor: "#333333",
            color: "#ffffff",
         },
      };

      return (
         <WrappedComponent
            {...props}
            theme={theme}
            themeStyles={themeStyles[theme]}
            toggleTheme={toggleTheme}
         />
      );
   };
};

// Các component đơn giản để sử dụng với HOC

// Component hiển thị danh sách
const ListComponent = ({ data }) => {
   if (!data) return <p>Không có dữ liệu.</p>;

   return (
      <div className="space-y-2">
         {Array.isArray(data) ? (
            data.map((item) => (
               <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 p-3 rounded shadow"
               >
                  {item.name ? (
                     <>
                        <h4 className="font-bold">{item.name}</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                           {item.email}
                        </p>
                     </>
                  ) : (
                     <>
                        <h4 className="font-bold">{item.title}</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                           {item.body}
                        </p>
                     </>
                  )}
               </div>
            ))
         ) : (
            <pre className="bg-white dark:bg-gray-800 p-3 rounded shadow">
               {JSON.stringify(data, null, 2)}
            </pre>
         )}
      </div>
   );
};

// Component hiển thị vị trí chuột
const MouseTrackerComponent = ({ mousePosition }) => {
   return (
      <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-lg relative overflow-hidden">
         <div className="text-center mb-4">
            <p>
               Vị trí chuột hiện tại: ({mousePosition.x}, {mousePosition.y})
            </p>
         </div>

         <div
            className="absolute w-4 h-4 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ left: mousePosition.x, top: mousePosition.y }}
         ></div>
      </div>
   );
};

// Component toggle
const ToggleComponent = ({ isToggled, toggle }) => {
   return (
      <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-lg">
         <div className="flex flex-col items-center">
            <div
               className={`w-16 h-8 rounded-full p-1 cursor-pointer ${isToggled ? "bg-green-500" : "bg-gray-300 dark:bg-gray-700"
                  }`}
               onClick={toggle}
            >
               <div
                  className={`w-6 h-6 rounded-full bg-white transform transition-transform ${isToggled ? "translate-x-8" : ""
                     }`}
               ></div>
            </div>

            <p className="mt-4">
               Trạng thái: <strong>{isToggled ? "Bật" : "Tắt"}</strong>
            </p>

            <button
               onClick={toggle}
               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
               {isToggled ? "Tắt" : "Bật"}
            </button>
         </div>
      </div>
   );
};

// Component counter
const CounterComponent = ({ count, increment, decrement, reset }) => {
   return (
      <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-lg">
         <div className="flex flex-col items-center">
            <div className="text-5xl font-bold mb-4">{count}</div>

            <div className="flex space-x-2">
               <button
                  onClick={decrement}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
               >
                  -
               </button>

               <button
                  onClick={reset}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
               >
                  Reset
               </button>

               <button
                  onClick={increment}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
               >
                  +
               </button>
            </div>
         </div>
      </div>
   );
};

// Component theme
const ThemedComponent = ({ theme, themeStyles, toggleTheme }) => {
   return (
      <div
         className="p-8 rounded-lg transition-colors"
         style={themeStyles}
      >
         <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold mb-4">
               Component với Theme {theme === "light" ? "Sáng" : "Tối"}
            </h3>

            <p className="mb-4">
               Đây là component với theme {theme === "light" ? "sáng" : "tối"}.
               Bạn có thể thay đổi theme bằng cách nhấn nút bên dưới.
            </p>

            <button
               onClick={toggleTheme}
               className={`px-4 py-2 rounded ${theme === "light"
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-800"
                  }`}
            >
               Chuyển sang theme {theme === "light" ? "tối" : "sáng"}
            </button>
         </div>
      </div>
   );
};

// Kết hợp nhiều HOC
const EnhancedComponent = ({ count, increment, isToggled, toggle, theme, toggleTheme }) => {
   return (
      <div className={`bg-gray-100 dark:bg-gray-900 p-8 rounded-lg ${theme === "dark" ? "border-2 border-white" : ""}`}>
         <h3 className="text-xl font-bold mb-4">Component Kết Hợp Nhiều HOC</h3>

         <div className="space-y-4">
            <div>
               <p className="mb-2">Counter:</p>
               <div className="flex items-center">
                  <button
                     onClick={increment}
                     className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                  >
                     Tăng
                  </button>
                  <span className="font-bold">{count}</span>
               </div>
            </div>

            <div>
               <p className="mb-2">Toggle:</p>
               <div className="flex items-center">
                  <button
                     onClick={toggle}
                     className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                  >
                     {isToggled ? "Tắt" : "Bật"}
                  </button>
                  <span className="font-bold">{isToggled ? "Bật" : "Tắt"}</span>
               </div>
            </div>

            <div>
               <p className="mb-2">Theme:</p>
               <div className="flex items-center">
                  <button
                     onClick={toggleTheme}
                     className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 mr-2"
                  >
                     {theme === "light" ? "Chuyển sang tối" : "Chuyển sang sáng"}
                  </button>
                  <span className="font-bold">{theme === "light" ? "Sáng" : "Tối"}</span>
               </div>
            </div>
         </div>
      </div>
   );
};

// Áp dụng các HOC
const ListWithLoading = withLoading(ListComponent);
const UserList = withData(ListWithLoading, "users");
const PostList = withData(ListWithLoading, "posts");
const MouseTracker = withMousePosition(MouseTrackerComponent);
const ToggleSwitch = withToggle(ToggleComponent);
const Counter = withCounter(CounterComponent);
const ThemedBox = withTheme(ThemedComponent);

// Kết hợp nhiều HOC
const ComposedComponent = withTheme(withToggle(withCounter(EnhancedComponent)));

// Component chính
const HocDemo = () => {
   const [dataType, setDataType] = useState("users");

   return (
      <div className="space-y-6">
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Demo Higher-Order Components</h1>
            <p className="mb-6">
               Demo này minh họa kỹ thuật Higher-Order Components (HOC) trong React - một pattern
               nâng cao để tái sử dụng logic component. HOC là một function nhận vào một component
               và trả về một component mới với các tính năng bổ sung.
            </p>

            {/* Giải thích code */}
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-6">
               <h3 className="font-bold mb-2">Cách Hoạt Động:</h3>
               <ul className="list-disc pl-5 space-y-2">
                  <li>HOC là một function nhận vào một component và trả về một component mới</li>
                  <li>HOC thêm các tính năng, props hoặc behavior mới cho component gốc</li>
                  <li>Giúp tách biệt logic và UI, tăng tính tái sử dụng của code</li>
                  <li>Có thể kết hợp nhiều HOC để tạo ra component phức tạp</li>
                  <li>Tuân theo nguyên tắc "composition over inheritance" của React</li>
               </ul>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* withData HOC Demo */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h2 className="text-xl font-bold mb-4">withData HOC</h2>

               <p className="mb-4 text-gray-600 dark:text-gray-400">
                  HOC này thêm tính năng fetch data và trạng thái loading cho component.
               </p>

               <div className="mb-4">
                  <div className="flex space-x-2">
                     <button
                        onClick={() => setDataType("users")}
                        className={`px-4 py-2 rounded ${dataType === "users"
                           ? "bg-blue-500 text-white"
                           : "bg-gray-200 dark:bg-gray-700"
                           }`}
                     >
                        Hiển thị Users
                     </button>

                     <button
                        onClick={() => setDataType("posts")}
                        className={`px-4 py-2 rounded ${dataType === "posts"
                           ? "bg-blue-500 text-white"
                           : "bg-gray-200 dark:bg-gray-700"
                           }`}
                     >
                        Hiển thị Posts
                     </button>
                  </div>
               </div>

               {dataType === "users" ? (
                  <UserList isLoading={false} />
               ) : (
                  <PostList isLoading={false} />
               )}
            </div>

            {/* withMousePosition HOC Demo */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h2 className="text-xl font-bold mb-4">withMousePosition HOC</h2>

               <p className="mb-4 text-gray-600 dark:text-gray-400">
                  HOC này thêm tính năng theo dõi vị trí chuột cho component.
               </p>

               <MouseTracker />
            </div>

            {/* withToggle HOC Demo */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h2 className="text-xl font-bold mb-4">withToggle HOC</h2>

               <p className="mb-4 text-gray-600 dark:text-gray-400">
                  HOC này thêm tính năng toggle cho component.
               </p>

               <ToggleSwitch />
            </div>

            {/* withCounter HOC Demo */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h2 className="text-xl font-bold mb-4">withCounter HOC</h2>

               <p className="mb-4 text-gray-600 dark:text-gray-400">
                  HOC này thêm tính năng đếm cho component.
               </p>

               <Counter />
            </div>

            {/* withTheme HOC Demo */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h2 className="text-xl font-bold mb-4">withTheme HOC</h2>

               <p className="mb-4 text-gray-600 dark:text-gray-400">
                  HOC này thêm tính năng theme cho component.
               </p>

               <ThemedBox />
            </div>

            {/* Composed HOCs Demo */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h2 className="text-xl font-bold mb-4">Kết Hợp Nhiều HOC</h2>

               <p className="mb-4 text-gray-600 dark:text-gray-400">
                  Kết hợp nhiều HOC để tạo ra component phức tạp.
               </p>

               <ComposedComponent />
            </div>
         </div>

         {/* Code Example */}
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Ví Dụ Code</h2>

            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded overflow-auto">
               <pre className="text-sm">
                  {`// Higher-Order Component Pattern
import React, { useState, useEffect } from 'react';

// HOC để thêm tính năng loading
const withLoading = (WrappedComponent, loadingMessage = "Loading...") => {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div>{loadingMessage}</div>;
    }
    
    return <WrappedComponent {...props} />;
  };
};

// HOC để thêm tính năng fetch data
const withData = (WrappedComponent, dataSource) => {
  return function WithDataComponent(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await fetch(dataSource);
          const result = await response.json();
          setData(result);
          setError(null);
        } catch (error) {
          setError("Error fetching data");
          setData(null);
        } finally {
          setLoading(false);
        }
      };
      
      fetchData();
    }, []);
    
    return (
      <WrappedComponent
        {...props}
        data={data}
        loading={loading}
        error={error}
      />
    );
  };
};

// Component hiển thị danh sách
const ListComponent = ({ data }) => {
  return (
    <ul>
      {data.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};

// Áp dụng HOC
const ListWithLoading = withLoading(ListComponent);
const UserList = withData(ListWithLoading, "https://api.example.com/users");

// Sử dụng component đã được nâng cao
function App() {
  return (
    <div>
      <h1>User List</h1>
      <UserList isLoading={false} />
    </div>
  );
}

// Kết hợp nhiều HOC
// Từ dưới lên trên: withData -> withLoading -> ListComponent
const EnhancedComponent = withData(
  withLoading(ListComponent),
  "https://api.example.com/users"
);

// Hoặc sử dụng compose để dễ đọc hơn
const compose = (...funcs) => {
  if (funcs.length === 0) return arg => arg;
  if (funcs.length === 1) return funcs[0];
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
};

const enhance = compose(
  withData("https://api.example.com/users"),
  withLoading
);

const ComposedComponent = enhance(ListComponent);`}
               </pre>
            </div>
         </div>
      </div>
   );
};

export default HocDemo;
