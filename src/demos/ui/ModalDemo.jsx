import React, { useState, useEffect } from "react";

const ModalDemo = () => {
   // State cho việc hiển thị các loại modal
   const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);
   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
   const [isFormModalOpen, setIsFormModalOpen] = useState(false);
   const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

   // State cho form trong modal
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      message: ""
   });

   // State cho kết quả của modal xác nhận
   const [confirmResult, setConfirmResult] = useState(null);

   // State cho vị trí modal tùy chỉnh
   const [customModalPosition, setCustomModalPosition] = useState({ x: 0, y: 0 });

   // Xử lý thay đổi form
   const handleFormChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevData => ({
         ...prevData,
         [name]: value
      }));
   };

   // Xử lý gửi form
   const handleFormSubmit = (e) => {
      e.preventDefault();
      console.log("Form submitted:", formData);
      setIsFormModalOpen(false);

      // Reset form sau khi gửi
      setTimeout(() => {
         setFormData({
            name: "",
            email: "",
            message: ""
         });
      }, 300);
   };

   // Xử lý xác nhận
   const handleConfirm = (result) => {
      setConfirmResult(result);
      setIsConfirmModalOpen(false);
   };

   // Xử lý mở modal tùy chỉnh
   const handleOpenCustomModal = (e) => {
      // Lấy vị trí click
      const x = e.clientX;
      const y = e.clientY;

      // Đặt vị trí cho modal
      setCustomModalPosition({ x, y });
      setIsCustomModalOpen(true);
   };

   // Xử lý đóng modal khi nhấn ESC
   useEffect(() => {
      const handleEscKey = (e) => {
         if (e.key === "Escape") {
            setIsBasicModalOpen(false);
            setIsConfirmModalOpen(false);
            setIsFormModalOpen(false);
            setIsCustomModalOpen(false);
         }
      };

      window.addEventListener("keydown", handleEscKey);

      return () => {
         window.removeEventListener("keydown", handleEscKey);
      };
   }, []);

   // Component Modal cơ bản
   const BasicModal = ({ isOpen, onClose, children }) => {
      if (!isOpen) return null;

      return (
         <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
               className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
               onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl z-10 max-w-md w-full mx-4 transform transition-all">
               <div className="p-6">{children}</div>
            </div>
         </div>
      );
   };

   // Component Modal tùy chỉnh
   const CustomPositionModal = ({ isOpen, onClose, position, children }) => {
      if (!isOpen) return null;

      return (
         <div className="fixed inset-0 z-50">
            {/* Overlay */}
            <div
               className="fixed inset-0 bg-transparent"
               onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div
               className="absolute bg-white dark:bg-gray-800 rounded-lg shadow-xl z-10 w-64 transform transition-all"
               style={{
                  left: `${position.x}px`,
                  top: `${position.y}px`,
                  transform: "translate(-50%, -50%)"
               }}
            >
               <div className="p-4">{children}</div>
            </div>
         </div>
      );
   };

   return (
      <div className="space-y-6">
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Demo Modal</h1>
            <p className="mb-6">
               Demo này minh họa cách tạo và sử dụng các loại modal khác nhau trong React,
               bao gồm modal cơ bản, modal xác nhận, modal form và modal với vị trí tùy chỉnh.
            </p>

            {/* Giải thích code */}
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-6">
               <h3 className="font-bold mb-2">Cách Hoạt Động:</h3>
               <ul className="list-disc pl-5 space-y-2">
                  <li>Sử dụng state để kiểm soát việc hiển thị/ẩn modal</li>
                  <li>Tạo overlay để làm mờ nền phía sau và xử lý việc đóng modal khi click ra ngoài</li>
                  <li>Sử dụng cổng (portal) để render modal ở cấp cao nhất của DOM (trong ứng dụng thực tế)</li>
                  <li>Xử lý các sự kiện như ESC để đóng modal</li>
                  <li>Tạo các loại modal khác nhau cho các mục đích khác nhau</li>
               </ul>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Modal Buttons */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h2 className="text-xl font-bold mb-4">Các Loại Modal</h2>
               <div className="space-y-4">
                  <div>
                     <h3 className="font-medium mb-2">Modal Cơ Bản</h3>
                     <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Modal đơn giản hiển thị thông tin và có nút đóng.
                     </p>
                     <button
                        onClick={() => setIsBasicModalOpen(true)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                     >
                        Mở Modal Cơ Bản
                     </button>
                  </div>

                  <div>
                     <h3 className="font-medium mb-2">Modal Xác Nhận</h3>
                     <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Modal yêu cầu người dùng xác nhận một hành động.
                     </p>
                     <button
                        onClick={() => setIsConfirmModalOpen(true)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                     >
                        Mở Modal Xác Nhận
                     </button>

                     {confirmResult !== null && (
                        <p className="mt-2 text-sm">
                           Bạn đã chọn: <span className={confirmResult ? "text-green-500" : "text-red-500"}>
                              {confirmResult ? "Đồng ý" : "Hủy bỏ"}
                           </span>
                        </p>
                     )}
                  </div>

                  <div>
                     <h3 className="font-medium mb-2">Modal Form</h3>
                     <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Modal chứa form để người dùng nhập dữ liệu.
                     </p>
                     <button
                        onClick={() => setIsFormModalOpen(true)}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                     >
                        Mở Modal Form
                     </button>
                  </div>

                  <div>
                     <h3 className="font-medium mb-2">Modal Vị Trí Tùy Chỉnh</h3>
                     <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Modal xuất hiện tại vị trí người dùng click.
                     </p>
                     <div
                        className="w-full h-40 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                        onClick={handleOpenCustomModal}
                     >
                        Click vào bất kỳ đâu trong khu vực này
                     </div>
                  </div>
               </div>
            </div>

            {/* Modal Preview */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h2 className="text-xl font-bold mb-4">Xem Trước Modal</h2>
               <div className="border dark:border-gray-700 rounded-lg p-4 h-[400px] overflow-hidden relative">
                  <div className="absolute inset-0 bg-gray-100 dark:bg-gray-900 bg-opacity-50 flex items-center justify-center">
                     <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-sm w-full">
                        <h3 className="text-lg font-bold mb-2">Tiêu Đề Modal</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                           Đây là nội dung của modal. Modal có thể chứa văn bản, hình ảnh, form và các phần tử khác.
                        </p>
                        <div className="flex justify-end">
                           <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 mr-2">
                              Hủy
                           </button>
                           <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                              Đồng Ý
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  <p>Các tính năng của modal:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                     <li>Hiển thị/ẩn dựa trên state</li>
                     <li>Overlay để làm mờ nền phía sau</li>
                     <li>Đóng khi click ra ngoài hoặc nhấn ESC</li>
                     <li>Hỗ trợ nhiều loại nội dung khác nhau</li>
                     <li>Có thể tùy chỉnh vị trí, kích thước và hiệu ứng</li>
                  </ul>
               </div>
            </div>
         </div>

         {/* Basic Modal */}
         <BasicModal
            isOpen={isBasicModalOpen}
            onClose={() => setIsBasicModalOpen(false)}
         >
            <div className="text-center">
               <h3 className="text-lg font-bold mb-2">Thông Báo</h3>
               <p className="mb-4">
                  Đây là một modal cơ bản được sử dụng để hiển thị thông tin cho người dùng.
               </p>
               <button
                  onClick={() => setIsBasicModalOpen(false)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
               >
                  Đóng
               </button>
            </div>
         </BasicModal>

         {/* Confirm Modal */}
         <BasicModal
            isOpen={isConfirmModalOpen}
            onClose={() => setIsConfirmModalOpen(false)}
         >
            <div>
               <h3 className="text-lg font-bold mb-2">Xác Nhận</h3>
               <p className="mb-4">
                  Bạn có chắc chắn muốn thực hiện hành động này? Hành động này không thể hoàn tác.
               </p>
               <div className="flex justify-end space-x-2">
                  <button
                     onClick={() => handleConfirm(false)}
                     className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
                  >
                     Hủy Bỏ
                  </button>
                  <button
                     onClick={() => handleConfirm(true)}
                     className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                     Đồng Ý
                  </button>
               </div>
            </div>
         </BasicModal>

         {/* Form Modal */}
         <BasicModal
            isOpen={isFormModalOpen}
            onClose={() => setIsFormModalOpen(false)}
         >
            <div>
               <h3 className="text-lg font-bold mb-2">Gửi Phản Hồi</h3>
               <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                     <label htmlFor="name" className="block mb-1 font-medium">
                        Họ và tên:
                     </label>
                     <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                        required
                     />
                  </div>

                  <div>
                     <label htmlFor="email" className="block mb-1 font-medium">
                        Email:
                     </label>
                     <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                        required
                     />
                  </div>

                  <div>
                     <label htmlFor="message" className="block mb-1 font-medium">
                        Tin nhắn:
                     </label>
                     <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        rows="3"
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                        required
                     ></textarea>
                  </div>

                  <div className="flex justify-end space-x-2">
                     <button
                        type="button"
                        onClick={() => setIsFormModalOpen(false)}
                        className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
                     >
                        Hủy Bỏ
                     </button>
                     <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                     >
                        Gửi
                     </button>
                  </div>
               </form>
            </div>
         </BasicModal>

         {/* Custom Position Modal */}
         <CustomPositionModal
            isOpen={isCustomModalOpen}
            onClose={() => setIsCustomModalOpen(false)}
            position={customModalPosition}
         >
            <div>
               <h3 className="text-md font-bold mb-2">Modal Tùy Chỉnh</h3>
               <p className="text-sm mb-3">
                  Modal này xuất hiện tại vị trí bạn click.
               </p>
               <div className="flex justify-end">
                  <button
                     onClick={() => setIsCustomModalOpen(false)}
                     className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                     Đóng
                  </button>
               </div>
            </div>
         </CustomPositionModal>
      </div>
   );
};

export default ModalDemo;
