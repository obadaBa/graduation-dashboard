import { lazy, Suspense } from "react";
import { Navigate, createBrowserRouter } from "react-router";

const LoginPage = lazy(() => import("../../pages/auth/LoginPage/LoginPage"));
const DashboardLayout = lazy(() =>
  import("../../features/dashboard/layout/DashboardLayout"),
);
const ResetPassword = lazy(() =>
  import("../../pages/auth/ResetPassword/ResetPassword"),
);
const ConfirmPassword = lazy(() =>
  import("../../pages/auth/ConfirmPassword/ConfirmPassword"),
);
const CreateNewPassword = lazy(() =>
  import("../../pages/auth/CreateNewPassword/CreateNewPassword"),
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
const ContentDetails = lazy(() =>
  import("../../pages/dashboard/Content/ContentDetails"),
);
const UserProfile = lazy(() =>
  import("../../features/dashboard/Content/userProfile/UserProfile"),
);
const TestDetails = lazy(() =>
  import("../../features/dashboard/Tests/testDetails/TestDetails"),
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
const UsersVerificationCenter = lazy(() =>
  import(
    "../../features/dashboard/Users/verificationCenter/UsersVerificationCenter"
  ),
);

function LoadingFallback() {
  return <div>جارٍ التحميل...</div>;
}

const suspenseWrapper = (element) => (
  <Suspense fallback={<LoadingFallback />}>{element}</Suspense>
);

const TOKEN_STORAGE_KEYS = ["accessToken", "token", "authToken"];

function getStoredAuthToken() {
  return TOKEN_STORAGE_KEYS.map((key) => localStorage.getItem(key)).find(Boolean);
}

function getStoredAuthUser() {
  try {
    const rawUser = localStorage.getItem("authUser");

    return rawUser ? JSON.parse(rawUser) : null;
  } catch {
    return null;
  }
}

function ProtectedRoute({ children }) {
  const authToken = getStoredAuthToken();
  const authUser = getStoredAuthUser();

  if (!authToken && !authUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function OwnerOnlyRoute({ children }) {
  const authUser = getStoredAuthUser();

  if (authUser?.role !== "owner") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

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
    path: "/resetpassword",
    element: suspenseWrapper(<ResetPassword />),
  },
  {
    path: "/confirmpassword",
    element: suspenseWrapper(<ConfirmPassword />),
  },
  {
    path: "/createnewpassword",
    element: suspenseWrapper(<CreateNewPassword />),
  },
  {
    path: "/dashboard",
    element: suspenseWrapper(
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>,
    ),
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
        element: suspenseWrapper(
          <OwnerOnlyRoute>
            <DashboardSales />
          </OwnerOnlyRoute>,
        ),
      },
      {
        path: "customization",
        element: suspenseWrapper(
          <OwnerOnlyRoute>
            <DashboardCustomization />
          </OwnerOnlyRoute>,
        ),
      },
    ],
  },
  {
    path: "/content/:contentId",
    element: suspenseWrapper(
      <ProtectedRoute>
        <ContentDetails />
      </ProtectedRoute>,
    ),
  },
  {
    path: "/user-profile/:userId",
    element: suspenseWrapper(
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>,
    ),
  },
  {
    path: "/test-details/:testId",
    element: suspenseWrapper(
      <ProtectedRoute>
        <TestDetails />
      </ProtectedRoute>,
    ),
  },
  {
    path: "/account-verification",
    element: suspenseWrapper(
      <ProtectedRoute>
        <OwnerOnlyRoute>
          <UsersVerificationCenter />
        </OwnerOnlyRoute>
      </ProtectedRoute>,
    ),
  },
]);
