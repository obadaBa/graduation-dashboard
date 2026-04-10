import { lazy, Suspense } from "react";
import { Navigate, createBrowserRouter } from "react-router";

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
]);
