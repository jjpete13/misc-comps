import React, { createContext, MutableRefObject, useRef } from "react";

// export const DragContext = createContext({
//   dragItem: useRef<number | null>(null), 
//   tempDragItem: useRef<number>(null),
//   draggingElement: useRef<HTMLElement | null>(null),
//   listItemPositions: useRef<Record<number, { x: number; y: number }>>({}),
//   startY: useRef<number>(null),
//   tempY: useRef<number>(null),
//   scrollY: useRef<number>(null),
//   startX: useRef<number>(null),
//   tempX: useRef<number>(null),
//   scrollX: useRef<number>(null),
//   isScrolling: useRef<boolean>(false),
// });

interface DragContextType { 
  dragItem: MutableRefObject<number | null>; 
  tempDragItem: MutableRefObject<number | null>; 
  draggingElement: MutableRefObject<HTMLElement | null>; 
  listItemPositions: MutableRefObject<Record<number, { x: number; y: number }>>; 
  startY: MutableRefObject<number | null>; 
  tempY: MutableRefObject<number | null>; 
  scrollY: MutableRefObject<number | null>; 
  startX: MutableRefObject<number | null>; 
  tempX: MutableRefObject<number | null>; 
  scrollX: MutableRefObject<number | null>; 
  isScrolling: MutableRefObject<boolean>; } 
  
  export const DragContext = createContext<DragContextType | null>(null);

export const DragContextProvider = ({ children }: { children: React.ReactNode }) => {
  // const dragItem: MutableRefObject<number | null> = useRef(null);
  // const tempDragItem: MutableRefObject<number | null> = useRef(null);
  // const draggingElement = useRef(null);
  // const listItemPositions = useRef<Record<number, { x: number; y: number }>>({});
  // const startY: MutableRefObject<number | null> = useRef(null);
  // const tempY: MutableRefObject<number | null> = useRef(null);
  // const scrollY: MutableRefObject<number | null> = useRef(null);
  // const startX: MutableRefObject<number | null> = useRef(null);
  // const tempX: MutableRefObject<number | null> = useRef(null);
  // const scrollX: MutableRefObject<number | null> = useRef(null);
  // const isScrolling: MutableRefObject<boolean | false> = useRef(false);

  const dragItem: MutableRefObject<number | null> = useRef(null); 
  const tempDragItem: MutableRefObject<number | null> = useRef(null); 
  const draggingElement = useRef<HTMLElement | null>(null); 
  const listItemPositions = useRef<Record<number, { x: number; y: number }>>({}); 
  const startY: MutableRefObject<number | null> = useRef(null); 
  const tempY: MutableRefObject<number | null> = useRef(null); 
  const scrollY: MutableRefObject<number | null> = useRef(null); 
  const startX: MutableRefObject<number | null> = useRef(null); 
  const tempX: MutableRefObject<number | null> = useRef(null); 
  const scrollX: MutableRefObject<number | null> = useRef(null); 
  const isScrolling: MutableRefObject<boolean> = useRef(false);
  
  return (
    <DragContext.Provider
      value={{
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
      }}
    >
      {children}
    </DragContext.Provider>
  );
};
