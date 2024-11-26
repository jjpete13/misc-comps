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


  return (
    <tr
      style={{ cursor: "pointer"  }}
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
      style={{cursor: "pointer", width: "fit-content", textAlign: "left", paddingLeft: "10px"}}
        onMouseEnter={() => enableDrag(`${partialId}_${index}`)}
        onMouseLeave={() => disableDrag()}
      >
        <svg width="20" height="20"   fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M9.5 8C10.3284 8 11 7.32843 11 6.5C11 5.67157 10.3284 5 9.5 5C8.67157 5 8 5.67157 8 6.5C8 7.32843 8.67157 8 9.5 8ZM9.5 14C10.3284 14 11 13.3284 11 12.5C11 11.6716 10.3284 11 9.5 11C8.67157 11 8 11.6716 8 12.5C8 13.3284 8.67157 14 9.5 14ZM11 18.5C11 19.3284 10.3284 20 9.5 20C8.67157 20 8 19.3284 8 18.5C8 17.6716 8.67157 17 9.5 17C10.3284 17 11 17.6716 11 18.5ZM15.5 8C16.3284 8 17 7.32843 17 6.5C17 5.67157 16.3284 5 15.5 5C14.6716 5 14 5.67157 14 6.5C14 7.32843 14.6716 8 15.5 8ZM17 12.5C17 13.3284 16.3284 14 15.5 14C14.6716 14 14 13.3284 14 12.5C14 11.6716 14.6716 11 15.5 11C16.3284 11 17 11.6716 17 12.5ZM15.5 20C16.3284 20 17 19.3284 17 18.5C17 17.6716 16.3284 17 15.5 17C14.6716 17 14 17.6716 14 18.5C14 19.3284 14.6716 20 15.5 20Z" fill="#121923"/>
</svg>
      </td>
        {children}
    </tr>
  );
}
