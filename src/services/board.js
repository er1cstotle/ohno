import { useState } from 'react';
import useActions from 'use-actions';
import firebase, { firestore } from './firebase';
import { cardsCollection, Card, columnsCollection, Column } from './schema';
import { useCollectionDataListener } from 'lib/fire-hydrant';
import keyBy from 'lodash/keyBy';

const formatBoardData = (columnOrder, columnsMap, cardsMap) => {
  const formattedLanes = columnOrder
    .filter((columnID) => columnsMap[columnID])
    .map((columnID) => {
      const lane = columnsMap[columnID];

      lane.cards = lane.cardIDs
        .filter((cardID) => cardsMap[cardID])
        .map((cardID) => {
          // react-trello only initializes laneId on load.
          // https://github.com/rcdexta/react-trello/issues/325
          return {
            ...cardsMap[cardID],
            laneId: lane.id
          };
        });

      return lane;
    });

  return {
    lanes: formattedLanes
  };
};

const actions = {
  setLanes: (prev, lanes) => {
    return {
      ...prev,
      columns: lanes
    };
  },
  setCards: (prev, cards) => {
    return {
      ...prev,
      cards
    };
  },
  addCard: (prev, laneID, newCard) => {
    const newCardIDs = [
      ...prev.columns[laneID].cardIDs,
      newCard.id
    ];

    return {
      ...prev,
      columns: {
        ...prev.columns,
        [laneID]: {
          ...prev.columns[laneID],
          cardIDs: newCardIDs
        }
      },
      cards: {
        ...prev.cards,
        [newCard.id]: newCard
      }
    };
  },
  addLane: (prev, newLane) => {
    return {
      ...prev,
      columns: {
        ...prev.columns,
        [newLane.id]: newLane
      }
    };
  },
  moveCardInLane: (prev, laneID, newCardIDs) => {


    return {
      ...prev,
      columns: {
        ...prev.columns,
        [laneID]: {
          ...prev.columns[laneID],
          cardIDs: newCardIDs
        }
      }
    };
  },
  moveCardAcrossLanes: (prev, sourceLaneId, newSourceLaneCardIDs, targetLaneId, newTargetLaneCardIDs) => {
    return {
      ...prev,
      columns: {
        ...prev.columns,
        [sourceLaneId]: {
          ...prev.columns[sourceLaneId],
          cardIDs: newSourceLaneCardIDs
        },
        [targetLaneId]: {
          ...prev.columns[targetLaneId],
          cardIDs: newTargetLaneCardIDs
        }
      }
    };

  }
};

export const useBoardData = (retroID, columnOrder) => {
  const [loadingColumns, setLoadingColumns] = useState(true);
  const [loadingCards, setLoadingCards] = useState(true);

  const [boardState, boundActions] = useActions(actions, {
    columns: {},
    cards: {}
  });

  useCollectionDataListener(columnsCollection.where('retroID', '==', retroID), (columns) => {
    boundActions.setLanes(keyBy(columns, 'id'));
    if (loadingColumns) {
      setLoadingColumns(false);
    }
  });

  useCollectionDataListener(cardsCollection.where('retroID', '==', retroID), (cards) => {
    boundActions.setCards(keyBy(cards, 'id'));
    if (loadingCards) {
      setLoadingCards(false);
    }
  });

  const boardData = columnOrder && formatBoardData(columnOrder, boardState.columns, boardState.cards);

  const isLoading = () => {
    return loadingCards || loadingColumns;
  };

  const addColumn = ({ title, userID }) => {
    const newColumn = Column({ title, userID, retroID });

    const newDoc = columnsCollection.doc();
    newDoc.set(newColumn);

    boundActions.addLane({
      id: newDoc.id,
      ...newColumn
    });

    return newDoc;
  };

  const addCard = ({ title, userID, laneID }) => {
    const newCard = Card({ title, retroID, userID, columnID: laneID });
    const newDoc = cardsCollection.doc();

    boundActions.addCard(laneID, {
      id:newDoc.id,
      ...newCard
    });

    newDoc.set(newCard);

    columnsCollection.doc(laneID).update({
      cardIDs: firebase.firestore.FieldValue.arrayUnion(newDoc.id)
    });
  };

  const moveCard = (cardId, sourceLaneId, targetLaneId, position) => {
    // dropped in the same lane
    if (sourceLaneId === targetLaneId) {
      const lane = { ...boardState.columns[sourceLaneId] };

      // dropped the card in the same place...
      if (lane.cardIDs.indexOf(cardId) === position) {
        return;
      }

      const newCardIDs = lane.cardIDs.filter((cardID) => cardID !== cardId);
      newCardIDs.splice(position, 0, cardId);

      boundActions.moveCardInLane(sourceLaneId, newCardIDs);

      columnsCollection.doc(sourceLaneId).update({
        cardIDs: newCardIDs
      });

      return;
    }

    // switchin' lanes
    const sourceLane = { ...boardState.columns[sourceLaneId] };
    const targetLane = { ...boardState.columns[targetLaneId] };

    const newSourceLaneCardIDs = sourceLane.cardIDs.filter((cardID) => cardID !== cardId);
    const newTargetLaneCardIDs = [...targetLane.cardIDs];
    newTargetLaneCardIDs.splice(position, 0, cardId);

    boundActions.moveCardAcrossLanes(sourceLaneId, newSourceLaneCardIDs, targetLaneId, newTargetLaneCardIDs);

    columnsCollection.doc(sourceLaneId).update({
      cardIDs: firebase.firestore.FieldValue.arrayRemove(cardId)
    });

    columnsCollection.doc(targetLaneId).update({
      cardIDs: newTargetLaneCardIDs
    });

    cardsCollection.doc(cardId).update({
      columnID: targetLaneId
    });
  };

  return [boardData, isLoading(), { addColumn, addCard, moveCard }];
};