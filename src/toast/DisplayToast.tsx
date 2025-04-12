import { toast } from "./toastObserver";

export default function DisplayToast() {
	const buttonColors = {
		success: "rgb(22 169 29)",
		error: "rgb(235 25 25)",
		info: "rgb(2, 136, 209)",
		warning: "rgb(255, 135, 23)",
	};

	const buttonStyle = ({ backgroundColor }: { backgroundColor: string }) => {
		return {
			backgroundColor: backgroundColor,
			color: "white",
			padding: "10px 20px",
			cursor: "pointer",
			margin: "5px",
			width: "300px",
			boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
		};
	};

	const handleClick = (severity: "success" | "error" | "info" | "warning") => {
		toast[severity](`This is a ${severity} toast`);
	};
	return (
		<>
			<h3>Scrollable Toast List</h3>
			<ul>
				<li style={{ listStyleType: "none" }}>
					<button
						type="button"
						style={buttonStyle({ backgroundColor: buttonColors.success })}
						onClick={() => handleClick("success")}
					>
						Display Toast Success
					</button>
				</li>
				<li style={{ listStyleType: "none" }}>
					<button
						type="button"
						style={buttonStyle({ backgroundColor: buttonColors.error })}
						onClick={() => handleClick("error")}
					>
						Display Toast Error
					</button>
				</li>
				<li style={{ listStyleType: "none" }}>
					<button
						type="button"
						style={buttonStyle({ backgroundColor: buttonColors.info })}
						onClick={() => handleClick("info")}
					>
						Display Toast Info
					</button>
				</li>
				<li style={{ listStyleType: "none" }}>
					<button
						type="button"
						style={buttonStyle({ backgroundColor: buttonColors.warning })}
						onClick={() => handleClick("warning")}
					>
						Display Toast Warning
					</button>
				</li>
			</ul>
		</>
	);
}
