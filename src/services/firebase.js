import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';

try {
  var config = {
    apiKey: 'AIzaSyCyoTTfJ0qphIaI4KC8NCHuQWQJNKHmp7Q',
    authDomain: 'retros-dev-20eb6.firebaseapp.com',
    databaseURL: 'https://retros-dev-20eb6.firebaseio.com',
    projectId: 'retros-dev-20eb6',
    storageBucket: 'retros-dev-20eb6.appspot.com',
    messagingSenderId: '839749747017',
    appId: '1:839749747017:web:40ae6709312d4bad90da98',
    measurementId: 'G-NLM9575RPD'
  };
  firebase.initializeApp(config);
} catch (err) {
  // we skip the "already exists" message which is
  // not an actual error when we're hot-reloading
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}

export default firebase;
export const auth = firebase.auth();
export const firestore = firebase.firestore();

