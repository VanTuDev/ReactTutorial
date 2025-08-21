import React, { useState } from "react";

const AxiosErrorDemo = () => {
   // State cho URL
   const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/posts/999");

   // State cho trạng thái loading
   const [loading, setLoading] = useState(false);

   // State cho lỗi
   const [error, setError] = useState(null);

   // State cho dữ liệu
   const [data, setData] = useState(null);

   // State cho loại lỗi mô phỏng
   const [errorType, setErrorType] = useState("404");

   // Danh sách các loại lỗi mô phỏng
   const errorTypes = [
      { value: "404", label: "404 Not Found", url: "https://jsonplaceholder.typicode.com/posts/999" },
      { value: "500", label: "500 Server Error", url: "https://httpstat.us/500" },
      { value: "timeout", label: "Timeout Error", url: "https://httpstat.us/200?sleep=5000" },
      { value: "network", label: "Network Error", url: "https://non-existent-domain-123456.com" },
      { value: "invalid-json", label: "Invalid JSON", url: "https://httpstat.us/200" },
   ];

   // Mô phỏng Axios
   const mockAxios = {
      get: async (url, config = {}) => {
         const controller = new AbortController();
         const { signal } = controller;

         // Thiết lập timeout
         const timeout = config.timeout || 3000;
         const timeoutId = setTimeout(() => controller.abort(), timeout);

         try {
            // Mô phỏng lỗi mạng
            if (url.includes("non-existent-domain")) {
               throw new Error("Network Error");
            }

            // Thực hiện fetch
            const response = await fetch(url, { signal });

            // Xóa timeout
            clearTimeout(timeoutId);

            // Kiểm tra status
            if (!response.ok) {
               throw {
                  response: {
                     status: response.status,
                     statusText: response.statusText,
                     data: await response.text(),
                  },
                  message: `Request failed with status code ${response.status}`,
               };
            }

            // Mô phỏng lỗi JSON không hợp lệ
            if (url === "https://httpstat.us/200") {
               return {
                  data: "This is not valid JSON",
                  status: 200,
                  statusText: "OK",
               };
            }

            // Parse JSON
            const data = await response.json();

            return {
               data,
               status: response.status,
               statusText: response.statusText,
            };
         } catch (error) {
            // Xóa timeout
            clearTimeout(timeoutId);

            // Xử lý lỗi abort (timeout)
            if (error.name === "AbortError") {
               throw {
                  message: "timeout of " + timeout + "ms exceeded",
                  code: "ECONNABORTED",
               };
            }

            // Trả về lỗi
            throw error;
         }
      },
   };

   // Xử lý thay đổi loại lỗi
   const handleErrorTypeChange = (e) => {
      const selectedType = e.target.value;
      setErrorType(selectedType);

      // Cập nhật URL dựa trên loại lỗi
      const selectedError = errorTypes.find(type => type.value === selectedType);
      if (selectedError) {
         setUrl(selectedError.url);
      }
   };

   // Xử lý thay đổi URL
   const handleUrlChange = (e) => {
      setUrl(e.target.value);
   };

   // Xử lý gửi request
   const handleSubmit = async (e) => {
      e.preventDefault();

      setLoading(true);
      setError(null);
      setData(null);

      try {
         // Thực hiện request với mô phỏng Axios
         const response = await mockAxios.get(url, {
            timeout: 3000,
         });

         // Lưu dữ liệu
         setData(response.data);
      } catch (err) {
         // Xử lý các loại lỗi khác nhau
         let errorMessage = "Đã xảy ra lỗi không xác định";
         let errorDetails = null;

         if (err.response) {
            // Lỗi từ server (404, 500, ...)
            errorMessage = `Lỗi ${err.response.status}: ${err.response.statusText}`;
            errorDetails = {
               status: err.response.status,
               statusText: err.response.statusText,
               data: err.response.data,
            };
         } else if (err.code === "ECONNABORTED") {
            // Lỗi timeout
            errorMessage = "Yêu cầu đã hết thời gian chờ";
            errorDetails = {
               code: err.code,
               message: err.message,
            };
         } else if (err.message === "Network Error") {
            // Lỗi mạng
            errorMessage = "Không thể kết nối đến server";
            errorDetails = {
               message: err.message,
            };
         } else {
            // Lỗi khác
            errorMessage = err.message || "Đã xảy ra lỗi không xác định";
            errorDetails = err;
         }

         setError({
            message: errorMessage,
            details: errorDetails,
         });
      } finally {
         setLoading(false);
      }
   };

   // Hiển thị thông tin lỗi
   const renderErrorInfo = () => {
      if (!error) return null;

      return (
         <div className="space-y-4">
            <div className="bg-red-100 dark:bg-red-900 p-4 rounded">
               <h3 className="font-bold text-red-800 dark:text-red-200 mb-2">
                  {error.message}
               </h3>
               {error.details && (
                  <pre className="text-sm whitespace-pre-wrap text-red-700 dark:text-red-300">
                     {JSON.stringify(error.details, null, 2)}
                  </pre>
               )}
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded">
               <h3 className="font-bold mb-2">Cách xử lý lỗi này:</h3>
               {error.details && error.details.status === 404 && (
                  <div>
                     <p className="mb-2">Lỗi 404 (Not Found) xảy ra khi tài nguyên không tồn tại trên server.</p>
                     <p className="mb-2">Cách xử lý:</p>
                     <ul className="list-disc pl-5 space-y-1">
                        <li>Kiểm tra lại URL đảm bảo đúng đường dẫn</li>
                        <li>Xác minh rằng tài nguyên vẫn tồn tại trên server</li>
                        <li>Hiển thị thông báo thân thiện cho người dùng</li>
                        <li>Cung cấp tùy chọn quay lại hoặc thử lại</li>
                     </ul>
                  </div>
               )}

               {error.details && error.details.status === 500 && (
                  <div>
                     <p className="mb-2">Lỗi 500 (Server Error) xảy ra khi server gặp vấn đề nội bộ.</p>
                     <p className="mb-2">Cách xử lý:</p>
                     <ul className="list-disc pl-5 space-y-1">
                        <li>Thử lại sau một khoảng thời gian</li>
                        <li>Thông báo cho đội phát triển về lỗi</li>
                        <li>Ghi log lỗi để phân tích</li>
                        <li>Hiển thị thông báo lỗi thân thiện cho người dùng</li>
                     </ul>
                  </div>
               )}

               {error.details && error.details.code === "ECONNABORTED" && (
                  <div>
                     <p className="mb-2">Lỗi timeout xảy ra khi yêu cầu mất quá nhiều thời gian để hoàn thành.</p>
                     <p className="mb-2">Cách xử lý:</p>
                     <ul className="list-disc pl-5 space-y-1">
                        <li>Tăng thời gian timeout cho các yêu cầu quan trọng</li>
                        <li>Kiểm tra tốc độ mạng và kết nối server</li>
                        <li>Thực hiện retry với backoff strategy</li>
                        <li>Thông báo cho người dùng và cho phép thử lại</li>
                     </ul>
                  </div>
               )}

               {error.details && error.details.message === "Network Error" && (
                  <div>
                     <p className="mb-2">Lỗi mạng xảy ra khi không thể kết nối đến server.</p>
                     <p className="mb-2">Cách xử lý:</p>
                     <ul className="list-disc pl-5 space-y-1">
                        <li>Kiểm tra kết nối internet của người dùng</li>
                        <li>Xác minh rằng API endpoint đúng và đang hoạt động</li>
                        <li>Thực hiện retry tự động</li>
                        <li>Cung cấp chức năng offline nếu có thể</li>
                     </ul>
                  </div>
               )}

               {!error.details || (!error.details.status && !error.details.code && !error.details.message) && (
                  <div>
                     <p className="mb-2">Lỗi không xác định cần được xử lý một cách chung.</p>
                     <p className="mb-2">Cách xử lý:</p>
                     <ul className="list-disc pl-5 space-y-1">
                        <li>Ghi log chi tiết lỗi để phân tích</li>
                        <li>Cung cấp thông báo lỗi chung cho người dùng</li>
                        <li>Thêm thông tin liên hệ hỗ trợ</li>
                        <li>Cho phép người dùng báo cáo lỗi</li>
                     </ul>
                  </div>
               )}
            </div>
         </div>
      );
   };

   return (
      <div className="space-y-6">
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Demo Xử Lý Lỗi Axios</h1>
            <p className="mb-6">
               Demo này minh họa cách xử lý các loại lỗi khác nhau khi sử dụng Axios để gọi API,
               bao gồm lỗi HTTP, lỗi timeout, lỗi mạng và lỗi phân tích dữ liệu.
            </p>

            {/* Giải thích code */}
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-6">
               <h3 className="font-bold mb-2">Cách Hoạt Động:</h3>
               <ul className="list-disc pl-5 space-y-2">
                  <li>Sử dụng try/catch để bắt và xử lý các lỗi từ Axios</li>
                  <li>Phân loại lỗi dựa trên thuộc tính của đối tượng lỗi</li>
                  <li>Hiển thị thông báo lỗi phù hợp cho từng loại lỗi</li>
                  <li>Cung cấp hướng dẫn xử lý cho từng trường hợp lỗi</li>
                  <li>Demo này sử dụng mô phỏng Axios với Fetch API để minh họa các loại lỗi</li>
               </ul>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Request Panel */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h2 className="text-xl font-bold mb-4">Tạo Lỗi</h2>

               <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Error Type */}
                  <div>
                     <label className="block mb-1 font-medium">
                        Loại lỗi:
                     </label>
                     <select
                        value={errorType}
                        onChange={handleErrorTypeChange}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                     >
                        {errorTypes.map(type => (
                           <option key={type.value} value={type.value}>
                              {type.label}
                           </option>
                        ))}
                     </select>
                  </div>

                  {/* URL */}
                  <div>
                     <label htmlFor="url" className="block mb-1 font-medium">
                        URL:
                     </label>
                     <input
                        type="text"
                        id="url"
                        value={url}
                        onChange={handleUrlChange}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                        required
                     />
                  </div>

                  {/* Submit Button */}
                  <div>
                     <button
                        type="submit"
                        disabled={loading}
                        className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${loading ? "opacity-50 cursor-not-allowed" : ""
                           }`}
                     >
                        {loading ? "Đang gửi..." : "Gửi yêu cầu"}
                     </button>
                  </div>
               </form>

               {/* Error Types Explanation */}
               <div className="mt-6 bg-gray-50 dark:bg-gray-900 p-4 rounded">
                  <h3 className="font-bold mb-2">Các loại lỗi:</h3>
                  <ul className="space-y-2 text-sm">
                     <li>
                        <span className="font-medium">404 Not Found:</span> Tài nguyên không tồn tại trên server
                     </li>
                     <li>
                        <span className="font-medium">500 Server Error:</span> Server gặp lỗi nội bộ
                     </li>
                     <li>
                        <span className="font-medium">Timeout Error:</span> Yêu cầu mất quá nhiều thời gian để hoàn thành
                     </li>
                     <li>
                        <span className="font-medium">Network Error:</span> Không thể kết nối đến server
                     </li>
                     <li>
                        <span className="font-medium">Invalid JSON:</span> Server trả về dữ liệu không phải JSON hợp lệ
                     </li>
                  </ul>
               </div>
            </div>

            {/* Response Panel */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h2 className="text-xl font-bold mb-4">Kết Quả</h2>

               {/* Loading State */}
               {loading && (
                  <div className="flex justify-center items-center py-8">
                     <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                     <span className="ml-2">Đang tải...</span>
                  </div>
               )}

               {/* Error State */}
               {error && renderErrorInfo()}

               {/* Success State */}
               {data && !error && (
                  <div className="bg-green-100 dark:bg-green-900 p-4 rounded mb-4">
                     <h3 className="font-bold text-green-800 dark:text-green-200 mb-2">
                        Yêu cầu thành công!
                     </h3>
                     <pre className="text-sm whitespace-pre-wrap text-green-700 dark:text-green-300">
                        {JSON.stringify(data, null, 2)}
                     </pre>
                  </div>
               )}

               {/* No Result */}
               {!loading && !error && !data && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                     <p>Chưa có kết quả. Hãy gửi yêu cầu để xem kết quả.</p>
                  </div>
               )}
            </div>
         </div>

         {/* Code Example */}
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Ví Dụ Code</h2>

            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded overflow-auto">
               <pre className="text-sm">
                  {`// Xử lý lỗi với Axios
import axios from 'axios';

const fetchData = async () => {
  try {
    // Thiết lập timeout và các tùy chọn khác
    const response = await axios.get('${url}', {
      timeout: 3000, // 3 seconds
    });
    
    // Xử lý dữ liệu thành công
    console.log(response.data);
    
  } catch (error) {
    // Xử lý các loại lỗi khác nhau
    if (error.response) {
      // Lỗi từ server (status code không phải 2xx)
      console.error('Lỗi từ server:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      });
      
      // Xử lý dựa trên status code
      switch (error.response.status) {
        case 404:
          console.log('Tài nguyên không tồn tại');
          break;
        case 500:
          console.log('Lỗi server nội bộ');
          break;
        default:
          console.log(\`Lỗi HTTP: \${error.response.status}\`);
      }
    } else if (error.request) {
      // Yêu cầu đã được gửi nhưng không nhận được phản hồi
      console.error('Không nhận được phản hồi:', error.request);
    } else if (error.code === 'ECONNABORTED') {
      // Lỗi timeout
      console.error('Yêu cầu đã hết thời gian chờ:', error.message);
    } else {
      // Lỗi khác
      console.error('Lỗi:', error.message);
    }
  }
};

// Gọi hàm
fetchData();`}
               </pre>
            </div>
         </div>
      </div>
   );
};

export default AxiosErrorDemo;
