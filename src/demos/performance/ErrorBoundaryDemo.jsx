import React, { useState, Component } from "react";

// Error Boundary Component
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Cập nhật state để hiển thị fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Bạn cũng có thể log lỗi vào một dịch vụ báo cáo lỗi
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      // Bạn có thể render bất kỳ UI fallback nào
      return this.props.fallback || (
        <div className="p-4 bg-red-100 dark:bg-red-900 rounded-lg">
          <h2 className="text-lg font-bold text-red-800 dark:text-red-200 mb-2">
            Đã xảy ra lỗi
          </h2>
          <p className="text-red-700 dark:text-red-300 mb-4">
            Component đã gặp lỗi. Vui lòng thử lại sau.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Thử lại
          </button>

          {this.state.error && (
            <details className="mt-4 p-2 bg-red-50 dark:bg-red-950 rounded">
              <summary className="cursor-pointer font-medium">Chi tiết lỗi</summary>
              <p className="mt-2 text-sm font-mono whitespace-pre-wrap">
                {this.state.error.toString()}
              </p>
              <p className="mt-2 text-sm font-mono whitespace-pre-wrap">
                {this.state.errorInfo.componentStack}
              </p>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

// Component gây lỗi
const BuggyCounter = ({ shouldThrow }) => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  if (shouldThrow && count === 5) {
    // Cố tình gây lỗi khi count = 5
    throw new Error("Lỗi cố ý: Counter đạt giá trị 5!");
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="font-bold mb-2">Counter có thể gây lỗi</h3>
      <p className="mb-4">
        Giá trị hiện tại: <span className="font-bold">{count}</span>
        {shouldThrow && count === 4 && (
          <span className="ml-2 text-red-500 font-bold">
            (Nhấn thêm một lần nữa sẽ gây lỗi!)
          </span>
        )}
      </p>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Tăng
      </button>
    </div>
  );
};

// Component hiển thị lỗi syntax
const SyntaxErrorComponent = () => {
  // Cố tình tạo lỗi cú pháp
  return (
    <div>
      {/* Lỗi cú pháp: thiếu dấu ngoặc đóng */}
      <h3>Component có lỗi cú pháp</h3>
      {/* Lỗi này sẽ không được bắt bởi Error Boundary */}
      {/* Error Boundary chỉ bắt lỗi runtime, không bắt lỗi cú pháp */}
    </div>
  );
};

// Component gây lỗi khi render
const RenderErrorComponent = () => {
  // Cố tình gây lỗi khi render
  const user = null;

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="font-bold mb-2">Component gây lỗi khi render</h3>
      <p>Tên người dùng: {user.name}</p> {/* Lỗi: user là null */}
    </div>
  );
};

// Component gây lỗi khi xử lý sự kiện
const EventErrorComponent = () => {
  const handleClick = () => {
    // Cố tình gây lỗi trong event handler
    const arr = null;
    arr.push("item"); // Lỗi: arr là null
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="font-bold mb-2">Component gây lỗi khi xử lý sự kiện</h3>
      <p className="mb-4">Nhấn nút để gây lỗi trong event handler</p>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Gây lỗi
      </button>
    </div>
  );
};

// Component gây lỗi không đồng bộ
const AsyncErrorComponent = () => {
  const [hasError, setHasError] = useState(false);

  const handleClick = () => {
    // Gây lỗi sau 1 giây
    setTimeout(() => {
      try {
        // Cố tình gây lỗi
        throw new Error("Lỗi không đồng bộ!");
      } catch (error) {
        setHasError(true);
        throw error; // Re-throw để xem liệu Error Boundary có bắt được không
      }
    }, 1000);
  };

  if (hasError) {
    throw new Error("Lỗi từ state!");
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="font-bold mb-2">Component gây lỗi không đồng bộ</h3>
      <p className="mb-4">Nhấn nút để gây lỗi sau 1 giây</p>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        Gây lỗi không đồng bộ
      </button>
    </div>
  );
};

// Custom Fallback UI
const CustomFallback = ({ error, resetErrorBoundary }) => (
  <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-lg">
    <h2 className="text-lg font-bold text-purple-800 dark:text-purple-200 mb-2">
      Oops! Đã xảy ra lỗi
    </h2>
    <p className="text-purple-700 dark:text-purple-300 mb-4">
      Đây là UI fallback tùy chỉnh.
    </p>
    {error && (
      <p className="mb-4 font-mono text-sm bg-purple-50 dark:bg-purple-950 p-2 rounded">
        {error.toString()}
      </p>
    )}
    <button
      onClick={resetErrorBoundary}
      className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
    >
      Thử lại
    </button>
  </div>
);

const ErrorBoundaryDemo = () => {
  const [key, setKey] = useState(0);

  // Reset tất cả Error Boundaries
  const resetAll = () => {
    setKey(key + 1);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Demo Error Boundary</h1>
        <p className="mb-6">
          Demo này minh họa cách sử dụng Error Boundaries trong React để xử lý lỗi runtime
          một cách thanh lịch, ngăn không cho lỗi trong một component làm sập toàn bộ ứng dụng.
          Error Boundaries là các component React đặc biệt có thể bắt lỗi JavaScript trong bất kỳ
          component con nào của chúng.
        </p>

        {/* Giải thích code */}
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-6">
          <h3 className="font-bold mb-2">Cách Hoạt Động:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Error Boundary là một class component với phương thức <code>componentDidCatch</code> và/hoặc <code>static getDerivedStateFromError</code></li>
            <li>Bắt lỗi trong quá trình render, lifecycle methods và constructors của component con</li>
            <li>Hiển thị UI fallback thay vì component bị lỗi</li>
            <li>Không bắt được lỗi trong event handlers, code không đồng bộ, server-side rendering và lỗi trong chính Error Boundary</li>
            <li>Có thể lồng nhiều Error Boundaries để kiểm soát chi tiết phạm vi xử lý lỗi</li>
          </ul>
        </div>

        <div className="flex justify-center">
          <button
            onClick={resetAll}
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Reset Tất Cả Error Boundaries
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Demo 1: Counter với Error Boundary */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Demo 1: Lỗi khi render</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Tăng counter lên 5 để gây lỗi. Error Boundary sẽ bắt lỗi và hiển thị UI fallback.
          </p>

          <ErrorBoundary key={`counter-${key}`}>
            <BuggyCounter shouldThrow={true} />
          </ErrorBoundary>
        </div>

        {/* Demo 2: Custom Fallback UI */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Demo 2: UI Fallback tùy chỉnh</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Error Boundary với UI fallback tùy chỉnh.
          </p>

          <ErrorBoundary
            key={`custom-${key}`}
            fallback={
              <CustomFallback
                error={new Error("Lỗi demo với UI fallback tùy chỉnh")}
                resetErrorBoundary={() => setKey(key + 1)}
              />
            }
          >
            <BuggyCounter shouldThrow={true} />
          </ErrorBoundary>
        </div>

        {/* Demo 3: Lỗi khi render */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Demo 3: Lỗi khi truy cập thuộc tính</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Component cố gắng truy cập thuộc tính của một đối tượng null.
          </p>

          <ErrorBoundary key={`render-${key}`}>
            <RenderErrorComponent />
          </ErrorBoundary>
        </div>

        {/* Demo 4: Lỗi trong event handler */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Demo 4: Lỗi trong event handler</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Error Boundary <strong>không bắt</strong> được lỗi trong event handlers.
            Lỗi này sẽ được hiển thị trong console.
          </p>

          <ErrorBoundary key={`event-${key}`}>
            <EventErrorComponent />
          </ErrorBoundary>
        </div>

        {/* Demo 5: Lỗi không đồng bộ */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Demo 5: Lỗi không đồng bộ</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Error Boundary <strong>không bắt trực tiếp</strong> được lỗi trong code không đồng bộ,
            nhưng có thể bắt được nếu lỗi được ném lại trong render.
          </p>

          <ErrorBoundary key={`async-${key}`}>
            <AsyncErrorComponent />
          </ErrorBoundary>
        </div>

        {/* Demo 6: Lồng Error Boundaries */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Demo 6: Lồng Error Boundaries</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Lồng nhiều Error Boundaries để kiểm soát phạm vi xử lý lỗi.
          </p>

          <ErrorBoundary
            key={`outer-${key}`}
            fallback={
              <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-2">
                  Error Boundary Ngoài
                </h3>
                <p className="text-blue-700 dark:text-blue-300 mb-2">
                  Lỗi được bắt bởi Error Boundary ngoài.
                </p>
                <button
                  onClick={() => setKey(key + 1)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Thử lại
                </button>
              </div>
            }
          >
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <h3 className="font-bold mb-2">Component Cha</h3>
              <p className="mb-4">Component này không gây lỗi.</p>

              <ErrorBoundary
                key={`inner-${key}`}
                fallback={
                  <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg">
                    <h3 className="font-bold text-green-800 dark:text-green-200 mb-2">
                      Error Boundary Trong
                    </h3>
                    <p className="text-green-700 dark:text-green-300 mb-2">
                      Lỗi được bắt bởi Error Boundary trong.
                    </p>
                    <button
                      onClick={() => setKey(key + 1)}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Thử lại
                    </button>
                  </div>
                }
              >
                <BuggyCounter shouldThrow={true} />
              </ErrorBoundary>
            </div>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

// Code Example
const CodeExample = () => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
    <h2 className="text-xl font-bold mb-4">Ví Dụ Code</h2>

    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded overflow-auto">
      <pre className="text-sm">
        {`// Tạo Error Boundary Component
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Cập nhật state để hiển thị fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Bạn có thể log lỗi vào một dịch vụ báo cáo lỗi
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Gửi lỗi đến dịch vụ báo cáo lỗi
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Bạn có thể render bất kỳ UI fallback nào
      return this.props.fallback || (
        <div className="error-boundary">
          <h2>Đã xảy ra lỗi</h2>
          <p>Component đã gặp lỗi. Vui lòng thử lại sau.</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Thử lại
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Sử dụng Error Boundary
function App() {
  return (
    <div>
      <h1>My App</h1>
      
      {/* Bao bọc toàn bộ ứng dụng */}
      <ErrorBoundary>
        <MyComponent />
      </ErrorBoundary>
      
      {/* Hoặc bao bọc các phần riêng biệt */}
      <ErrorBoundary fallback={<p>Lỗi trong phần bình luận</p>}>
        <Comments />
      </ErrorBoundary>
      
      <ErrorBoundary fallback={<p>Lỗi trong phần liên quan</p>}>
        <RelatedPosts />
      </ErrorBoundary>
    </div>
  );
}

// Với React 16.14 hoặc React 17, bạn có thể sử dụng thư viện react-error-boundary
// npm install react-error-boundary

import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Đã xảy ra lỗi:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Thử lại</button>
    </div>
  );
}

function MyComponent() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset state của ứng dụng
      }}
      onError={(error, info) => {
        // Log lỗi đến dịch vụ
      }}
    >
      <ComponentThatMayError />
    </ErrorBoundary>
  );
}`}
      </pre>
    </div>
  </div>
);

const ErrorBoundaryDemoWithCode = () => {
  const demoComponent = ErrorBoundaryDemo();

  return (
    <>
      {demoComponent}
      <CodeExample />
    </>
  );
};

export default ErrorBoundaryDemoWithCode;
