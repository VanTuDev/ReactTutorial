import React, { useState, useMemo } from "react";

const TableDemo = () => {
   // Dữ liệu mẫu cho bảng
   const initialData = [
      { id: 1, name: "Nguyễn Văn A", email: "nguyenvana@example.com", role: "Admin", status: "Active", lastLogin: "2023-06-15" },
      { id: 2, name: "Trần Thị B", email: "tranthib@example.com", role: "User", status: "Active", lastLogin: "2023-06-14" },
      { id: 3, name: "Lê Văn C", email: "levanc@example.com", role: "Editor", status: "Inactive", lastLogin: "2023-06-10" },
      { id: 4, name: "Phạm Thị D", email: "phamthid@example.com", role: "User", status: "Active", lastLogin: "2023-06-13" },
      { id: 5, name: "Hoàng Văn E", email: "hoangvane@example.com", role: "Admin", status: "Suspended", lastLogin: "2023-06-08" },
      { id: 6, name: "Đỗ Thị F", email: "dothif@example.com", role: "User", status: "Active", lastLogin: "2023-06-12" },
      { id: 7, name: "Vũ Văn G", email: "vuvang@example.com", role: "Editor", status: "Active", lastLogin: "2023-06-11" },
      { id: 8, name: "Bùi Thị H", email: "buithih@example.com", role: "User", status: "Inactive", lastLogin: "2023-06-09" },
      { id: 9, name: "Đặng Văn I", email: "dangvani@example.com", role: "User", status: "Active", lastLogin: "2023-06-07" },
      { id: 10, name: "Ngô Thị K", email: "ngothik@example.com", role: "Editor", status: "Active", lastLogin: "2023-06-06" },
   ];

   // State cho dữ liệu bảng
   const [data, setData] = useState(initialData);

   // State cho sắp xếp
   const [sortConfig, setSortConfig] = useState({
      key: null,
      direction: null
   });

   // State cho tìm kiếm
   const [searchTerm, setSearchTerm] = useState("");

   // State cho phân trang
   const [currentPage, setCurrentPage] = useState(1);
   const [rowsPerPage, setRowsPerPage] = useState(5);

   // State cho các hàng được chọn
   const [selectedRows, setSelectedRows] = useState([]);

   // State cho việc chọn tất cả
   const [selectAll, setSelectAll] = useState(false);

   // State cho việc chỉnh sửa hàng
   const [editingRow, setEditingRow] = useState(null);
   const [editFormData, setEditFormData] = useState({
      name: "",
      email: "",
      role: "",
      status: ""
   });

   // Xử lý sắp xếp
   const requestSort = (key) => {
      let direction = "ascending";

      if (sortConfig.key === key && sortConfig.direction === "ascending") {
         direction = "descending";
      }

      setSortConfig({ key, direction });
   };

   // Dữ liệu đã được sắp xếp và lọc
   const sortedAndFilteredData = useMemo(() => {
      // Tạo bản sao của dữ liệu để không ảnh hưởng đến state gốc
      let sortableData = [...data];

      // Lọc dữ liệu theo từ khóa tìm kiếm
      if (searchTerm) {
         sortableData = sortableData.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.status.toLowerCase().includes(searchTerm.toLowerCase())
         );
      }

      // Sắp xếp dữ liệu nếu có cấu hình sắp xếp
      if (sortConfig.key) {
         sortableData.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
               return sortConfig.direction === "ascending" ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
               return sortConfig.direction === "ascending" ? 1 : -1;
            }
            return 0;
         });
      }

      return sortableData;
   }, [data, searchTerm, sortConfig]);

   // Dữ liệu cho trang hiện tại
   const currentData = useMemo(() => {
      const startIndex = (currentPage - 1) * rowsPerPage;
      return sortedAndFilteredData.slice(startIndex, startIndex + rowsPerPage);
   }, [sortedAndFilteredData, currentPage, rowsPerPage]);

   // Tổng số trang
   const totalPages = Math.ceil(sortedAndFilteredData.length / rowsPerPage);

   // Xử lý thay đổi trang
   const handlePageChange = (page) => {
      setCurrentPage(page);
   };

   // Xử lý thay đổi số hàng mỗi trang
   const handleRowsPerPageChange = (e) => {
      setRowsPerPage(Number(e.target.value));
      setCurrentPage(1);
   };

   // Xử lý thay đổi từ khóa tìm kiếm
   const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1);
   };

   // Xử lý chọn/bỏ chọn hàng
   const handleSelectRow = (id) => {
      if (selectedRows.includes(id)) {
         setSelectedRows(selectedRows.filter(rowId => rowId !== id));
      } else {
         setSelectedRows([...selectedRows, id]);
      }
   };

   // Xử lý chọn/bỏ chọn tất cả
   const handleSelectAll = () => {
      if (selectAll) {
         setSelectedRows([]);
      } else {
         setSelectedRows(currentData.map(row => row.id));
      }
      setSelectAll(!selectAll);
   };

   // Xử lý xóa hàng
   const handleDeleteRow = (id) => {
      setData(data.filter(row => row.id !== id));
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
   };

   // Xử lý xóa nhiều hàng
   const handleDeleteSelected = () => {
      setData(data.filter(row => !selectedRows.includes(row.id)));
      setSelectedRows([]);
      setSelectAll(false);
   };

   // Xử lý bắt đầu chỉnh sửa hàng
   const handleEditClick = (row) => {
      setEditingRow(row.id);
      setEditFormData({
         name: row.name,
         email: row.email,
         role: row.role,
         status: row.status
      });
   };

   // Xử lý thay đổi form chỉnh sửa
   const handleEditFormChange = (e) => {
      const { name, value } = e.target;
      setEditFormData({
         ...editFormData,
         [name]: value
      });
   };

   // Xử lý lưu chỉnh sửa
   const handleEditSave = () => {
      setData(data.map(row => {
         if (row.id === editingRow) {
            return {
               ...row,
               name: editFormData.name,
               email: editFormData.email,
               role: editFormData.role,
               status: editFormData.status
            };
         }
         return row;
      }));

      setEditingRow(null);
   };

   // Xử lý hủy chỉnh sửa
   const handleEditCancel = () => {
      setEditingRow(null);
   };

   // Lấy biểu tượng sắp xếp
   const getSortIcon = (key) => {
      if (sortConfig.key !== key) {
         return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
         );
      }

      return sortConfig.direction === "ascending" ? (
         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
         </svg>
      ) : (
         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
         </svg>
      );
   };

   // Lấy màu cho trạng thái
   const getStatusColor = (status) => {
      switch (status) {
         case "Active":
            return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
         case "Inactive":
            return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
         case "Suspended":
            return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
         default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      }
   };

   return (
      <div className="space-y-6">
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Demo Bảng Dữ Liệu</h1>
            <p className="mb-6">
               Demo này minh họa cách tạo và sử dụng bảng dữ liệu trong React với các tính năng như
               sắp xếp, tìm kiếm, phân trang, chọn hàng và chỉnh sửa dữ liệu.
            </p>

            {/* Giải thích code */}
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-6">
               <h3 className="font-bold mb-2">Cách Hoạt Động:</h3>
               <ul className="list-disc pl-5 space-y-2">
                  <li>Sử dụng state để quản lý dữ liệu bảng và các tùy chọn hiển thị</li>
                  <li>Tính năng sắp xếp cho phép sắp xếp dữ liệu theo các cột khác nhau</li>
                  <li>Tìm kiếm lọc dữ liệu dựa trên từ khóa người dùng nhập</li>
                  <li>Phân trang chia dữ liệu thành các trang nhỏ hơn để dễ dàng duyệt qua</li>
                  <li>Chọn hàng cho phép thực hiện các thao tác hàng loạt trên nhiều hàng</li>
                  <li>Chỉnh sửa dữ liệu cho phép cập nhật thông tin trực tiếp trong bảng</li>
               </ul>
            </div>
         </div>

         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            {/* Table Controls */}
            <div className="flex flex-col md:flex-row justify-between mb-4 space-y-2 md:space-y-0">
               {/* Search */}
               <div className="md:w-1/3">
                  <input
                     type="text"
                     placeholder="Tìm kiếm..."
                     value={searchTerm}
                     onChange={handleSearchChange}
                     className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
               </div>

               <div className="flex space-x-2">
                  {/* Bulk Actions */}
                  {selectedRows.length > 0 && (
                     <button
                        onClick={handleDeleteSelected}
                        className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                     >
                        Xóa ({selectedRows.length})
                     </button>
                  )}

                  {/* Rows Per Page */}
                  <div className="flex items-center space-x-2">
                     <label className="text-sm">Hiển thị:</label>
                     <select
                        value={rowsPerPage}
                        onChange={handleRowsPerPageChange}
                        className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                     >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                     </select>
                  </div>
               </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
               <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                     <tr>
                        <th className="w-12 px-4 py-3">
                           <input
                              type="checkbox"
                              checked={selectAll}
                              onChange={handleSelectAll}
                              className="rounded"
                           />
                        </th>
                        <th
                           className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                           onClick={() => requestSort("name")}
                        >
                           <div className="flex items-center space-x-1">
                              <span>Tên</span>
                              <span>{getSortIcon("name")}</span>
                           </div>
                        </th>
                        <th
                           className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                           onClick={() => requestSort("email")}
                        >
                           <div className="flex items-center space-x-1">
                              <span>Email</span>
                              <span>{getSortIcon("email")}</span>
                           </div>
                        </th>
                        <th
                           className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                           onClick={() => requestSort("role")}
                        >
                           <div className="flex items-center space-x-1">
                              <span>Vai trò</span>
                              <span>{getSortIcon("role")}</span>
                           </div>
                        </th>
                        <th
                           className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                           onClick={() => requestSort("status")}
                        >
                           <div className="flex items-center space-x-1">
                              <span>Trạng thái</span>
                              <span>{getSortIcon("status")}</span>
                           </div>
                        </th>
                        <th
                           className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                           onClick={() => requestSort("lastLogin")}
                        >
                           <div className="flex items-center space-x-1">
                              <span>Đăng nhập cuối</span>
                              <span>{getSortIcon("lastLogin")}</span>
                           </div>
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                           Thao tác
                        </th>
                     </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                     {currentData.map(row => (
                        <tr
                           key={row.id}
                           className={selectedRows.includes(row.id) ? "bg-blue-50 dark:bg-blue-900" : ""}
                        >
                           <td className="px-4 py-3 whitespace-nowrap">
                              <input
                                 type="checkbox"
                                 checked={selectedRows.includes(row.id)}
                                 onChange={() => handleSelectRow(row.id)}
                                 className="rounded"
                              />
                           </td>
                           <td className="px-4 py-3 whitespace-nowrap">
                              {editingRow === row.id ? (
                                 <input
                                    type="text"
                                    name="name"
                                    value={editFormData.name}
                                    onChange={handleEditFormChange}
                                    className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                                 />
                              ) : (
                                 row.name
                              )}
                           </td>
                           <td className="px-4 py-3 whitespace-nowrap">
                              {editingRow === row.id ? (
                                 <input
                                    type="email"
                                    name="email"
                                    value={editFormData.email}
                                    onChange={handleEditFormChange}
                                    className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                                 />
                              ) : (
                                 row.email
                              )}
                           </td>
                           <td className="px-4 py-3 whitespace-nowrap">
                              {editingRow === row.id ? (
                                 <select
                                    name="role"
                                    value={editFormData.role}
                                    onChange={handleEditFormChange}
                                    className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                                 >
                                    <option value="Admin">Admin</option>
                                    <option value="Editor">Editor</option>
                                    <option value="User">User</option>
                                 </select>
                              ) : (
                                 row.role
                              )}
                           </td>
                           <td className="px-4 py-3 whitespace-nowrap">
                              {editingRow === row.id ? (
                                 <select
                                    name="status"
                                    value={editFormData.status}
                                    onChange={handleEditFormChange}
                                    className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                                 >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Suspended">Suspended</option>
                                 </select>
                              ) : (
                                 <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(row.status)}`}>
                                    {row.status}
                                 </span>
                              )}
                           </td>
                           <td className="px-4 py-3 whitespace-nowrap">
                              {row.lastLogin}
                           </td>
                           <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                              {editingRow === row.id ? (
                                 <div className="flex space-x-2 justify-end">
                                    <button
                                       onClick={handleEditSave}
                                       className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
                                    >
                                       Lưu
                                    </button>
                                    <button
                                       onClick={handleEditCancel}
                                       className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                                    >
                                       Hủy
                                    </button>
                                 </div>
                              ) : (
                                 <div className="flex space-x-2 justify-end">
                                    <button
                                       onClick={() => handleEditClick(row)}
                                       className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                                    >
                                       Sửa
                                    </button>
                                    <button
                                       onClick={() => handleDeleteRow(row.id)}
                                       className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
                                    >
                                       Xóa
                                    </button>
                                 </div>
                              )}
                           </td>
                        </tr>
                     ))}

                     {currentData.length === 0 && (
                        <tr>
                           <td colSpan="7" className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                              {searchTerm ? "Không tìm thấy kết quả nào." : "Không có dữ liệu."}
                           </td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-4">
               <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 md:mb-0">
                  Hiển thị {currentData.length} trong số {sortedAndFilteredData.length} bản ghi
               </div>

               <div className="flex space-x-1">
                  <button
                     onClick={() => handlePageChange(1)}
                     disabled={currentPage === 1}
                     className={`px-3 py-1 rounded ${currentPage === 1
                        ? "bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500"
                        : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                        }`}
                  >
                     &laquo;
                  </button>

                  <button
                     onClick={() => handlePageChange(currentPage - 1)}
                     disabled={currentPage === 1}
                     className={`px-3 py-1 rounded ${currentPage === 1
                        ? "bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500"
                        : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                        }`}
                  >
                     &lsaquo;
                  </button>

                  {[...Array(totalPages)].map((_, index) => {
                     const page = index + 1;
                     // Hiển thị trang hiện tại và các trang lân cận
                     if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                     ) {
                        return (
                           <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`px-3 py-1 rounded ${currentPage === page
                                 ? "bg-blue-500 text-white"
                                 : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                                 }`}
                           >
                              {page}
                           </button>
                        );
                     }

                     // Hiển thị dấu chấm lửng
                     if (page === currentPage - 2 || page === currentPage + 2) {
                        return (
                           <span key={page} className="px-3 py-1">
                              ...
                           </span>
                        );
                     }

                     return null;
                  })}

                  <button
                     onClick={() => handlePageChange(currentPage + 1)}
                     disabled={currentPage === totalPages}
                     className={`px-3 py-1 rounded ${currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500"
                        : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                        }`}
                  >
                     &rsaquo;
                  </button>

                  <button
                     onClick={() => handlePageChange(totalPages)}
                     disabled={currentPage === totalPages}
                     className={`px-3 py-1 rounded ${currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500"
                        : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                        }`}
                  >
                     &raquo;
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default TableDemo;
