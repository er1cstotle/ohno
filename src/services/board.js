import { useState } from 'react';
import { cardsCollection, Card, columnsCollection, Column } from './schema';
import useActions from 'hooks/useActions';
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

export const useBoardData = (retroID, columnOrder) => {
  const [loadingColumns, setLoadingColumns] = useState(true);
  const [loadingCards, setLoadingCards] = useState(true);

  const [boardState, setBoardState] = useState({
    columns: {},
    cards: {}
  });

  useCollectionDataListener(columnsCollection.where('retroID', '==', retroID), (columns) => {
    setBoardState((prev) => ({
      ...prev,
      columns: keyBy(columns, 'id')
    }));
    if (loadingColumns) {
      setLoadingColumns(false);
    }
  });

  useCollectionDataListener(cardsCollection.where('retroID', '==', retroID), (cards) => {
    setBoardState((prev) => ({
      ...prev,
      cards: keyBy(cards, 'id')
    }));
    if (loadingCards) {
      setLoadingCards(false);
    }
  });

  const isLoading = () => {
    return loadingCards || loadingColumns;
  };

  const boardData = columnOrder && formatBoardData(columnOrder, boardState.columns, boardState.cards);

  const addColumn = ({ title, userID }) => {
    const newColumn = Column({ title, userID, retroID });

    const newDoc = columnsCollection.doc();
    newDoc.set(newColumn);

    setBoardState((prev) => ({
      ...prev,
      columns: {
        ...prev.columns,
        [newDoc.id]: {
          id: newDoc.id,
          ...newColumn
        }
      }
    }));

    return newDoc;
  };

  const addCard = ({ title, userID, laneID }) => {
    const newCard = Card({ title, retroID, userID, columnID: laneID });
    const newDoc = cardsCollection.doc();

    const newCardIDs = [
      ...boardState.columns[laneID].cardIDs,
      newDoc.id
    ];

    setBoardState((prev) => ({
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
        [newDoc.id]: {
          id:newDoc.id,
          ...newCard
        }
      }
    }));

    newDoc.set(newCard);

    columnsCollection.doc(laneID).update({
      cardIDs: newCardIDs
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

      lane.cardIDs = newCardIDs;
      lane.cardIDs.splice(position, 0, cardId);

      setBoardState((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [sourceLaneId]: lane
        }
      }));

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

    const newSourceLane = {
      ...sourceLane,
      cardIDs: newSourceLaneCardIDs
    };

    const newTargetLane = {
      ...targetLane,
      cardIDs: newTargetLaneCardIDs
    };

    setBoardState({
      ...boardState,
      columns: {
        ...boardState.columns,
        [sourceLaneId]: newSourceLane,
        [targetLaneId]: newTargetLane
      }
    });

    columnsCollection.doc(sourceLaneId).update({
      cardIDs: newSourceLaneCardIDs
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