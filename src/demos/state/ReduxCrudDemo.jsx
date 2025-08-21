import React, { useState, useReducer } from "react";

// Mô phỏng Redux store và hooks

// Action Types
const ADD_PRODUCT = "ADD_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const SET_FILTER = "SET_FILTER";
const SET_SORT = "SET_SORT";

// Action Creators
const addProduct = (product) => ({
   type: ADD_PRODUCT,
   payload: product,
});

const updateProduct = (product) => ({
   type: UPDATE_PRODUCT,
   payload: product,
});

const deleteProduct = (id) => ({
   type: DELETE_PRODUCT,
   payload: id,
});

const setFilter = (filter) => ({
   type: SET_FILTER,
   payload: filter,
});

const setSort = (sort) => ({
   type: SET_SORT,
   payload: sort,
});

// Initial State
const initialState = {
   products: [
      { id: 1, name: "iPhone 15", category: "Điện thoại", price: 22990000, stock: 15 },
      { id: 2, name: "Samsung Galaxy S23", category: "Điện thoại", price: 19990000, stock: 20 },
      { id: 3, name: "MacBook Air M2", category: "Laptop", price: 26490000, stock: 10 },
      { id: 4, name: "iPad Pro", category: "Máy tính bảng", price: 23990000, stock: 12 },
      { id: 5, name: "AirPods Pro", category: "Tai nghe", price: 6790000, stock: 30 },
   ],
   filter: {
      category: "",
      minPrice: "",
      maxPrice: "",
      inStock: false,
   },
   sort: {
      field: "name",
      direction: "asc",
   },
};

// Reducer
const reducer = (state, action) => {
   switch (action.type) {
      case ADD_PRODUCT:
         return {
            ...state,
            products: [...state.products, { ...action.payload, id: Date.now() }],
         };
      case UPDATE_PRODUCT:
         return {
            ...state,
            products: state.products.map((product) =>
               product.id === action.payload.id ? action.payload : product
            ),
         };
      case DELETE_PRODUCT:
         return {
            ...state,
            products: state.products.filter((product) => product.id !== action.payload),
         };
      case SET_FILTER:
         return {
            ...state,
            filter: action.payload,
         };
      case SET_SORT:
         return {
            ...state,
            sort: action.payload,
         };
      default:
         return state;
   }
};

// Selectors
const selectFilteredSortedProducts = (state) => {
   const { products, filter, sort } = state;

   // Lọc sản phẩm
   let filteredProducts = products.filter((product) => {
      // Lọc theo danh mục
      if (filter.category && product.category !== filter.category) {
         return false;
      }

      // Lọc theo giá tối thiểu
      if (filter.minPrice && product.price < parseFloat(filter.minPrice)) {
         return false;
      }

      // Lọc theo giá tối đa
      if (filter.maxPrice && product.price > parseFloat(filter.maxPrice)) {
         return false;
      }

      // Lọc theo tình trạng còn hàng
      if (filter.inStock && product.stock === 0) {
         return false;
      }

      return true;
   });

   // Sắp xếp sản phẩm
   filteredProducts.sort((a, b) => {
      const fieldA = a[sort.field];
      const fieldB = b[sort.field];

      if (sort.direction === "asc") {
         return fieldA > fieldB ? 1 : fieldA < fieldB ? -1 : 0;
      } else {
         return fieldA < fieldB ? 1 : fieldA > fieldB ? -1 : 0;
      }
   });

   return filteredProducts;
};

const selectCategories = (state) => {
   // Lấy danh sách các danh mục duy nhất
   const categories = [...new Set(state.products.map((product) => product.category))];
   return categories;
};

