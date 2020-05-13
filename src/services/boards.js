import { useState } from 'react';
import useActions from 'use-actions';
import { useCollectionMapListener, useDocumentDataListener } from 'fire-hydrant';

import firebase from './firebase';
import { boardsCollection, Board, cardsCollection, Card, lanesCollection, Lane } from './schema';

export const createBoard = (userID) => {
  const newBoard = Board({ userID });
  return boardsCollection.add(newBoard);
};

export const getBoardsForUser = async (userID) => {
  try {
    const boardsSnapshot = await boardsCollection.where('members', 'array-contains', userID).get();

    if (boardsSnapshot.empty) {
      return {};
    }


    const result = boardsSnapshot.docs.reduce((accum, boardSnapshot) => {
      const data = boardSnapshot.data();
      const id = boardSnapshot.id;
      accum[id] = { id, ...data };
      return accum;
    }, {});


    return result;
  } catch (error) {
    console.log(error);
  }
};

const baordActions = {
  setBoard: (prev, board) => {
    return {
      ...prev,
      board: board
    };
  },
  setLanes: (prev, lanes) => {
    return {
      ...prev,
      lanes: lanes
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
      ...prev.lanes[laneID].cardIDs,
      newCard.id
    ];

    return {
      ...prev,
      lanes: {
        ...prev.lanes,
        [laneID]: {
          ...prev.lanes[laneID],
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
      lanes: {
        ...prev.lanes,
        [newLane.id]: newLane
      },
      board: {
        ...prev.board,
        laneOrder: [
          ...prev.board.laneOrder,
          newLane.id
        ]
      }
    };
  },
  moveCardInLane: (prev, laneID, newCardIDs) => {
    return {
      ...prev,
      lanes: {
        ...prev.lanes,
        [laneID]: {
          ...prev.lanes[laneID],
          cardIDs: newCardIDs
        }
      }
    };
  },
  moveCardAcrossLanes: (prev, sourceLaneId, newSourceLaneCardIDs, targetLaneId, newTargetLaneCardIDs) => {
    return {
      ...prev,
      lanes: {
        ...prev.lanes,
        [sourceLaneId]: {
          ...prev.lanes[sourceLaneId],
          cardIDs: newSourceLaneCardIDs
        },
        [targetLaneId]: {
          ...prev.lanes[targetLaneId],
          cardIDs: newTargetLaneCardIDs
        }
      }
    };
  },
  updateLaneOrder: (prev, newOrder) => {
    return {
      ...prev,
      board: {
        ...prev.board,
        laneOrder: newOrder
      }
    };
  },
  updateCardTitle: (prev, cardID, title) => {
    return {
      ...prev,
      cards: {
        ...prev.cards,
        [cardID]: {
          ...prev.cards[cardID],
          title
        }
      }
    };

  },
  updateCardNotes: (prev, cardID, notes) => {
    return {
      ...prev,
      cards: {
        ...prev.cards,
        [cardID]: {
          ...prev.cards[cardID],
          notes
        }
      }
    };
  }
};

export const useBoardData = (boardID) => {
  const [loadingLanes, setLoadingLanes] = useState(true);
  const [loadingCards, setLoadingCards] = useState(true);

  const [state, boundActions] = useActions(baordActions, {
    board:{},
    lanes: {},
    cards: {}
  });

  useDocumentDataListener(boardsCollection.doc(boardID), (doc) => {
    boundActions.setBoard(doc);
  });

  useCollectionMapListener(lanesCollection.where('boardID', '==', boardID), (lanes) => {
    boundActions.setLanes(lanes);
    if (loadingLanes) {
      setLoadingLanes(false);
    }
  });

  useCollectionMapListener(cardsCollection.where('boardID', '==', boardID), (cards) => {
    boundActions.setCards(cards);
    if (loadingCards) {
      setLoadingCards(false);
    }
  });

  const isLoading = () => {
    return loadingCards || loadingLanes;
  };

  const addLane = ({ title, userID }) => {
    const newLane = Lane({ title, userID, boardID });

    const newDoc = lanesCollection.doc();

    boundActions.addLane({
      id: newDoc.id,
      ...newLane
    });

    newDoc.set(newLane);
    boardsCollection.doc(boardID).update({
      laneOrder: firebase.firestore.FieldValue.arrayUnion(newDoc.id)
    });
  };

  const addCard = ({ title, userID, laneID }) => {
    const newCard = Card({ title, boardID, userID, laneID: laneID });
    const newDoc = cardsCollection.doc();

    boundActions.addCard(laneID, {
      id:newDoc.id,
      ...newCard
    });

    newDoc.set(newCard);

    lanesCollection.doc(laneID).update({
      cardIDs: firebase.firestore.FieldValue.arrayUnion(newDoc.id)
    });
  };

  const moveCard = (cardId, sourceLaneId, targetLaneId, position) => {
    // dropped in the same lane
    if (sourceLaneId === targetLaneId) {
      const lane = { ...state.lanes[sourceLaneId] };

      // dropped the card in the same place...
      if (lane.cardIDs.indexOf(cardId) === position) {
        return;
      }

      const newCardIDs = lane.cardIDs.filter((cardID) => cardID !== cardId);
      newCardIDs.splice(position, 0, cardId);

      boundActions.moveCardInLane(sourceLaneId, newCardIDs);

      lanesCollection.doc(sourceLaneId).update({
        cardIDs: newCardIDs
      });

      return;
    }

    // switchin' lanes
    const sourceLane = { ...state.lanes[sourceLaneId] };
    const targetLane = { ...state.lanes[targetLaneId] };

    const newSourceLaneCardIDs = sourceLane.cardIDs.filter((cardID) => cardID !== cardId);
    const newTargetLaneCardIDs = [...targetLane.cardIDs];
    newTargetLaneCardIDs.splice(position, 0, cardId);

    boundActions.moveCardAcrossLanes(sourceLaneId, newSourceLaneCardIDs, targetLaneId, newTargetLaneCardIDs);

    // send updates to firestore
    lanesCollection.doc(sourceLaneId).update({
      cardIDs: firebase.firestore.FieldValue.arrayRemove(cardId)
    });

    lanesCollection.doc(targetLaneId).update({
      cardIDs: newTargetLaneCardIDs
    });

    cardsCollection.doc(cardId).update({
      laneID: targetLaneId
    });
  };

  const updateLaneOrder = (newOrder) => {
    boundActions.updateLaneOrder(newOrder);

    // this needs some sort of transaction for realtime
    boardsCollection.doc(boardID).update({
      laneOrder: newOrder
    });
  };

  const updateCardTitle = (cardID, title) => {
    cardsCollection.doc(cardID).update({
      title
    });

    boundActions.updateCardTitle(cardID, title);
  };

  const updateCardNotes = (cardID, notes) => {
    cardsCollection.doc(cardID).update({
      notes
    });
    boundActions.updateCardNotes(cardID, notes);
  };

  return [state, isLoading(), {
    addLane,
    addCard,
    moveCard,
    updateLaneOrder,
    updateCardTitle,
    updateCardNotes
  }];
};

