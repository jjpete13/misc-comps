
import { DragContextProvider } from "./DragAndDropContext";
import DraggableTableRow from "./DraggableTableRow";

interface DraggingTableProps {
  rows: any[],
  updateRows: (newRows: any[]) => void
}
export default function DraggingTable({rows, updateRows}: DraggingTableProps) {
  // const rows = ["row1", "row2", "row3", "row4", "row5", "row6", "row7"];
  const partialId = "partialId";
  const containerId = "containerId";
  const cloneId = "cloneId";

  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "300px",
    border: "1px solid black",
  };

// TODO: table cell spacing collapses when dragging
  return (
    <div style={style}>
      <table id={containerId} style={{width: "100%", borderCollapse: "collapse"}}>
        <DragContextProvider>
          <tbody>
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
                  <td>
                    <p>{row}</p>
                  </td>
                </DraggableTableRow>
              );
            })}
          </tbody>
        </DragContextProvider>
      </table>
    </div>
  );
}