const ReduxCrudDemo = () => {
   // Sử dụng useReducer để mô phỏng Redux store
   const [state, dispatch] = useReducer(reducer, initialState);

   // State cho form thêm/sửa sản phẩm
   const [formData, setFormData] = useState({
      id: null,
      name: "",
      category: "",
      price: "",
      stock: "",
   });

   // State cho việc đang chỉnh sửa hay thêm mới
   const [isEditing, setIsEditing] = useState(false);

   // Lấy danh sách sản phẩm đã lọc và sắp xếp
   const filteredSortedProducts = selectFilteredSortedProducts(state);

   // Lấy danh sách danh mục
   const categories = selectCategories(state);

   // Xử lý thay đổi form
   const handleFormChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
         ...formData,
         [name]: type === "checkbox" ? checked : value,
      });
   };

   // Xử lý gửi form
   const handleFormSubmit = (e) => {
      e.preventDefault();

      // Chuyển đổi giá và số lượng sang số
      const product = {
         ...formData,
         price: parseFloat(formData.price),
         stock: parseInt(formData.stock),
      };

      if (isEditing) {
         dispatch(updateProduct(product));
      } else {
         dispatch(addProduct(product));
      }

      // Reset form
      resetForm();
   };

   // Xử lý chỉnh sửa sản phẩm
   const handleEdit = (product) => {
      setFormData(product);
      setIsEditing(true);
   };

   // Xử lý xóa sản phẩm
   const handleDelete = (id) => {
      if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
         dispatch(deleteProduct(id));
      }
   };

   // Reset form
   const resetForm = () => {
      setFormData({
         id: null,
         name: "",
         category: "",
         price: "",
         stock: "",
      });
      setIsEditing(false);
   };

   // Xử lý thay đổi bộ lọc
   const handleFilterChange = (e) => {
      const { name, value, type, checked } = e.target;

      dispatch(
         setFilter({
            ...state.filter,
            [name]: type === "checkbox" ? checked : value,
         })
      );
   };

   // Xử lý thay đổi sắp xếp
   const handleSortChange = (field) => {
      const direction =
         state.sort.field === field && state.sort.direction === "asc" ? "desc" : "asc";

      dispatch(
         setSort({
            field,
            direction,
         })
      );
   };

   // Format giá tiền
   const formatPrice = (price) => {
      return new Intl.NumberFormat("vi-VN", {
         style: "currency",
         currency: "VND",
      }).format(price);
   };

   return (
      <div className="space-y-6">
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Demo Redux CRUD</h1>
            <p className="mb-6">
               Demo này minh họa cách sử dụng Redux để quản lý state trong một ứng dụng CRUD (Create, Read, Update, Delete)
               đơn giản. Redux là một thư viện quản lý state tập trung, giúp quản lý dữ liệu trong các ứng dụng lớn và phức tạp.
               Demo này mô phỏng hoạt động của Redux với một ứng dụng quản lý sản phẩm.
            </p>

            {/* Giải thích code */}
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-6">
               <h3 className="font-bold mb-2">Cách Redux Hoạt Động:</h3>
               <ul className="list-disc pl-5 space-y-2">
                  <li>Tất cả state được lưu trữ trong một store duy nhất</li>
                  <li>State chỉ có thể thay đổi bằng cách dispatch actions</li>
                  <li>Reducers xác định cách state thay đổi dựa trên actions</li>
                  <li>Selectors giúp truy xuất và tính toán dữ liệu từ state</li>
                  <li>Components kết nối với store để đọc state và dispatch actions</li>
               </ul>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Product Form */}
            <div className="md:col-span-1">
               <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <h2 className="text-xl font-bold mb-4">
                     {isEditing ? "Chỉnh Sửa Sản Phẩm" : "Thêm Sản Phẩm"}
                  </h2>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                     <div>
                        <label htmlFor="name" className="block mb-1 font-medium">
                           Tên sản phẩm:
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
                        <label htmlFor="category" className="block mb-1 font-medium">
                           Danh mục:
                        </label>
                        <input
                           type="text"
                           id="category"
                           name="category"
                           value={formData.category}
                           onChange={handleFormChange}
                           className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                           required
                        />
                     </div>

                     <div>
                        <label htmlFor="price" className="block mb-1 font-medium">
                           Giá (VNĐ):
                        </label>
                        <input
                           type="number"
                           id="price"
                           name="price"
                           value={formData.price}
                           onChange={handleFormChange}
                           className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                           min="0"
                           required
                        />
                     </div>

                     <div>
                        <label htmlFor="stock" className="block mb-1 font-medium">
                           Số lượng:
                        </label>
                        <input
                           type="number"
                           id="stock"
                           name="stock"
                           value={formData.stock}
                           onChange={handleFormChange}
                           className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                           min="0"
                           required
                        />
                     </div>

                     <div className="flex space-x-2">
                        <button
                           type="submit"
                           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                           {isEditing ? "Cập Nhật" : "Thêm"}
                        </button>

                        {isEditing && (
                           <button
                              type="button"
                              onClick={resetForm}
                              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                           >
                              Hủy
                           </button>
                        )}
                     </div>
                  </form>
               </div>

               {/* Filter Panel */}
               <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mt-6">
                  <h2 className="text-xl font-bold mb-4">Bộ Lọc</h2>

                  <div className="space-y-4">
                     <div>
                        <label htmlFor="category-filter" className="block mb-1 font-medium">
                           Danh mục:
                        </label>
                        <select
                           id="category-filter"
                           name="category"
                           value={state.filter.category}
                           onChange={handleFilterChange}
                           className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                        >
                           <option value="">Tất cả</option>
                           {categories.map((category) => (
                              <option key={category} value={category}>
                                 {category}
                              </option>
                           ))}
                        </select>
                     </div>

                     <div>
                        <label htmlFor="minPrice" className="block mb-1 font-medium">
                           Giá tối thiểu:
                        </label>
                        <input
                           type="number"
                           id="minPrice"
                           name="minPrice"
                           value={state.filter.minPrice}
                           onChange={handleFilterChange}
                           className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                           min="0"
                        />
                     </div>

                     <div>
                        <label htmlFor="maxPrice" className="block mb-1 font-medium">
                           Giá tối đa:
                        </label>
                        <input
                           type="number"
                           id="maxPrice"
                           name="maxPrice"
                           value={state.filter.maxPrice}
                           onChange={handleFilterChange}
                           className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                           min="0"
                        />
                     </div>

                     <div>
                        <label className="flex items-center">
                           <input
                              type="checkbox"
                              name="inStock"
                              checked={state.filter.inStock}
                              onChange={handleFilterChange}
                              className="mr-2"
                           />
                           Chỉ hiển thị sản phẩm còn hàng
                        </label>
                     </div>
                  </div>
               </div>
            </div>

            {/* Product List */}
            <div className="md:col-span-2">
               <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <div className="flex justify-between items-center mb-4">
                     <h2 className="text-xl font-bold">Danh Sách Sản Phẩm</h2>
                     <span className="text-sm text-gray-500 dark:text-gray-400">
                        {filteredSortedProducts.length} sản phẩm
                     </span>
                  </div>

                  <div className="overflow-x-auto">
                     <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                           <tr>
                              <th
                                 className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                                 onClick={() => handleSortChange("name")}
                              >
                                 <div className="flex items-center">
                                    <span>Tên sản phẩm</span>
                                    {state.sort.field === "name" && (
                                       <span className="ml-1">
                                          {state.sort.direction === "asc" ? "▲" : "▼"}
                                       </span>
                                    )}
                                 </div>
                              </th>
                              <th
                                 className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                                 onClick={() => handleSortChange("category")}
                              >
                                 <div className="flex items-center">
                                    <span>Danh mục</span>
                                    {state.sort.field === "category" && (
                                       <span className="ml-1">
                                          {state.sort.direction === "asc" ? "▲" : "▼"}
                                       </span>
                                    )}
                                 </div>
                              </th>
                              <th
                                 className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                                 onClick={() => handleSortChange("price")}
                              >
                                 <div className="flex items-center">
                                    <span>Giá</span>
                                    {state.sort.field === "price" && (
                                       <span className="ml-1">
                                          {state.sort.direction === "asc" ? "▲" : "▼"}
                                       </span>
                                    )}
                                 </div>
                              </th>
                              <th
                                 className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                                 onClick={() => handleSortChange("stock")}
                              >
                                 <div className="flex items-center">
                                    <span>Số lượng</span>
                                    {state.sort.field === "stock" && (
                                       <span className="ml-1">
                                          {state.sort.direction === "asc" ? "▲" : "▼"}
                                       </span>
                                    )}
                                 </div>
                              </th>
                              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                 Thao tác
                              </th>
                           </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                           {filteredSortedProducts.length > 0 ? (
                              filteredSortedProducts.map((product) => (
                                 <tr key={product.id}>
                                    <td className="px-4 py-2 whitespace-nowrap">{product.name}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{product.category}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">
                                       {formatPrice(product.price)}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap">
                                       <span
                                          className={`px-2 py-1 text-xs rounded-full ${product.stock > 0
                                             ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                             : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                             }`}
                                       >
                                          {product.stock > 0 ? `${product.stock} sản phẩm` : "Hết hàng"}
                                       </span>
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                                       <button
                                          onClick={() => handleEdit(product)}
                                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 mr-2"
                                       >
                                          Sửa
                                       </button>
                                       <button
                                          onClick={() => handleDelete(product.id)}
                                          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
                                       >
                                          Xóa
                                       </button>
                                    </td>
                                 </tr>
                              ))
                           ) : (
                              <tr>
                                 <td colSpan="5" className="px-4 py-4 text-center text-gray-500 dark:text-gray-400">
                                    Không tìm thấy sản phẩm nào.
                                 </td>
                              </tr>
                           )}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div>

         {/* Code Example */}
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Ví Dụ Code Redux</h2>

            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded overflow-auto">
               <pre className="text-sm">
                  {`// Cài đặt Redux
// npm install redux react-redux @reduxjs/toolkit

// Tạo slice với Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    filter: {
      category: '',
      minPrice: '',
      maxPrice: '',
      inStock: false,
    },
    sort: {
      field: 'name',
      direction: 'asc',
    },
  },
  reducers: {
    // Tự động tạo action creators và reducers
    addProduct: (state, action) => {
      state.items.push({ ...action.payload, id: Date.now() });
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

// Export actions và reducer
export const { addProduct, updateProduct, deleteProduct, setFilter, setSort } = productsSlice.actions;
export default productsSlice.reducer;

// Tạo store
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

// Sử dụng trong component
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, updateProduct, deleteProduct } from './productsSlice';

function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items);
  
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };
  
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          {product.name} - {product.price}
          <button onClick={() => handleDelete(product.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}`}
               </pre>
            </div>
         </div>
      </div>
   );
};

export default ReduxCrudDemo;
