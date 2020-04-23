import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { styled } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import Item from './item';


const ItemList = styled(React.forwardRef(({ isDraggingOver, ...props }, ref) => <Paper {...props} ref={ref}/>))((props) => ({
  padding: 8,
  backgroundColor: props.isDraggingOver ? 'red' : 'white'
}));

const Wrapper = styled(Grid)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 300
  }
}));

export default (props) => {
  return (
    <Draggable draggableId={props.lane.id} index={props.index}>
      {(dragprovided) => (
        <Wrapper
          item
          {...dragprovided.draggableProps}
          ref={dragprovided.innerRef}
        >
          <Typography variant={'h4'} {...dragprovided.dragHandleProps}>
            {props.lane.title}
          </Typography>

          <Droppable droppableId={props.lane.id} type={'task'}>
            {(provided, snapshot) => {
              return (
                <ItemList
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                  ref={provided.innerRef}
                  variant={'outlined'} square elevation={0}
                >

                  {props.tasks.map((task, index) => (
                    <Item key={task.id} item={task} index={index}/>
                  ))}
                  {provided.placeholder}

                </ItemList>
              );
            }}

          </Droppable>
        </Wrapper>
      )}
    </Draggable>
  );
};