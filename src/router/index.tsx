import { createBrowserRouter, Navigate } from "react-router-dom";
import { routes } from "./routes";
import { ProtectedRoute, PublicRoute } from "../modules/auth/components";
import Layout from "../components/Layout";
import LoginPage from "../modules/auth/pages/LoginPage";
import HomePage from "../modules/shared/pages/HomePage";
import UsersPage from "../modules/users/pages/UsersPage";

export const router = createBrowserRouter([
  {
    path: routes.login,
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={routes.home} replace />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "*",
        element: <Navigate to={routes.home} replace />,
      },
    ],
  },
]);

// Re-export routes and types
export { routes, type AppRoutes } from "./routes";
