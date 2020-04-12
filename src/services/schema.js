import firebase, { firestore } from '../services/firebase';

export const retrosRef = firestore.collection('retros');
export const usersRef = firestore.collection('users');
export const columnsRef = firestore.collection('columns');

export const Retro = ({ userID = '' }) => {
  return {
    title: 'Untitled',
    creatorID: userID,
    members: [userID],
    columnOrder: [],
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
};

export const Column = ({ title = '', retroID, userID }) => {
  return {
    title,
    retroID,
    userID,
    cardIDs: [],
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
};

export const User = ({ userName }) => {
  return {
    userName,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
};

