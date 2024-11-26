import { useContext } from "react";
import { DragContext } from "./DragAndDropContext";

function useDragAndDrop() {
  const context = useContext(DragContext);
  const {
    dragItem,
    tempDragItem,
    draggingElement,
    listItemPositions,
    startY,
    tempY,
    scrollY,
    startX,
    tempX,
    scrollX,
    isScrolling,
  } = context!;

  const updateListPositions = (id: string, index: number) => {
    const row = document.getElementById(id);
    if (row == null) return;
    const rect = row.getBoundingClientRect();
    const verticalCenter = rect.top + rect.height / 2;
    const horizontalCenter = rect.left + rect.width / 2;
    const position = { x: horizontalCenter, y: verticalCenter };
    listItemPositions.current[index] = position;
  };

  const updateAllPositions = (data: any[], partialId: string) => {
    if (data.length === 0) return;
    data.forEach((_, index) => {
      updateListPositions(`${partialId}_${index}`, index);
    });
  };

  const enableDrag = (id: string) => {
    draggingElement.current = document.getElementById(id);

    if (draggingElement.current) {
      draggingElement.current.draggable = true;
    }
  };

  const disableDrag = () => {
    if (!draggingElement.current) return;

    draggingElement.current.draggable = false;
    draggingElement.current = null;
  };

  interface DragStartProps {
    event: React.DragEvent<HTMLDivElement>;
    index: number;
    cloneId: string;
    dragEntireColumn: boolean;
    containerId: string;
  }

  const handleDragStart = ({
    event,
    index,
    cloneId,
    dragEntireColumn,
    containerId,
  }: DragStartProps) => {
    
    if (
      draggingElement.current == null ||
      draggingElement.current.draggable === false ||
      draggingElement.current.id !== (event.target as HTMLElement).id
    ) {
      return event.preventDefault();
    }

    (dragItem.current as number) = index;
    (tempDragItem.current as number) = (index);
    const rect = draggingElement.current.getBoundingClientRect();
    const clone = draggingElement.current.cloneNode(true);
    const background = !dragEntireColumn ? "white" : "";
    draggingElement.current.style.opacity = "0";


    const cloneStyle = {
      zIndex: "9999",
      backgroundColor: background,
      position: "absolute",
      pointerEvents: "none",
      opacity: "1",
      boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
      width: `${rect.width}px`,
      top: `${rect.top}px`,
      left: `${rect.left}px`,
    };


    Object.assign((clone as HTMLElement).style, cloneStyle);
    (clone as HTMLElement).id = cloneId;
    document.body.appendChild(clone);
    const transparentClone = draggingElement.current.cloneNode(true) as HTMLElement;
    (transparentClone as HTMLElement).style.opacity = "0";
    event.dataTransfer.setDragImage((clone as HTMLElement), 0, 0);
    event.dataTransfer.setDragImage(transparentClone, 0, 0);
    (startY as React.MutableRefObject<number>).current = rect.top + rect.height / 2;
    (tempY as React.MutableRefObject<number>).current = rect.top;
    (startX as React.MutableRefObject<number>).current = rect.left + rect.width / 2;
    (tempX as React.MutableRefObject<number>).current = rect.left + rect.width / 2;

    if (dragEntireColumn) {
      const table = document.getElementById(containerId);
      const cells =
        table && table.querySelectorAll(`td:nth-child(${index + 1})`);

      cells && cells.forEach((cell) => {
        (cell as HTMLElement).style.zIndex = "9999";
        (cell as HTMLElement).style.width = `${rect.width}px`;
      });
    }
  };

  interface horizontalDragProps {
    event: React.DragEvent<HTMLDivElement>;
    clone: HTMLElement;
    container: DOMRect;
    containerId: string;
    partialId: string;
    dynamicSizes: boolean;
    dragEntireColumn: boolean;
    index: number;
  }
  const handleHorizontalDrag = ({
    event,
    clone,
    container,
    containerId,
    partialId,
    dynamicSizes,
    dragEntireColumn,
    index,
  }: horizontalDragProps) => {
    const leftEnd = container.left;
    const rightEnd = container.left + container.width;
    const shiftX = event.clientX - (startX.current ?? 0);
    const currentX = event.clientX;
    const table = document.getElementById(containerId);
    const cells =
      dragEntireColumn &&
      table &&
      table.querySelectorAll(`td:nth-child(${index + 1})`);

    if (leftEnd < currentX && currentX < rightEnd) {
      clone.style.transform = `translateX(${shiftX}px)`;
      if (dragEntireColumn) {
        cells && cells.forEach((cell) => {
          (cell as HTMLElement).style.transform = `translateX(${shiftX}px)`;
        });
      }
    }

    if (tempDragItem.current === -1) {
      (tempDragItem as React.MutableRefObject<number>).current = 0;
    }

    if (isScrolling.current) return;
    Object.entries(listItemPositions.current).forEach(([key, value]) => {
      if (parseInt(key) === tempDragItem.current) return;

      if (
        ((tempX.current as number) > value.x && currentX > value.x) ||
        ((tempX.current as number) < value.x && currentX < value.x)
      )
        return;

      const shiftLeft = (tempX.current as number) < value.x && currentX > value.x;
      const index = parseInt(key);
      const notShifted =
        ((dragItem.current as number) < index && (tempDragItem.current as number) < index) ||
        ((dragItem.current as number) > index && (tempDragItem.current as number) > index);
      const notShiftedIndex = shiftLeft
        ? (tempDragItem.current as number) + 1
        : (tempDragItem.current as number) - 1;

      for (
        let i = notShifted ? notShiftedIndex : tempDragItem.current;
        shiftLeft ? (i as number) <= index : (i as number) >= index;
        shiftLeft ? (i as number)++ : (i as number)--
      ) {
        const cells =
          dragEntireColumn &&
          table &&
          table.querySelectorAll(`td:nth-child(${(i as number) + 1})`);
        const shiftItem = document.getElementById(`${partialId}_${i}`);
        if (!shiftItem) return;
        const shiftLeftDistance = dynamicSizes
          ? `translateX(-${clone.offsetWidth}px)`
          : `translateX(-${shiftItem.offsetWidth}px)`;
        const shiftRightDistance = dynamicSizes
          ? `translateX(${clone.offsetWidth}px)`
          : `translateX(${shiftItem.offsetWidth}px)`;
        const shiftDirection = shiftLeft
          ? shiftLeftDistance
          : shiftRightDistance;
        shiftItem.style.transition = "0.1s";
        shiftItem.style.transform = notShifted
          ? shiftDirection
          : `translateX(0px)`;

        if (cells) {
          cells.forEach((cell) => {
            (cell as HTMLElement).style.transition = "0.1s";
            (cell as HTMLElement).style.transform = notShifted
              ? shiftDirection
              : `translateX(0px)`;
          });
        }
          
      }
      if (!notShifted) {
        shiftLeft
          ? ((tempDragItem as React.MutableRefObject<number>).current = parseInt(key) + 1)
          : ((tempDragItem as React.MutableRefObject<number>).current = parseInt(key) - 1);
      } else {
        (tempDragItem as React.MutableRefObject<number>).current = parseInt(key);
      }
      (tempX as React.MutableRefObject<number>).current = currentX;
    });
  };

  interface verticalDragProps {
    event: React.DragEvent<HTMLDivElement>;
    clone: HTMLElement;
    container: DOMRect;
    partialId: string;
    dynamicSizes: boolean;
  }

  const handleVerticalDrag = ({
    event,
    clone,
    container,
    partialId,
    dynamicSizes,
  }: verticalDragProps) => {
    const shiftY = event.clientY - (startY as React.MutableRefObject<number>).current;
    const currentY = event.clientY;
    const height = clone.offsetHeight /2


    if (
      container.top < currentY &&
      currentY < container.bottom - height
    ) {
      clone.style.transform = `translateY(${shiftY}px)`;
    }

    if (tempDragItem.current === -1) {
      (tempDragItem as React.MutableRefObject<number>).current = 0;
    }

    if (isScrolling.current) return;
    Object.entries(listItemPositions.current).forEach(([key, value]) => {
      if (+key === tempDragItem.current) return;

      if (
        ((tempY as React.MutableRefObject<number>).current > value.y && currentY > value.y) ||
        ((tempY as React.MutableRefObject<number>).current < value.y && currentY < value.y)
      )
        return;

      const shiftUp = (tempY as React.MutableRefObject<number>).current < value.y && currentY > value.y;
      const index = +key;
      const notShifted =
        ((dragItem as React.MutableRefObject<number>).current < index && (tempDragItem as React.MutableRefObject<number>).current < index) ||
        ((dragItem as React.MutableRefObject<number>).current > index && (tempDragItem as React.MutableRefObject<number>).current > index);
      const notShiftedIndex = shiftUp
        ? (tempDragItem as React.MutableRefObject<number>).current + 1
        : (tempDragItem as React.MutableRefObject<number>).current - 1;

      for (
        let i = notShifted ? notShiftedIndex : tempDragItem.current;
        shiftUp ? (i as number) <= index : (i as number) >= index;
        shiftUp ? (i as number)++ : (i as number)--
      ) {
        const shiftItem = document.getElementById(`${partialId}_${i}`);
        if (!shiftItem) return;
        const shiftUpDistance = dynamicSizes
          ? `translateY(-${clone.offsetHeight}px)`
          : `translateY(-${shiftItem.offsetHeight}px)`;
        const shiftDownDistance = dynamicSizes
          ? `translateY(${clone.offsetHeight}px)`
          : `translateY(${shiftItem.offsetHeight}px)`;
        const shiftDirection = shiftUp ? shiftUpDistance : shiftDownDistance;
        shiftItem.style.transition = "0.1s";
        shiftItem.style.transform = notShifted
          ? shiftDirection
          : `translateY(0px)`;
      }
      if (!notShifted) {
        shiftUp
          ? ((tempDragItem as React.MutableRefObject<number>).current = +key + 1)
          : ((tempDragItem as React.MutableRefObject<number>).current = +key - 1);
      } else {
        (tempDragItem as React.MutableRefObject<number>).current = +key;
      }
      (tempY as React.MutableRefObject<number>).current = currentY;
    });
  };

  interface handleDragProps {
    event: React.DragEvent<HTMLDivElement>;
    cloneId: string;
    containerId: string;
    partialId: string;
    isVertical: boolean;
    dynamicSizes: boolean;
    dragEntireColumn: boolean;
    index: number;
  }

// TODO: initial drag is good; dragging back over items shifts 2 at a time
  const handleDrag = ({
    event,
    cloneId,
    containerId,
    partialId,
    isVertical,
    dynamicSizes,
    dragEntireColumn,
    index,
  }: handleDragProps) => {
    if (event.clientY === 0) return;
    const clone = document.getElementById(cloneId);
    const container = document
      .getElementById(containerId)?.getBoundingClientRect();
    if (!clone || !container) return;
    if (isVertical) {
      handleVerticalDrag({ event, clone, container, partialId, dynamicSizes });
    } else {
      handleHorizontalDrag({
        event,
        clone,
        container,
        containerId,
        partialId,
        dynamicSizes,
        dragEntireColumn,
        index,
      });
    }
  };


  const handleDragEnter = ({ index, cloneId, partialId }: { index: number, cloneId: string, partialId: string }) => {
    if (isScrolling.current === false) return;
    const clone = document.getElementById(cloneId);
    if (!clone) return;
    if (dragItem.current === index) return;
    if (tempDragItem.current == null) {
      (tempDragItem as React.MutableRefObject<number>).current = (dragItem.current as number);
    }

    const notShifted =
      ((dragItem.current as number) < index && (tempDragItem.current as number) < index) ||
      ((dragItem.current as number) > index && (tempDragItem.current as number) > index);
    const shiftUp = index > (tempDragItem.current as number);
    const notShiftedIndex = shiftUp
      ? (tempDragItem.current as number) + 1
      : (tempDragItem.current as number) - 1;

    for (
      let i = notShifted ? notShiftedIndex : tempDragItem.current;
      shiftUp ? (i as number) <= index : (i as number) >= index;
      shiftUp ? (i as number)++ : (i as number)--
    ) {
      const shiftItem = document.getElementById(`${partialId}_${i}`);
      if (!shiftItem) return;
      const shiftDirection = shiftUp
        ? `translateY(-${shiftItem.offsetHeight}px)`
        : `translateY(${shiftItem.offsetHeight}px)`;
      shiftItem.style.transition = "0.1s";
      shiftItem.style.transform = notShifted
        ? shiftDirection
        : `translateY(0px)`;
    }

    if (!notShifted) {
      shiftUp
        ? ((tempDragItem as React.MutableRefObject<number>).current = index + 1)
        : ((tempDragItem as React.MutableRefObject<number>).current = index - 1);
    } else {
      (tempDragItem as React.MutableRefObject<number>).current = index;
    }
  };

  interface handleAfterDropProps {
    partialId: string;
    cloneId: string;
    data: any[];
    containerId: string;
    dragEntireColumn: boolean;
  }

  const handleAfterDrop = ({
    partialId,
    cloneId,
    data,
    containerId,
    dragEntireColumn,
  }: handleAfterDropProps) => {
    const table = containerId && document.getElementById(containerId);
    data.forEach((_, index) => {
      const item = document.getElementById(`${partialId}_${index}`);
      (item as HTMLElement).style.transition = "0s";
      (item as HTMLElement).style.transform = "translateY(0px)";

      if (!dragEntireColumn) return;
      const cells = (table as HTMLElement).querySelectorAll(`td:nth-child(${index + 1})`);
      cells.forEach((cell) => {
        (cell as HTMLElement).style.transition = "0s";
        (cell as HTMLElement).style.transform = "translateY(0px)";
        (cell as HTMLElement).style.zIndex = "0";
      });
    });
    const draggedRow = document.getElementById(
      `${partialId}_${dragItem.current}`
    );

    if (draggedRow) {
      (draggedRow as HTMLElement).style.opacity = "1";
    }

    const clone = document.getElementById(cloneId);
    if (clone) {
      clone.remove();
    }

    (tempDragItem as React.MutableRefObject<number>).current = (null as unknown) as number;
  };

  const updateData = (data: any[]) => {
    const copyList = [...data];
    if (dragItem.current == null || tempDragItem.current == null) return;
    const dragItemContent = copyList[dragItem.current];
    copyList.splice(dragItem.current, 1);
    copyList.splice(tempDragItem.current, 0, dragItemContent);
    return copyList as any[];
  };

  return {
    enableDrag,
    disableDrag,
    handleDragStart,
    handleDrag,
    handleDragEnter,
    handleAfterDrop,
    updateAllPositions,
    updateData,
    isScrolling,
    scrollY,
  };
}

export default useDragAndDrop;
