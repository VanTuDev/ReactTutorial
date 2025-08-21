import React, { useState } from "react";

const DragDropDemo = () => {
   // Dữ liệu mẫu cho danh sách công việc
   const initialTasks = {
      todo: [
         { id: "task-1", content: "Thiết kế giao diện người dùng", priority: "high" },
         { id: "task-2", content: "Chuẩn bị tài liệu API", priority: "medium" },
         { id: "task-3", content: "Nghiên cứu thư viện mới", priority: "low" },
      ],
      inProgress: [
         { id: "task-4", content: "Phát triển tính năng đăng nhập", priority: "high" },
         { id: "task-5", content: "Tối ưu hóa hiệu suất", priority: "medium" },
      ],
      done: [
         { id: "task-6", content: "Thiết lập môi trường phát triển", priority: "medium" },
         { id: "task-7", content: "Tạo repository GitHub", priority: "low" },
      ],
   };

   // State cho danh sách công việc
   const [tasks, setTasks] = useState(initialTasks);

   // State cho việc kéo thả
   const [dragging, setDragging] = useState(null);

   // Dữ liệu mẫu cho danh sách sắp xếp
   const initialItems = [
      { id: "item-1", content: "Sản phẩm 1", image: "https://placehold.co/100?text=1" },
      { id: "item-2", content: "Sản phẩm 2", image: "https://placehold.co/100?text=2" },
      { id: "item-3", content: "Sản phẩm 3", image: "https://placehold.co/100?text=3" },
      { id: "item-4", content: "Sản phẩm 4", image: "https://placehold.co/100?text=4" },
      { id: "item-5", content: "Sản phẩm 5", image: "https://placehold.co/100?text=5" },
   ];

   // State cho danh sách sắp xếp
   const [items, setItems] = useState(initialItems);

   // State cho vùng thả tệp
   const [files, setFiles] = useState([]);
   const [isDraggingFile, setIsDraggingFile] = useState(false);

   // Xử lý bắt đầu kéo công việc
   const handleDragStart = (e, task, sourceColumn) => {
      e.dataTransfer.setData("taskId", task.id);
      e.dataTransfer.setData("sourceColumn", sourceColumn);
      setDragging({ task, sourceColumn });
   };

   // Xử lý thả công việc
   const handleDrop = (e, targetColumn) => {
      e.preventDefault();

      const taskId = e.dataTransfer.getData("taskId");
      const sourceColumn = e.dataTransfer.getData("sourceColumn");

      // Nếu thả vào cùng cột, không làm gì cả
      if (sourceColumn === targetColumn) {
         return;
      }

      // Tìm công việc trong cột nguồn
      const task = tasks[sourceColumn].find(task => task.id === taskId);

      // Tạo bản sao của state tasks
      const newTasks = { ...tasks };

      // Loại bỏ công việc khỏi cột nguồn
      newTasks[sourceColumn] = newTasks[sourceColumn].filter(task => task.id !== taskId);

      // Thêm công việc vào cột đích
      newTasks[targetColumn] = [...newTasks[targetColumn], task];

      // Cập nhật state
      setTasks(newTasks);
      setDragging(null);
   };

   // Xử lý kéo qua
   const handleDragOver = (e) => {
      e.preventDefault();
   };

   // Xử lý kết thúc kéo
   const handleDragEnd = () => {
      setDragging(null);
   };

   // Xử lý bắt đầu kéo mục
   const handleItemDragStart = (e, index) => {
      e.dataTransfer.setData("itemIndex", index);
   };

   // Xử lý thả mục
   const handleItemDrop = (e, targetIndex) => {
      e.preventDefault();

      const sourceIndex = parseInt(e.dataTransfer.getData("itemIndex"));

      // Nếu thả vào cùng vị trí, không làm gì cả
      if (sourceIndex === targetIndex) {
         return;
      }

      // Tạo bản sao của state items
      const newItems = [...items];

      // Lấy mục được kéo
      const draggedItem = newItems[sourceIndex];

      // Loại bỏ mục khỏi vị trí cũ
      newItems.splice(sourceIndex, 1);

      // Thêm mục vào vị trí mới
      newItems.splice(targetIndex, 0, draggedItem);

      // Cập nhật state
      setItems(newItems);
   };

   // Xử lý kéo tệp vào
   const handleFileDragOver = (e) => {
      e.preventDefault();
      setIsDraggingFile(true);
   };

   // Xử lý kéo tệp ra khỏi vùng
   const handleFileDragLeave = () => {
      setIsDraggingFile(false);
   };

   // Xử lý thả tệp
   const handleFileDrop = (e) => {
      e.preventDefault();
      setIsDraggingFile(false);

      const droppedFiles = Array.from(e.dataTransfer.files);

      // Thêm các tệp mới vào danh sách
      setFiles(prevFiles => [...prevFiles, ...droppedFiles]);
   };

   // Xử lý chọn tệp
   const handleFileSelect = (e) => {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
   };

   // Xử lý xóa tệp
   const handleFileDelete = (index) => {
      setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
   };

   // Lấy màu cho mức độ ưu tiên
   const getPriorityColor = (priority) => {
      switch (priority) {
         case "high":
            return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
         case "medium":
            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
         case "low":
            return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
         default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      }
   };

   return (
      <div className="space-y-6">
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Demo Kéo Thả</h1>
            <p className="mb-6">
               Demo này minh họa cách triển khai các tính năng kéo thả (drag and drop) trong React,
               bao gồm kéo thả giữa các danh sách, sắp xếp lại các mục và tải lên tệp.
            </p>

            {/* Giải thích code */}
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-6">
               <h3 className="font-bold mb-2">Cách Hoạt Động:</h3>
               <ul className="list-disc pl-5 space-y-2">
                  <li>Sử dụng HTML5 Drag and Drop API để xử lý các sự kiện kéo thả</li>
                  <li>Lưu trữ trạng thái kéo trong state để cập nhật giao diện người dùng</li>
                  <li>Sử dụng dataTransfer để truyền dữ liệu giữa các phần tử kéo và thả</li>
                  <li>Xử lý các sự kiện dragStart, dragOver, drop và dragEnd để triển khai logic kéo thả</li>
                  <li>Tùy chỉnh giao diện người dùng để cung cấp phản hồi trực quan khi kéo thả</li>
               </ul>
            </div>
         </div>

         {/* Kanban Board */}
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Bảng Kanban</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
               Kéo và thả các công việc giữa các cột để thay đổi trạng thái của chúng.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {/* Todo Column */}
               <div
                  className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, "todo")}
               >
                  <h3 className="font-bold mb-3 text-gray-700 dark:text-gray-300">Cần Làm</h3>

                  {tasks.todo.map(task => (
                     <div
                        key={task.id}
                        className={`bg-white dark:bg-gray-800 p-3 mb-2 rounded shadow cursor-move ${dragging && dragging.task.id === task.id ? "opacity-50" : ""
                           }`}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task, "todo")}
                        onDragEnd={handleDragEnd}
                     >
                        <div className="flex justify-between items-center mb-2">
                           <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
                              {task.priority === "high" ? "Cao" : task.priority === "medium" ? "Trung bình" : "Thấp"}
                           </span>
                           <span className="text-xs text-gray-500 dark:text-gray-400">ID: {task.id}</span>
                        </div>
                        <p>{task.content}</p>
                     </div>
                  ))}

                  {tasks.todo.length === 0 && (
                     <div className="bg-white dark:bg-gray-800 p-3 mb-2 rounded shadow border-2 border-dashed border-gray-300 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
                        Kéo công việc vào đây
                     </div>
                  )}
               </div>

               {/* In Progress Column */}
               <div
                  className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, "inProgress")}
               >
                  <h3 className="font-bold mb-3 text-gray-700 dark:text-gray-300">Đang Thực Hiện</h3>

                  {tasks.inProgress.map(task => (
                     <div
                        key={task.id}
                        className={`bg-white dark:bg-gray-800 p-3 mb-2 rounded shadow cursor-move ${dragging && dragging.task.id === task.id ? "opacity-50" : ""
                           }`}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task, "inProgress")}
                        onDragEnd={handleDragEnd}
                     >
                        <div className="flex justify-between items-center mb-2">
                           <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
                              {task.priority === "high" ? "Cao" : task.priority === "medium" ? "Trung bình" : "Thấp"}
                           </span>
                           <span className="text-xs text-gray-500 dark:text-gray-400">ID: {task.id}</span>
                        </div>
                        <p>{task.content}</p>
                     </div>
                  ))}

                  {tasks.inProgress.length === 0 && (
                     <div className="bg-white dark:bg-gray-800 p-3 mb-2 rounded shadow border-2 border-dashed border-gray-300 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
                        Kéo công việc vào đây
                     </div>
                  )}
               </div>

               {/* Done Column */}
               <div
                  className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, "done")}
               >
                  <h3 className="font-bold mb-3 text-gray-700 dark:text-gray-300">Hoàn Thành</h3>

                  {tasks.done.map(task => (
                     <div
                        key={task.id}
                        className={`bg-white dark:bg-gray-800 p-3 mb-2 rounded shadow cursor-move ${dragging && dragging.task.id === task.id ? "opacity-50" : ""
                           }`}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task, "done")}
                        onDragEnd={handleDragEnd}
                     >
                        <div className="flex justify-between items-center mb-2">
                           <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
                              {task.priority === "high" ? "Cao" : task.priority === "medium" ? "Trung bình" : "Thấp"}
                           </span>
                           <span className="text-xs text-gray-500 dark:text-gray-400">ID: {task.id}</span>
                        </div>
                        <p>{task.content}</p>
                     </div>
                  ))}

                  {tasks.done.length === 0 && (
                     <div className="bg-white dark:bg-gray-800 p-3 mb-2 rounded shadow border-2 border-dashed border-gray-300 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
                        Kéo công việc vào đây
                     </div>
                  )}
               </div>
            </div>
         </div>

         {/* Sortable List */}
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Danh Sách Có Thể Sắp Xếp</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
               Kéo và thả các mục để thay đổi thứ tự của chúng trong danh sách.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
               {items.map((item, index) => (
                  <div
                     key={item.id}
                     className="bg-gray-50 dark:bg-gray-900 p-2 rounded cursor-move"
                     draggable
                     onDragStart={(e) => handleItemDragStart(e, index)}
                     onDragOver={handleDragOver}
                     onDrop={(e) => handleItemDrop(e, index)}
                  >
                     <div className="flex flex-col items-center">
                        <img
                           src={item.image}
                           alt={item.content}
                           className="w-full h-24 object-cover mb-2 rounded"
                        />
                        <p className="text-center">{item.content}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* File Drop Zone */}
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Tải Lên Tệp</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
               Kéo và thả các tệp vào vùng bên dưới hoặc nhấp để chọn tệp từ máy tính của bạn.
            </p>

            {/* Drop Zone */}
            <div
               className={`border-2 border-dashed p-8 rounded-lg text-center mb-4 ${isDraggingFile
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                  : "border-gray-300 dark:border-gray-700"
                  }`}
               onDragOver={handleFileDragOver}
               onDragLeave={handleFileDragLeave}
               onDrop={handleFileDrop}
               onClick={() => document.getElementById("fileInput").click()}
            >
               <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  onChange={handleFileSelect}
                  multiple
               />
               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
               </svg>
               <p className="text-gray-600 dark:text-gray-400">
                  Kéo và thả tệp vào đây hoặc <span className="text-blue-500">nhấp để chọn tệp</span>
               </p>
            </div>

            {/* File List */}
            {files.length > 0 && (
               <div className="mt-4">
                  <h3 className="font-bold mb-2">Tệp đã tải lên ({files.length})</h3>
                  <ul className="bg-gray-50 dark:bg-gray-900 rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
                     {files.map((file, index) => (
                        <li key={index} className="p-3 flex justify-between items-center">
                           <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <div>
                                 <p className="font-medium">{file.name}</p>
                                 <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {(file.size / 1024).toFixed(2)} KB
                                 </p>
                              </div>
                           </div>
                           <button
                              onClick={() => handleFileDelete(index)}
                              className="text-red-500 hover:text-red-700"
                           >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                           </button>
                        </li>
                     ))}
                  </ul>
               </div>
            )}
         </div>
      </div>
   );
};

export default DragDropDemo;
