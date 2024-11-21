import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import ProductPage from "./pages/dashboard/ProductPage";
import CategoryPage from "./pages/dashboard/categoryPage";
import ReportsPage from "./pages/dashboard/ReportsPage";
import AnalysisPage from "./pages/dashboard/AnalysisPage";
import ProfilePage from "./pages/dashboard/ProfilePage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {
          path: "main",
          element: <DashboardPage />,
        },
        {
          path: "products",
          element: <ProductPage />,
        },
        {
          path: "category",
          element: <CategoryPage />,
        },
        {
          path: "reports",
          element: <ReportsPage />,
        },
        {
          path: "analysis",
          element: <AnalysisPage />,
        },
        {
          path: "profile",
          element: <ProfilePage />,
        },
      ],
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_skipActionErrorRevalidation: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
    },
  }
);

function App() {
  return (
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  );
}

export default App;
