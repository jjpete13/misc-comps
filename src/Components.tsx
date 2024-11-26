import { useState } from 'react';
import DraggingTable from './dragAndDrop/DraggingTable'
import CalculatorComponent from './tsCalc/Calculator';
import NavBar from './navBar/NavBar';
import DisplayToast from './toast/DisplayToast';
import ToastList from './toast/ToastList';

// TODO: add draggable columns, any other components you already have
// put dragging columns in another table and display it on the same tab as the draggable rows
export default function Components() {
  const [rows, setRows] = useState(["row1", "row2", "row3", "row4", "row5", "row6", "row7"]);
  const components = { dragAndDrop: "dragAndDrop", tsCalc: "tsCalc", toast: "toast" } as const;
  const [showComponent, setShowComponent] = useState<"dragAndDrop" | "tsCalc" | "toast">(components.dragAndDrop);


  const updateRows = (newRows: any[]) => {
    setRows(newRows)
  }
const availableComponents = {
    dragAndDrop: <DraggingTable rows={rows} updateRows={updateRows}/>,
    tsCalc: <CalculatorComponent />,
    toast: <DisplayToast />,
  }
  const VisibleComponent = ({component}: {component: keyof typeof availableComponents}) => {
    return (
      <>
        {availableComponents[component]}
      </>
    )
  }




  return (
    <>
    <ToastList />
    <NavBar updateComponent={setShowComponent} />
    <VisibleComponent component={showComponent} />
    </>
  )
}