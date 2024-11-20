Implementation:

- Draggable table rows

  - containerId set on the table container
  - wrap the table rows in DragContextProvider
  - map through table rows
  - set the following props on table row

    - <DraggableTableRow
      key={`${partialId}_${index}`}
      cloneId={cloneId}
      containerId={containerId}
      index={index}
      data={data}
      dynamicSizes={true/false} //optional prop defaults to false
      >

- Draggable Columns
  - containerId set on the table container
  - wrap tableHeader cells in DragContextProvider
