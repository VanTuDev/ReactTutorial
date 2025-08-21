import React, { useState, useEffect } from "react";

// Mouse tracker component sử dụng render props
const MouseTracker = ({ render }) => {
   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

   // Cập nhật vị trí chuột
   const handleMouseMove = (event) => {
      setMousePosition({
         x: event.clientX,
         y: event.clientY,
      });
   };

   // Thêm event listener khi component mount
   useEffect(() => {
      window.addEventListener("mousemove", handleMouseMove);

      // Cleanup khi component unmount
      return () => {
         window.removeEventListener("mousemove", handleMouseMove);
      };
   }, []);

   // Gọi render prop với dữ liệu
   return render(mousePosition);
};

// Toggle component sử dụng render props
const Toggle = ({ render, initialState = false }) => {
   const [isOn, setIsOn] = useState(initialState);

   // Toggle state
   const toggle = () => {
      setIsOn(!isOn);
   };

   // Gọi render prop với state và handlers
   return render({ isOn, toggle });
};

// Counter component sử dụng render props
const Counter = ({ render, initialCount = 0, step = 1 }) => {
   const [count, setCount] = useState(initialCount);

   // Tăng counter
   const increment = () => {
      setCount(count + step);
   };

   // Giảm counter
   const decrement = () => {
      setCount(count - step);
   };

   // Reset counter
   const reset = () => {
      setCount(initialCount);
   };

   // Gọi render prop với state và handlers
   return render({ count, increment, decrement, reset });
};

// Form component sử dụng render props
const Form = ({ render, initialValues = {}, onSubmit }) => {
   const [values, setValues] = useState(initialValues);
   const [errors, setErrors] = useState({});
   const [touched, setTouched] = useState({});
   const [isSubmitting, setIsSubmitting] = useState(false);

   // Xử lý thay đổi input
   const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setValues({
         ...values,
         [name]: type === "checkbox" ? checked : value,
      });
   };

   // Xử lý blur input
   const handleBlur = (e) => {
      const { name } = e.target;
      setTouched({
         ...touched,
         [name]: true,
      });
   };

   // Xử lý submit form
   const handleSubmit = (e) => {
      e.preventDefault();

      // Validate form
      const newErrors = validate(values);
      setErrors(newErrors);

      // Nếu không có lỗi, gọi onSubmit
      if (Object.keys(newErrors).length === 0) {
         setIsSubmitting(true);

         // Gọi onSubmit callback
         if (onSubmit) {
            onSubmit(values);
         }

         // Reset isSubmitting sau 1 giây
         setTimeout(() => {
            setIsSubmitting(false);
         }, 1000);
      }
   };

   // Hàm validate đơn giản
   const validate = (values) => {
      const errors = {};

      // Kiểm tra name
      if (!values.name) {
         errors.name = "Tên là bắt buộc";
      }

      // Kiểm tra email
      if (!values.email) {
         errors.email = "Email là bắt buộc";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
         errors.email = "Email không hợp lệ";
      }

      return errors;
   };

   // Gọi render prop với state và handlers
   return render({
      values,
      errors,
      touched,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
   });
};

// Fetch component sử dụng render props
const Fetch = ({ url, render }) => {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   // Fetch data khi component mount hoặc url thay đổi
   useEffect(() => {
      let isMounted = true;

      const fetchData = async () => {
         try {
            setLoading(true);

            // Mô phỏng fetch API
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Tạo dữ liệu mẫu
            let mockData;

            if (url.includes("users")) {
               mockData = [
                  { id: 1, name: "Nguyễn Văn A", email: "nguyenvana@example.com" },
                  { id: 2, name: "Trần Thị B", email: "tranthib@example.com" },
                  { id: 3, name: "Lê Văn C", email: "levanc@example.com" },
               ];
            } else if (url.includes("posts")) {
               mockData = [
                  { id: 1, title: "Bài viết 1", body: "Nội dung bài viết 1" },
                  { id: 2, title: "Bài viết 2", body: "Nội dung bài viết 2" },
                  { id: 3, title: "Bài viết 3", body: "Nội dung bài viết 3" },
               ];
            } else {
               mockData = { message: "Dữ liệu không có sẵn" };
            }

            // Cập nhật state nếu component vẫn mounted
            if (isMounted) {
               setData(mockData);
               setError(null);
            }
         } catch (error) {
            // Cập nhật state lỗi nếu component vẫn mounted
            if (isMounted) {
               setError("Đã xảy ra lỗi khi tải dữ liệu");
               setData(null);
            }
         } finally {
            // Cập nhật state loading nếu component vẫn mounted
            if (isMounted) {
               setLoading(false);
            }
         }
      };

      fetchData();

      // Cleanup khi component unmount
      return () => {
         isMounted = false;
      };
   }, [url]);

   // Gọi render prop với state
   return render({ data, loading, error });
};

