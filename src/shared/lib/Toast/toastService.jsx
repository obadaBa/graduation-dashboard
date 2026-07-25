import { toast } from "react-toastify";
import ErrorMarkIcon from "../../../features/dashboard/Assets/wrong-mark-svgrepo-com.svg";
import SuccessMarkIcon from "../../../features/dashboard/Assets/wrong-mark-svgrepo-com (1).svg";

function normalizeToastText(value, fallback = "") {
  if (value == null) {
    return fallback;
  }

  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map((item) => normalizeToastText(item)).filter(Boolean).join("، ");
  }

  if (typeof value === "object") {
    return (
      normalizeToastText(value.message) ||
      normalizeToastText(value.title) ||
      normalizeToastText(value.error) ||
      fallback
    );
  }

  return fallback;
}

function ToastContent({ title, message, color, icon, alt, actionLabel }) {
  const safeTitle = normalizeToastText(title);
  const safeMessage = normalizeToastText(message);
  const safeActionLabel = normalizeToastText(actionLabel);

  return (
    <div
      style={{
        width: "100%",
        minHeight: 84,
        direction: "rtl",
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        padding: "14px 18px 14px 14px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ textAlign: "right", flex: 1 }}>
        <div
          style={{
            color,
            fontSize: 19,
            fontWeight: 800,
            lineHeight: 1.25,
            marginBottom: 10,
          }}
        >
          {safeTitle}
        </div>
        <div
          style={{
            color: "#263238",
            fontSize: 16,
            fontWeight: 700,
            lineHeight: 1.5,
          }}
        >
          {safeMessage}
        </div>
        {safeActionLabel && (
          <div
            style={{
              color,
              fontSize: 14,
              fontWeight: 800,
              marginTop: 8,
            }}
          >
            {safeActionLabel}
          </div>
        )}
      </div>

      <img src={icon} alt={alt} style={{ width: 38, height: 38, flexShrink: 0 }} />
    </div>
  );
}

function NotificationToastContent({ title, message }) {
  const safeTitle = normalizeToastText(title, "إشعار جديد");
  const safeMessage = normalizeToastText(message, safeTitle);

  return (
    <div
      style={{
        width: "100%",
        direction: "rtl",
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 16px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: "12px",
          background: "linear-gradient(135deg, #263238 0%, #5583FF 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: "0 8px 18px rgba(85, 131, 255, 0.28)",
        }}
      >
        <div
          style={{
            width: 15,
            height: 18,
            border: "2px solid #FFFFFF",
            borderRadius: "8px 8px 5px 5px",
            position: "relative",
            boxSizing: "border-box",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "50%",
              bottom: -7,
              width: 7,
              height: 3,
              borderRadius: "999px",
              background: "#FFFFFF",
              transform: "translateX(-50%)",
            }}
          />
        </div>
      </div>

      <div style={{ minWidth: 0, flex: 1, textAlign: "right" }}>
        <div
          style={{
            color: "#263238",
            fontSize: 14,
            fontWeight: 800,
            lineHeight: 1.35,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginBottom: 4,
          }}
        >
          {safeTitle}
        </div>
        <div
          style={{
            color: "#667085",
            fontSize: 13,
            fontWeight: 600,
            lineHeight: 1.55,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {safeMessage}
        </div>
      </div>
    </div>
  );
}

const baseToastOptions = (color) => ({
  position: "bottom-left",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  closeButton: false,
  icon: false,
  theme: "light",
  style: {
    width: "470px",
    minHeight: "86px",
    padding: 0,
    borderRadius: "8px",
    border: "1px solid #D7D7D7",
    borderRight: `12px solid ${color}`,
    boxShadow: "0 2px 10px rgba(15, 23, 42, 0.22)",
    overflow: "hidden",
    background: "#FFFFFF",
  },
  bodyStyle: {
    margin: 0,
    padding: 0,
    width: "100%",
  },
});

export const showErrorToast = (message, title = "خطأ تحقق !") => {
  toast(
    <ToastContent
      title={title}
      message={message}
      color="#FF5E58"
      icon={ErrorMarkIcon}
      alt="خطأ"
    />,
    baseToastOptions("#FF5E58"),
  );
};

export const showSuccessToast = (message, title = "تمت العملية بنجاح !") => {
  toast(
    <ToastContent
      title={title}
      message={message}
      color="#58DD4F"
      icon={SuccessMarkIcon}
      alt="نجاح"
    />,
    baseToastOptions("#58DD4F"),
  );
};

export const showActionSuccessToast = ({
  title,
  message,
  actionLabel = "اضغط للعرض",
  onClick,
}) => {
  const options = baseToastOptions("#58DD4F");

  return toast(
    <ToastContent
      title={title}
      message={message}
      actionLabel={actionLabel}
      color="#58DD4F"
      icon={SuccessMarkIcon}
      alt="نجاح"
    />,
    {
      ...options,
      autoClose: false,
      onClick,
      style: {
        ...options.style,
        cursor: "pointer",
      },
    },
  );
};

export const showNotificationToast = (message, title = "إشعار جديد") => {
  toast(<NotificationToastContent title={title} message={message} />, {
    position: "top-center",
    autoClose: 6500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    closeButton: false,
    icon: false,
    theme: "light",
    style: {
      width: "min(420px, calc(100vw - 28px))",
      minHeight: "74px",
      padding: 0,
      borderRadius: "14px",
      border: "1px solid rgba(38, 50, 56, 0.12)",
      boxShadow: "0 18px 50px rgba(15, 23, 42, 0.18)",
      overflow: "hidden",
      background: "rgba(255, 255, 255, 0.98)",
    },
    bodyStyle: {
      margin: 0,
      padding: 0,
      width: "100%",
    },
    progressStyle: {
      background: "linear-gradient(90deg, #5583FF 0%, #263238 100%)",
      height: "3px",
    },
  });
};

export const showWarningToast = (message) => {
  toast.warn(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const showInfoToast = (message) => {
  toast.info(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const showDefaultToast = (message) => {
  toast(message, {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
