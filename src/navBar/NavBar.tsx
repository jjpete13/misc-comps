import { SetStateAction } from "react"
import "./navBar.css"


interface NavBarProps {
  updateComponent: (component: SetStateAction<"dragAndDrop" | "tsCalc" | "toast" | "login" | "tabs">) => void;
}

export default function NavBar( {updateComponent}: NavBarProps) {

  type NavButtonProps = {
    text: string;
    component: "dragAndDrop" | "tsCalc" | "toast" | "login" | "tabs";
  };
  const NavButton = ({ text, component }: NavButtonProps) => {
    return (
      <button onClick={() => updateComponent(component)}>{text}</button>
    )
  }


  return (
    <nav className="navBar">
      <NavButton text="Draggable Rows" component="dragAndDrop" />
      <NavButton text="Calculator" component="tsCalc" />
      <NavButton text="Toast" component="toast" />
      <NavButton text="Login" component="login" />
      <NavButton text="card w/ tabs" component="tabs" />
    </nav>
  );
}