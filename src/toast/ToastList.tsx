import React from "react";
import { ToastState } from "./toastObserver";
import './toast.css'

const styles = {
  position: "fixed",
  zIndex: 9999,
  top: 10,
  right: 0,
  margin: "20px",
  height: "160px",
  width: "fit-content",
  overflowX: "hidden",
  overflowY: "auto",
  scrollbarWidth: "none",
  transition: "all 0.5s ease-in-out",
};

type severity = "success" | "error" | "info" | "warning";

const Toast = ({ message, severity, onClose }: { message: string, severity: severity, onClose: () => void }) => {

  return (
      <div id="toast" className={`toast ${severity}`}>
        <p>{message}</p>
        <button onClick={onClose} style={{border: "none", background: "none", cursor: "pointer", color: 'inherit'}}>X</button>
      </div>
  )
}

const ToastList = () => {
  const [toastList, setToastList] = React.useState<any[]>([]);
  const removeToast = (id: any) => {
    setToastList(toastList.filter((toast: any) => toast.id !== id));
    ToastState.removeToast(id);
  };
  React.useEffect(() => {
    return ToastState?.subscribe(() => {
      setToastList(ToastState.toasts);
    });
  }, []);

  return (
    toastList.length > 0 && (
      <div style={styles as React.CSSProperties}>
        {toastList.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            severity={toast.severity}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    )
  );
};

export default ToastList;
