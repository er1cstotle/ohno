import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { retroPath } from 'routes';

import retroService from 'services/retros';

import AddIcon from '@material-ui/icons/Add';
import { Container, Fab, Grid, Slide } from '@material-ui/core';
import { Seo, Link } from 'components';
import Board from 'components/board';

import data from './data';

const useStyles = makeStyles(theme => ({
  addButton: {
    position: 'fixed',
    bottom: 48,
    right: 48
  }
}));

const RetroShow = ({ user }) => {
  const classes = useStyles();
  const history = useHistory();

  const [state, setState] = useState(data);

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
      const newColumnOrder = [...state.columnOrder];
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...state,
        columnOrder: newColumnOrder
      };

      return setState(newState);
    }

    // Dragging tasks
    const startColumn = state.columns[source.droppableId];
    const endColumn = state.columns[destination.droppableId];

    // moving in the same list
    if (startColumn === endColumn) {
      const newTaskIDs = [...startColumn.taskIDs];

      newTaskIDs.splice(source.index, 1);
      newTaskIDs.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        taskIDs: newTaskIDs
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn
        }
      };

      return setState(newState);
    }

    // moving between columns
    const newStartTasks = [...startColumn.taskIDs];
    newStartTasks.splice(source.index, 1);
    const newStartColumn = {
      ...startColumn,
      taskIDs: newStartTasks
    };

    const newEndTasks = [...endColumn.taskIDs];
    newEndTasks.splice(destination.index, 0, draggableId);
    const newEndColumn = {
      ...endColumn,
      taskIDs: newEndTasks
    };

    const columns = {
      ...state.columns,
      [newStartColumn.id]: newStartColumn,
      [newEndColumn.id]: newEndColumn
    };

    const newState = {
      ...state,
      columns
    };

    setState(newState);
  };


  return (
    <Container maxWidth={'lg'}>
      <Seo title={'Retro'}/>

      <Board data={state} onDragEnd={onDragEnd}/>
    </Container>
  );
};

export default RetroShow;

