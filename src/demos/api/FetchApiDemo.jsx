import React, { useState, useEffect } from "react";

const FetchApiDemo = () => {
   // State cho dữ liệu
   const [data, setData] = useState([]);

   // State cho trạng thái loading
   const [loading, setLoading] = useState(false);

   // State cho lỗi
   const [error, setError] = useState(null);

   // State cho phương thức HTTP
   const [method, setMethod] = useState("GET");

   // State cho URL API
   const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/posts");

   // State cho dữ liệu gửi đi
   const [requestBody, setRequestBody] = useState(
      JSON.stringify(
         {
            title: "foo",
            body: "bar",
            userId: 1
         },
         null,
         2
      )
   );

   // State cho kết quả
   const [result, setResult] = useState(null);

   // State cho việc hiển thị kết quả dưới dạng JSON hoặc bảng
   const [viewMode, setViewMode] = useState("json");

   // Danh sách các endpoint mẫu
   const sampleEndpoints = [
      { name: "Bài viết", url: "https://jsonplaceholder.typicode.com/posts" },
      { name: "Bình luận", url: "https://jsonplaceholder.typicode.com/comments" },
      { name: "Album", url: "https://jsonplaceholder.typicode.com/albums" },
      { name: "Ảnh", url: "https://jsonplaceholder.typicode.com/photos" },
      { name: "Người dùng", url: "https://jsonplaceholder.typicode.com/users" },
   ];

   // Xử lý thay đổi endpoint
   const handleEndpointChange = (selectedUrl) => {
      setUrl(selectedUrl);
   };

   // Xử lý thay đổi phương thức
   const handleMethodChange = (e) => {
      setMethod(e.target.value);
   };

   // Xử lý thay đổi URL
   const handleUrlChange = (e) => {
      setUrl(e.target.value);
   };

   // Xử lý thay đổi body
   const handleBodyChange = (e) => {
      setRequestBody(e.target.value);
   };

   // Xử lý gửi request
   const handleSubmit = async (e) => {
      e.preventDefault();

      setLoading(true);
      setError(null);
      setResult(null);

      try {
         // Tạo options cho fetch
         const options = {
            method,
            headers: {
               "Content-Type": "application/json"
            }
         };

         // Thêm body nếu không phải GET
         if (method !== "GET") {
            try {
               options.body = requestBody;
            } catch (err) {
               throw new Error("Dữ liệu JSON không hợp lệ");
            }
         }

         // Thực hiện fetch
         const response = await fetch(url, options);

         // Kiểm tra response
         if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
         }

         // Parse JSON
         const result = await response.json();

         // Lưu kết quả
         setResult(result);
         setData(Array.isArray(result) ? result : [result]);
      } catch (err) {
         setError(err.message);
      } finally {
         setLoading(false);
      }
   };

   // Tự động fetch khi component mount
   useEffect(() => {
      handleSubmit({ preventDefault: () => { } });
   }, []); // eslint-disable-line react-hooks/exhaustive-deps

   return (
      <div className="space-y-6">
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Demo Fetch API</h1>
            <p className="mb-6">
               Demo này minh họa cách sử dụng Fetch API trong React để thực hiện các yêu cầu HTTP
               và xử lý dữ liệu trả về từ server.
            </p>

            {/* Giải thích code */}
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-6">
               <h3 className="font-bold mb-2">Cách Hoạt Động:</h3>
               <ul className="list-disc pl-5 space-y-2">
                  <li>Sử dụng Fetch API để gửi các yêu cầu HTTP đến server</li>
                  <li>Hỗ trợ các phương thức HTTP phổ biến: GET, POST, PUT, DELETE</li>
                  <li>Xử lý các trạng thái loading và lỗi</li>
                  <li>Hiển thị dữ liệu trả về dưới dạng JSON hoặc bảng</li>
                  <li>Cho phép tùy chỉnh URL và body của request</li>
               </ul>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Request Panel */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h2 className="text-xl font-bold mb-4">Yêu Cầu HTTP</h2>

               <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Sample Endpoints */}
                  <div>
                     <label className="block mb-1 font-medium">
                        Endpoint mẫu:
                     </label>
                     <div className="flex flex-wrap gap-2">
                        {sampleEndpoints.map((endpoint, index) => (
                           <button
                              key={index}
                              type="button"
                              onClick={() => handleEndpointChange(endpoint.url)}
                              className={`px-2 py-1 text-sm rounded ${url === endpoint.url
                                 ? "bg-blue-500 text-white"
                                 : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                                 }`}
                           >
                              {endpoint.name}
                           </button>
                        ))}
                     </div>
                  </div>

                  {/* HTTP Method */}
                  <div>
                     <label className="block mb-1 font-medium">
                        Phương thức:
                     </label>
                     <div className="flex space-x-2">
                        {["GET", "POST", "PUT", "DELETE"].map((httpMethod) => (
                           <label key={httpMethod} className="flex items-center">
                              <input
                                 type="radio"
                                 name="method"
                                 value={httpMethod}
                                 checked={method === httpMethod}
                                 onChange={handleMethodChange}
                                 className="mr-1"
                              />
                              {httpMethod}
                           </label>
                        ))}
                     </div>
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

                  {/* Request Body */}
                  {method !== "GET" && (
                     <div>
                        <label htmlFor="body" className="block mb-1 font-medium">
                           Body (JSON):
                        </label>
                        <textarea
                           id="body"
                           value={requestBody}
                           onChange={handleBodyChange}
                           rows="6"
                           className="w-full p-2 border rounded font-mono text-sm dark:bg-gray-700 dark:border-gray-600"
                        ></textarea>
                     </div>
                  )}

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
            </div>

            {/* Response Panel */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Phản Hồi</h2>

                  {/* View Mode Toggle */}
                  {result && (
                     <div className="flex space-x-2">
                        <button
                           onClick={() => setViewMode("json")}
                           className={`px-3 py-1 text-sm rounded ${viewMode === "json"
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                              }`}
                        >
                           JSON
                        </button>
                        <button
                           onClick={() => setViewMode("table")}
                           className={`px-3 py-1 text-sm rounded ${viewMode === "table"
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                              }`}
                        >
                           Bảng
                        </button>
                     </div>
                  )}
               </div>

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

               {/* Result - JSON View */}
               {result && viewMode === "json" && (
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded overflow-auto max-h-96">
                     <pre className="text-sm whitespace-pre-wrap">
                        {JSON.stringify(result, null, 2)}
                     </pre>
                  </div>
               )}

               {/* Result - Table View */}
               {result && viewMode === "table" && data.length > 0 && (
                  <div className="overflow-x-auto max-h-96">
                     <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                           <tr>
                              {Object.keys(data[0]).map((key) => (
                                 <th
                                    key={key}
                                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                 >
                                    {key}
                                 </th>
                              ))}
                           </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                           {data.map((item, index) => (
                              <tr key={index}>
                                 {Object.keys(data[0]).map((key) => (
                                    <td
                                       key={key}
                                       className="px-4 py-2 whitespace-nowrap text-sm"
                                    >
                                       {typeof item[key] === "object"
                                          ? JSON.stringify(item[key])
                                          : String(item[key])}
                                    </td>
                                 ))}
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               )}

               {/* No Result */}
               {!loading && !error && !result && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                     <p>Chưa có dữ liệu. Hãy gửi yêu cầu để xem kết quả.</p>
                  </div>
               )}
            </div>
         </div>

         {/* Code Example */}
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Ví Dụ Code</h2>

            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded overflow-auto">
               <pre className="text-sm">
                  {`// Sử dụng Fetch API với async/await
const fetchData = async () => {
  try {
    // Bắt đầu loading
    setLoading(true);
    
    // Tạo options cho fetch
    const options = {
      method: "${method}",
      headers: {
        "Content-Type": "application/json"
      }
    };
    
    // Thêm body nếu không phải GET
    ${method !== "GET" ? `options.body = JSON.stringify(${requestBody});` : "// Không cần body cho GET request"}
    
    // Thực hiện fetch
    const response = await fetch("${url}", options);
    
    // Kiểm tra response
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    // Parse JSON
    const data = await response.json();
    
    // Xử lý dữ liệu
    console.log(data);
    
  } catch (error) {
    // Xử lý lỗi
    console.error("Có lỗi xảy ra:", error);
  } finally {
    // Kết thúc loading
    setLoading(false);
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

export default FetchApiDemo;
