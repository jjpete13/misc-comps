import { useRef } from "react";
import "./Login.css";
import { toast } from "../toast/toastObserver";

// TODO: add rgb border and button to trigger it
export default function Login() {
  const userRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const handleOnBlur = (id: string, ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current?.value !== null && ref.current?.value !== "") {
      (document.getElementById(id) as HTMLDivElement).style.opacity = "0";
    }
  }

  const handleOnFocus = (id: string, ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current?.value !== null) {
      (document.getElementById(id) as HTMLDivElement).style.opacity = "1";
    }
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <div className="input-group" id='user'>
        <input
          type="text"
          ref={userRef}
          onBlur={() => handleOnBlur("user-label", userRef)}
          onFocus={() => {handleOnFocus("user-label", userRef)}}
        />
          <label htmlFor="username" id="user-label">Username</label>
      </div>
      <div className="input-group">
        <input 
          type="password"
          ref={passRef}
          onBlur={() => handleOnBlur("password-label", passRef)}
          onFocus={() => {handleOnFocus("password-label", passRef)}}
          />
        <label htmlFor="password" id="password-label">Password</label>
      </div>
      <button onClick={() => toast.success("Login successful")}>Login</button>
    </div>
  )
}