import React, { useState } from "react";

// Component Counter đơn giản để test
const Counter = ({ initialCount = 0 }) => {
   const [count, setCount] = useState(initialCount);

   const increment = () => {
      setCount(count + 1);
   };

   const decrement = () => {
      setCount(count - 1);
   };

   const reset = () => {
      setCount(initialCount);
   };

   return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
         <h3 className="font-bold mb-2">Counter Component</h3>
         <p className="mb-4" data-testid="count-display">
            Count: <span className="font-bold">{count}</span>
         </p>
         <div className="flex space-x-2">
            <button
               onClick={decrement}
               className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
               data-testid="decrement-button"
            >
               -
            </button>
            <button
               onClick={reset}
               className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
               data-testid="reset-button"
            >
               Reset
            </button>
            <button
               onClick={increment}
               className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
               data-testid="increment-button"
            >
               +
            </button>
         </div>
      </div>
   );
};

// Component Form đơn giản để test
const Form = ({ onSubmit }) => {
   const [formData, setFormData] = useState({
      username: "",
      email: "",
   });

   const [errors, setErrors] = useState({});

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

   const validateForm = () => {
      const newErrors = {};

      // Kiểm tra username
      if (!formData.username.trim()) {
         newErrors.username = "Username is required";
      }

      // Kiểm tra email
      if (!formData.email.trim()) {
         newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
         newErrors.email = "Email is invalid";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      if (validateForm()) {
         onSubmit(formData);
      }
   };

   return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
         <h3 className="font-bold mb-2">Form Component</h3>
         <form onSubmit={handleSubmit} data-testid="test-form">
            <div className="mb-4">
               <label htmlFor="username" className="block mb-1 font-medium">
                  Username:
               </label>
               <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 ${errors.username ? "border-red-500" : ""
                     }`}
                  data-testid="username-input"
               />
               {errors.username && (
                  <p className="text-red-500 text-sm mt-1" data-testid="username-error">
                     {errors.username}
                  </p>
               )}
            </div>

            <div className="mb-4">
               <label htmlFor="email" className="block mb-1 font-medium">
                  Email:
               </label>
               <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 ${errors.email ? "border-red-500" : ""
                     }`}
                  data-testid="email-input"
               />
               {errors.email && (
                  <p className="text-red-500 text-sm mt-1" data-testid="email-error">
                     {errors.email}
                  </p>
               )}
            </div>

            <button
               type="submit"
               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
               data-testid="submit-button"
            >
               Submit
            </button>
         </form>
      </div>
   );
};

// Component Async để test
const AsyncComponent = () => {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
         // Mô phỏng API call
         await new Promise((resolve) => setTimeout(resolve, 1000));

         // Mô phỏng dữ liệu trả về
         setData({
            id: 1,
            name: "Test User",
            email: "test@example.com",
         });
      } catch (err) {
         setError("Failed to fetch data");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
         <h3 className="font-bold mb-2">Async Component</h3>

         <div className="mb-4">
            <button
               onClick={fetchData}
               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
               data-testid="fetch-button"
               disabled={loading}
            >
               {loading ? "Loading..." : "Fetch Data"}
            </button>
         </div>

         {loading && (
            <div data-testid="loading-state">
               <p>Loading...</p>
            </div>
         )}

         {error && (
            <div className="bg-red-100 dark:bg-red-900 p-3 rounded" data-testid="error-state">
               <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
         )}

         {data && (
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded" data-testid="data-state">
               <h4 className="font-bold mb-2">{data.name}</h4>
               <p>{data.email}</p>
            </div>
         )}
      </div>
   );
};

