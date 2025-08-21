import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

// Mô phỏng Portal
const Portal = ({ children, container }) => {
   // Tạo một phần tử div để chứa nội dung
   const [mountNode, setMountNode] = useState(null);

   useEffect(() => {
      // Sử dụng container được truyền vào hoặc tạo mới một div
      const targetElement = container || document.createElement("div");

      // Nếu không có container được truyền vào, thêm div mới vào body
      if (!container) {
         document.body.appendChild(targetElement);
      }

      // Lưu trữ node để render
      setMountNode(targetElement);

      // Dọn dẹp khi component unmount
      return () => {
         // Nếu không có container được truyền vào, xóa div khỏi body
         if (!container && targetElement.parentNode) {
            targetElement.parentNode.removeChild(targetElement);
         }
      };
   }, [container]);

   // Render children vào mountNode
   return mountNode ? ReactDOM.createPortal(children, mountNode) : null;
};

// Modal Component sử dụng Portal
const Modal = ({ isOpen, onClose, title, children }) => {
   // Không render nếu modal không mở
   if (!isOpen) return null;

   // Xử lý click vào overlay
   const handleOverlayClick = (e) => {
      // Chỉ đóng modal khi click vào overlay, không phải nội dung modal
      if (e.target === e.currentTarget) {
         onClose();
      }
   };

   // Xử lý phím ESC
   useEffect(() => {
      const handleEscKey = (e) => {
         if (e.key === "Escape") {
            onClose();
         }
      };

      // Thêm event listener
      document.addEventListener("keydown", handleEscKey);

      // Ngăn scroll trên body
      document.body.style.overflow = "hidden";

      // Dọn dẹp khi component unmount
      return () => {
         document.removeEventListener("keydown", handleEscKey);
         document.body.style.overflow = "";
      };
   }, [onClose]);

   return (
      <Portal>
         <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            onClick={handleOverlayClick}
         >
            <div
               className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-auto"
               onClick={(e) => e.stopPropagation()}
            >
               <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                  <h2 className="text-lg font-bold">{title}</h2>
                  <button
                     onClick={onClose}
                     className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                  >
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                     </svg>
                  </button>
               </div>
               <div className="p-4">
                  {children}
               </div>
            </div>
         </div>
      </Portal>
   );
};

