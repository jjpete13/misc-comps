import { useState } from 'react';
import './App.css'
import DraggingTable from './dragAndDrop/DraggingTable'
import CalculatorComponent from './tsCalc/Calculator';
import NavBar from './navBar/NavBar';


// TODO: move logic to a separate file to clean up this one
// TODO: add toast component, draggable columns, any other components you already have
function App() {
  const [rows, setRows] = useState(["row1", "row2", "row3", "row4", "row5", "row6", "row7"]);
  const components = { dragAndDrop: "dragAndDrop", tsCalc: "tsCalc" } as const;
  const [showComponent, setShowComponent] = useState<"dragAndDrop" | "tsCalc">(components.dragAndDrop);


  const updateRows = (newRows: any[]) => {
    setRows(newRows)
  }
const availableComponents = {
    dragAndDrop: <DraggingTable rows={rows} updateRows={updateRows}/>,
    tsCalc: <CalculatorComponent />
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
    <NavBar updateComponent={setShowComponent} />
    <VisibleComponent component={showComponent} />
    </>
  )
}

export default App
