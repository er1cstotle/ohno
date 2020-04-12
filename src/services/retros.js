import { useState, useEffect } from 'react';
import { retrosRef, Retro, columnsRef, Column } from './schema';
import useActions from 'hooks/useActions';

export default {
  create: (userID) => {
    const newRetro = Retro({ userID });
    return retrosRef.add(newRetro);
  },
  all: async (userID) => {
    try {
      const retrosSnapshop = await retrosRef.where('members', 'array-contains', userID).get();

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
      const snapshot = await retrosRef.doc(retroID).get();

      return {
        id: snapshot.id,
        ...snapshot.data()
      };
    } catch (error) {
      console.log(error);
    }
  },
  updateColumnOrder: async (retroID, columnOrder) => {
    return retrosRef.doc(retroID).update({
      columnOrder
    });
  },
  useRetro: (retroID) => {
    const [retro, setRetro] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const update = (retro) => {
      console.log('set the new order');

      setRetro(retro);
      return retrosRef.doc(retroID).update(retro);
    };

    useEffect(() => {
      const unsubscribe = retrosRef.doc(retroID).onSnapshot(
        (snapshot) => {
          const retro = {
            id: snapshot.id,
            ...snapshot.data()
          };

          if (!loading) {
            setLoading(false);
          }

          setRetro(retro);
        },
        (error) => {
          console.log(error);
          setError(error);
        });

      return unsubscribe;
    }, []);


    return [retro, error, update];
  },
  addColumn: ({ userID, retroID }) => {
    const newColumn = Column({ userID, retroID });
    return columnsRef.add(newColumn);
  },
  useColumns: (documentID) => {
    const [documents, setDocuments] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();


    const add = ({ userID, retroID }) => {
      const newColumn = Column({ userID, retroID });
      const newDoc = columnsRef.doc();

      newDoc.set(newColumn);

      setDocuments([
        ...documents,
        {
          ...newColumn,
          id: newDoc.id
        }
      ]);

      return newDoc;
    };

    useEffect(() => {
      const unsubscribe = columnsRef.where('retroID', '==', documentID).onSnapshot(
        (snapshot) => {
          const docs = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data()
            };
          });

          setDocuments(docs);
        },
        (error) => {
          console.log(error);
          setError(error);
        });

      return unsubscribe;
    }, []);


    return [documents, error, add];

  }
};