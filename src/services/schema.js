import firebase, { firestore } from '../services/firebase';

export const retrosRef = firestore.collection('retros');
export const usersRef = firestore.collection('users');

export const Retro = ({ userID = '' }) => {
  return {
    userID: userID,
    members: [],
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
};

export const User = ({ userName }) => {
  return {
    userName,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
};

