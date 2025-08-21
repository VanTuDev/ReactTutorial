import React, { useState } from "react";

const MultiStepFormDemo = () => {
   // State cho bước hiện tại
   const [currentStep, setCurrentStep] = useState(1);

   // State cho dữ liệu form
   const [formData, setFormData] = useState({
      // Bước 1: Thông tin cá nhân
      firstName: "",
      lastName: "",
      email: "",
      phone: "",

      // Bước 2: Địa chỉ
      address: "",
      city: "",
      district: "",
      zipCode: "",

      // Bước 3: Thông tin thanh toán
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",

      // Bước 4: Xác nhận
      agreeTerms: false,
      receiveNewsletter: false,
   });

   // State cho lỗi
   const [errors, setErrors] = useState({});

   // State cho việc hoàn thành form
   const [isCompleted, setIsCompleted] = useState(false);

   // Xử lý thay đổi input
   const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
         ...formData,
         [name]: type === "checkbox" ? checked : value,
      });

      // Xóa lỗi khi người dùng bắt đầu sửa
      if (errors[name]) {
         setErrors({
            ...errors,
            [name]: null,
         });
      }
   };

   // Kiểm tra hợp lệ cho từng bước
   const validateStep = (step) => {
      let tempErrors = {};
      let isValid = true;

      switch (step) {
         case 1:
            // Kiểm tra họ
            if (!formData.firstName.trim()) {
               tempErrors.firstName = "Họ là bắt buộc";
               isValid = false;
            }

            // Kiểm tra tên
            if (!formData.lastName.trim()) {
               tempErrors.lastName = "Tên là bắt buộc";
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

            // Kiểm tra số điện thoại (không bắt buộc)
            if (formData.phone) {
               const phoneRegex = /^\d{10}$/;
               if (!phoneRegex.test(formData.phone)) {
                  tempErrors.phone = "Số điện thoại phải có 10 chữ số";
                  isValid = false;
               }
            }
            break;

         case 2:
            // Kiểm tra địa chỉ
            if (!formData.address.trim()) {
               tempErrors.address = "Địa chỉ là bắt buộc";
               isValid = false;
            }

            // Kiểm tra thành phố
            if (!formData.city.trim()) {
               tempErrors.city = "Thành phố là bắt buộc";
               isValid = false;
            }

            // Kiểm tra quận/huyện
            if (!formData.district.trim()) {
               tempErrors.district = "Quận/huyện là bắt buộc";
               isValid = false;
            }

            // Kiểm tra mã bưu điện (không bắt buộc)
            if (formData.zipCode) {
               const zipCodeRegex = /^\d{5}$/;
               if (!zipCodeRegex.test(formData.zipCode)) {
                  tempErrors.zipCode = "Mã bưu điện phải có 5 chữ số";
                  isValid = false;
               }
            }
            break;

         case 3:
            // Kiểm tra tên trên thẻ
            if (!formData.cardName.trim()) {
               tempErrors.cardName = "Tên trên thẻ là bắt buộc";
               isValid = false;
            }

            // Kiểm tra số thẻ
            const cardNumberRegex = /^\d{16}$/;
            if (!formData.cardNumber.trim()) {
               tempErrors.cardNumber = "Số thẻ là bắt buộc";
               isValid = false;
            } else if (!cardNumberRegex.test(formData.cardNumber.replace(/\s/g, ""))) {
               tempErrors.cardNumber = "Số thẻ phải có 16 chữ số";
               isValid = false;
            }

            // Kiểm tra ngày hết hạn
            const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
            if (!formData.expiryDate.trim()) {
               tempErrors.expiryDate = "Ngày hết hạn là bắt buộc";
               isValid = false;
            } else if (!expiryDateRegex.test(formData.expiryDate)) {
               tempErrors.expiryDate = "Ngày hết hạn phải có định dạng MM/YY";
               isValid = false;
            }

            // Kiểm tra CVV
            const cvvRegex = /^\d{3,4}$/;
            if (!formData.cvv.trim()) {
               tempErrors.cvv = "CVV là bắt buộc";
               isValid = false;
            } else if (!cvvRegex.test(formData.cvv)) {
               tempErrors.cvv = "CVV phải có 3 hoặc 4 chữ số";
               isValid = false;
            }
            break;

         case 4:
            // Kiểm tra đồng ý điều khoản
            if (!formData.agreeTerms) {
               tempErrors.agreeTerms = "Bạn phải đồng ý với điều khoản và điều kiện";
               isValid = false;
            }
            break;

         default:
            break;
      }

      setErrors(tempErrors);
      return isValid;
   };

   // Xử lý chuyển đến bước tiếp theo
   const handleNext = () => {
      if (validateStep(currentStep)) {
         setCurrentStep(currentStep + 1);
      }
   };

   // Xử lý quay lại bước trước
   const handlePrev = () => {
      setCurrentStep(currentStep - 1);
   };

   // Xử lý gửi form
   const handleSubmit = (e) => {
      e.preventDefault();

      if (validateStep(currentStep)) {
         // Mô phỏng gửi dữ liệu
         console.log("Form submitted:", formData);
         setIsCompleted(true);
      }
   };

   // Xử lý bắt đầu lại
   const handleStartOver = () => {
      setFormData({
         firstName: "",
         lastName: "",
         email: "",
         phone: "",
         address: "",
         city: "",
         district: "",
         zipCode: "",
         cardName: "",
         cardNumber: "",
         expiryDate: "",
         cvv: "",
         agreeTerms: false,
         receiveNewsletter: false,
      });
      setCurrentStep(1);
      setIsCompleted(false);
      setErrors({});
   };

   // Render form theo bước
   const renderStep = () => {
      switch (currentStep) {
         case 1:
            return (
               <div className="space-y-4">
                  <h2 className="text-xl font-bold mb-4">Bước 1: Thông Tin Cá Nhân</h2>

                  {/* Họ */}
                  <div>
                     <label htmlFor="firstName" className="block mb-1 font-medium">
                        Họ: <span className="text-red-500">*</span>
                     </label>
                     <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 ${errors.firstName ? "border-red-500" : ""
                           }`}
                     />
                     {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                     )}
                  </div>

                  {/* Tên */}
                  <div>
                     <label htmlFor="lastName" className="block mb-1 font-medium">
                        Tên: <span className="text-red-500">*</span>
                     </label>
                     <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 ${errors.lastName ? "border-red-500" : ""
                           }`}
                     />
                     {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                     )}
                  </div>

                  {/* Email */}
                  <div>
                     <label htmlFor="email" className="block mb-1 font-medium">
                        Email: <span className="text-red-500">*</span>
                     </label>
                     <input
                        type="email"
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

                  {/* Số điện thoại */}
                  <div>
                     <label htmlFor="phone" className="block mb-1 font-medium">
                        Số điện thoại:
                     </label>
                     <input
                        type="tel"
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
               </div>
            );

         case 2:
            return (
               <div className="space-y-4">
                  <h2 className="text-xl font-bold mb-4">Bước 2: Địa Chỉ</h2>

                  {/* Địa chỉ */}
                  <div>
                     <label htmlFor="address" className="block mb-1 font-medium">
                        Địa chỉ: <span className="text-red-500">*</span>
                     </label>
                     <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 ${errors.address ? "border-red-500" : ""
                           }`}
                     />
                     {errors.address && (
                        <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                     )}
                  </div>

                  {/* Thành phố */}
                  <div>
                     <label htmlFor="city" className="block mb-1 font-medium">
                        Thành phố: <span className="text-red-500">*</span>
                     </label>
                     <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 ${errors.city ? "border-red-500" : ""
                           }`}
                     />
                     {errors.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                     )}
                  </div>

                  {/* Quận/huyện */}
                  <div>
                     <label htmlFor="district" className="block mb-1 font-medium">
                        Quận/huyện: <span className="text-red-500">*</span>
                     </label>
                     <input
                        type="text"
                        id="district"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 ${errors.district ? "border-red-500" : ""
                           }`}
                     />
                     {errors.district && (
                        <p className="text-red-500 text-sm mt-1">{errors.district}</p>
                     )}
                  </div>

                  {/* Mã bưu điện */}
                  <div>
                     <label htmlFor="zipCode" className="block mb-1 font-medium">
                        Mã bưu điện:
                     </label>
                     <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 ${errors.zipCode ? "border-red-500" : ""
                           }`}
                     />
                     {errors.zipCode && (
                        <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                     )}
                  </div>
               </div>
            );

         case 3:
            return (
               <div className="space-y-4">
                  <h2 className="text-xl font-bold mb-4">Bước 3: Thông Tin Thanh Toán</h2>

                  {/* Tên trên thẻ */}
                  <div>
                     <label htmlFor="cardName" className="block mb-1 font-medium">
                        Tên trên thẻ: <span className="text-red-500">*</span>
                     </label>
                     <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 ${errors.cardName ? "border-red-500" : ""
                           }`}
                     />
                     {errors.cardName && (
                        <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>
                     )}
                  </div>

                  {/* Số thẻ */}
                  <div>
                     <label htmlFor="cardNumber" className="block mb-1 font-medium">
                        Số thẻ: <span className="text-red-500">*</span>
                     </label>
                     <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 ${errors.cardNumber ? "border-red-500" : ""
                           }`}
                     />
                     {errors.cardNumber && (
                        <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                     )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     {/* Ngày hết hạn */}
                     <div>
                        <label htmlFor="expiryDate" className="block mb-1 font-medium">
                           Ngày hết hạn: <span className="text-red-500">*</span>
                        </label>
                        <input
                           type="text"
                           id="expiryDate"
                           name="expiryDate"
                           value={formData.expiryDate}
                           onChange={handleChange}
                           placeholder="MM/YY"
                           className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 ${errors.expiryDate ? "border-red-500" : ""
                              }`}
                        />
                        {errors.expiryDate && (
                           <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                        )}
                     </div>

                     {/* CVV */}
                     <div>
                        <label htmlFor="cvv" className="block mb-1 font-medium">
                           CVV: <span className="text-red-500">*</span>
                        </label>
                        <input
                           type="text"
                           id="cvv"
                           name="cvv"
                           value={formData.cvv}
                           onChange={handleChange}
                           placeholder="123"
                           className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 ${errors.cvv ? "border-red-500" : ""
                              }`}
                        />
                        {errors.cvv && (
                           <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                        )}
                     </div>
                  </div>

                  <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded text-sm">
                     <p className="text-yellow-800 dark:text-yellow-200">
                        <strong>Lưu ý:</strong> Đây chỉ là demo, không nhập thông tin thẻ thật của bạn.
                     </p>
                  </div>
               </div>
            );

         case 4:
            return (
               <div className="space-y-4">
                  <h2 className="text-xl font-bold mb-4">Bước 4: Xác Nhận</h2>

                  {/* Tóm tắt thông tin */}
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-4">
                     <h3 className="font-bold mb-2">Thông tin cá nhân:</h3>
                     <p>Họ và tên: {formData.firstName} {formData.lastName}</p>
                     <p>Email: {formData.email}</p>
                     {formData.phone && <p>Số điện thoại: {formData.phone}</p>}

                     <h3 className="font-bold mt-4 mb-2">Địa chỉ:</h3>
                     <p>{formData.address}</p>
                     <p>{formData.district}, {formData.city}</p>
                     {formData.zipCode && <p>Mã bưu điện: {formData.zipCode}</p>}

                     <h3 className="font-bold mt-4 mb-2">Thông tin thanh toán:</h3>
                     <p>Tên trên thẻ: {formData.cardName}</p>
                     <p>Số thẻ: **** **** **** {formData.cardNumber.slice(-4)}</p>
                     <p>Ngày hết hạn: {formData.expiryDate}</p>
                  </div>

                  {/* Điều khoản và điều kiện */}
                  <div>
                     <label className="flex items-center">
                        <input
                           type="checkbox"
                           name="agreeTerms"
                           checked={formData.agreeTerms}
                           onChange={handleChange}
                           className={`mr-2 ${errors.agreeTerms ? "border-red-500" : ""}`}
                        />
                        Tôi đồng ý với <a href="#" className="text-blue-500 hover:underline ml-1">điều khoản và điều kiện</a>
                     </label>
                     {errors.agreeTerms && (
                        <p className="text-red-500 text-sm mt-1">{errors.agreeTerms}</p>
                     )}
                  </div>

                  {/* Đăng ký nhận bản tin */}
                  <div>
                     <label className="flex items-center">
                        <input
                           type="checkbox"
                           name="receiveNewsletter"
                           checked={formData.receiveNewsletter}
                           onChange={handleChange}
                           className="mr-2"
                        />
                        Đăng ký nhận bản tin và khuyến mãi
                     </label>
                  </div>
               </div>
            );

         default:
            return null;
      }
   };

   // Render form hoàn thành
   const renderCompletedForm = () => {
      return (
         <div className="text-center py-8">
            <div className="inline-block p-4 bg-green-100 dark:bg-green-900 rounded-full mb-4">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
               </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Đặt Hàng Thành Công!</h2>
            <p className="mb-6">
               Cảm ơn {formData.firstName} {formData.lastName} đã đặt hàng.
               Chúng tôi đã gửi email xác nhận đến {formData.email}.
            </p>
            <button
               onClick={handleStartOver}
               className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
               Bắt Đầu Lại
            </button>
         </div>
      );
   };

   return (
      <div className="space-y-6">
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Demo Form Nhiều Bước</h1>
            <p className="mb-6">
               Demo này minh họa cách tạo form nhiều bước (multi-step form) trong React,
               với kiểm tra hợp lệ cho từng bước và hiển thị tiến trình.
            </p>

            {/* Giải thích code */}
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-6">
               <h3 className="font-bold mb-2">Cách Hoạt Động:</h3>
               <ul className="list-disc pl-5 space-y-2">
                  <li>Chia form thành nhiều bước nhỏ, dễ quản lý</li>
                  <li>Sử dụng state để theo dõi bước hiện tại và dữ liệu form</li>
                  <li>Kiểm tra tính hợp lệ của dữ liệu ở mỗi bước trước khi cho phép tiếp tục</li>
                  <li>Hiển thị tiến trình để người dùng biết họ đang ở đâu trong quy trình</li>
                  <li>Cho phép quay lại các bước trước để chỉnh sửa thông tin</li>
               </ul>
            </div>
         </div>

         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            {!isCompleted ? (
               <>
                  {/* Progress Bar */}
                  <div className="mb-8">
                     <div className="flex justify-between mb-2">
                        {[1, 2, 3, 4].map((step) => (
                           <div
                              key={step}
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === step
                                 ? "bg-blue-500 text-white"
                                 : currentStep > step
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                                 }`}
                           >
                              {currentStep > step ? (
                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                 </svg>
                              ) : (
                                 step
                              )}
                           </div>
                        ))}
                     </div>
                     <div className="relative">
                        <div className="absolute top-0 left-0 h-1 bg-gray-300 dark:bg-gray-600 w-full"></div>
                        <div
                           className="absolute top-0 left-0 h-1 bg-blue-500 transition-all"
                           style={{ width: `${(currentStep - 1) * 33.33}%` }}
                        ></div>
                     </div>
                     <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <div>Thông tin</div>
                        <div>Địa chỉ</div>
                        <div>Thanh toán</div>
                        <div>Xác nhận</div>
                     </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                     {/* Form Content */}
                     {renderStep()}

                     {/* Navigation Buttons */}
                     <div className="flex justify-between mt-8">
                        {currentStep > 1 && (
                           <button
                              type="button"
                              onClick={handlePrev}
                              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
                           >
                              Quay Lại
                           </button>
                        )}

                        {currentStep < 4 ? (
                           <button
                              type="button"
                              onClick={handleNext}
                              className="ml-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                           >
                              Tiếp Tục
                           </button>
                        ) : (
                           <button
                              type="submit"
                              className="ml-auto px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                           >
                              Hoàn Thành
                           </button>
                        )}
                     </div>
                  </form>
               </>
            ) : (
               renderCompletedForm()
            )}
         </div>
      </div>
   );
};

export default MultiStepFormDemo;
