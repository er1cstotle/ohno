import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { keyBy } from 'lodash';

import { retroPath } from 'routes';

import retroService from 'services/retros';

import AddIcon from '@material-ui/icons/Add';
import { Container, Fab, Grid, Slide } from '@material-ui/core';
import { Seo, Link } from 'components';

// import Board from 'components/board';

import Board from 'react-trello';


import data from './data';
import { Column } from '../../services/schema';

const useStyles = makeStyles(theme => ({
  addButton: {
    position: 'fixed',
    bottom: 48,
    right: 48
  }
}));

const RetroShow = ({ user, match }) => {
  const retroID = match.params.retroID;

  // const classes = useStyles();
  // const history = useHistory();

  const [state, setState] = useState(data);
  const [retro, error, updateRetro] = retroService.useRetro(retroID);
  const [columns, colError, addColumn] = retroService.useColumns(retroID);

  const columnsMap = keyBy(columns, 'id');

  console.log('hi');


  const onAddColumn = () => {
    const newCol = addColumn({
      userID: user.uid,
      retroID
    });

    const newColumnOrder = [...retro.columnOrder, newCol.id];

    const newRetro = {
      ...retro,
      columnOrder: newColumnOrder
    };


    return updateRetro(newRetro);
  };

  const onColumnDrop = (droppableID, source, destination) => {
    const newColumnOrder = [...retro.columnOrder];
    newColumnOrder.splice(source.index, 1);
    newColumnOrder.splice(destination.index, 0, droppableID);

    const newRetro = {
      ...retro,
      columnOrder: newColumnOrder
    };


    return updateRetro(newRetro);
  };


  const onItemDrop = (draggableID, source, destination) => {
    const startColumn = state.columns[source.droppableId];
    const endColumn = state.columns[destination.droppableId];

    // moving in the same list
    if (startColumn === endColumn) {
      const newTaskIDs = [...startColumn.taskIDs];

      newTaskIDs.splice(source.index, 1);
      newTaskIDs.splice(destination.index, 0, draggableID);

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
    newEndTasks.splice(destination.index, 0, draggableID);
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

  if (!retro || !columns) {
    return <p>loading</p>;
  }

  return (
    <div>
      <Seo title={'Retro'}/>

      <Board data={data} draggable canAddLanes={true}/>

      {/*
      <Board
        data={state}
        columns={columnsMap}
        columnOrder={retro.columnOrder}
        onAddColumn={onAddColumn}
        onColumnDrop={onColumnDrop}
        onItemDrop={onItemDrop}
      /> */}
    </div>
  );
};

export default RetroShow;


// const onDragEnd = (result) => {
//   const { destination, source, draggableId, type } = result;

//   if (!destination) {
//     return;
//   }
//   // dropped in the same place
//   if (destination.droppableId === source.droppableId && destination.index === source.index) {
//     return;
//   }

//   if (type === 'column') {
//     const newColumnOrder = [...state.columnOrder];
//     newColumnOrder.splice(source.index, 1);
//     newColumnOrder.splice(destination.index, 0, draggableId);

//     const newState = {
//       ...state,
//       columnOrder: newColumnOrder
//     };

//     return setState(newState);
//   }

//   // Dragging tasks
//   const startColumn = state.columns[source.droppableId];
//   const endColumn = state.columns[destination.droppableId];

//   // moving in the same list
//   if (startColumn === endColumn) {
//     const newTaskIDs = [...startColumn.taskIDs];

//     newTaskIDs.splice(source.index, 1);
//     newTaskIDs.splice(destination.index, 0, draggableId);

//     const newColumn = {
//       ...startColumn,
//       taskIDs: newTaskIDs
//     };

//     const newState = {
//       ...state,
//       columns: {
//         ...state.columns,
//         [newColumn.id]: newColumn
//       }
//     };

//     return setState(newState);
//   }

//   // moving between columns
//   const newStartTasks = [...startColumn.taskIDs];
//   newStartTasks.splice(source.index, 1);
//   const newStartColumn = {
//     ...startColumn,
//     taskIDs: newStartTasks
//   };

//   const newEndTasks = [...endColumn.taskIDs];
//   newEndTasks.splice(destination.index, 0, draggableId);
//   const newEndColumn = {
//     ...endColumn,
//     taskIDs: newEndTasks
//   };

//   const columns = {
//     ...state.columns,
//     [newStartColumn.id]: newStartColumn,
//     [newEndColumn.id]: newEndColumn
//   };

//   const newState = {
//     ...state,
//     columns
//   };

//   setState(newState);
// };