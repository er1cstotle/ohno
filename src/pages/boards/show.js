import React from 'react';
import { useBoardData } from 'services/boards';

import { Seo } from 'components';
import Board from 'components/board';

const BoardShow = ({ user, match: { params: { boardID } } }) => {
  const [
    { board, cards, lanes },
    loadingBoard,
    { addLane, addCard, moveCard, updateLaneOrder, updateCardTitle, updateCardNotes }
  ] = useBoardData(boardID);

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

  return (
    <div>
      <Seo title={board.title}/>

      {!loadingBoard &&
        <Board
          laneOrder={board.laneOrder}
          lanes={lanes}
          cards={cards}
          handleLaneDragEnd={onLaneDrop}
          handleDragEnd={onCardDrop}
          onLaneAdd={onAddLane}
          onCardAdd={onAddCard}
          onCardDelete={(card, lane) => {
            console.log('delete');
            console.log(lane);
            console.log(card);
          }}

          onEditCardTitle={updateCardTitle}
          onEditCardNotes={updateCardNotes}
        />
      }
    </div>
  );
};

export default BoardShow;