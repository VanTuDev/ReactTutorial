import React, { useState } from "react";

const ReactQueryDemo = () => {
   // State cho dữ liệu bài viết
   const [posts, setPosts] = useState([]);

   // State cho bài viết đang chọn
   const [selectedPost, setSelectedPost] = useState(null);

   // State cho bình luận của bài viết đang chọn
   const [comments, setComments] = useState([]);

   // State cho trạng thái loading
   const [loadingPosts, setLoadingPosts] = useState(false);
   const [loadingComments, setLoadingComments] = useState(false);

   // State cho lỗi
   const [postsError, setPostsError] = useState(null);
   const [commentsError, setCommentsError] = useState(null);

   // State cho việc làm mới dữ liệu
   const [isRefreshing, setIsRefreshing] = useState(false);

   // State cho việc tạo bài viết mới
   const [newPost, setNewPost] = useState({ title: "", body: "" });
   const [isCreating, setIsCreating] = useState(false);
   const [createError, setCreateError] = useState(null);

   // Mô phỏng React Query hooks

   // useQuery để lấy danh sách bài viết
   const fetchPosts = async () => {
      setLoadingPosts(true);
      setPostsError(null);

      try {
         // Mô phỏng API call
         const response = await fetch("https://jsonplaceholder.typicode.com/posts");

         if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
         }

         const data = await response.json();

         // Giới hạn số lượng bài viết để demo
         setPosts(data.slice(0, 10));
      } catch (error) {
         setPostsError(error.message);
      } finally {
         setLoadingPosts(false);
         setIsRefreshing(false);
      }
   };

   // useQuery để lấy bình luận của bài viết
   const fetchComments = async (postId) => {
      if (!postId) return;

      setLoadingComments(true);
      setCommentsError(null);

      try {
         // Mô phỏng API call
         const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);

         if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
         }

         const data = await response.json();

         setComments(data);
      } catch (error) {
         setCommentsError(error.message);
      } finally {
         setLoadingComments(false);
      }
   };

   // useMutation để tạo bài viết mới
   const createPost = async () => {
      setIsCreating(true);
      setCreateError(null);

      try {
         // Mô phỏng API call
         const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               title: newPost.title,
               body: newPost.body,
               userId: 1,
            }),
         });

         if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
         }

         const data = await response.json();

         // Thêm bài viết mới vào danh sách (mô phỏng invalidateQueries)
         setPosts([{ ...data, id: Date.now() }, ...posts]);

         // Reset form
         setNewPost({ title: "", body: "" });
      } catch (error) {
         setCreateError(error.message);
      } finally {
         setIsCreating(false);
      }
   };

   // Xử lý chọn bài viết
   const handleSelectPost = (post) => {
      setSelectedPost(post);
      fetchComments(post.id);
   };

   // Xử lý làm mới dữ liệu
   const handleRefresh = () => {
      setIsRefreshing(true);
      fetchPosts();
   };

   // Xử lý thay đổi form tạo bài viết
   const handleNewPostChange = (e) => {
      const { name, value } = e.target;
      setNewPost({
         ...newPost,
         [name]: value,
      });
   };

   // Xử lý gửi form tạo bài viết
   const handleCreatePost = (e) => {
      e.preventDefault();
      createPost();
   };

   return (
      <div className="space-y-6">
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Demo React Query</h1>
            <p className="mb-6">
               Demo này minh họa cách sử dụng React Query để quản lý trạng thái server và
               thực hiện các thao tác như fetching, caching, synchronizing và updating dữ liệu.
               (Đây là mô phỏng của React Query, không phải triển khai thực tế)
            </p>

            {/* Giải thích code */}
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-6">
               <h3 className="font-bold mb-2">Cách React Query Hoạt Động:</h3>
               <ul className="list-disc pl-5 space-y-2">
                  <li>Tự động caching dữ liệu và quản lý trạng thái server</li>
                  <li>Tự động làm mới dữ liệu khi cần (stale-while-revalidate)</li>
                  <li>Quản lý trạng thái loading và lỗi một cách đơn giản</li>
                  <li>Hỗ trợ pagination, infinite scroll và prefetching</li>
                  <li>Tối ưu hóa hiệu suất với deduplication và retry logic</li>
               </ul>
            </div>

            {/* Load Data Button */}
            {posts.length === 0 && !loadingPosts && !postsError && (
               <div className="text-center">
                  <button
                     onClick={fetchPosts}
                     className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                     Tải Dữ Liệu
                  </button>
               </div>
            )}
         </div>

         {/* Main Content */}
         {(posts.length > 0 || loadingPosts || postsError) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {/* Posts List */}
               <div className="md:col-span-1 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <div className="flex justify-between items-center mb-4">
                     <h2 className="text-xl font-bold">Bài Viết</h2>
                     <button
                        onClick={handleRefresh}
                        disabled={loadingPosts || isRefreshing}
                        className={`p-2 rounded-full ${isRefreshing ? "animate-spin" : ""
                           }`}
                     >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                     </button>
                  </div>

                  {/* Loading State */}
                  {loadingPosts && (
                     <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                        <span className="ml-2">Đang tải...</span>
                     </div>
                  )}

                  {/* Error State */}
                  {postsError && (
                     <div className="bg-red-100 dark:bg-red-900 p-4 rounded mb-4">
                        <p className="text-red-800 dark:text-red-200">{postsError}</p>
                        <button
                           onClick={fetchPosts}
                           className="mt-2 px-4 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                        >
                           Thử lại
                        </button>
                     </div>
                  )}

                  {/* Posts List */}
                  {!loadingPosts && !postsError && (
                     <div className="space-y-2 max-h-96 overflow-y-auto">
                        {posts.map(post => (
                           <div
                              key={post.id}
                              onClick={() => handleSelectPost(post)}
                              className={`p-3 rounded cursor-pointer ${selectedPost && selectedPost.id === post.id
                                 ? "bg-blue-100 dark:bg-blue-900"
                                 : "bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700"
                                 }`}
                           >
                              <h3 className="font-medium truncate">{post.title}</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                 {post.body.substring(0, 60)}...
                              </p>
                           </div>
                        ))}
                     </div>
                  )}
               </div>

               {/* Post Details and Comments */}
               <div className="md:col-span-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  {selectedPost ? (
                     <div>
                        <h2 className="text-xl font-bold mb-4">{selectedPost.title}</h2>
                        <p className="mb-6">{selectedPost.body}</p>

                        <div className="border-t dark:border-gray-700 pt-4">
                           <h3 className="font-bold mb-2">Bình luận</h3>

                           {/* Comments Loading */}
                           {loadingComments && (
                              <div className="flex justify-center items-center py-4">
                                 <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                                 <span className="ml-2">Đang tải bình luận...</span>
                              </div>
                           )}

                           {/* Comments Error */}
                           {commentsError && (
                              <div className="bg-red-100 dark:bg-red-900 p-3 rounded mb-4">
                                 <p className="text-red-800 dark:text-red-200 text-sm">{commentsError}</p>
                                 <button
                                    onClick={() => fetchComments(selectedPost.id)}
                                    className="mt-1 px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                                 >
                                    Thử lại
                                 </button>
                              </div>
                           )}

                           {/* Comments List */}
                           {!loadingComments && !commentsError && comments.length > 0 && (
                              <div className="space-y-3">
                                 {comments.map(comment => (
                                    <div key={comment.id} className="bg-gray-50 dark:bg-gray-900 p-3 rounded">
                                       <h4 className="font-medium">{comment.name}</h4>
                                       <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{comment.email}</p>
                                       <p className="text-sm">{comment.body}</p>
                                    </div>
                                 ))}
                              </div>
                           )}

                           {/* No Comments */}
                           {!loadingComments && !commentsError && comments.length === 0 && (
                              <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                                 Không có bình luận nào.
                              </p>
                           )}
                        </div>
                     </div>
                  ) : (
                     <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <p>Chọn một bài viết để xem chi tiết.</p>
                     </div>
                  )}
               </div>
            </div>
         )}

         {/* Create Post Form */}
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Tạo Bài Viết Mới</h2>

            <form onSubmit={handleCreatePost} className="space-y-4">
               <div>
                  <label htmlFor="title" className="block mb-1 font-medium">
                     Tiêu đề:
                  </label>
                  <input
                     type="text"
                     id="title"
                     name="title"
                     value={newPost.title}
                     onChange={handleNewPostChange}
                     className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                     required
                  />
               </div>

               <div>
                  <label htmlFor="body" className="block mb-1 font-medium">
                     Nội dung:
                  </label>
                  <textarea
                     id="body"
                     name="body"
                     value={newPost.body}
                     onChange={handleNewPostChange}
                     rows="4"
                     className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                     required
                  ></textarea>
               </div>

               {/* Create Error */}
               {createError && (
                  <div className="bg-red-100 dark:bg-red-900 p-3 rounded">
                     <p className="text-red-800 dark:text-red-200 text-sm">{createError}</p>
                  </div>
               )}

               <div>
                  <button
                     type="submit"
                     disabled={isCreating}
                     className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ${isCreating ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                  >
                     {isCreating ? "Đang tạo..." : "Tạo bài viết"}
                  </button>
               </div>
            </form>
         </div>

         {/* Code Example */}
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Ví Dụ Code React Query</h2>

            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded overflow-auto">
               <pre className="text-sm">
                  {`// Cài đặt React Query
// npm install @tanstack/react-query

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetch data với useQuery
function Posts() {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json()),
    staleTime: 60000, // 1 phút
  });

  if (isLoading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error.message}</div>;

  return (
    <div>
      <button onClick={() => refetch()}>Làm mới</button>
      <ul>
        {data.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

// Dependent queries
function PostWithComments({ postId }) {
  const { data: post } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetch(\`https://jsonplaceholder.typicode.com/posts/\${postId}\`)
      .then(res => res.json()),
    enabled: !!postId, // Chỉ chạy khi có postId
  });

  const { data: comments } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetch(\`https://jsonplaceholder.typicode.com/posts/\${postId}/comments\`)
      .then(res => res.json()),
    enabled: !!postId, // Chỉ chạy khi có postId
  });

  return (
    <div>
      {post && <h1>{post.title}</h1>}
      {comments && comments.map(comment => (
        <div key={comment.id}>{comment.body}</div>
      ))}
    </div>
  );
}

// Mutations
function CreatePost() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (newPost) => {
      return fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      }).then(res => res.json());
    },
    onSuccess: (data) => {
      // Invalidate và refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      
      // Hoặc cập nhật cache trực tiếp
      queryClient.setQueryData(['posts'], (oldData) => {
        return [data, ...oldData];
      });
    },
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      mutation.mutate({ title: 'Tiêu đề mới', body: 'Nội dung mới', userId: 1 });
    }}>
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Đang tạo...' : 'Tạo bài viết'}
      </button>
    </form>
  );
}`}
               </pre>
            </div>
         </div>
      </div>
   );
};

export default ReactQueryDemo;
