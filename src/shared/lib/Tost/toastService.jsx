import { toast } from "react-toastify";
import ErrorMarkIcon from "../../../features/dashboard/Assets/wrong-mark-svgrepo-com.svg";
import SuccessMarkIcon from "../../../features/dashboard/Assets/wrong-mark-svgrepo-com (1).svg";

function ToastContent({ title, message, color, icon, alt, actionLabel }) {
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
          {title}
        </div>
        <div
          style={{
            color: "#263238",
            fontSize: 16,
            fontWeight: 700,
            lineHeight: 1.5,
          }}
        >
          {message}
        </div>
        {actionLabel && (
          <div
            style={{
              color,
              fontSize: 14,
              fontWeight: 800,
              marginTop: 8,
            }}
          >
            {actionLabel}
          </div>
        )}
      </div>

      <img src={icon} alt={alt} style={{ width: 38, height: 38, flexShrink: 0 }} />
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
