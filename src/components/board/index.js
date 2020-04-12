import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { styled } from '@material-ui/core/styles';

import { Button, Grid } from '@material-ui/core';
import Column from './column';

const Wrapper = styled(Grid)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 300
  }
}));

const Board = ({ columns, columnOrder, data, onColumnDrop, onItemDrop, onAddColumn, onAddItem }) => {
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }
    // dropped in the same place
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'column') {
      return onColumnDrop(draggableId, source, destination);
    }

    return onItemDrop(draggableId, source, destination);
  };

  return (
    <div>


      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={'board'} direction={'horizontal'} type={'column'}>
          {(provided) => (
            <div style={{ display: 'flex', overflow: 'scroll' }} {...provided.droppableProps} ref={provided.innerRef} >
              {columnOrder.map((columnID, index) => {
                const column = columns[columnID];
                const tasks = column.cardIDs.map((taskID) => data.tasks[taskID]);

                return <Column key={column.id} tasks={tasks} column={column} index={index}/>;
              })}

              <Wrapper>
                <Button onClick={onAddColumn}>Add Column</Button>
              </Wrapper>

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );

};

export default Board;