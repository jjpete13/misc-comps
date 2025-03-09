
import { DragContextProvider } from "./DragAndDropContext";
import DraggableTableRow from "./DraggableTableRow";

interface DraggingTableProps {
  rows: any[],
  updateRows: (newRows: any[]) => void
}
export default function DraggingTable({rows, updateRows}: DraggingTableProps) {
  const partialId = "partialId";
  const containerId = "containerId";
  const cloneId = "cloneId";

  const tableStyle = {
    minWidth: "100px",
    width: "fit-content",
    border: "1px solid black",
  };


  return (
    <>
    <h2>Drag and Drop Table Rows</h2>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <table style={tableStyle as React.CSSProperties}>
        <DragContextProvider>
          <tbody id={containerId} style={{ width: "100%" }}>
            {rows.map((row, index) => {
              return (
                <DraggableTableRow
                  key={`${partialId}_${index}`}
                  cloneId={cloneId}
                  containerId={containerId}
                  index={index}
                  data={rows}
                  partialId={partialId}
                  updateRows={updateRows}
                >
                  <td style={{ minWidth: "100px", textAlign: "center" }}>
                    <p>{row}</p>
                  </td>
                </DraggableTableRow>
              );
            })}
          </tbody>
        </DragContextProvider>
      </table>
    </div>
    </>
    
  );
}
