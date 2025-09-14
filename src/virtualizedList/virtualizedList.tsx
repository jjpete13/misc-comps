import { useRef, useState } from "react";

const VirtualizedList = ({ items, itemHeight, windowHeight }: {items: number[]; itemHeight: number; windowHeight: number}) => {
 const [scrollTop, setScrollTop] = useState(0);
 const listRef = useRef(null);
const visibleItemCount = Math.ceil(windowHeight / itemHeight);
 const totalHeight = items.length * itemHeight;
 
 const startIndex = Math.floor((scrollTop / itemHeight) - 10 > 0 ? (scrollTop / itemHeight) - 10 : 0);
 const endIndex = Math.min(startIndex + visibleItemCount + 20, items.length);
//  @ts-ignore
const onScroll = (event) => {
 setScrollTop(event.target.scrollTop);
 };
const renderItems = () => {
 const visibleItems = [];
 for (let i = startIndex; i < endIndex; i++) {
 const item = items[i];
 const itemStyle: React.CSSProperties = {
 position: "absolute",
 top: `${i * itemHeight}px`,
 height: `${itemHeight}px`,
 left: 0,
 right: 0,
 };
 visibleItems.push(
 <li key={i} style={itemStyle}>
 Row {item}
 </li>
 );
 }
 return visibleItems;
 };
return (
 <div
 ref={listRef}
 style={{
 height: `${windowHeight}px`,
 width: '500px',
 overflowY: "auto",
 position: "relative",
 backgroundColor: "white",
 }}
 onScroll={onScroll}
 >
 <ul style={{ height: `${totalHeight}px` }}>{renderItems()}</ul>
 </div>
 );
};
export default VirtualizedList;