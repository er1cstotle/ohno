import { firestore } from './firebase';
import { useDocumentDataOnce, useCollectionData, useCollectionDataOnce, useDocumentData } from 'react-firebase-hooks/firestore';
import { retrosRef, usersRef } from './schema';

export const getFile = (fileID) => {
  return retrosRef.doc(fileID);
};