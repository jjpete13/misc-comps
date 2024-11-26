import { Box, Slide, Alert, AlertColor } from "@mui/material";
import React from "react";
import { ToastState } from "./toastObserver";

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
};

const Toast = ({ message, severity, onClose }: { message: string, severity: AlertColor, onClose: () => void }) => {
  return (
    <Slide in={true} direction="left">
      <Box>
        <Alert severity={severity} variant="filled" onClose={onClose} sx={{ margin: "5px" }}>
          <>{message}</>
        </Alert>
      </Box>
    </Slide>
  );
};

const ToastList = () => {
  const [toastList, setToastList] = React.useState<any[]>([]);
  const removeToast = (id: any) => {
    setToastList(toastList.filter((toast: any) => toast.id !== id));
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
