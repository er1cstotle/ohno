import { useState, useEffect } from 'react';
import useActions from 'use-actions';

export const docSnapshotToData = (snapshot) => {
  return {
    id: snapshot.id,
    ...snapshot.data()
  };
};

export const querySnapshotToDocs = (snapshot) => snapshot.docs.map((doc) => {
  return {
    id: doc.id,
    ...doc.data()
  };
});

export const useDocumentListener = (docQuery, callback, errorCallback) => {
  useEffect(() => {
    const unsubscribe = docQuery.onSnapshot(
      (snapshot) => callback(snapshot),
      (error) => {
        console.log(error);
        errorCallback(error);
      }
    );

    return unsubscribe;
  }, []);
};

export const useDocumentDataListener = (documentQuery, callback, errorCallback) => {
  useDocumentListener(
    documentQuery,
    (snapshot) => callback(docSnapshotToData(snapshot)),
    errorCallback
  );
};

export const useDocumentData = (documentQuery, actions) => {
  const mergedActions = {
    ...actions,
    set: (state, newState) => newState
  };

  const [documents, boundActions] = useActions(mergedActions);
  const [error, setError] = useState();

  useDocumentDataListener(
    documentQuery,
    (docs) => boundActions.set(docs),
    (error) => setError(error)
  );

  return [documents, error, boundActions];
};

export const useDocument = () => {};
export const useDocumentOnce = () => {};
export const useDocumentDataOnce = () => {};

export const useCollection = () => {};
export const useCollectionOnce = () => {};
export const useCollectionDataOnce = () => {};

export const useCollectionListener = (collectionQuery, callback, errorCallback) => {
  useEffect(() => {
    const unsubscribe = collectionQuery.onSnapshot(
      (snapshot) => callback(snapshot),
      (error) => {
        console.log(error);
        errorCallback(error);
      }
    );

    return unsubscribe;
  }, []);
};

export const useCollectionDataListener = (collectionQuery, callback, errorCallback) => {
  useCollectionListener(
    collectionQuery,
    (snapshot) => {
      callback(querySnapshotToDocs(snapshot));
    },
    errorCallback
  );
};

export const useCollectionData = (collectionQuery, actions) => {
  const mergedActions = {
    ...actions,
    set: (state, newState) => newState
  };

  const [documents, boundActions] = useActions(mergedActions);
  const [error, setError] = useState();

  useCollectionDataListener(
    collectionQuery,
    (docs) => boundActions.set(docs),
    (error) => setError(error)
  );


  return [documents, error, boundActions];
};