// Tooltip Component sử dụng Portal
const Tooltip = ({ children, content, position = "top" }) => {
   const [isVisible, setIsVisible] = useState(false);
   const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
   const triggerRef = React.useRef(null);
   const tooltipRef = React.useRef(null);

   // Xử lý hiển thị tooltip
   const handleMouseEnter = () => {
      if (triggerRef.current) {
         const rect = triggerRef.current.getBoundingClientRect();

         // Tính toán vị trí tooltip dựa trên position
         let top = 0;
         let left = 0;

         switch (position) {
            case "top":
               top = rect.top - 10;
               left = rect.left + rect.width / 2;
               break;
            case "bottom":
               top = rect.bottom + 10;
               left = rect.left + rect.width / 2;
               break;
            case "left":
               top = rect.top + rect.height / 2;
               left = rect.left - 10;
               break;
            case "right":
               top = rect.top + rect.height / 2;
               left = rect.right + 10;
               break;
            default:
               top = rect.top - 10;
               left = rect.left + rect.width / 2;
         }

         setTooltipPosition({ top, left });
         setIsVisible(true);
      }
   };

   // Xử lý ẩn tooltip
   const handleMouseLeave = () => {
      setIsVisible(false);
   };

   // Điều chỉnh vị trí tooltip sau khi render
   useEffect(() => {
      if (isVisible && tooltipRef.current) {
         const tooltipRect = tooltipRef.current.getBoundingClientRect();
         let { top, left } = tooltipPosition;

         // Điều chỉnh vị trí dựa trên kích thước tooltip
         switch (position) {
            case "top":
               top -= tooltipRect.height;
               left -= tooltipRect.width / 2;
               break;
            case "bottom":
               left -= tooltipRect.width / 2;
               break;
            case "left":
               top -= tooltipRect.height / 2;
               left -= tooltipRect.width;
               break;
            case "right":
               top -= tooltipRect.height / 2;
               break;
            default:
               top -= tooltipRect.height;
               left -= tooltipRect.width / 2;
         }

         setTooltipPosition({ top, left });
      }
   }, [isVisible, position, tooltipPosition]);

   return (
      <>
         <div
            ref={triggerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
         >
            {children}
         </div>

         {isVisible && (
            <Portal>
               <div
                  ref={tooltipRef}
                  className={`fixed z-50 bg-gray-800 text-white text-sm py-1 px-2 rounded pointer-events-none ${position === "top" ? "after:content-[''] after:absolute after:top-full after:left-1/2 after:-ml-1 after:border-4 after:border-transparent after:border-t-gray-800" :
                     position === "bottom" ? "after:content-[''] after:absolute after:bottom-full after:left-1/2 after:-ml-1 after:border-4 after:border-transparent after:border-b-gray-800" :
                        position === "left" ? "after:content-[''] after:absolute after:top-1/2 after:left-full after:-mt-1 after:border-4 after:border-transparent after:border-l-gray-800" :
                           "after:content-[''] after:absolute after:top-1/2 after:right-full after:-mt-1 after:border-4 after:border-transparent after:border-r-gray-800"
                     }`}
                  style={{
                     top: `${tooltipPosition.top}px`,
                     left: `${tooltipPosition.left}px`,
                  }}
               >
                  {content}
               </div>
            </Portal>
         )}
      </>
   );
};

// Notification Component sử dụng Portal
const Notification = ({ message, type = "info", duration = 3000, onClose }) => {
   useEffect(() => {
      // Tự động đóng sau duration
      const timer = setTimeout(() => {
         onClose();
      }, duration);

      return () => clearTimeout(timer);
   }, [duration, onClose]);

   // Xác định màu sắc dựa trên type
   const getTypeStyles = () => {
      switch (type) {
         case "success":
            return "bg-green-500";
         case "error":
            return "bg-red-500";
         case "warning":
            return "bg-yellow-500";
         default:
            return "bg-blue-500";
      }
   };

   return (
      <Portal>
         <div
            className={`fixed top-4 right-4 z-50 p-4 rounded shadow-lg text-white ${getTypeStyles()} animate-slideIn`}
         >
            <div className="flex items-center">
               {type === "success" && (
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
               )}
               {type === "error" && (
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
               )}
               {type === "warning" && (
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
               )}
               {type === "info" && (
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
               )}
               <span>{message}</span>
            </div>
         </div>
      </Portal>
   );
};

// Component chính
const PortalDemo = () => {
   // State cho modal
   const [isModalOpen, setIsModalOpen] = useState(false);

   // State cho notification
   const [notification, setNotification] = useState(null);

   // State cho custom container
   const [customContainer, setCustomContainer] = useState(null);

   // Ref cho custom container
   const containerRef = useRef(null);

   // Tạo custom container khi component mount
   useEffect(() => {
      if (containerRef.current) {
         setCustomContainer(containerRef.current);
      }
   }, []);

   // Xử lý hiển thị notification
   const showNotification = (type) => {
      setNotification({
         message: `Đây là một thông báo ${type}!`,
         type,
      });
   };

   // Xử lý đóng notification
   const closeNotification = () => {
      setNotification(null);
   };

   return (
      <div className="space-y-6">
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Demo Portal</h1>
            <p className="mb-6">
               Demo này minh họa cách sử dụng React Portals để render các phần tử React bên ngoài
               DOM hierarchy của component cha. Portals rất hữu ích cho các thành phần UI như modal,
               tooltip, notification, v.v. mà cần được hiển thị ở cấp cao nhất của DOM.
            </p>

            {/* Giải thích code */}
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-6">
               <h3 className="font-bold mb-2">Cách Hoạt Động:</h3>
               <ul className="list-disc pl-5 space-y-2">
                  <li>Portals cho phép render children vào một DOM node nằm ngoài hierarchy của component cha</li>
                  <li>Sử dụng <code>ReactDOM.createPortal(child, container)</code> để tạo portal</li>
                  <li>Events vẫn lan truyền theo React tree, không phải DOM tree</li>
                  <li>Hữu ích cho các thành phần UI như modal, tooltip, notification, popover, v.v.</li>
                  <li>Giải quyết vấn đề <code>z-index</code> và <code>overflow: hidden</code> của các phần tử cha</li>
               </ul>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Modal Demo */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h2 className="text-xl font-bold mb-4">Modal với Portal</h2>
               <p className="mb-4 text-gray-600 dark:text-gray-400">
                  Modal được render bên ngoài DOM hierarchy của component cha, giúp tránh các vấn đề về
                  z-index và overflow.
               </p>

               <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
               >
                  Mở Modal
               </button>

               <Modal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  title="Modal Demo"
               >
                  <p className="mb-4">
                     Modal này được render bên ngoài DOM hierarchy của component cha,
                     sử dụng React Portal. Điều này giúp tránh các vấn đề về z-index
                     và overflow: hidden.
                  </p>
                  <p className="mb-4">
                     Bạn có thể đóng modal bằng cách nhấn nút đóng, nhấn phím ESC,
                     hoặc nhấn vào overlay bên ngoài.
                  </p>
                  <div className="flex justify-end">
                     <button
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                     >
                        Đóng
                     </button>
                  </div>
               </Modal>
            </div>

            {/* Tooltip Demo */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h2 className="text-xl font-bold mb-4">Tooltip với Portal</h2>
               <p className="mb-4 text-gray-600 dark:text-gray-400">
                  Tooltip được render bên ngoài DOM hierarchy, giúp tránh bị cắt bởi overflow: hidden.
               </p>

               <div className="flex flex-wrap gap-4 justify-center">
                  <Tooltip content="Tooltip phía trên" position="top">
                     <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                        Hover (Top)
                     </button>
                  </Tooltip>

                  <Tooltip content="Tooltip phía dưới" position="bottom">
                     <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                        Hover (Bottom)
                     </button>
                  </Tooltip>

                  <Tooltip content="Tooltip bên trái" position="left">
                     <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                        Hover (Left)
                     </button>
                  </Tooltip>

                  <Tooltip content="Tooltip bên phải" position="right">
                     <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
                        Hover (Right)
                     </button>
                  </Tooltip>
               </div>
            </div>

            {/* Notification Demo */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h2 className="text-xl font-bold mb-4">Notification với Portal</h2>
               <p className="mb-4 text-gray-600 dark:text-gray-400">
                  Notification được render ở góc trên bên phải của viewport, bất kể vị trí của component.
               </p>

               <div className="flex flex-wrap gap-2">
                  <button
                     onClick={() => showNotification("info")}
                     className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                     Thông Báo Info
                  </button>

                  <button
                     onClick={() => showNotification("success")}
                     className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                     Thông Báo Success
                  </button>

                  <button
                     onClick={() => showNotification("warning")}
                     className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                     Thông Báo Warning
                  </button>

                  <button
                     onClick={() => showNotification("error")}
                     className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                     Thông Báo Error
                  </button>
               </div>

               {notification && (
                  <Notification
                     message={notification.message}
                     type={notification.type}
                     onClose={closeNotification}
                  />
               )}
            </div>

            {/* Custom Container Demo */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h2 className="text-xl font-bold mb-4">Portal với Custom Container</h2>
               <p className="mb-4 text-gray-600 dark:text-gray-400">
                  Portal có thể render vào một container tùy chỉnh thay vì body.
               </p>

               <div
                  ref={containerRef}
                  className="border-2 border-dashed border-gray-300 dark:border-gray-700 p-4 rounded min-h-[150px] mb-4"
               >
                  <p className="text-center text-gray-500 dark:text-gray-400">
                     Nội dung sẽ được portal vào đây
                  </p>
               </div>

               {customContainer && (
                  <Portal container={customContainer}>
                     <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded">
                        <p className="text-blue-800 dark:text-blue-200">
                           Nội dung này được render vào custom container sử dụng Portal.
                        </p>
                     </div>
                  </Portal>
               )}
            </div>
         </div>

         {/* Code Example */}
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Ví Dụ Code</h2>

            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded overflow-auto">
               <pre className="text-sm">
                  {`// Sử dụng React Portal
import React from 'react';
import ReactDOM from 'react-dom';

// Tạo Modal Component với Portal
function Modal({ isOpen, onClose, children }) {
  // Không render nếu modal không mở
  if (!isOpen) return null;
  
  // Tạo portal vào body
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>,
    document.body // Target container
  );
}

// Sử dụng Modal
function App() {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div className="app">
      <h1>React Portal Demo</h1>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Modal Title</h2>
        <p>This modal is rendered outside the DOM hierarchy of the parent component.</p>
      </Modal>
    </div>
  );
}

// Tạo Portal Component tái sử dụng
function Portal({ children, container }) {
  const [mountNode, setMountNode] = React.useState(null);
  
  React.useEffect(() => {
    // Sử dụng container được truyền vào hoặc tạo mới một div
    const targetElement = container || document.createElement('div');
    
    // Nếu không có container được truyền vào, thêm div mới vào body
    if (!container) {
      document.body.appendChild(targetElement);
    }
    
    // Lưu trữ node để render
    setMountNode(targetElement);
    
    // Dọn dẹp khi component unmount
    return () => {
      // Nếu không có container được truyền vào, xóa div khỏi body
      if (!container && targetElement.parentNode) {
        targetElement.parentNode.removeChild(targetElement);
      }
    };
  }, [container]);
  
  // Render children vào mountNode
  return mountNode ? ReactDOM.createPortal(children, mountNode) : null;
}`}
               </pre>
            </div>
         </div>
      </div>
   );
};

export default PortalDemo;
