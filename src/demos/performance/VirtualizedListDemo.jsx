import React, { useState, useRef, useCallback, useEffect } from "react";

// Mô phỏng thư viện react-window
const VirtualizedList = ({
   items,
   height,
   itemHeight,
   renderItem,
   overscan = 3,
}) => {
   const [scrollTop, setScrollTop] = useState(0);
   const containerRef = useRef(null);

   // Tính toán các chỉ số của các item hiển thị
   const totalHeight = items.length * itemHeight;
   const visibleItemCount = Math.ceil(height / itemHeight);
   const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
   const endIndex = Math.min(
      items.length - 1,
      Math.floor((scrollTop + height) / itemHeight) + overscan
   );

   // Xử lý sự kiện scroll
   const handleScroll = useCallback((e) => {
      setScrollTop(e.target.scrollTop);
   }, []);

   // Tạo danh sách các item hiển thị
   const visibleItems = [];
   for (let i = startIndex; i <= endIndex; i++) {
      visibleItems.push({
         index: i,
         item: items[i],
         style: {
            position: "absolute",
            top: `${i * itemHeight}px`,
            height: `${itemHeight}px`,
            left: 0,
            right: 0,
         },
      });
   }

   return (
      <div
         ref={containerRef}
         onScroll={handleScroll}
         style={{
            height,
            overflow: "auto",
            position: "relative",
         }}
      >
         <div style={{ height: totalHeight, position: "relative" }}>
            {visibleItems.map(({ index, item, style }) => (
               <div key={index} style={style}>
                  {renderItem({ index, item })}
               </div>
            ))}
         </div>
      </div>
   );
};

// Mô phỏng thư viện react-virtualized
const AutoSizer = ({ children }) => {
   const [size, setSize] = useState({ width: 0, height: 0 });
   const containerRef = useRef(null);

   useEffect(() => {
      if (!containerRef.current) return;

      const observer = new ResizeObserver(entries => {
         const { width, height } = entries[0].contentRect;
         setSize({ width, height });
      });

      observer.observe(containerRef.current);

      return () => {
         observer.disconnect();
      };
   }, []);

   return (
      <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
         {size.width > 0 && size.height > 0 && children(size)}
      </div>
   );
};

// Mô phỏng thư viện react-window với grid
const VirtualizedGrid = ({
   items,
   height,
   width,
   columnCount,
   columnWidth,
   rowHeight,
   renderItem,
   overscan = 1,
}) => {
   const [scrollTop, setScrollTop] = useState(0);
   const containerRef = useRef(null);

   // Tính toán số hàng
   const rowCount = Math.ceil(items.length / columnCount);
   const totalHeight = rowCount * rowHeight;

   // Tính toán các chỉ số của các item hiển thị
   const visibleRowCount = Math.ceil(height / rowHeight);
   const startRowIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
   const endRowIndex = Math.min(
      rowCount - 1,
      Math.floor((scrollTop + height) / rowHeight) + overscan
   );

   // Xử lý sự kiện scroll
   const handleScroll = useCallback((e) => {
      setScrollTop(e.target.scrollTop);
   }, []);

   // Tạo danh sách các item hiển thị
   const visibleItems = [];
   for (let rowIndex = startRowIndex; rowIndex <= endRowIndex; rowIndex++) {
      for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
         const itemIndex = rowIndex * columnCount + columnIndex;
         if (itemIndex < items.length) {
            visibleItems.push({
               rowIndex,
               columnIndex,
               itemIndex,
               item: items[itemIndex],
               style: {
                  position: "absolute",
                  top: `${rowIndex * rowHeight}px`,
                  left: `${columnIndex * columnWidth}px`,
                  height: `${rowHeight}px`,
                  width: `${columnWidth}px`,
               },
            });
         }
      }
   }

   return (
      <div
         ref={containerRef}
         onScroll={handleScroll}
         style={{
            height,
            width,
            overflow: "auto",
            position: "relative",
         }}
      >
         <div style={{ height: totalHeight, position: "relative" }}>
            {visibleItems.map(({ rowIndex, columnIndex, itemIndex, item, style }) => (
               <div key={itemIndex} style={style}>
                  {renderItem({ rowIndex, columnIndex, itemIndex, item })}
               </div>
            ))}
         </div>
      </div>
   );
};