// Component chính
const TestingDemo = () => {
   const [formSubmissions, setFormSubmissions] = useState([]);

   const handleFormSubmit = (data) => {
      setFormSubmissions([...formSubmissions, data]);
   };

   return (
      <div className="space-y-6">
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Demo Testing</h1>
            <p className="mb-6">
               Demo này minh họa cách viết và tổ chức các component để dễ dàng test trong React.
               Chúng ta sẽ xem xét các loại test khác nhau và cách áp dụng chúng vào các component.
            </p>

            {/* Giải thích code */}
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-6">
               <h3 className="font-bold mb-2">Các Loại Test:</h3>
               <ul className="list-disc pl-5 space-y-2">
                  <li>Unit Tests: Kiểm tra các đơn vị nhỏ của code (functions, components)</li>
                  <li>Integration Tests: Kiểm tra tương tác giữa các components</li>
                  <li>E2E Tests: Kiểm tra toàn bộ ứng dụng từ góc nhìn của người dùng</li>
                  <li>Snapshot Tests: Kiểm tra UI không thay đổi ngoài ý muốn</li>
                  <li>Performance Tests: Kiểm tra hiệu suất của ứng dụng</li>
               </ul>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Demo Components */}
            <div className="space-y-6">
               <Counter initialCount={0} />
               <Form onSubmit={handleFormSubmit} />
               <AsyncComponent />
            </div>

            {/* Form Submissions */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
               <h3 className="font-bold mb-4">Form Submissions</h3>

               {formSubmissions.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400">
                     No submissions yet. Fill out and submit the form to see data here.
                  </p>
               ) : (
                  <div className="space-y-2">
                     {formSubmissions.map((submission, index) => (
                        <div
                           key={index}
                           className="bg-gray-100 dark:bg-gray-700 p-3 rounded"
                        >
                           <p>
                              <span className="font-medium">Username:</span> {submission.username}
                           </p>
                           <p>
                              <span className="font-medium">Email:</span> {submission.email}
                           </p>
                        </div>
                     ))}
                  </div>
               )}
            </div>
         </div>

         {/* Test Examples */}
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Ví Dụ Test</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* Unit Test Example */}
               <div>
                  <h3 className="font-bold mb-2">Unit Test (Jest + React Testing Library)</h3>
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded overflow-auto">
                     <pre className="text-sm">
                        {`// Counter.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

describe('Counter Component', () => {
  test('renders with initial count of 0', () => {
    render(<Counter />);
    const countElement = screen.getByTestId('count-display');
    expect(countElement).toHaveTextContent('Count: 0');
  });
  
  test('increments count when increment button is clicked', () => {
    render(<Counter />);
    const incrementButton = screen.getByTestId('increment-button');
    fireEvent.click(incrementButton);
    const countElement = screen.getByTestId('count-display');
    expect(countElement).toHaveTextContent('Count: 1');
  });
  
  test('decrements count when decrement button is clicked', () => {
    render(<Counter />);
    const decrementButton = screen.getByTestId('decrement-button');
    fireEvent.click(decrementButton);
    const countElement = screen.getByTestId('count-display');
    expect(countElement).toHaveTextContent('Count: -1');
  });
  
  test('resets count when reset button is clicked', () => {
    render(<Counter initialCount={5} />);
    const resetButton = screen.getByTestId('reset-button');
    fireEvent.click(resetButton);
    const countElement = screen.getByTestId('count-display');
    expect(countElement).toHaveTextContent('Count: 5');
  });
});`}
                     </pre>
                  </div>
               </div>

               {/* Integration Test Example */}
               <div>
                  <h3 className="font-bold mb-2">Integration Test</h3>
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded overflow-auto">
                     <pre className="text-sm">
                        {`// Form.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Form from './Form';

describe('Form Component', () => {
  test('calls onSubmit with form data when form is valid', () => {
    const handleSubmit = jest.fn();
    render(<Form onSubmit={handleSubmit} />);
    
    // Fill out the form
    fireEvent.change(screen.getByTestId('username-input'), {
      target: { value: 'testuser' }
    });
    
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'test@example.com' }
    });
    
    // Submit the form
    fireEvent.submit(screen.getByTestId('test-form'));
    
    // Check if onSubmit was called with correct data
    expect(handleSubmit).toHaveBeenCalledWith({
      username: 'testuser',
      email: 'test@example.com'
    });
  });
  
  test('displays validation errors when form is invalid', () => {
    const handleSubmit = jest.fn();
    render(<Form onSubmit={handleSubmit} />);
    
    // Submit empty form
    fireEvent.submit(screen.getByTestId('test-form'));
    
    // Check if validation errors are displayed
    expect(screen.getByTestId('username-error')).toBeInTheDocument();
    expect(screen.getByTestId('email-error')).toBeInTheDocument();
    
    // Check if onSubmit was not called
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});`}
                     </pre>
                  </div>
               </div>

               {/* Async Test Example */}
               <div>
                  <h3 className="font-bold mb-2">Async Test</h3>
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded overflow-auto">
                     <pre className="text-sm">
                        {`// AsyncComponent.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AsyncComponent from './AsyncComponent';

describe('AsyncComponent', () => {
  test('shows loading state when fetching data', () => {
    render(<AsyncComponent />);
    
    // Click fetch button
    fireEvent.click(screen.getByTestId('fetch-button'));
    
    // Check if loading state is displayed
    expect(screen.getByTestId('loading-state')).toBeInTheDocument();
  });
  
  test('shows data when fetch is successful', async () => {
    render(<AsyncComponent />);
    
    // Click fetch button
    fireEvent.click(screen.getByTestId('fetch-button'));
    
    // Wait for data to be loaded
    await waitFor(() => {
      expect(screen.getByTestId('data-state')).toBeInTheDocument();
    });
    
    // Check if data is displayed correctly
    expect(screen.getByTestId('data-state')).toHaveTextContent('Test User');
    expect(screen.getByTestId('data-state')).toHaveTextContent('test@example.com');
  });
});`}
                     </pre>
                  </div>
               </div>

               {/* Snapshot Test Example */}
               <div>
                  <h3 className="font-bold mb-2">Snapshot Test</h3>
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded overflow-auto">
                     <pre className="text-sm">
                        {`// Counter.test.js
import { render } from '@testing-library/react';
import Counter from './Counter';

describe('Counter Component Snapshots', () => {
  test('matches snapshot with default props', () => {
    const { asFragment } = render(<Counter />);
    expect(asFragment()).toMatchSnapshot();
  });
  
  test('matches snapshot with custom initial count', () => {
    const { asFragment } = render(<Counter initialCount={10} />);
    expect(asFragment()).toMatchSnapshot();
  });
});`}
                     </pre>
                  </div>
               </div>
            </div>
         </div>

         {/* Testing Setup */}
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Cài Đặt Testing</h2>

            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded overflow-auto">
               <pre className="text-sm">
                  {`// Cài đặt Jest và React Testing Library
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event

// Cấu hình Jest trong package.json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "jest": {
    "testEnvironment": "jsdom",
    "setupFilesAfterEnv": [
      "@testing-library/jest-dom/extend-expect"
    ],
    "moduleNameMapper": {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    }
  }
}

// Cài đặt Cypress cho E2E testing
npm install --save-dev cypress

// Cấu hình Cypress trong cypress.config.js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.js',
  },
})

// Ví dụ E2E test với Cypress
// cypress/e2e/counter.cy.js
describe('Counter Component', () => {
  beforeEach(() => {
    cy.visit('/counter')
  })

  it('should increment count when + button is clicked', () => {
    cy.get('[data-testid="count-display"]').should('contain', 'Count: 0')
    cy.get('[data-testid="increment-button"]').click()
    cy.get('[data-testid="count-display"]').should('contain', 'Count: 1')
  })

  it('should decrement count when - button is clicked', () => {
    cy.get('[data-testid="decrement-button"]').click()
    cy.get('[data-testid="count-display"]').should('contain', 'Count: -1')
  })
})`}
               </pre>
            </div>
         </div>

         {/* Testing Best Practices */}
         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Best Practices</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <h3 className="font-bold mb-2">Nên làm</h3>
                  <ul className="list-disc pl-5 space-y-1">
                     <li>Sử dụng data-testid để chọn các phần tử trong test</li>
                     <li>Test hành vi thay vì triển khai</li>
                     <li>Viết test đơn giản và dễ đọc</li>
                     <li>Sử dụng các công cụ mô phỏng (mock) cho các API calls</li>
                     <li>Tổ chức test theo cấu trúc của code</li>
                     <li>Chạy test tự động trong CI/CD pipeline</li>
                     <li>Sử dụng coverage reports để đảm bảo độ phủ test</li>
                     <li>Viết test cho các trường hợp lỗi</li>
                  </ul>
               </div>

               <div>
                  <h3 className="font-bold mb-2">Không nên làm</h3>
                  <ul className="list-disc pl-5 space-y-1">
                     <li>Test triển khai thay vì hành vi</li>
                     <li>Phụ thuộc vào cấu trúc DOM cụ thể</li>
                     <li>Viết test quá phức tạp</li>
                     <li>Bỏ qua các trường hợp lỗi</li>
                     <li>Test quá nhiều chi tiết triển khai</li>
                     <li>Sử dụng các selector không ổn định (như class CSS)</li>
                     <li>Viết test phụ thuộc vào các test khác</li>
                     <li>Bỏ qua việc test các component phức tạp</li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   );
};

export default TestingDemo;
