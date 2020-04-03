import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { Grid } from '@material-ui/core';
import Column from './column';

const Board = (props) => {
  return (
    <DragDropContext onDragEnd={props.onDragEnd}>
      <Droppable droppableId={'board'} direction={'horizontal'} type={'column'}>
        {(provided) => (
          <Grid container direction={'row'} spacing={3} {...provided.droppableProps} ref={provided.innerRef}>
            {props.data.columnOrder.map((columnID, index) => {
              const column = props.data.columns[columnID];
              const tasks = column.taskIDs.map((taskID) => props.data.tasks[taskID]);

              return <Column key={column.id} tasks={tasks} column={column} index={index}/>;
            })}
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
    </DragDropContext>
  );

};

export default Board;