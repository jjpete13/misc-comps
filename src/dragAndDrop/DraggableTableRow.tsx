"use client";
import { useEffect } from "react";
import useDragAndDrop from "./useDragAndDrop";

interface DraggableTableRowProps {
  cloneId: string;
  containerId: string;
  partialId: string;
  data: any[];
  index: number;
  children: React.ReactNode;
  dynamicSizes?: boolean;
  updateRows?: (newRows: string[]) => void;
}


export default function DraggableTableRow(props: DraggableTableRowProps) {
  const {
    cloneId,
    containerId,
    partialId,
    data,
    index,
    children,
    dynamicSizes = false,
    updateRows,
  } = props;

  const {
    enableDrag,
    disableDrag,
    handleDragStart,
    handleDrag,
    handleDragEnter,
    handleAfterDrop,
    updateData,
    updateAllPositions,
    isScrolling,
    scrollY,
  } = useDragAndDrop();

  useEffect(() => {
    updateAllPositions(data, partialId);
  }, [data]);

  useEffect(() => {
    const clone = document.getElementById(cloneId);
    if (clone) clone.remove();

    const dropZone = document.getElementById(containerId);
    if (!dropZone) return;
    let timeoutId: any | null = null;

    const updateScrolledPosition = () => {
      (scrollY as React.MutableRefObject<number>).current = dropZone.scrollTop;
      if (isScrolling.current) return;
      isScrolling.current = true;
      clearTimeout((timeoutId as any));
      timeoutId = setTimeout(() => {
        isScrolling.current = false;
        updateAllPositions(data, partialId);
      }, 100);
    };

    dropZone.addEventListener("scroll", updateScrolledPosition);

    return () => {
      dropZone.removeEventListener("scroll", updateScrolledPosition);
    };
  }, []);

  const handleDragEnd = () => {
    //add function to update local user settings here
updateRows && updateRows(data && updateData(data) || []);
    handleAfterDrop({
      partialId,
      cloneId,
      data,
      containerId,
      dragEntireColumn: false,
    });

    
  };

  const style = {
    PointerEvents: "none",
    borderBottom: "1px solid black",
  };

  return (
    <tr
      style={{...style}}
      key={`${partialId}_${index}`}
      id={`${partialId}_${index}`}
      draggable="false"
      onDragStart={(e) =>
        handleDragStart({
          event: e,
          index,
          cloneId,
          dragEntireColumn: false,
          containerId,
        })
      }
      onDrag={(e) => 
        handleDrag({
          event: e,
          cloneId,
          partialId,
          isVertical: true,
          dynamicSizes,
          dragEntireColumn: false,
          index,
          containerId
        })
      }
      onDragEnter={(e) =>
        handleDragEnter({
          index,
          cloneId,
          partialId,
        })
      }
      onDragEnd={handleDragEnd}
    >
      <td
      style={{cursor: "pointer"}}
        onMouseEnter={() => enableDrag(`${partialId}_${index}`)}
        onMouseLeave={() => disableDrag()}
      >
        <p>Drag Me</p>
      </td>
        {children}
    </tr>
  );
}
