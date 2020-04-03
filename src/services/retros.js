import { firestore } from './firebase';
import { useDocumentDataOnce, useCollectionData, useCollectionDataOnce, useDocumentData } from 'react-firebase-hooks/firestore';
import { retrosRef, usersRef, Retro } from './schema';

export default {
  create: (userID) => {
    const newRetro = Retro({ userID });
    return retrosRef.add(newRetro);
  }
};