// Basics
import HelloWorldDemo from "./demos/basics/HelloWorldDemo"
import PropsStateDemo from "./demos/basics/PropsStateDemo"
import EventHandlingDemo from "./demos/basics/EventHandlingDemo"
import ConditionalRenderingDemo from "./demos/basics/ConditionalRenderingDemo"
import ListRenderingDemo from "./demos/basics/ListRenderingDemo"

// Hooks
import UseStateCounterDemo from "./demos/hooks/UseStateCounterDemo"
import UseEffectApiDemo from "./demos/hooks/UseEffectApiDemo"
import UseRefFocusDemo from "./demos/hooks/UseRefFocusDemo"
import UseContextThemeDemo from "./demos/hooks/UseContextThemeDemo"
import UseReducerTodoDemo from "./demos/hooks/UseReducerTodoDemo"
import UseMemoOptimizationDemo from "./demos/hooks/UseMemoOptimizationDemo"
import CustomHookLocalStorageDemo from "./demos/hooks/CustomHookLocalStorageDemo"

// Routing
import BasicNavigationDemo from "./demos/routing/BasicNavigationDemo"
import NestedRouteDemo from "./demos/routing/NestedRouteDemo"
import ProtectedRouteDemo from "./demos/routing/ProtectedRouteDemo"
import DynamicRouteDemo from "./demos/routing/DynamicRouteDemo"

// Form
import ControlledInputDemo from "./demos/form/ControlledInputDemo"
import FormValidationDemo from "./demos/form/FormValidationDemo"
import DebouncedSearchDemo from "./demos/form/DebouncedSearchDemo"
import MultiStepFormDemo from "./demos/form/MultiStepFormDemo"

// UI
import ModalDemo from "./demos/ui/ModalDemo"
import TabsAccordionDemo from "./demos/ui/TabsAccordionDemo"
import TableDemo from "./demos/ui/TableDemo"
import DragDropDemo from "./demos/ui/DragDropDemo"
import InfiniteScrollDemo from "./demos/ui/InfiniteScrollDemo"

// API
import FetchApiDemo from "./demos/api/FetchApiDemo"
import AxiosErrorDemo from "./demos/api/AxiosErrorDemo"
import ReactQueryDemo from "./demos/api/ReactQueryDemo"
import WebSocketChatDemo from "./demos/api/WebSocketChatDemo"

// State
import PropDrillingDemo from "./demos/state/PropDrillingDemo"
import ZustandCounterDemo from "./demos/state/ZustandCounterDemo"
import ReduxCrudDemo from "./demos/state/ReduxCrudDemo"

// Performance
import ReactMemoDemo from "./demos/performance/ReactMemoDemo"
import LazyLoadingDemo from "./demos/performance/LazyLoadingDemo"
import ErrorBoundaryDemo from "./demos/performance/ErrorBoundaryDemo"
import VirtualizedListDemo from "./demos/performance/VirtualizedListDemo"

// Advanced
import PortalDemo from "./demos/advanced/PortalDemo"
import RenderPropsDemo from "./demos/advanced/RenderPropsDemo"
import HocDemo from "./demos/advanced/HocDemo"
import TailwindThemeSwitcherDemo from "./demos/advanced/TailwindThemeSwitcherDemo"
import I18nDemo from "./demos/advanced/I18nDemo"
import TestingDemo from "./demos/advanced/TestingDemo"

