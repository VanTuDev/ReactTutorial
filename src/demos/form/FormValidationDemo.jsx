import React, { useState } from "react";

const FormValidationDemo = () => {
   // State cho dữ liệu form
   const [formData, setFormData] = useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      age: "",
      website: "",
   });

   // State cho các lỗi
   const [errors, setErrors] = useState({});

   // State cho việc hiển thị thông báo thành công
   const [isSubmitted, setIsSubmitted] = useState(false);

   // Xử lý thay đổi input
   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });

      // Xóa lỗi khi người dùng bắt đầu sửa
      if (errors[name]) {
         setErrors({
            ...errors,
            [name]: null,
         });
      }
   };

   // Kiểm tra hợp lệ
   const validateForm = () => {
      let tempErrors = {};
      let isValid = true;

      // Kiểm tra username
      if (!formData.username.trim()) {
         tempErrors.username = "Tên người dùng là bắt buộc";
         isValid = false;
      } else if (formData.username.length < 3) {
         tempErrors.username = "Tên người dùng phải có ít nhất 3 ký tự";
         isValid = false;
      }

      // Kiểm tra email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim()) {
         tempErrors.email = "Email là bắt buộc";
         isValid = false;
      } else if (!emailRegex.test(formData.email)) {
         tempErrors.email = "Email không hợp lệ";
         isValid = false;
      }

      // Kiểm tra mật khẩu
      if (!formData.password) {
         tempErrors.password = "Mật khẩu là bắt buộc";
         isValid = false;
      } else if (formData.password.length < 6) {
         tempErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
         isValid = false;
      } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(formData.password)) {
         tempErrors.password = "Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường và một số";
         isValid = false;
      }

      // Kiểm tra xác nhận mật khẩu
      if (formData.password !== formData.confirmPassword) {
         tempErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
         isValid = false;
      }

      // Kiểm tra số điện thoại
      const phoneRegex = /^\d{10}$/;
      if (formData.phone && !phoneRegex.test(formData.phone)) {
         tempErrors.phone = "Số điện thoại phải có 10 chữ số";
         isValid = false;
      }

      // Kiểm tra tuổi
      if (formData.age) {
         const age = parseInt(formData.age);
         if (isNaN(age) || age < 18 || age > 120) {
            tempErrors.age = "Tuổi phải từ 18 đến 120";
            isValid = false;
         }
      }

      // Kiểm tra website
      const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;
      if (formData.website && !urlRegex.test(formData.website)) {
         tempErrors.website = "URL website không hợp lệ";
         isValid = false;
      }

      setErrors(tempErrors);
      return isValid;
   };

   // Xử lý gửi form
   const handleSubmit = (e) => {
      e.preventDefault();

      if (validateForm()) {
         // Form hợp lệ, có thể gửi dữ liệu
         console.log("Form data submitted:", formData);
         setIsSubmitted(true);

         // Reset form sau khi gửi thành công
         setTimeout(() => {
            setFormData({
               username: "",
               email: "",
               password: "",
               confirmPassword: "",
               phone: "",
               age: "",
               website: "",
            });
            setIsSubmitted(false);
         }, 3000);
      } else {
         console.log("Form has errors");
      }
   };

   return (
      <div className="space-y-6">
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Demo Kiểm Tra Form</h1>
            <p className="mb-6">
               Demo này minh họa cách thực hiện kiểm tra (validation) dữ liệu form trong React,
               hiển thị thông báo lỗi và ngăn chặn gửi form khi dữ liệu không hợp lệ.
            </p>

            {/* Giải thích code */}
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-6">
               <h3 className="font-bold mb-2">Cách Hoạt Động:</h3>
               <ul className="list-disc pl-5 space-y-2">
                  <li>Sử dụng state để theo dõi dữ liệu form và các lỗi</li>
                  <li>Kiểm tra tính hợp lệ của dữ liệu khi người dùng gửi form</li>
                  <li>Hiển thị thông báo lỗi cụ thể cho từng trường</li>
                  <li>Ngăn chặn gửi form nếu có lỗi</li>
                  <li>Xóa thông báo lỗi khi người dùng bắt đầu sửa lại trường đó</li>
               </ul>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Form */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h2 className="text-xl font-bold mb-4">Form Đăng Ký</h2>

               {isSubmitted && (
                  <div className="bg-green-100 dark:bg-green-900 p-4 rounded mb-4">
                     <p className="text-green-800 dark:text-green-200 font-bold">
                        Form đã được gửi thành công!
                     </p>
                  </div>
               )}

               <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Username */}
                  <div>
                     <label htmlFor="username" className="block mb-1 font-medium">
                        Tên người dùng: <span className="text-red-500">*</span>
                     </label>
                     <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 ${errors.username ? "border-red-500" : ""
                           }`}
                     />
                     {errors.username && (
                        <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                     )}
                  </div>

                  {/* Email */}
                  <div>
                     <label htmlFor="email" className="block mb-1 font-medium">
                        Email: <span className="text-red-500">*</span>
                     </label>
                     <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 ${errors.email ? "border-red-500" : ""
                           }`}
                     />
                     {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                     )}
                  </div>

                  {/* Password */}
                  <div>
                     <label htmlFor="password" className="block mb-1 font-medium">
                        Mật khẩu: <span className="text-red-500">*</span>
                     </label>
                     <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 ${errors.password ? "border-red-500" : ""
                           }`}
                     />
                     {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                     )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                     <label htmlFor="confirmPassword" className="block mb-1 font-medium">
                        Xác nhận mật khẩu: <span className="text-red-500">*</span>
                     </label>
                     <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 ${errors.confirmPassword ? "border-red-500" : ""
                           }`}
                     />
                     {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                     )}
                  </div>

                  {/* Phone */}
                  <div>
                     <label htmlFor="phone" className="block mb-1 font-medium">
                        Số điện thoại:
                     </label>
                     <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 ${errors.phone ? "border-red-500" : ""
                           }`}
                     />
                     {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                     )}
                  </div>

                  {/* Age */}
                  <div>
                     <label htmlFor="age" className="block mb-1 font-medium">
                        Tuổi:
                     </label>
                     <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 ${errors.age ? "border-red-500" : ""
                           }`}
                     />
                     {errors.age && (
                        <p className="text-red-500 text-sm mt-1">{errors.age}</p>
                     )}
                  </div>

                  {/* Website */}
                  <div>
                     <label htmlFor="website" className="block mb-1 font-medium">
                        Website:
                     </label>
                     <input
                        type="text"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 ${errors.website ? "border-red-500" : ""
                           }`}
                        placeholder="https://example.com"
                     />
                     {errors.website && (
                        <p className="text-red-500 text-sm mt-1">{errors.website}</p>
                     )}
                  </div>

                  <div>
                     <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                     >
                        Đăng Ký
                     </button>
                  </div>
               </form>
            </div>

            {/* Validation Rules */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h2 className="text-xl font-bold mb-4">Quy Tắc Kiểm Tra</h2>
               <div className="space-y-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
                     <h3 className="font-bold mb-2">Tên người dùng:</h3>
                     <ul className="list-disc pl-5 space-y-1">
                        <li>Không được để trống</li>
                        <li>Ít nhất 3 ký tự</li>
                     </ul>
                  </div>

                  <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
                     <h3 className="font-bold mb-2">Email:</h3>
                     <ul className="list-disc pl-5 space-y-1">
                        <li>Không được để trống</li>
                        <li>Phải là địa chỉ email hợp lệ (có @ và domain)</li>
                     </ul>
                  </div>

                  <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
                     <h3 className="font-bold mb-2">Mật khẩu:</h3>
                     <ul className="list-disc pl-5 space-y-1">
                        <li>Không được để trống</li>
                        <li>Ít nhất 6 ký tự</li>
                        <li>Phải chứa ít nhất một chữ hoa, một chữ thường và một số</li>
                        <li>Mật khẩu xác nhận phải khớp</li>
                     </ul>
                  </div>

                  <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
                     <h3 className="font-bold mb-2">Số điện thoại:</h3>
                     <ul className="list-disc pl-5 space-y-1">
                        <li>Không bắt buộc</li>
                        <li>Nếu nhập, phải có 10 chữ số</li>
                     </ul>
                  </div>

                  <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
                     <h3 className="font-bold mb-2">Tuổi:</h3>
                     <ul className="list-disc pl-5 space-y-1">
                        <li>Không bắt buộc</li>
                        <li>Nếu nhập, phải từ 18 đến 120</li>
                     </ul>
                  </div>

                  <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
                     <h3 className="font-bold mb-2">Website:</h3>
                     <ul className="list-disc pl-5 space-y-1">
                        <li>Không bắt buộc</li>
                        <li>Nếu nhập, phải là URL hợp lệ</li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default FormValidationDemo;
