import { SetStateAction } from "react"
import "./navBar.css"

interface NavBarProps {
  updateComponent: (component: SetStateAction<"dragAndDrop" | "tsCalc">) => void;
}

export default function NavBar( {updateComponent}: NavBarProps) {

  type NavButtonProps = {
    text: string;
    component: "dragAndDrop" | "tsCalc";
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
    </nav>
  );
}