export const menuItems = [
  {
    title: "Basics",
    items: [
      { name: "Hello World", path: "/hello-world" },
      { name: "Props & State", path: "/props-state" },
      { name: "Event Handling", path: "/event-handling" },
      { name: "Conditional Rendering", path: "/conditional-rendering" },
      { name: "List Rendering", path: "/list-rendering" },
    ],
  },
  {
    title: "Hooks",
    items: [
      { name: "useState Counter", path: "/usestate-counter" },
      { name: "useEffect API", path: "/useeffect-api" },
      { name: "useRef Focus", path: "/useref-focus" },
      { name: "useContext Theme", path: "/usecontext-theme" },
      { name: "useReducer Todo", path: "/usereducer-todo" },
      { name: "useMemo Optimization", path: "/usememo-optimization" },
      { name: "Custom Hook LocalStorage", path: "/custom-hook-localstorage" },
    ],
  },
  {
    title: "Routing",
    items: [
      { name: "Basic Navigation", path: "/basic-navigation" },
      { name: "Nested Route", path: "/nested-route" },
      { name: "Protected Route", path: "/protected-route" },
      { name: "Dynamic Route", path: "/dynamic-route" },
    ],
  },
  {
    title: "Form",
    items: [
      { name: "Controlled Input", path: "/controlled-input" },
      { name: "Form Validation", path: "/form-validation" },
      { name: "Debounced Search", path: "/debounced-search" },
      { name: "Multi Step Form", path: "/multi-step-form" },
    ],
  },
  {
    title: "UI/Interaction",
    items: [
      { name: "Modal", path: "/modal" },
      { name: "Tabs & Accordion", path: "/tabs-accordion" },
      { name: "Table", path: "/table" },
      { name: "Drag & Drop", path: "/drag-drop" },
      { name: "Infinite Scroll", path: "/infinite-scroll" },
    ],
  },
  {
    title: "API & Data",
    items: [
      { name: "Fetch API", path: "/fetch-api" },
      { name: "Axios Error", path: "/axios-error" },
      { name: "React Query", path: "/react-query" },
      { name: "WebSocket Chat", path: "/websocket-chat" },
    ],
  },
  {
    title: "State Management",
    items: [
      { name: "Prop Drilling", path: "/prop-drilling" },
      { name: "Zustand Counter", path: "/zustand-counter" },
      { name: "Redux CRUD", path: "/redux-crud" },
    ],
  },
  {
    title: "Performance",
    items: [
      { name: "React.memo", path: "/react-memo" },
      { name: "Lazy Loading", path: "/lazy-loading" },
      { name: "Error Boundary", path: "/error-boundary" },
      { name: "Virtualized List", path: "/virtualized-list" },
    ],
  },
  {
    title: "Advanced",
    items: [
      { name: "Portal", path: "/portal" },
      { name: "Render Props", path: "/render-props" },
      { name: "HOC", path: "/hoc" },
      { name: "Theme Switcher", path: "/theme-switcher" },
      { name: "I18n", path: "/i18n" },
      { name: "Testing", path: "/testing" },
    ],
  },
]

export const routes = [
  { path: "/", element: <HelloWorldDemo /> },
  { path: "/hello-world", element: <HelloWorldDemo /> },
  { path: "/props-state", element: <PropsStateDemo /> },
  { path: "/event-handling", element: <EventHandlingDemo /> },
  { path: "/conditional-rendering", element: <ConditionalRenderingDemo /> },
  { path: "/list-rendering", element: <ListRenderingDemo /> },
  { path: "/usestate-counter", element: <UseStateCounterDemo /> },
  { path: "/useeffect-api", element: <UseEffectApiDemo /> },
  { path: "/useref-focus", element: <UseRefFocusDemo /> },
  { path: "/usecontext-theme", element: <UseContextThemeDemo /> },
  { path: "/usereducer-todo", element: <UseReducerTodoDemo /> },
  { path: "/usememo-optimization", element: <UseMemoOptimizationDemo /> },
  { path: "/custom-hook-localstorage", element: <CustomHookLocalStorageDemo /> },
  { path: "/basic-navigation", element: <BasicNavigationDemo /> },
  { path: "/nested-route", element: <NestedRouteDemo /> },
  { path: "/protected-route", element: <ProtectedRouteDemo /> },
  { path: "/dynamic-route", element: <DynamicRouteDemo /> },
  { path: "/controlled-input", element: <ControlledInputDemo /> },
  { path: "/form-validation", element: <FormValidationDemo /> },
  { path: "/debounced-search", element: <DebouncedSearchDemo /> },
  { path: "/multi-step-form", element: <MultiStepFormDemo /> },
  { path: "/modal", element: <ModalDemo /> },
  { path: "/tabs-accordion", element: <TabsAccordionDemo /> },
  { path: "/table", element: <TableDemo /> },
  { path: "/drag-drop", element: <DragDropDemo /> },
  { path: "/infinite-scroll", element: <InfiniteScrollDemo /> },
  { path: "/fetch-api", element: <FetchApiDemo /> },
  { path: "/axios-error", element: <AxiosErrorDemo /> },
  { path: "/react-query", element: <ReactQueryDemo /> },
  { path: "/websocket-chat", element: <WebSocketChatDemo /> },
  { path: "/prop-drilling", element: <PropDrillingDemo /> },
  { path: "/zustand-counter", element: <ZustandCounterDemo /> },
  { path: "/redux-crud", element: <ReduxCrudDemo /> },
  { path: "/react-memo", element: <ReactMemoDemo /> },
  { path: "/lazy-loading", element: <LazyLoadingDemo /> },
  { path: "/error-boundary", element: <ErrorBoundaryDemo /> },
  { path: "/virtualized-list", element: <VirtualizedListDemo /> },
  { path: "/portal", element: <PortalDemo /> },
  { path: "/render-props", element: <RenderPropsDemo /> },
  { path: "/hoc", element: <HocDemo /> },
  { path: "/theme-switcher", element: <TailwindThemeSwitcherDemo /> },
  { path: "/i18n", element: <I18nDemo /> },
  { path: "/testing", element: <TestingDemo /> },
]
