import React, { useState, useEffect, useRef } from "react";

const WebSocketChatDemo = () => {
   // State cho tin nhắn
   const [messages, setMessages] = useState([]);

   // State cho tin nhắn đang nhập
   const [newMessage, setNewMessage] = useState("");

   // State cho tên người dùng
   const [username, setUsername] = useState("");

   // State cho việc đã đăng nhập chưa
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   // State cho trạng thái kết nối
   const [connectionStatus, setConnectionStatus] = useState("disconnected"); // "disconnected", "connecting", "connected"

   // State cho lỗi
   const [error, setError] = useState(null);

   // Ref cho WebSocket
   const socketRef = useRef(null);

   // Ref cho danh sách tin nhắn để tự động cuộn xuống
   const messagesEndRef = useRef(null);

   // Mô phỏng WebSocket Server
   const mockWebSocketServer = () => {
      // Tạo một đối tượng giả lập WebSocket
      const mockSocket = {
         onopen: null,
         onmessage: null,
         onclose: null,
         onerror: null,
         readyState: 0, // 0: CONNECTING, 1: OPEN, 2: CLOSING, 3: CLOSED

         // Phương thức giả lập gửi tin nhắn
         send: (data) => {
            try {
               const parsedData = JSON.parse(data);

               // Mô phỏng độ trễ mạng
               setTimeout(() => {
                  if (mockSocket.readyState === 1) {
                     // Nếu là tin nhắn chat
                     if (parsedData.type === "chat") {
                        // Mô phỏng phản hồi từ server
                        mockSocket.onmessage({
                           data: JSON.stringify({
                              type: "chat",
                              username: parsedData.username,
                              message: parsedData.message,
                              timestamp: new Date().toISOString(),
                           }),
                        });

                        // Mô phỏng tin nhắn từ người dùng khác
                        if (Math.random() > 0.5) {
                           const botUsers = ["Alice", "Bob", "Charlie", "David", "Eva"];
                           const randomUser = botUsers[Math.floor(Math.random() * botUsers.length)];
                           const botResponses = [
                              "Xin chào!",
                              "Thật thú vị!",
                              "Tôi đồng ý với bạn.",
                              "Thế giới WebSocket thật tuyệt vời!",
                              "Bạn có thể giải thích rõ hơn được không?",
                              "Tôi không hiểu lắm.",
                              "Hãy nói thêm về chủ đề này.",
                              "Tôi đang học React.",
                              "WebSocket là công nghệ real-time tuyệt vời.",
                              "Bạn có dự án nào đang làm không?",
                           ];
                           const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

                           setTimeout(() => {
                              if (mockSocket.readyState === 1) {
                                 mockSocket.onmessage({
                                    data: JSON.stringify({
                                       type: "chat",
                                       username: randomUser,
                                       message: randomResponse,
                                       timestamp: new Date().toISOString(),
                                    }),
                                 });
                              }
                           }, 1000 + Math.random() * 2000);
                        }
                     }

                     // Nếu là tin nhắn đăng nhập
                     else if (parsedData.type === "login") {
                        // Mô phỏng phản hồi từ server
                        mockSocket.onmessage({
                           data: JSON.stringify({
                              type: "login_success",
                              username: parsedData.username,
                              message: `${parsedData.username} đã tham gia cuộc trò chuyện.`,
                              timestamp: new Date().toISOString(),
                           }),
                        });

                        // Mô phỏng thông báo cho người dùng khác
                        setTimeout(() => {
                           if (mockSocket.readyState === 1) {
                              mockSocket.onmessage({
                                 data: JSON.stringify({
                                    type: "system",
                                    message: `${parsedData.username} đã tham gia cuộc trò chuyện.`,
                                    timestamp: new Date().toISOString(),
                                 }),
                              });
                           }
                        }, 500);

                        // Mô phỏng tin nhắn chào mừng
                        setTimeout(() => {
                           if (mockSocket.readyState === 1) {
                              mockSocket.onmessage({
                                 data: JSON.stringify({
                                    type: "chat",
                                    username: "Bot",
                                    message: `Chào mừng ${parsedData.username} đến với cuộc trò chuyện!`,
                                    timestamp: new Date().toISOString(),
                                 }),
                              });
                           }
                        }, 1000);
                     }
                  }
               }, 200 + Math.random() * 300);
            } catch (err) {
               console.error("Error parsing message:", err);
            }
         },

         // Phương thức giả lập đóng kết nối
         close: () => {
            mockSocket.readyState = 3; // CLOSED
            if (mockSocket.onclose) {
               mockSocket.onclose({ code: 1000, reason: "Normal closure" });
            }
         },
      };

      // Mô phỏng kết nối thành công sau một khoảng thời gian
      setTimeout(() => {
         mockSocket.readyState = 1; // OPEN
         if (mockSocket.onopen) {
            mockSocket.onopen({ target: mockSocket });
         }
      }, 1000);

      return mockSocket;
   };

   // Kết nối đến WebSocket server
   const connectWebSocket = () => {
      setConnectionStatus("connecting");
      setError(null);

      // Trong thực tế, bạn sẽ kết nối đến một WebSocket server thực
      // const socket = new WebSocket("wss://echo.websocket.org");

      // Sử dụng mô phỏng WebSocket server
      const socket = mockWebSocketServer();

      socket.onopen = () => {
         console.log("WebSocket connection established");
         setConnectionStatus("connected");

         // Thêm tin nhắn hệ thống
         setMessages(prev => [
            ...prev,
            {
               type: "system",
               message: "Kết nối đến server thành công.",
               timestamp: new Date().toISOString(),
            },
         ]);
      };

      socket.onmessage = (event) => {
         try {
            const data = JSON.parse(event.data);

            // Xử lý các loại tin nhắn khác nhau
            if (data.type === "login_success") {
               setIsLoggedIn(true);
            }

            // Thêm tin nhắn vào danh sách
            setMessages(prev => [...prev, data]);
         } catch (err) {
            console.error("Error parsing message:", err);
         }
      };

      socket.onclose = (event) => {
         console.log("WebSocket connection closed:", event.code, event.reason);
         setConnectionStatus("disconnected");

         // Thêm tin nhắn hệ thống
         setMessages(prev => [
            ...prev,
            {
               type: "system",
               message: "Đã ngắt kết nối khỏi server.",
               timestamp: new Date().toISOString(),
            },
         ]);
      };

      socket.onerror = (error) => {
         console.error("WebSocket error:", error);
         setError("Đã xảy ra lỗi kết nối. Vui lòng thử lại sau.");
         setConnectionStatus("disconnected");
      };

      socketRef.current = socket;
   };

   // Ngắt kết nối WebSocket
   const disconnectWebSocket = () => {
      if (socketRef.current) {
         socketRef.current.close();
         socketRef.current = null;
      }
   };

   // Xử lý đăng nhập
   const handleLogin = (e) => {
      e.preventDefault();

      if (!username.trim()) {
         setError("Vui lòng nhập tên người dùng.");
         return;
      }

      if (connectionStatus !== "connected") {
         setError("Chưa kết nối đến server. Vui lòng kết nối trước.");
         return;
      }

      // Gửi tin nhắn đăng nhập
      socketRef.current.send(
         JSON.stringify({
            type: "login",
            username: username.trim(),
         })
      );
   };

   // Xử lý gửi tin nhắn
   const handleSendMessage = (e) => {
      e.preventDefault();

      if (!newMessage.trim()) return;

      if (!isLoggedIn) {
         setError("Vui lòng đăng nhập trước khi gửi tin nhắn.");
         return;
      }

      if (connectionStatus !== "connected") {
         setError("Đã mất kết nối đến server. Vui lòng kết nối lại.");
         return;
      }

      // Gửi tin nhắn
      socketRef.current.send(
         JSON.stringify({
            type: "chat",
            username,
            message: newMessage.trim(),
         })
      );

      // Xóa tin nhắn đang nhập
      setNewMessage("");
   };

   // Tự động cuộn xuống khi có tin nhắn mới
   useEffect(() => {
      if (messagesEndRef.current) {
         messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
   }, [messages]);

   // Dọn dẹp khi component unmount
   useEffect(() => {
      return () => {
         disconnectWebSocket();
      };
   }, []);

   // Format thời gian
   const formatTime = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
   };

   return (
      <div className="space-y-6">
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Demo WebSocket Chat</h1>
            <p className="mb-6">
               Demo này minh họa cách sử dụng WebSocket để tạo ứng dụng chat thời gian thực trong React.
               WebSocket cho phép giao tiếp hai chiều giữa client và server, lý tưởng cho các ứng dụng cần
               cập nhật dữ liệu ngay lập tức như chat, thông báo, và cập nhật trực tiếp.
            </p>

            {/* Giải thích code */}
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-6">
               <h3 className="font-bold mb-2">Cách Hoạt Động:</h3>
               <ul className="list-disc pl-5 space-y-2">
                  <li>Thiết lập kết nối WebSocket giữa client và server</li>
                  <li>Sử dụng các sự kiện WebSocket (onopen, onmessage, onclose, onerror) để xử lý giao tiếp</li>
                  <li>Gửi và nhận tin nhắn theo thời gian thực</li>
                  <li>Xử lý các trạng thái kết nối và lỗi</li>
                  <li>Demo này sử dụng mô phỏng WebSocket server để minh họa</li>
               </ul>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Connection Controls */}
            <div className="md:col-span-1 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h2 className="text-xl font-bold mb-4">Kết Nối</h2>

               <div className="space-y-4">
                  {/* Connection Status */}
                  <div>
                     <p className="mb-2">Trạng thái:</p>
                     <div className="flex items-center">
                        <span
                           className={`inline-block w-3 h-3 rounded-full mr-2 ${connectionStatus === "connected"
                              ? "bg-green-500"
                              : connectionStatus === "connecting"
                                 ? "bg-yellow-500"
                                 : "bg-red-500"
                              }`}
                        ></span>
                        <span>
                           {connectionStatus === "connected"
                              ? "Đã kết nối"
                              : connectionStatus === "connecting"
                                 ? "Đang kết nối..."
                                 : "Chưa kết nối"}
                        </span>
                     </div>
                  </div>

                  {/* Connection Buttons */}
                  <div className="flex space-x-2">
                     <button
                        onClick={connectWebSocket}
                        disabled={connectionStatus === "connected" || connectionStatus === "connecting"}
                        className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ${connectionStatus === "connected" || connectionStatus === "connecting"
                           ? "opacity-50 cursor-not-allowed"
                           : ""
                           }`}
                     >
                        Kết nối
                     </button>
                     <button
                        onClick={disconnectWebSocket}
                        disabled={connectionStatus !== "connected"}
                        className={`px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ${connectionStatus !== "connected" ? "opacity-50 cursor-not-allowed" : ""
                           }`}
                     >
                        Ngắt kết nối
                     </button>
                  </div>

                  {/* Login Form */}
                  <div>
                     <h3 className="font-medium mb-2">Đăng nhập</h3>
                     <form onSubmit={handleLogin} className="space-y-2">
                        <input
                           type="text"
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                           placeholder="Nhập tên của bạn"
                           disabled={isLoggedIn || connectionStatus !== "connected"}
                           className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                        />
                        <button
                           type="submit"
                           disabled={isLoggedIn || connectionStatus !== "connected"}
                           className={`w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${isLoggedIn || connectionStatus !== "connected"
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                              }`}
                        >
                           {isLoggedIn ? "Đã đăng nhập" : "Đăng nhập"}
                        </button>
                     </form>
                  </div>

                  {/* Error Message */}
                  {error && (
                     <div className="bg-red-100 dark:bg-red-900 p-3 rounded">
                        <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
                     </div>
                  )}

                  {/* WebSocket Info */}
                  <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded text-sm">
                     <h3 className="font-medium mb-2">Thông tin WebSocket:</h3>
                     <ul className="space-y-1">
                        <li>
                           <span className="font-medium">URL:</span> wss://demo-chat-server.com
                        </li>
                        <li>
                           <span className="font-medium">Protocol:</span> ws (WebSocket)
                        </li>
                        <li>
                           <span className="font-medium">Trạng thái:</span> {connectionStatus}
                        </li>
                        <li>
                           <span className="font-medium">Người dùng:</span> {isLoggedIn ? username : "Chưa đăng nhập"}
                        </li>
                     </ul>
                     <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        Lưu ý: Demo này sử dụng mô phỏng WebSocket server.
                     </p>
                  </div>
               </div>
            </div>

            {/* Chat Area */}
            <div className="md:col-span-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h2 className="text-xl font-bold mb-4">Cuộc Trò Chuyện</h2>

               {/* Messages Area */}
               <div className="bg-gray-50 dark:bg-gray-900 rounded p-4 h-80 overflow-y-auto mb-4">
                  {messages.length === 0 ? (
                     <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                        <p>Chưa có tin nhắn nào.</p>
                        <p className="text-sm">Kết nối và đăng nhập để bắt đầu trò chuyện.</p>
                     </div>
                  ) : (
                     <div className="space-y-3">
                        {messages.map((msg, index) => (
                           <div
                              key={index}
                              className={`p-2 rounded ${msg.type === "system"
                                 ? "bg-gray-200 dark:bg-gray-700 text-center"
                                 : msg.username === username
                                    ? "bg-blue-100 dark:bg-blue-900 ml-8"
                                    : "bg-white dark:bg-gray-800 mr-8"
                                 }`}
                           >
                              {msg.type !== "system" && (
                                 <div className="flex justify-between items-center mb-1">
                                    <span className="font-medium">
                                       {msg.username === username ? "Bạn" : msg.username}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                       {formatTime(msg.timestamp)}
                                    </span>
                                 </div>
                              )}
                              <p className={msg.type === "system" ? "text-sm" : ""}>
                                 {msg.message}
                              </p>
                           </div>
                        ))}
                        <div ref={messagesEndRef} />
                     </div>
                  )}
               </div>

               {/* Message Input */}
               <form onSubmit={handleSendMessage} className="flex">
                  <input
                     type="text"
                     value={newMessage}
                     onChange={(e) => setNewMessage(e.target.value)}
                     placeholder={
                        !isLoggedIn
                           ? "Vui lòng đăng nhập trước"
                           : connectionStatus !== "connected"
                              ? "Vui lòng kết nối trước"
                              : "Nhập tin nhắn của bạn..."
                     }
                     disabled={!isLoggedIn || connectionStatus !== "connected"}
                     className="flex-grow p-2 border rounded-l dark:bg-gray-700 dark:border-gray-600"
                  />
                  <button
                     type="submit"
                     disabled={!isLoggedIn || connectionStatus !== "connected"}
                     className={`px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 ${!isLoggedIn || connectionStatus !== "connected"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                        }`}
                  >
                     Gửi
                  </button>
               </form>
            </div>
         </div>

         {/* Code Example */}
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Ví Dụ Code WebSocket</h2>

            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded overflow-auto">
               <pre className="text-sm">
                  {`// Thiết lập kết nối WebSocket trong React
import React, { useState, useEffect, useRef } from 'react';

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    // Tạo kết nối WebSocket
    const socket = new WebSocket('wss://chat-server.example.com');
    
    // Xử lý sự kiện kết nối mở
    socket.onopen = () => {
      console.log('WebSocket connection established');
      // Thêm tin nhắn hệ thống
      setMessages(prev => [...prev, {
        type: 'system',
        message: 'Kết nối đến server thành công.',
        timestamp: new Date().toISOString()
      }]);
    };
    
    // Xử lý khi nhận tin nhắn
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // Thêm tin nhắn vào danh sách
        setMessages(prev => [...prev, data]);
      } catch (err) {
        console.error('Error parsing message:', err);
      }
    };
    
    // Xử lý khi kết nối đóng
    socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event.code, event.reason);
      // Thêm tin nhắn hệ thống
      setMessages(prev => [...prev, {
        type: 'system',
        message: 'Đã ngắt kết nối khỏi server.',
        timestamp: new Date().toISOString()
      }]);
    };
    
    // Xử lý lỗi
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    // Lưu socket vào ref
    socketRef.current = socket;
    
    // Dọn dẹp khi component unmount
    return () => {
      socket.close();
    };
  }, []);

  // Xử lý gửi tin nhắn
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Gửi tin nhắn qua WebSocket
    socketRef.current.send(JSON.stringify({
      type: 'chat',
      username: 'User',
      message: newMessage.trim()
    }));
    
    // Xóa tin nhắn đang nhập
    setNewMessage('');
  };

  return (
    <div>
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className={\`message \${msg.type}\`}>
            {msg.type !== 'system' && (
              <div className="message-header">
                <span>{msg.username}</span>
                <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
              </div>
            )}
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Nhập tin nhắn..."
        />
        <button type="submit">Gửi</button>
      </form>
    </div>
  );
}`}
               </pre>
            </div>
         </div>
      </div>
   );
};

export default WebSocketChatDemo;
