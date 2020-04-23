import firebase, { firestore } from '../services/firebase';

export const boardsCollection = firestore.collection('boards');
export const usersCollection = firestore.collection('users');
export const lanesCollection = firestore.collection('lanes');
export const cardsCollection = firestore.collection('cards');

export const Board = ({ userID = '' }) => {
  return {
    title: 'Untitled',
    creatorID: userID,
    members: [userID],
    laneOrder: [],
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
};

export const Lane = ({ title = '', boardID, userID }) => {
  return {
    title,
    boardID,
    userID,
    cardIDs: [],
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
};

export const Card = ({ title = '', content = '', boardID, userID, laneID }) => {
  return {
    title,
    content,
    boardID,
    userID,
    laneID,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
};

export const User = ({ userName }) => {
  return {
    userName,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
};

