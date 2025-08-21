import React, { useState } from "react";

const ControlledInputDemo = () => {
   // State cho các trường nhập liệu
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      message: "",
      gender: "",
      subscribe: false,
      favoriteColor: "#000000",
      birthdate: "",
      education: "high-school",
   });

   // State cho việc hiển thị dữ liệu đã gửi
   const [submitted, setSubmitted] = useState(false);

   // Xử lý thay đổi cho tất cả các trường nhập liệu
   const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prevData => ({
         ...prevData,
         [name]: type === "checkbox" ? checked : value
      }));
   };

   // Xử lý gửi form
   const handleSubmit = (e) => {
      e.preventDefault();
      setSubmitted(true);

      // Trong thực tế, bạn có thể gửi dữ liệu đến server tại đây
      console.log("Form submitted with data:", formData);
   };

   // Reset form
   const handleReset = () => {
      setFormData({
         name: "",
         email: "",
         password: "",
         message: "",
         gender: "",
         subscribe: false,
         favoriteColor: "#000000",
         birthdate: "",
         education: "high-school",
      });
      setSubmitted(false);
   };

   return (
      <div className="space-y-6">
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Demo Controlled Input</h1>
            <p className="mb-6">
               Demo này minh họa cách sử dụng controlled inputs trong React, nơi React quản lý trạng thái của các trường nhập liệu.
            </p>

            {/* Giải thích code */}
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-6">
               <h3 className="font-bold mb-2">Cách Hoạt Động:</h3>
               <ul className="list-disc pl-5 space-y-2">
                  <li>Mỗi trường nhập liệu được liên kết với một giá trị trong state</li>
                  <li>Sự kiện <code>onChange</code> cập nhật state khi người dùng nhập liệu</li>
                  <li>Thuộc tính <code>value</code> đảm bảo trường nhập liệu luôn hiển thị giá trị từ state</li>
                  <li>Điều này tạo ra "single source of truth" cho dữ liệu form</li>
               </ul>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Form */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h2 className="text-xl font-bold mb-4">Form Nhập Liệu</h2>
               <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Text Input */}
                  <div>
                     <label htmlFor="name" className="block mb-1 font-medium">
                        Họ và tên:
                     </label>
                     <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                        required
                     />
                  </div>

                  {/* Email Input */}
                  <div>
                     <label htmlFor="email" className="block mb-1 font-medium">
                        Email:
                     </label>
                     <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                        required
                     />
                  </div>

                  {/* Password Input */}
                  <div>
                     <label htmlFor="password" className="block mb-1 font-medium">
                        Mật khẩu:
                     </label>
                     <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                        required
                     />
                  </div>

                  {/* Textarea */}
                  <div>
                     <label htmlFor="message" className="block mb-1 font-medium">
                        Tin nhắn:
                     </label>
                     <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="3"
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                     ></textarea>
                  </div>

                  {/* Radio Buttons */}
                  <div>
                     <p className="mb-1 font-medium">Giới tính:</p>
                     <div className="flex space-x-4">
                        <label className="flex items-center">
                           <input
                              type="radio"
                              name="gender"
                              value="male"
                              checked={formData.gender === "male"}
                              onChange={handleChange}
                              className="mr-2"
                           />
                           Nam
                        </label>
                        <label className="flex items-center">
                           <input
                              type="radio"
                              name="gender"
                              value="female"
                              checked={formData.gender === "female"}
                              onChange={handleChange}
                              className="mr-2"
                           />
                           Nữ
                        </label>
                        <label className="flex items-center">
                           <input
                              type="radio"
                              name="gender"
                              value="other"
                              checked={formData.gender === "other"}
                              onChange={handleChange}
                              className="mr-2"
                           />
                           Khác
                        </label>
                     </div>
                  </div>

                  {/* Checkbox */}
                  <div>
                     <label className="flex items-center">
                        <input
                           type="checkbox"
                           name="subscribe"
                           checked={formData.subscribe}
                           onChange={handleChange}
                           className="mr-2"
                        />
                        Đăng ký nhận bản tin
                     </label>
                  </div>

                  {/* Color Picker */}
                  <div>
                     <label htmlFor="favoriteColor" className="block mb-1 font-medium">
                        Màu yêu thích:
                     </label>
                     <input
                        type="color"
                        id="favoriteColor"
                        name="favoriteColor"
                        value={formData.favoriteColor}
                        onChange={handleChange}
                        className="w-full p-1 border rounded"
                     />
                  </div>

                  {/* Date Input */}
                  <div>
                     <label htmlFor="birthdate" className="block mb-1 font-medium">
                        Ngày sinh:
                     </label>
                     <input
                        type="date"
                        id="birthdate"
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleChange}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                     />
                  </div>

                  {/* Select Dropdown */}
                  <div>
                     <label htmlFor="education" className="block mb-1 font-medium">
                        Trình độ học vấn:
                     </label>
                     <select
                        id="education"
                        name="education"
                        value={formData.education}
                        onChange={handleChange}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                     >
                        <option value="high-school">Trung học phổ thông</option>
                        <option value="college">Cao đẳng</option>
                        <option value="bachelor">Đại học</option>
                        <option value="master">Thạc sĩ</option>
                        <option value="phd">Tiến sĩ</option>
                     </select>
                  </div>

                  {/* Submit and Reset Buttons */}
                  <div className="flex space-x-4">
                     <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                     >
                        Gửi
                     </button>
                     <button
                        type="button"
                        onClick={handleReset}
                        className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
                     >
                        Xóa
                     </button>
                  </div>
               </form>
            </div>

            {/* Form Data Display */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h2 className="text-xl font-bold mb-4">Dữ Liệu Form</h2>
               {submitted ? (
                  <div className="bg-green-100 dark:bg-green-900 p-4 rounded mb-4">
                     <p className="font-bold text-green-800 dark:text-green-200">Form đã được gửi thành công!</p>
                  </div>
               ) : (
                  <p className="italic text-gray-500 dark:text-gray-400 mb-4">
                     Dữ liệu sẽ hiển thị ở đây sau khi gửi form.
                  </p>
               )}

               <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded">
                  <h3 className="font-bold mb-2">Dữ liệu hiện tại:</h3>
                  <pre className="whitespace-pre-wrap overflow-x-auto bg-gray-100 dark:bg-gray-800 p-2 rounded">
                     {JSON.stringify(formData, null, 2)}
                  </pre>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ControlledInputDemo;