// Tạo dữ liệu mẫu
const generateItems = (count) => {
   return Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      name: `Item ${index + 1}`,
      description: `This is the description for item ${index + 1}. It contains some text to demonstrate the virtualized list.`,
      image: `https://placehold.co/40x40?text=${index + 1}`,
      tags: ["tag1", "tag2", "tag3"].slice(0, Math.floor(Math.random() * 3) + 1),
      date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString(),
   }));
};

// Component chính
const VirtualizedListDemo = () => {
   // State cho số lượng items
   const [itemCount, setItemCount] = useState(10000);

   // State cho loại danh sách
   const [listType, setListType] = useState("simple");

   // State cho việc hiển thị danh sách thông thường
   const [showRegularList, setShowRegularList] = useState(false);

   // Tạo dữ liệu
   const items = generateItems(itemCount);

   // Xử lý thay đổi số lượng items
   const handleItemCountChange = (e) => {
      setItemCount(Number(e.target.value));
   };

   // Xử lý thay đổi loại danh sách
   const handleListTypeChange = (type) => {
      setListType(type);
   };

   // Render item đơn giản
   const renderSimpleItem = ({ index, item }) => (
      <div className="p-2 border-b dark:border-gray-700 flex items-center">
         <span className="font-medium mr-2">{item.id}.</span>
         <span>{item.name}</span>
      </div>
   );

   // Render item phức tạp
   const renderComplexItem = ({ index, item }) => (
      <div className="p-3 border-b dark:border-gray-700 flex">
         <img
            src={item.image}
            alt={item.name}
            className="w-10 h-10 rounded mr-3"
         />
         <div className="flex-1">
            <div className="flex justify-between items-start">
               <h3 className="font-medium">{item.name}</h3>
               <span className="text-xs text-gray-500 dark:text-gray-400">{item.date}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
               {item.description}
            </p>
            <div className="flex mt-2">
               {item.tags.map((tag) => (
                  <span
                     key={tag}
                     className="text-xs bg-gray-200 dark:bg-gray-700 rounded px-2 py-1 mr-1"
                  >
                     {tag}
                  </span>
               ))}
            </div>
         </div>
      </div>
   );

   // Render item grid
   const renderGridItem = ({ itemIndex, item }) => (
      <div className="p-2 h-full border dark:border-gray-700 rounded flex flex-col items-center justify-center">
         <img
            src={item.image}
            alt={item.name}
            className="w-10 h-10 mb-2"
         />
         <div className="text-center">
            <div className="font-medium">{item.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{item.date}</div>
         </div>
      </div>
   );

   return (
      <div className="space-y-6">
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Demo Virtualized List</h1>
            <p className="mb-6">
               Demo này minh họa cách sử dụng kỹ thuật virtualization để hiển thị danh sách lớn một cách hiệu quả.
               Virtualization chỉ render các phần tử hiển thị trong viewport, giúp cải thiện hiệu suất đáng kể
               khi làm việc với danh sách có hàng nghìn mục.
            </p>

            {/* Giải thích code */}
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-6">
               <h3 className="font-bold mb-2">Cách Hoạt Động:</h3>
               <ul className="list-disc pl-5 space-y-2">
                  <li>Chỉ render các phần tử hiện đang hiển thị trong viewport và một số phần tử xung quanh</li>
                  <li>Tính toán vị trí và kích thước của mỗi phần tử dựa trên scroll position</li>
                  <li>Sử dụng absolute positioning để đặt các phần tử đúng vị trí</li>
                  <li>Theo dõi sự kiện scroll để cập nhật danh sách các phần tử hiển thị</li>
                  <li>Cải thiện đáng kể hiệu suất khi làm việc với danh sách lớn (hàng nghìn mục)</li>
               </ul>
            </div>
         </div>

         {/* Controls */}
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Tùy Chọn</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {/* Item Count */}
               <div>
                  <label htmlFor="itemCount" className="block mb-1 font-medium">
                     Số lượng items:
                  </label>
                  <input
                     type="range"
                     id="itemCount"
                     min="100"
                     max="50000"
                     step="100"
                     value={itemCount}
                     onChange={handleItemCountChange}
                     className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                     <span>100</span>
                     <span>{itemCount.toLocaleString()}</span>
                     <span>50,000</span>
                  </div>
               </div>

               {/* List Type */}
               <div>
                  <p className="mb-1 font-medium">Loại danh sách:</p>
                  <div className="space-y-1">
                     <label className="flex items-center">
                        <input
                           type="radio"
                           name="listType"
                           checked={listType === "simple"}
                           onChange={() => handleListTypeChange("simple")}
                           className="mr-2"
                        />
                        Danh sách đơn giản
                     </label>
                     <label className="flex items-center">
                        <input
                           type="radio"
                           name="listType"
                           checked={listType === "complex"}
                           onChange={() => handleListTypeChange("complex")}
                           className="mr-2"
                        />
                        Danh sách phức tạp
                     </label>
                     <label className="flex items-center">
                        <input
                           type="radio"
                           name="listType"
                           checked={listType === "grid"}
                           onChange={() => handleListTypeChange("grid")}
                           className="mr-2"
                        />
                        Lưới
                     </label>
                  </div>
               </div>

               {/* Toggle Regular List */}
               <div>
                  <label className="flex items-center">
                     <input
                        type="checkbox"
                        checked={showRegularList}
                        onChange={() => setShowRegularList(!showRegularList)}
                        className="mr-2"
                     />
                     Hiển thị danh sách thông thường (cẩn thận với số lượng lớn!)
                  </label>

                  <div className="mt-2 text-xs text-red-500">
                     {showRegularList && itemCount > 1000 && (
                        <p>
                           Cảnh báo: Hiển thị {itemCount.toLocaleString()} items cùng lúc có thể làm trình duyệt bị đơ!
                        </p>
                     )}
                  </div>
               </div>
            </div>
         </div>

         {/* Lists */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Virtualized List */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h2 className="text-xl font-bold mb-4">Danh Sách Ảo Hóa</h2>
               <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  Chỉ render {listType === "grid" ? "khoảng 30-50" : "khoảng 10-20"} items cùng lúc, bất kể kích thước danh sách.
               </p>

               <div className="h-80 border dark:border-gray-700 rounded">
                  {listType === "simple" && (
                     <VirtualizedList
                        items={items}
                        height={320}
                        itemHeight={40}
                        renderItem={renderSimpleItem}
                     />
                  )}

                  {listType === "complex" && (
                     <VirtualizedList
                        items={items}
                        height={320}
                        itemHeight={100}
                        renderItem={renderComplexItem}
                     />
                  )}

                  {listType === "grid" && (
                     <AutoSizer>
                        {({ width, height }) => (
                           <VirtualizedGrid
                              items={items}
                              height={height}
                              width={width}
                              columnCount={4}
                              columnWidth={width / 4}
                              rowHeight={100}
                              renderItem={renderGridItem}
                           />
                        )}
                     </AutoSizer>
                  )}
               </div>
            </div>

            {/* Regular List */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h2 className="text-xl font-bold mb-4">Danh Sách Thông Thường</h2>
               <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  Render tất cả {itemCount.toLocaleString()} items cùng lúc, có thể gây ra vấn đề hiệu suất.
               </p>

               {showRegularList ? (
                  <div className="h-80 border dark:border-gray-700 rounded overflow-auto">
                     {listType === "simple" && (
                        <div>
                           {items.map((item, index) => (
                              <div key={item.id} className="p-2 border-b dark:border-gray-700 flex items-center">
                                 <span className="font-medium mr-2">{item.id}.</span>
                                 <span>{item.name}</span>
                              </div>
                           ))}
                        </div>
                     )}

                     {listType === "complex" && (
                        <div>
                           {items.map((item, index) => (
                              <div key={item.id} className="p-3 border-b dark:border-gray-700 flex">
                                 <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-10 h-10 rounded mr-3"
                                 />
                                 <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                       <h3 className="font-medium">{item.name}</h3>
                                       <span className="text-xs text-gray-500 dark:text-gray-400">{item.date}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                       {item.description}
                                    </p>
                                    <div className="flex mt-2">
                                       {item.tags.map((tag) => (
                                          <span
                                             key={tag}
                                             className="text-xs bg-gray-200 dark:bg-gray-700 rounded px-2 py-1 mr-1"
                                          >
                                             {tag}
                                          </span>
                                       ))}
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     )}

                     {listType === "grid" && (
                        <div className="grid grid-cols-4 gap-2">
                           {items.map((item, index) => (
                              <div
                                 key={item.id}
                                 className="p-2 border dark:border-gray-700 rounded flex flex-col items-center justify-center"
                              >
                                 <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-10 h-10 mb-2"
                                 />
                                 <div className="text-center">
                                    <div className="font-medium">{item.name}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">{item.date}</div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     )}
                  </div>
               ) : (
                  <div className="h-80 border dark:border-gray-700 rounded flex items-center justify-center">
                     <p className="text-gray-500 dark:text-gray-400">
                        Bật tùy chọn "Hiển thị danh sách thông thường" để xem.
                     </p>
                  </div>
               )}
            </div>
         </div>

         {/* Code Example */}
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Ví Dụ Code</h2>

            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded overflow-auto">
               <pre className="text-sm">
                  {`// Sử dụng react-window để virtualization
// npm install react-window

import React from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

// Component hiển thị mỗi item trong danh sách
const Row = ({ index, style, data }) => {
  const item = data[index];
  
  return (
    <div style={style} className="flex items-center border-b p-2">
      <span className="font-medium mr-2">{item.id}.</span>
      <span>{item.name}</span>
    </div>
  );
};

// Component danh sách ảo hóa
function VirtualizedList({ items }) {
  return (
    <div style={{ height: '400px', width: '100%' }}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            itemCount={items.length}
            itemSize={35} // Chiều cao của mỗi item
            width={width}
            itemData={items}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </div>
  );
}

// Sử dụng Grid cho layout dạng lưới
import { FixedSizeGrid as Grid } from 'react-window';

const Cell = ({ columnIndex, rowIndex, style, data }) => {
  const itemsPerRow = data.columnCount;
  const itemIndex = rowIndex * itemsPerRow + columnIndex;
  
  // Kiểm tra xem item có tồn tại không
  if (itemIndex >= data.items.length) {
    return null;
  }
  
  const item = data.items[itemIndex];
  
  return (
    <div style={style} className="p-2 border m-1">
      <div className="text-center">
        <div>{item.name}</div>
      </div>
    </div>
  );
};

function VirtualizedGrid({ items }) {
  const columnCount = 4; // Số cột trong grid
  
  return (
    <div style={{ height: '400px', width: '100%' }}>
      <AutoSizer>
        {({ height, width }) => {
          const columnWidth = width / columnCount;
          const rowCount = Math.ceil(items.length / columnCount);
          
          return (
            <Grid
              columnCount={columnCount}
              columnWidth={columnWidth}
              height={height}
              rowCount={rowCount}
              rowHeight={100}
              width={width}
              itemData={{
                items,
                columnCount
              }}
            >
              {Cell}
            </Grid>
          );
        }}
      </AutoSizer>
    </div>
  );
}`}
               </pre>
            </div>
         </div>
      </div>
   );
};

export default VirtualizedListDemo;
