import { useState } from "react";
import Login from "./Login/Login";
import CardWithTabs from "./cardWithTabs/CardWithTabs";
import DraggingTable from "./dragAndDrop/DraggableRowsTable";
import NavBar from "./navBar/NavBar";
import DisplayToast from "./toast/DisplayToast";
import ToastList from "./toast/ToastList";
import VirtualizedList from "./virtualizedList/virtualizedList";

export default function Components() {
	const [rows, setRows] = useState([
		"row1",
		"row2",
		"row3",
		"row4",
		"row5",
		"row6",
		"row7",
	]);
	const components = {
		dragAndDrop: "dragAndDrop",
		toast: "toast",
		login: "login",
		tabs: "tabs",
		virtualizedList: "virtualizedList",
	} as const;
	const [showComponent, setShowComponent] = useState<
		"dragAndDrop" | "toast" | "login" | "tabs" | "virtualizedList"
	>(components.dragAndDrop);

	const updateRows = (newRows: any[]) => {
		setRows(newRows);
	};
	const availableComponents = {
		dragAndDrop: <DraggingTable rows={rows} updateRows={updateRows} />,
		toast: <DisplayToast />,
		login: <Login />,
		tabs: <CardWithTabs />,
		virtualizedList: <VirtualizedList items={Array.from({ length: 40000 }, (_, i) => i + 1)} itemHeight={50} windowHeight={500} />,
	};
	const VisibleComponent = ({
		component,
	}: { component: keyof typeof availableComponents }) => {
		return <>{availableComponents[component]}</>;
	};

	return (
		<>
			<ToastList />
			<NavBar updateComponent={setShowComponent} />
			<VisibleComponent component={showComponent} />
		</>
	);
}
