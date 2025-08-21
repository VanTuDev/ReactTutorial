import React, { useState, useEffect, useCallback } from "react";

const DebouncedSearchDemo = () => {
   // State cho từ khóa tìm kiếm
   const [searchTerm, setSearchTerm] = useState("");

   // State cho từ khóa đã debounced
   const [debouncedTerm, setDebouncedTerm] = useState("");

   // State cho kết quả tìm kiếm
   const [results, setResults] = useState([]);

   // State cho trạng thái loading
   const [isLoading, setIsLoading] = useState(false);

   // State cho lỗi
   const [error, setError] = useState(null);

   // State cho lịch sử tìm kiếm
   const [searchHistory, setSearchHistory] = useState([]);

   // State cho thời gian debounce (ms)
   const [debounceTime, setDebounceTime] = useState(500);

   // Hàm tìm kiếm mô phỏng API
   const searchAPI = useCallback((term) => {
      // Reset error
      setError(null);

      // Nếu term rỗng, reset kết quả và return
      if (!term.trim()) {
         setResults([]);
         return Promise.resolve([]);
      }

      // Mô phỏng API call
      return new Promise((resolve, reject) => {
         setIsLoading(true);

         // Mô phỏng độ trễ mạng
         setTimeout(() => {
            // Mô phỏng dữ liệu
            const mockData = [
               { id: 1, name: "iPhone 15", category: "Điện thoại" },
               { id: 2, name: "iPhone 14", category: "Điện thoại" },
               { id: 3, name: "iPhone 13", category: "Điện thoại" },
               { id: 4, name: "iPad Pro", category: "Máy tính bảng" },
               { id: 5, name: "iPad Air", category: "Máy tính bảng" },
               { id: 6, name: "MacBook Pro", category: "Laptop" },
               { id: 7, name: "MacBook Air", category: "Laptop" },
               { id: 8, name: "iMac", category: "Máy tính để bàn" },
               { id: 9, name: "Mac Mini", category: "Máy tính để bàn" },
               { id: 10, name: "AirPods Pro", category: "Tai nghe" },
               { id: 11, name: "AirPods Max", category: "Tai nghe" },
               { id: 12, name: "Apple Watch", category: "Đồng hồ thông minh" },
               { id: 13, name: "Samsung Galaxy S23", category: "Điện thoại" },
               { id: 14, name: "Samsung Galaxy Tab", category: "Máy tính bảng" },
               { id: 15, name: "Dell XPS", category: "Laptop" },
               { id: 16, name: "HP Spectre", category: "Laptop" },
               { id: 17, name: "Lenovo ThinkPad", category: "Laptop" },
               { id: 18, name: "Sony WH-1000XM5", category: "Tai nghe" },
               { id: 19, name: "Bose QuietComfort", category: "Tai nghe" },
               { id: 20, name: "Google Pixel", category: "Điện thoại" },
            ];

            // Mô phỏng lỗi ngẫu nhiên (10% khả năng)
            const shouldError = Math.random() < 0.1;

            if (shouldError) {
               setIsLoading(false);
               setError("Đã xảy ra lỗi khi tìm kiếm. Vui lòng thử lại.");
               reject("Lỗi mạng mô phỏng");
            } else {
               // Lọc kết quả dựa trên term
               const filteredResults = mockData.filter(item =>
                  item.name.toLowerCase().includes(term.toLowerCase()) ||
                  item.category.toLowerCase().includes(term.toLowerCase())
               );

               setIsLoading(false);
               setResults(filteredResults);
               resolve(filteredResults);

               // Thêm vào lịch sử tìm kiếm nếu có kết quả
               if (filteredResults.length > 0 && term.trim() !== "") {
                  setSearchHistory(prev => {
                     // Loại bỏ trùng lặp
                     if (!prev.includes(term)) {
                        return [term, ...prev].slice(0, 5); // Giữ tối đa 5 lịch sử
                     }
                     return prev;
                  });
               }
            }
         }, 500); // Mô phỏng độ trễ 500ms
      });
   }, []);

   // Effect cho debounce
   useEffect(() => {
      // Đặt timeout để debounce
      const timeoutId = setTimeout(() => {
         setDebouncedTerm(searchTerm);
      }, debounceTime);

      // Cleanup function để clear timeout nếu searchTerm thay đổi
      return () => {
         clearTimeout(timeoutId);
      };
   }, [searchTerm, debounceTime]);

   // Effect cho việc tìm kiếm khi debouncedTerm thay đổi
   useEffect(() => {
      if (debouncedTerm) {
         searchAPI(debouncedTerm).catch(err => {
            console.error("Search error:", err);
         });
      }
   }, [debouncedTerm, searchAPI]);

   // Xử lý thay đổi input
   const handleInputChange = (e) => {
      setSearchTerm(e.target.value);
   };

   // Xử lý click vào lịch sử tìm kiếm
   const handleHistoryClick = (term) => {
      setSearchTerm(term);
   };

   // Xử lý thay đổi thời gian debounce
   const handleDebounceTimeChange = (e) => {
      setDebounceTime(Number(e.target.value));
   };

   return (
      <div className="space-y-6">
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Demo Tìm Kiếm Debounced</h1>
            <p className="mb-6">
               Demo này minh họa cách sử dụng kỹ thuật debouncing trong React để tối ưu hóa các thao tác tìm kiếm,
               giảm số lượng request gửi đến server khi người dùng nhập liệu.
            </p>

            {/* Giải thích code */}
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-6">
               <h3 className="font-bold mb-2">Cách Hoạt Động:</h3>
               <ul className="list-disc pl-5 space-y-2">
                  <li>Khi người dùng nhập vào ô tìm kiếm, React cập nhật state <code>searchTerm</code></li>
                  <li>Thay vì gửi request ngay lập tức, chúng ta đợi một khoảng thời gian (debounce time)</li>
                  <li>Nếu người dùng tiếp tục nhập trong khoảng thời gian đó, timeout được reset</li>
                  <li>Chỉ khi người dùng ngừng nhập trong khoảng thời gian debounce, request mới được gửi</li>
                  <li>Điều này giúp giảm tải cho server và tạo trải nghiệm mượt mà hơn cho người dùng</li>
               </ul>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search Panel */}
            <div className="md:col-span-1 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h2 className="text-xl font-bold mb-4">Tìm Kiếm</h2>

               {/* Search Input */}
               <div className="mb-4">
                  <label htmlFor="search" className="block mb-1 font-medium">
                     Tìm kiếm sản phẩm:
                  </label>
                  <input
                     type="text"
                     id="search"
                     value={searchTerm}
                     onChange={handleInputChange}
                     placeholder="Nhập từ khóa..."
                     className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                     Đang tìm kiếm sau: {debounceTime}ms
                  </p>
               </div>

               {/* Debounce Time Control */}
               <div className="mb-6">
                  <label htmlFor="debounceTime" className="block mb-1 font-medium">
                     Thời gian debounce (ms):
                  </label>
                  <input
                     type="range"
                     id="debounceTime"
                     min="100"
                     max="2000"
                     step="100"
                     value={debounceTime}
                     onChange={handleDebounceTimeChange}
                     className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                     <span>100ms</span>
                     <span>1000ms</span>
                     <span>2000ms</span>
                  </div>
               </div>

               {/* Search History */}
               {searchHistory.length > 0 && (
                  <div>
                     <h3 className="font-medium mb-2">Lịch sử tìm kiếm:</h3>
                     <div className="flex flex-wrap gap-2">
                        {searchHistory.map((term, index) => (
                           <button
                              key={index}
                              onClick={() => handleHistoryClick(term)}
                              className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
                           >
                              {term}
                           </button>
                        ))}
                     </div>
                  </div>
               )}
            </div>

            {/* Results */}
            <div className="md:col-span-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h2 className="text-xl font-bold mb-4">Kết Quả Tìm Kiếm</h2>

               {/* Loading State */}
               {isLoading && (
                  <div className="flex justify-center items-center py-8">
                     <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                     <span className="ml-2">Đang tìm kiếm...</span>
                  </div>
               )}

               {/* Error State */}
               {error && (
                  <div className="bg-red-100 dark:bg-red-900 p-4 rounded mb-4">
                     <p className="text-red-800 dark:text-red-200">{error}</p>
                     <button
                        onClick={() => searchAPI(debouncedTerm)}
                        className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                     >
                        Thử lại
                     </button>
                  </div>
               )}

               {/* Results List */}
               {!isLoading && !error && (
                  <>
                     {searchTerm && (
                        <p className="mb-4">
                           {results.length > 0
                              ? `Tìm thấy ${results.length} kết quả cho "${debouncedTerm}"`
                              : `Không tìm thấy kết quả nào cho "${debouncedTerm}"`}
                        </p>
                     )}

                     {results.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           {results.map(item => (
                              <div
                                 key={item.id}
                                 className="p-3 border rounded bg-gray-50 dark:bg-gray-900 hover:shadow-md transition-shadow"
                              >
                                 <h3 className="font-bold">{item.name}</h3>
                                 <p className="text-gray-600 dark:text-gray-400">{item.category}</p>
                              </div>
                           ))}
                        </div>
                     ) : (
                        searchTerm && !isLoading && (
                           <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                              <p>Không tìm thấy sản phẩm nào phù hợp.</p>
                              <p>Hãy thử với từ khóa khác.</p>
                           </div>
                        )
                     )}

                     {!searchTerm && (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                           <p>Nhập từ khóa vào ô tìm kiếm để bắt đầu.</p>
                        </div>
                     )}
                  </>
               )}
            </div>
         </div>
      </div>
   );
};

export default DebouncedSearchDemo;
