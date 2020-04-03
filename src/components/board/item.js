import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { styled } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';

const Item = styled(React.forwardRef(({ isDragging, ...props }, ref) => <Paper {...props} ref={ref}/>))((props) => ({
  padding: 8,
  marginBottom: 4,
  backgroundColor: props.isDragging ? 'blue' : 'white'
}));


export default (props) => {
  return (
    <Draggable draggableId={props.item.id} index={props.index}>
      {(provided, snapshot) => {
        return (
          <Item
            isDragging={snapshot.isDragging}
            variant={'outlined'}
            square
            elevation={0}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Typography>{props.item.content}</Typography>
          </Item>
        );
      }}
    </Draggable>
  );
};