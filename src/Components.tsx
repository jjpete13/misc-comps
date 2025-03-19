import { useState } from 'react';
import DraggingTable from './dragAndDrop/DraggableRowsTable'
import NavBar from './navBar/NavBar';
import DisplayToast from './toast/DisplayToast';
import ToastList from './toast/ToastList';
import LoginModal from './Login/LoginModal';
import CardWithTabs from './cardWithTabs/CardWithTabs';

export default function Components() {
  const [rows, setRows] = useState(["row1", "row2", "row3", "row4", "row5", "row6", "row7"]);
  const components = { dragAndDrop: "dragAndDrop", toast: "toast", tabs: "tabs" } as const;
  const [showComponent, setShowComponent] = useState<"dragAndDrop" |  "toast" | "login" |  "tabs">(components.dragAndDrop);


  const updateRows = (newRows: any[]) => {
    setRows(newRows)
  }
const availableComponents = {
    dragAndDrop: <DraggingTable rows={rows} updateRows={updateRows}/>,
    toast: <DisplayToast />,
    login: <LoginModal />,
    tabs: <CardWithTabs />,
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