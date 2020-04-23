import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { styled } from '@material-ui/core/styles';

import { Button, Grid } from '@material-ui/core';
import Lane from './lane';

const Wrapper = styled(Grid)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 300
  }
}));

const Board = ({ lanes, laneOrder, data, onLaneDrop, onItemDrop, onAddLane, onAddItem }) => {
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }
    // dropped in the same place
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'lane') {
      return onLaneDrop(draggableId, source, destination);
    }

    return onItemDrop(draggableId, source, destination);
  };

  return (
    <div>


      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={'board'} direction={'horizontal'} type={'lane'}>
          {(provided) => (
            <div style={{ display: 'flex', overflow: 'scroll' }} {...provided.droppableProps} ref={provided.innerRef} >
              {laneOrder.map((laneID, index) => {
                const lane = lanes[laneID];
                const tasks = lane.cardIDs.map((taskID) => data.tasks[taskID]);

                return <Lane key={lane.id} tasks={tasks} lane={lane} index={index}/>;
              })}

              <Wrapper>
                <Button onClick={onAddLane}>Add Lane</Button>
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