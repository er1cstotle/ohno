import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';

try {
  var config = {
    apiKey: 'AIzaSyBD-r4kfR3kK0AiBpAFEw-3xoOzbDayCec',
    authDomain: 'supra-turbo-dev.firebaseapp.com',
    databaseURL: 'https://supra-turbo-dev.firebaseio.com',
    projectId: 'supra-turbo-dev',
    storageBucket: 'supra-turbo-dev.appspot.com',
    messagingSenderId: '1057679064055',
    appId: '1:1057679064055:web:0ff601eb6248b7a1504cf2',
    measurementId: 'G-6LVDY0XMP4'
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

