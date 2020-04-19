import { useState, useEffect } from 'react';
import { retrosCollection, Retro, cardsCollection, Card, columnsCollection, Column } from './schema';
import { useCollectionData, useDocumentData } from 'lib/fire-hydrant';

export default {
  create: (userID) => {
    const newRetro = Retro({ userID });
    return retrosCollection.add(newRetro);
  },
  all: async (userID) => {
    try {
      const retrosSnapshop = await retrosCollection.where('members', 'array-contains', userID).get();

      if (retrosSnapshop.empty) {
        return {};
      }

      const result = retrosSnapshop.docs.reduce((accum, retroSnapshot) => {
        const data = retroSnapshot.data();
        const id = retroSnapshot.id;
        accum[id] = { id, ...data };
        return accum;
      }, {});

      return result;
    } catch (error) {
      console.log(error);
    }
  },
  find: async (retroID) => {
    try {
      const snapshot = await retrosCollection.doc(retroID).get();

      return {
        id: snapshot.id,
        ...snapshot.data()
      };
    } catch (error) {
      console.log(error);
    }
  },
  updateColumnOrder: (retroID, columnOrder) => {
    return retrosCollection.doc(retroID).update({
      columnOrder
    });
  },
  useRetro: (retroID) => {
    return useDocumentData(retrosCollection.doc(retroID), {
      updateRetro: (state, retro) => {
        retrosCollection.doc(retroID).update(retro);
        return retro;
      }
    });
  },
  addColumn: ({ title, userID, retroID }) => {
    const newColumn = Column({ title, userID, retroID });

    const newDoc = columnsCollection.doc();
    newDoc.set(newColumn);

    return newDoc;
  },
  useColumns: (documentID) => {
    return useCollectionData(columnsCollection.where('retroID', '==', documentID), {
      addColumn: (state, { userID, retroID, title }) => {
        const newColumn = Column({ title, userID, retroID });
        const newDoc = columnsCollection.doc();

        newDoc.set(newColumn);

        return [
          ...state,
          {
            ...newColumn,
            id: newDoc.id
          }
        ];
      }
    });
  },
  useCards: (documentID) => {
    return useCollectionData(cardsCollection.where('retroID', '==', documentID), {
      addCard: (state, { userID, retroID, title }) => {
        const newCard = Card({ title, userID, retroID });
        const newDoc = cardsCollection.doc();

        newDoc.set(newCard);

        return [
          ...state,
          {
            ...newCard,
            id: newDoc.id
          }
        ];
      }
    });
  }
};