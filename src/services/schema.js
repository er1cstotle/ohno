import firebase, { firestore } from '../services/firebase';

export const retrosCollection = firestore.collection('retros');
export const usersCollection = firestore.collection('users');
export const columnsCollection = firestore.collection('columns');
export const cardsCollection = firestore.collection('cards');

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

export const Card = ({ title = '', content = '', retroID, userID, ColumnID }) => {
  return {
    title,
    content,
    retroID,
    userID,
    ColumnID,
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

