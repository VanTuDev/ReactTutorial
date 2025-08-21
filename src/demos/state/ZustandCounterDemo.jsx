import React, { useState } from "react";

// Mô phỏng Zustand store
const createStore = (initialState) => {
   let state = initialState;
   const listeners = new Set();

   const setState = (partial, replace) => {
      const nextState = typeof partial === "function" ? partial(state) : partial;

      if (!Object.is(nextState, state)) {
         const previousState = state;
         state = replace ? nextState : { ...state, ...nextState };
         listeners.forEach((listener) => listener(state, previousState));
      }
   };

   const getState = () => state;

   const subscribe = (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
   };

   const destroy = () => {
      listeners.clear();
   };

   const api = { setState, getState, subscribe, destroy };
   return api;
};

// Mô phỏng Zustand hook
const createZustandHook = (createState) => {
   const api = createStore(createState((set) => set));

   return (selector) => {
      const [, forceUpdate] = useState(0);

      React.useEffect(() => {
         const unsubscribe = api.subscribe(() => {
            forceUpdate((count) => count + 1);
         });

         return unsubscribe;
      }, []);

      return selector ? selector(api.getState()) : api.getState();
   };
};

// Tạo store cho counter
const useCounterStore = createZustandHook((set) => ({
   count: 0,
   increment: () => set((state) => ({ count: state.count + 1 })),
   decrement: () => set((state) => ({ count: state.count - 1 })),
   incrementBy: (amount) => set((state) => ({ count: state.count + amount })),
   reset: () => set({ count: 0 }),
}));

// Tạo store cho settings
const useSettingsStore = createZustandHook((set) => ({
   darkMode: false,
   incrementStep: 1,
   toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
   setIncrementStep: (step) => set({ incrementStep: step }),
}));

