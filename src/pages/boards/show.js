import React from 'react';
import { useBoardData } from 'services/boards';

import { Seo, Link } from 'components';
import Board from 'components/board';

const BoardShow = ({ user, match: { params: { boardID } } }) => {
  const [{ board, formattedBoardData }, loadingBoard, { addLane, addCard, moveCard, updateLaneOrder }] = useBoardData(boardID);

  const onAddLane = async ({ title }) => {
    addLane({
      userID: user.uid,
      boardID,
      title
    });
  };

  const onAddCard = ({ title }, laneID) => {
    addCard({
      userID: user.uid,
      title,
      laneID
    });
  };

  const onLaneDrop = (sourceIndex, destIndex, payload) => {
    const newLaneOrder = [...board.laneOrder];
    newLaneOrder.splice(sourceIndex, 1);
    newLaneOrder.splice(destIndex, 0, payload.id);

    updateLaneOrder(newLaneOrder);
  };

  const onCardDrop = (cardId, sourceLaneId, targetLaneId, position, cardDetails) => {
    moveCard(cardId, sourceLaneId, targetLaneId, position);
    // annoying hack to get this package to work. returning false simulates a cancelled drop. We then manually update the state
    // could also wrap the above call in a setTimeout
    return false;
  };

  // if (!board || !lanes) {
  //   return <p>loading</p>;
  // }

  return (
    <div>
      <Seo title={board.title}/>

      {!loadingBoard && <Board
        data={formattedBoardData}
        handleLaneDragEnd={onLaneDrop}
        handleDragEnd={onCardDrop}
        onLaneAdd={onAddLane}
        onCardAdd={onAddCard}
        onCardClick={(card, lane) => {
          console.log('clicked');
          console.log(lane);
          console.log(card);
        }}
        onCardDelete={(card, lane) => {
          console.log('delete');
          console.log(lane);
          console.log(card);
        }}
      />}

    </div>
  );
};

export default BoardShow;