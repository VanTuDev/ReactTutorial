import React, { useState, useEffect, useRef, useCallback } from "react";

const InfiniteScrollDemo = () => {
   // State cho danh sách bài viết
   const [posts, setPosts] = useState([]);

   // State cho trạng thái loading
   const [loading, setLoading] = useState(false);

   // State cho trang hiện tại
   const [page, setPage] = useState(1);

   // State cho việc có thêm dữ liệu để tải hay không
   const [hasMore, setHasMore] = useState(true);

   // State cho lỗi
   const [error, setError] = useState(null);

   // State cho loại infinite scroll
   const [scrollType, setScrollType] = useState("scroll"); // "scroll" hoặc "button"

   // State cho kích thước trang
   const [pageSize, setPageSize] = useState(10);

   // Ref cho phần tử loading
   const observer = useRef();

   // Dữ liệu mẫu cho bài viết
   const generateMockPosts = (page, limit) => {
      const startId = (page - 1) * limit + 1;
      const endId = startId + limit - 1;
      const posts = [];

      for (let i = startId; i <= endId; i++) {
         posts.push({
            id: i,
            title: `Bài viết ${i}`,
            body: `Đây là nội dung của bài viết ${i}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
            author: `Tác giả ${i % 5 + 1}`,
            date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
            image: `https://placehold.co/600x400?text=Post+${i}`
         });
      }

      return posts;
   };

   // Hàm tải dữ liệu
   const fetchPosts = useCallback(async () => {
      try {
         setLoading(true);
         setError(null);

         // Mô phỏng API call
         await new Promise(resolve => setTimeout(resolve, 1000));

         // Giới hạn tổng số trang là 5 để demo
         if (page > 5) {
            setHasMore(false);
            setLoading(false);
            return;
         }

         const newPosts = generateMockPosts(page, pageSize);

         setPosts(prevPosts => [...prevPosts, ...newPosts]);
         setPage(prevPage => prevPage + 1);
         setLoading(false);
      } catch (error) {
         setError("Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại.");
         setLoading(false);
      }
   }, [page, pageSize]);

   // Hàm xử lý khi phần tử loading hiển thị trong viewport
   const lastPostElementRef = useCallback(node => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
         if (entries[0].isIntersecting && hasMore && scrollType === "scroll") {
            fetchPosts();
         }
      });

      if (node) observer.current.observe(node);
   }, [loading, hasMore, fetchPosts, scrollType]);

   // Tải dữ liệu ban đầu
   useEffect(() => {
      setPosts([]);
      setPage(1);
      setHasMore(true);
      fetchPosts();
   }, [pageSize, scrollType]); // eslint-disable-line react-hooks/exhaustive-deps

   // Xử lý đặt lại dữ liệu
   const handleReset = () => {
      setPosts([]);
      setPage(1);
      setHasMore(true);
      fetchPosts();
   };

   // Xử lý thay đổi loại infinite scroll
   const handleScrollTypeChange = (type) => {
      setScrollType(type);
   };

   // Xử lý thay đổi kích thước trang
   const handlePageSizeChange = (e) => {
      setPageSize(Number(e.target.value));
   };

   return (
      <div className="space-y-6">
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Demo Cuộn Vô Hạn</h1>
            <p className="mb-6">
               Demo này minh họa cách triển khai tính năng cuộn vô hạn (infinite scroll) trong React,
               cho phép tải thêm dữ liệu khi người dùng cuộn đến cuối trang hoặc nhấp vào nút "Tải thêm".
            </p>

            {/* Giải thích code */}
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-6">
               <h3 className="font-bold mb-2">Cách Hoạt Động:</h3>
               <ul className="list-disc pl-5 space-y-2">
                  <li>Sử dụng Intersection Observer API để phát hiện khi người dùng cuộn đến cuối danh sách</li>
                  <li>Tải thêm dữ liệu khi người dùng cuộn đến phần tử cuối cùng hoặc nhấp vào nút "Tải thêm"</li>
                  <li>Hiển thị trạng thái loading để người dùng biết rằng dữ liệu đang được tải</li>
                  <li>Theo dõi xem có còn dữ liệu để tải hay không</li>
                  <li>Xử lý lỗi khi tải dữ liệu</li>
               </ul>
            </div>
         </div>

         {/* Controls */}
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Tùy Chọn</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div>
                  <h3 className="font-medium mb-2">Loại Cuộn:</h3>
                  <div className="flex space-x-4">
                     <label className="flex items-center">
                        <input
                           type="radio"
                           name="scrollType"
                           value="scroll"
                           checked={scrollType === "scroll"}
                           onChange={() => handleScrollTypeChange("scroll")}
                           className="mr-2"
                        />
                        Tự động khi cuộn
                     </label>
                     <label className="flex items-center">
                        <input
                           type="radio"
                           name="scrollType"
                           value="button"
                           checked={scrollType === "button"}
                           onChange={() => handleScrollTypeChange("button")}
                           className="mr-2"
                        />
                        Nút "Tải thêm"
                     </label>
                  </div>
               </div>

               <div>
                  <h3 className="font-medium mb-2">Số lượng mỗi trang:</h3>
                  <select
                     value={pageSize}
                     onChange={handlePageSizeChange}
                     className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  >
                     <option value={5}>5 bài viết</option>
                     <option value={10}>10 bài viết</option>
                     <option value={15}>15 bài viết</option>
                  </select>
               </div>

               <div>
                  <h3 className="font-medium mb-2">Điều khiển:</h3>
                  <button
                     onClick={handleReset}
                     className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                     Đặt lại
                  </button>
               </div>
            </div>
         </div>

         {/* Posts List */}
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Danh Sách Bài Viết</h2>

            <div className="space-y-4">
               {posts.map((post, index) => {
                  // Nếu là phần tử cuối cùng và đang sử dụng kiểu cuộn, thêm ref
                  if (posts.length === index + 1) {
                     return (
                        <div
                           ref={scrollType === "scroll" ? lastPostElementRef : null}
                           key={post.id}
                           className="bg-gray-50 dark:bg-gray-900 p-4 rounded"
                        >
                           <div className="flex flex-col md:flex-row">
                              <div className="md:w-1/3 mb-4 md:mb-0 md:pr-4">
                                 <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-48 object-cover rounded"
                                 />
                              </div>
                              <div className="md:w-2/3">
                                 <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                                 <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                    Đăng bởi {post.author} vào {post.date}
                                 </p>
                                 <p className="mb-2">{post.body}</p>
                                 <a
                                    href="#"
                                    className="text-blue-500 hover:underline"
                                    onClick={(e) => e.preventDefault()}
                                 >
                                    Đọc thêm
                                 </a>
                              </div>
                           </div>
                        </div>
                     );
                  } else {
                     return (
                        <div
                           key={post.id}
                           className="bg-gray-50 dark:bg-gray-900 p-4 rounded"
                        >
                           <div className="flex flex-col md:flex-row">
                              <div className="md:w-1/3 mb-4 md:mb-0 md:pr-4">
                                 <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-48 object-cover rounded"
                                 />
                              </div>
                              <div className="md:w-2/3">
                                 <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                                 <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                    Đăng bởi {post.author} vào {post.date}
                                 </p>
                                 <p className="mb-2">{post.body}</p>
                                 <a
                                    href="#"
                                    className="text-blue-500 hover:underline"
                                    onClick={(e) => e.preventDefault()}
                                 >
                                    Đọc thêm
                                 </a>
                              </div>
                           </div>
                        </div>
                     );
                  }
               })}

               {/* Loading indicator */}
               {loading && (
                  <div className="flex justify-center items-center py-4">
                     <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                     <span className="ml-2">Đang tải...</span>
                  </div>
               )}

               {/* Error message */}
               {error && (
                  <div className="bg-red-100 dark:bg-red-900 p-4 rounded text-red-800 dark:text-red-200">
                     <p>{error}</p>
                     <button
                        onClick={fetchPosts}
                        className="mt-2 px-4 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                     >
                        Thử lại
                     </button>
                  </div>
               )}

               {/* End of content message */}
               {!loading && !hasMore && posts.length > 0 && (
                  <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                     <p>Đã tải tất cả bài viết.</p>
                  </div>
               )}

               {/* Load more button */}
               {scrollType === "button" && hasMore && !loading && (
                  <div className="text-center py-4">
                     <button
                        onClick={fetchPosts}
                        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                     >
                        Tải thêm
                     </button>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default InfiniteScrollDemo;
