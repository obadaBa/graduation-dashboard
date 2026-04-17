import { lazy, Suspense } from "react";
import { Navigate, createBrowserRouter } from "react-router";
import DashboardLayout from "../../features/dashboard/layout/DashboardLayout";

const LoginPage = lazy(() => import("../../pages/auth/Login_page/Login_page"));
const RestPassword = lazy(() =>
  import("../../pages/auth/RestPassword/RestPassword"),
);
const ConfarmPassword = lazy(() =>
  import("../../pages/auth/confarmPassword/confarmPassword"),
);
const CreatNewPassword = lazy(() =>
  import("../../pages/auth/CreatNewPassword/CreatNewPassword"),
);
const DashboardHome = lazy(() =>
  import("../../pages/dashboard/Home/DashboardHome"),
);
const DashboardTests = lazy(() =>
  import("../../pages/dashboard/Tests/DashboardTests"),
);
const DashboardContent = lazy(() =>
  import("../../pages/dashboard/Content/DashboardContent"),
);
const DashboardUsers = lazy(() =>
  import("../../pages/dashboard/Users/DashboardUsers"),
);
const DashboardSales = lazy(() =>
  import("../../pages/dashboard/Sales/DashboardSales"),
);
const DashboardCustomization = lazy(() =>
  import("../../pages/dashboard/Customization/DashboardCustomization"),
);

function LoadingFallback() {
  return <div>جارٍ التحميل...</div>;
}

const suspenseWrapper = (element) => (
  <Suspense fallback={<LoadingFallback />}>{element}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: suspenseWrapper(<LoginPage />),
  },
  {
    path: "/restpassword",
    element: suspenseWrapper(<RestPassword />),
  },
  {
    path: "/confarmpassword",
    element: suspenseWrapper(<ConfarmPassword />),
  },
  {
    path: "/creatnewpassword",
    element: suspenseWrapper(<CreatNewPassword />),
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: suspenseWrapper(<DashboardHome />),
      },
      {
        path: "tests",
        element: suspenseWrapper(<DashboardTests />),
      },
      {
        path: "content",
        element: suspenseWrapper(<DashboardContent />),
      },
      {
        path: "users",
        element: suspenseWrapper(<DashboardUsers />),
      },
      {
        path: "sales",
        element: suspenseWrapper(<DashboardSales />),
      },
      {
        path: "customization",
        element: suspenseWrapper(<DashboardCustomization />),
      },
    ],
  },
]);
