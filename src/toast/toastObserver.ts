let toastCounter = 0;

export type Toast = {
	message: string;
	severity: string;
	id: number;
};

export type Severity = "success" | "error" | "info" | "warning";

class Observer {
	subscribers: Array<() => void>;
	toasts: Toast[];

	constructor() {
		this.subscribers = [];
		this.toasts = [];
	}

	subscribe = (subscriber: () => void) => {
		this.subscribers.push(subscriber);

		return () => {
			const index = this.subscribers.indexOf(subscriber);
			this.subscribers.splice(index, 1);
		};
	};

	publish = () => {
		for (const subscriber of this.subscribers) {
			subscriber();
		}
	};

	addToast = (toast: Toast) => {
		this.toasts = [toast, ...this.toasts];
		this.publish();

		setTimeout(() => {
			this.removeToast(toast.id);
			this.publish();
		}, 5000);
	};

	removeToast = (id: number) => {
		this.toasts = this.toasts.filter((toast) => toast.id !== id);
	};

	create = (toast: { message: string; severity: Severity }) => {
		const { message, severity } = toast;
		const id = toastCounter++;
		this.addToast({ message, severity, id });
	};

	success = (message: string) => {
		this.create({ message, severity: "success" });
	};

	error = (message: string) => {
		this.create({ message, severity: "error" });
	};

	info = (message: string) => {
		this.create({ message, severity: "info" });
	};

	warning = (message: string) => {
		this.create({ message, severity: "warning" });
	};
}

export const ToastState = new Observer();

const showToast = (message: string, severity: Severity) => {
	const id = toastCounter++;

	ToastState.addToast({ message: message, severity: severity, id });
};

export const toast = Object.assign(showToast, {
	success: ToastState.success,
	error: ToastState.error,
	info: ToastState.info,
	warning: ToastState.warning,
});
