import { useRef, useState } from "react";
import "./Login.css";
import { toast } from "../toast/toastObserver";

export default function Login() {
	const userRef = useRef<HTMLInputElement>(null);
	const passRef = useRef<HTMLInputElement>(null);
	const [colorful, setColorful] = useState<boolean>(false);

	const handleOnBlur = (id: string, ref: React.RefObject<HTMLInputElement>) => {
		if (ref.current?.value !== null && ref.current?.value !== "") {
			(document.getElementById(id) as HTMLDivElement).style.opacity = "0";
		}
	};

	const handleOnFocus = (
		id: string,
		ref: React.RefObject<HTMLInputElement>,
	) => {
		if (ref.current?.value !== null) {
			(document.getElementById(id) as HTMLDivElement).style.opacity = "1";
		}
	};

	const handleSubmit = () => {
		const hasUser =
			userRef.current?.value !== null && userRef.current?.value !== "";
		const hasPass =
			passRef.current?.value !== null && passRef.current?.value !== "";
		if (hasUser && hasPass) {
			return toast.success("Login successful");
		}
		return toast.error("Missing username or password");
	};

	return (
		<div className="login" id={colorful ? "colorful" : ""}>
			<h1
				style={{ color: colorful ? "#00ffea" : "", cursor: "pointer" }}
				onClick={() => setColorful(!colorful)}
			>
				Login
			</h1>
			<div className="input-group" id="user">
				<input
					type="text"
					ref={userRef}
					onBlur={() => handleOnBlur("user-label", userRef)}
					onFocus={() => {
						handleOnFocus("user-label", userRef);
					}}
				/>
				<label htmlFor="username" id="user-label">
					Username
				</label>
			</div>
			<div className="input-group">
				<input
					type="password"
					ref={passRef}
					onBlur={() => handleOnBlur("password-label", passRef)}
					onFocus={() => {
						handleOnFocus("password-label", passRef);
					}}
				/>
				<label htmlFor="password" id="password-label">
					Password
				</label>
			</div>
			<button type="button" onClick={handleSubmit}>
				Login
			</button>
		</div>
	);
}
