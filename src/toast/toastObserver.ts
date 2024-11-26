let toastCounter = 0;

class Observer {
  subscribers: any[];
  toasts: any[];

  constructor() {
    this.subscribers = [];
    this.toasts = [];
  }

  subscribe = (subscriber: any) => {
    this.subscribers.push(subscriber);

    return () => {
      const index = this.subscribers.indexOf(subscriber);
      this.subscribers.splice(index, 1);
    };
  };

  publish = () => {
    this.subscribers.forEach((subscriber) => {
      subscriber();
    });
  };

  addToast = (toast: any) => {
    this.toasts = [toast, ...this.toasts];
    this.publish();

    setTimeout(() => {
      this.removeToast(toast.id);
      this.publish();
    }, 5000);
  };

  removeToast = (id: any) => {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
  };

  create = (toast: any) => {
    const { message, severity } = toast;
    const id = toastCounter++;
    this.addToast({ message, severity, id });
  };

  success = (message: any) => {
    this.create({ message, severity: "success" });
  };

  error = (message: any) => {
    this.create({ message, severity: "error" });
  };

  info = (message: any) => {
    this.create({ message, severity: "info" });
  };

  warning = (message: any) => {
    this.create({ message, severity: "warning" });
  };
}

export const ToastState = new Observer();

const showToast = (message: any, severity: string) => {
  const id = toastCounter++;

  ToastState.addToast({ message: message, severity: severity, id });
};

export const toast = Object.assign(showToast, {
  success: ToastState.success,
  error: ToastState.error,
  info: ToastState.info,
  warning: ToastState.warning,
});
