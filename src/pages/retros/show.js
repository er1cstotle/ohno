import React, { useState, useEffect, Component } from 'react';
import keyBy from 'lodash/keyBy';
import difference from 'lodash/difference';
import head from 'lodash/head';

import retroService from 'services/retros';

import { Container, Fab, Grid, Slide } from '@material-ui/core';
import { Seo, Link } from 'components';
import Board from 'react-trello';

const formatBoardData = (retro, lanes, cards) => {
  if (!(retro && lanes && cards)) {
    return;
  }

  const columnsMap = keyBy(lanes, 'id');
  const cardsMap = keyBy(cards, 'id');

  const formattedLanes = retro.columnOrder.map((columnID) => {
    const lane = columnsMap[columnID];

    const cards = lane.cardIDs.map((cardID) => {
      return cardsMap[cardID];
    });

    lane.cards = cards;
    return lane;
  });

  return {
    lanes: formattedLanes
  };
};

const RetroShow = ({ user, match }) => {
  const retroID = match.params.retroID;

  const [retro, error, { updateRetro }] = retroService.useRetro(retroID);
  const [columns, colError, { addColumn }] = retroService.useColumns(retroID);
  const [cards, cardError, { addCard }] = retroService.useCards(retroID);

  useEffect(() => {
    if (columns && retro && retro.columnOrder.length < columns.length) {
      const allIDs = columns.map(({ id }) => id);
      const newID = head(difference(allIDs, retro.columnOrder));

      const newColumnOrder = [...retro.columnOrder, newID];

      const newRetro = {
        ...retro,
        columnOrder: newColumnOrder
      };

      updateRetro(newRetro);
    }
  }, [retro, columns]);

  const boardData = formatBoardData(retro, columns, cards);

  const onAddLane = ({ title }) => {
    addColumn({
      userID: user.uid,
      retroID,
      title
    });
  };

  const onAddCard = (props) => {
    console.log(props);

    // addCard({
    //   userID: user.uid,
    //   retroID,
    //   title
    // });
  };

  const onLaneDrop = (sourceIndex, destIndex, payload) => {
    const newColumnOrder = [...retro.columnOrder];
    newColumnOrder.splice(sourceIndex, 1);
    newColumnOrder.splice(destIndex, 0, payload.id);

    const newRetro = {
      ...retro,
      columnOrder: newColumnOrder
    };

    return updateRetro(newRetro);
  };


  // const onItemDrop = (draggableID, source, destination) => {
  //   const startColumn = state.columns[source.droppableId];
  //   const endColumn = state.columns[destination.droppableId];

  //   // moving in the same list
  //   if (startColumn === endColumn) {
  //     const newTaskIDs = [...startColumn.taskIDs];

  //     newTaskIDs.splice(source.index, 1);
  //     newTaskIDs.splice(destination.index, 0, draggableID);

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
  //   newEndTasks.splice(destination.index, 0, draggableID);
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

  // if (!retro || !columns) {
  //   return <p>loading</p>;
  // }

  return (
    <div>
      <Seo title={'Retro'}/>

      {boardData && <Board
        data={boardData}
        draggable
        editable
        canAddLanes
        handleLaneDragEnd={onLaneDrop}
        onLaneAdd={onAddLane}
        onCardAdd={onAddCard}
        // onDataChange={(data) => console.log(data)}
      />}

    </div>
  );
};

export default RetroShow;