// Component chính
const RenderPropsDemo = () => {
   // State cho URL của Fetch component
   const [url, setUrl] = useState("https://api.example.com/users");

   return (
      <div className="space-y-6">
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Demo Render Props</h1>
            <p className="mb-6">
               Demo này minh họa kỹ thuật Render Props trong React - một pattern cho phép chia sẻ code
               giữa các React components bằng cách sử dụng một prop là một function trả về một React element.
               Pattern này giúp tách logic và UI, tăng tính tái sử dụng của code.
            </p>

            {/* Giải thích code */}
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-6">
               <h3 className="font-bold mb-2">Cách Hoạt Động:</h3>
               <ul className="list-disc pl-5 space-y-2">
                  <li>Component cha quản lý logic và state</li>
                  <li>Component cha nhận một prop là function (render prop)</li>
                  <li>Function này nhận dữ liệu từ component cha và trả về React element</li>
                  <li>Component con quyết định cách hiển thị UI dựa trên dữ liệu nhận được</li>
                  <li>Tách biệt logic và UI, tăng tính tái sử dụng</li>
               </ul>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mouse Tracker Demo */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h2 className="text-xl font-bold mb-4">Mouse Tracker</h2>

               <MouseTracker
                  render={({ x, y }) => (
                     <div>
                        <p className="mb-4 text-gray-600 dark:text-gray-400">
                           Component này theo dõi vị trí chuột và chia sẻ dữ liệu thông qua render prop.
                        </p>

                        <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-lg relative overflow-hidden">
                           <div className="text-center mb-4">
                              <p>
                                 Vị trí chuột hiện tại: ({x}, {y})
                              </p>
                           </div>

                           <div
                              className="absolute w-4 h-4 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                              style={{ left: x, top: y }}
                           ></div>
                        </div>
                     </div>
                  )}
               />
            </div>

            {/* Toggle Demo */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h2 className="text-xl font-bold mb-4">Toggle</h2>

               <Toggle
                  render={({ isOn, toggle }) => (
                     <div>
                        <p className="mb-4 text-gray-600 dark:text-gray-400">
                           Component này quản lý state toggle và chia sẻ thông qua render prop.
                        </p>

                        <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-lg">
                           <div className="flex flex-col items-center">
                              <div
                                 className={`w-16 h-8 rounded-full p-1 cursor-pointer ${isOn ? "bg-green-500" : "bg-gray-300 dark:bg-gray-700"
                                    }`}
                                 onClick={toggle}
                              >
                                 <div
                                    className={`w-6 h-6 rounded-full bg-white transform transition-transform ${isOn ? "translate-x-8" : ""
                                       }`}
                                 ></div>
                              </div>

                              <p className="mt-4">
                                 Trạng thái: <strong>{isOn ? "Bật" : "Tắt"}</strong>
                              </p>

                              <button
                                 onClick={toggle}
                                 className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                              >
                                 {isOn ? "Tắt" : "Bật"}
                              </button>
                           </div>
                        </div>
                     </div>
                  )}
               />
            </div>

            {/* Counter Demo */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h2 className="text-xl font-bold mb-4">Counter</h2>

               <Counter
                  initialCount={0}
                  step={1}
                  render={({ count, increment, decrement, reset }) => (
                     <div>
                        <p className="mb-4 text-gray-600 dark:text-gray-400">
                           Component này quản lý state counter và chia sẻ các hàm thông qua render prop.
                        </p>

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
                     </div>
                  )}
               />
            </div>

            {/* Form Demo */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h2 className="text-xl font-bold mb-4">Form</h2>

               <Form
                  initialValues={{ name: "", email: "" }}
                  onSubmit={(values) => {
                     console.log("Form submitted:", values);
                     alert(`Form đã được gửi với giá trị: ${JSON.stringify(values)}`);
                  }}
                  render={({
                     values,
                     errors,
                     touched,
                     isSubmitting,
                     handleChange,
                     handleBlur,
                     handleSubmit,
                  }) => (
                     <div>
                        <p className="mb-4 text-gray-600 dark:text-gray-400">
                           Component này quản lý state form và validation, chia sẻ thông qua render prop.
                        </p>

                        <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-lg">
                           <form onSubmit={handleSubmit} className="space-y-4">
                              <div>
                                 <label htmlFor="name" className="block mb-1 font-medium">
                                    Tên:
                                 </label>
                                 <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 ${touched.name && errors.name ? "border-red-500" : ""
                                       }`}
                                 />
                                 {touched.name && errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                 )}
                              </div>

                              <div>
                                 <label htmlFor="email" className="block mb-1 font-medium">
                                    Email:
                                 </label>
                                 <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 ${touched.email && errors.email ? "border-red-500" : ""
                                       }`}
                                 />
                                 {touched.email && errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                 )}
                              </div>

                              <div>
                                 <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                                       }`}
                                 >
                                    {isSubmitting ? "Đang gửi..." : "Gửi"}
                                 </button>
                              </div>
                           </form>
                        </div>
                     </div>
                  )}
               />
            </div>

            {/* Fetch Demo */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow md:col-span-2">
               <h2 className="text-xl font-bold mb-4">Fetch Data</h2>

               <div className="mb-4">
                  <p className="mb-2 text-gray-600 dark:text-gray-400">
                     Component này quản lý state fetch data và chia sẻ thông qua render prop.
                  </p>

                  <div className="flex space-x-2 mb-4">
                     <button
                        onClick={() => setUrl("https://api.example.com/users")}
                        className={`px-4 py-2 rounded ${url.includes("users")
                           ? "bg-blue-500 text-white"
                           : "bg-gray-200 dark:bg-gray-700"
                           }`}
                     >
                        Fetch Users
                     </button>

                     <button
                        onClick={() => setUrl("https://api.example.com/posts")}
                        className={`px-4 py-2 rounded ${url.includes("posts")
                           ? "bg-blue-500 text-white"
                           : "bg-gray-200 dark:bg-gray-700"
                           }`}
                     >
                        Fetch Posts
                     </button>

                     <button
                        onClick={() => setUrl("https://api.example.com/unknown")}
                        className={`px-4 py-2 rounded ${url.includes("unknown")
                           ? "bg-blue-500 text-white"
                           : "bg-gray-200 dark:bg-gray-700"
                           }`}
                     >
                        Fetch Unknown
                     </button>
                  </div>
               </div>

               <Fetch
                  url={url}
                  render={({ data, loading, error }) => (
                     <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-lg">
                        {/* Loading State */}
                        {loading && (
                           <div className="flex justify-center items-center py-8">
                              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                              <span className="ml-2">Đang tải...</span>
                           </div>
                        )}

                        {/* Error State */}
                        {error && (
                           <div className="bg-red-100 dark:bg-red-900 p-4 rounded mb-4">
                              <p className="text-red-800 dark:text-red-200">{error}</p>
                           </div>
                        )}

                        {/* Data State */}
                        {!loading && !error && data && (
                           <div>
                              <h3 className="font-bold mb-4">Dữ liệu từ: {url}</h3>

                              {Array.isArray(data) ? (
                                 <div className="space-y-4">
                                    {data.map((item) => (
                                       <div
                                          key={item.id}
                                          className="bg-white dark:bg-gray-800 p-4 rounded shadow"
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
                                    ))}
                                 </div>
                              ) : (
                                 <pre className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                                    {JSON.stringify(data, null, 2)}
                                 </pre>
                              )}
                           </div>
                        )}
                     </div>
                  )}
               />
            </div>
         </div>

         {/* Code Example */}
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Ví Dụ Code</h2>

            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded overflow-auto">
               <pre className="text-sm">
                  {`// Render Props Pattern
import React, { useState, useEffect } from 'react';

// Mouse tracker component sử dụng render props
function MouseTracker({ render }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Cập nhật vị trí chuột
  const handleMouseMove = (event) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY
    });
  };
  
  // Thêm event listener khi component mount
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    
    // Cleanup khi component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Gọi render prop với dữ liệu
  return render(mousePosition);
}

// Sử dụng MouseTracker
function App() {
  return (
    <div>
      <h1>Mouse Tracker Demo</h1>
      
      <MouseTracker
        render={({ x, y }) => (
          <div>
            <p>Vị trí chuột hiện tại: ({x}, {y})</p>
            <div
              style={{
                position: 'absolute',
                left: x,
                top: y,
                width: '10px',
                height: '10px',
                background: 'red',
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
          </div>
        )}
      />
    </div>
  );
}

// Cách viết khác sử dụng children prop
function MouseTracker2({ children }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // ... code giống như trên ...
  
  // Gọi children prop với dữ liệu
  return children(mousePosition);
}

// Sử dụng MouseTracker2
function App2() {
  return (
    <div>
      <h1>Mouse Tracker Demo</h1>
      
      <MouseTracker2>
        {({ x, y }) => (
          <div>
            <p>Vị trí chuột hiện tại: ({x}, {y})</p>
            {/* ... */}
          </div>
        )}
      </MouseTracker2>
    </div>
  );
}`}
               </pre>
            </div>
         </div>
      </div>
   );
};

export default RenderPropsDemo;