const ZustandCounterDemo = () => {
   return (
      <div className="space-y-6">
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Demo Zustand Counter</h1>
            <p className="mb-6">
               Demo này minh họa cách sử dụng Zustand để quản lý state trong React. Zustand là một thư viện
               quản lý state nhẹ, đơn giản nhưng mạnh mẽ, sử dụng hooks API. Demo này mô phỏng hoạt động
               của Zustand với một ứng dụng đếm đơn giản.
            </p>

            {/* Giải thích code */}
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-6">
               <h3 className="font-bold mb-2">Cách Zustand Hoạt Động:</h3>
               <ul className="list-disc pl-5 space-y-2">
                  <li>Tạo store với các state và actions</li>
                  <li>Truy cập state từ bất kỳ component nào bằng hook</li>
                  <li>Chỉ re-render component khi state được sử dụng thay đổi</li>
                  <li>Không cần Provider bao quanh ứng dụng</li>
                  <li>Dễ dàng tích hợp với các middleware và devtools</li>
               </ul>
            </div>
         </div>

         {/* Demo Components */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
               {/* Counter Display */}
               <CounterDisplay />

               {/* Counter Controls */}
               <CounterControls />
            </div>

            <div className="space-y-6">
               {/* Settings */}
               <Settings />

               {/* Counter History */}
               <CounterHistory />
            </div>
         </div>

         {/* Code Example */}
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Ví Dụ Code Zustand</h2>

            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded overflow-auto">
               <pre className="text-sm">
                  {`// Cài đặt Zustand
// npm install zustand

import { create } from 'zustand';

// Tạo store cho counter
const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  incrementBy: (amount) => set((state) => ({ count: state.count + amount })),
  reset: () => set({ count: 0 }),
}));

// Sử dụng store trong component
function CounterDisplay() {
  // Chỉ lấy state cần thiết
  const count = useCounterStore((state) => state.count);
  
  return <div>Count: {count}</div>;
}

function CounterControls() {
  // Chỉ lấy actions cần thiết
  const { increment, decrement, reset } = useCounterStore((state) => ({
    increment: state.increment,
    decrement: state.decrement,
    reset: state.reset,
  }));
  
  return (
    <div>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

// Kết hợp nhiều store
const useSettingsStore = create((set) => ({
  darkMode: false,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));

// Middleware và Persistence
import { persist } from 'zustand/middleware';

const usePersistStore = create(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
    }),
    {
      name: 'counter-storage', // unique name
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    }
  )
);`}
               </pre>
            </div>
         </div>
      </div>
   );
};

// Component hiển thị counter
const CounterDisplay = () => {
   // Lấy count từ store
   const count = useCounterStore((state) => state.count);

   // Lấy darkMode từ settings store
   const darkMode = useSettingsStore((state) => state.darkMode);

   return (
      <div className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow ${darkMode ? "border-2 border-blue-500" : ""
         }`}>
         <h2 className="text-xl font-bold mb-4">Counter Display</h2>

         <div className="flex items-center justify-center">
            <div className={`text-6xl font-bold p-6 rounded-lg ${darkMode
               ? "bg-gray-700 text-white"
               : "bg-gray-100 text-gray-800"
               }`}>
               {count}
            </div>
         </div>

         <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            <p>
               Component này chỉ re-render khi <code>count</code> thay đổi.
            </p>
         </div>
      </div>
   );
};

// Component điều khiển counter
const CounterControls = () => {
   // Lấy actions từ counter store
   const { increment, decrement, incrementBy, reset } = useCounterStore((state) => ({
      increment: state.increment,
      decrement: state.decrement,
      incrementBy: state.incrementBy,
      reset: state.reset,
   }));

   // Lấy incrementStep từ settings store
   const incrementStep = useSettingsStore((state) => state.incrementStep);

   return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
         <h2 className="text-xl font-bold mb-4">Counter Controls</h2>

         <div className="flex flex-wrap gap-2">
            <button
               onClick={decrement}
               className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
               Giảm (-1)
            </button>
            <button
               onClick={increment}
               className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
               Tăng (+1)
            </button>
            <button
               onClick={() => incrementBy(incrementStep)}
               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
               Tăng (+{incrementStep})
            </button>
            <button
               onClick={reset}
               className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
               Đặt lại
            </button>
         </div>

         <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            <p>
               Component này chỉ re-render khi <code>incrementStep</code> thay đổi.
            </p>
         </div>
      </div>
   );
};

// Component settings
const Settings = () => {
   // Lấy state và actions từ settings store
   const { darkMode, incrementStep, toggleDarkMode, setIncrementStep } = useSettingsStore((state) => ({
      darkMode: state.darkMode,
      incrementStep: state.incrementStep,
      toggleDarkMode: state.toggleDarkMode,
      setIncrementStep: state.setIncrementStep,
   }));

   return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
         <h2 className="text-xl font-bold mb-4">Settings</h2>

         <div className="space-y-4">
            <div>
               <label className="flex items-center cursor-pointer">
                  <input
                     type="checkbox"
                     checked={darkMode}
                     onChange={toggleDarkMode}
                     className="mr-2"
                  />
                  Chế độ tối
               </label>
            </div>

            <div>
               <label className="block mb-1">Bước tăng:</label>
               <input
                  type="range"
                  min="1"
                  max="10"
                  value={incrementStep}
                  onChange={(e) => setIncrementStep(Number(e.target.value))}
                  className="w-full"
               />
               <div className="flex justify-between text-xs text-gray-500">
                  <span>1</span>
                  <span>5</span>
                  <span>10</span>
               </div>
            </div>
         </div>

         <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            <p>
               Component này re-render khi <code>darkMode</code> hoặc <code>incrementStep</code> thay đổi.
            </p>
         </div>
      </div>
   );
};

// Component hiển thị lịch sử counter
const CounterHistory = () => {
   // Lấy count từ counter store
   const count = useCounterStore((state) => state.count);

   // State local cho lịch sử
   const [history, setHistory] = useState([]);

   // Cập nhật lịch sử khi count thay đổi
   React.useEffect(() => {
      setHistory((prev) => [
         ...prev,
         { value: count, timestamp: new Date().toLocaleTimeString() },
      ].slice(-5)); // Chỉ giữ 5 giá trị gần nhất
   }, [count]);

   return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
         <h2 className="text-xl font-bold mb-4">Counter History</h2>

         {history.length > 0 ? (
            <div className="space-y-2">
               {history.map((item, index) => (
                  <div
                     key={index}
                     className="flex justify-between p-2 bg-gray-50 dark:bg-gray-900 rounded"
                  >
                     <span>Giá trị: {item.value}</span>
                     <span className="text-gray-500">{item.timestamp}</span>
                  </div>
               ))}
            </div>
         ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-4">
               Chưa có lịch sử.
            </p>
         )}

         <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            <p>
               Component này re-render khi <code>count</code> thay đổi và khi <code>history</code> state local thay đổi.
            </p>
         </div>
      </div>
   );
};

export default ZustandCounterDemo;
