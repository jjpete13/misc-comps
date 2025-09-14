export function enableDrag(id: string): void;
export function disableDrag(id: string): void;

export interface DragStartProps {
	event: React.DragEvent<HTMLDivElement>;
	index: number;
	cloneId: string;
	dragEntireColumn: boolean;
	containerId: string;
}

export function handleDragStart(props: DragStartProps): void;

export interface DragProps {
	event: React.DragEvent<HTMLDivElement>;
	cloneId: string;
	containerId: string;
	partialId: string;
	isVertical: boolean;
	dynamicSizes: boolean;
	dragEntireColumn: boolean;
	index: number;
}

export function handleDrag(props: DragProps): void;

export interface DragEnterProps {
	index: number;
	cloneId: string;
	partialId: string;
}

export function handleDragEnter(props: DragEnterProps): void;

export interface AfterDropProps {
	partialId: string;
	cloneId: string;
	data: any[];
	containerId: string;
	dragEntireColumn: boolean;
}

export function handleAfterDrop(props: AfterDropProps): void;
