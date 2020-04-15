import React from 'react';

import retroService from 'services/retros';
import { useBoardData } from 'services/board';

import { Container, Fab, Grid, Slide } from '@material-ui/core';
import { Seo, Link } from 'components';
import Board from 'react-trello';

const RetroShow = ({ user, match }) => {
  const retroID = match.params.retroID;

  const [retro, error, { updateRetro }] = retroService.useRetro(retroID);
  const columnOrder = retro && retro.columnOrder;
  const [boardState, loadingBoard, { addColumn, addCard, moveCard }] = useBoardData(retroID, columnOrder);

  console.log(boardState);

  const onAddLane = async ({ title }) => {
    const newCol = addColumn({
      userID: user.uid,
      retroID,
      title
    });

    const newColumnOrder = [...retro.columnOrder, newCol.id];

    const newRetro = {
      ...retro,
      columnOrder: newColumnOrder
    };

    updateRetro(newRetro);
  };

  const onAddCard = ({ title }, laneID) => {
    addCard({
      userID: user.uid,
      title,
      laneID
    });
  };

  const onLaneDrop = (sourceIndex, destIndex, payload) => {
    const newColumnOrder = [...retro.columnOrder];
    newColumnOrder.splice(sourceIndex, 1);
    newColumnOrder.splice(destIndex, 0, payload.id);

    const newRetro = {
      ...retro,
      columnOrder: newColumnOrder
    };

    updateRetro(newRetro);
  };


  const onCardDrop = (cardId, sourceLaneId, targetLaneId, position, cardDetails) => {
    moveCard(cardId, sourceLaneId, targetLaneId, position);
    // annoying hack to get this package to work. returning false simulates a cancelled drop. We then manually update the state
    // could also wrap the above call in a setTimeout
    return false;
  };

  // if (!retro || !columns) {
  //   return <p>loading</p>;
  // }

  return (
    <div>
      <Seo title={'Retro'}/>

      {!loadingBoard && <Board
        data={boardState}
        draggable
        editable
        canAddLanes
        handleLaneDragEnd={onLaneDrop}
        handleDragEnd={onCardDrop}
        onLaneAdd={onAddLane}
        onCardAdd={onAddCard}
      />}

    </div>
  );
};

export default RetroShow;