const admin = require('firebase-admin');
const serviceAccount = require('./firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://supra-turbo-dev.firebaseio.com'
});

const firestore = admin.firestore();

const usersCollection = firestore.collection('users');
const boardsCollection = firestore.collection('boards');
const lanesCollection = firestore.collection('lanes');
const cardsCollection = firestore.collection('cards');

const seedFunction = async () => {
  try {
    const userID = 'Vtr9KxKA9bY4HlrseJHF4CmYAMJ2';

    const newBoard = await boardsCollection.add({
      title: 'Demo Board',
      creatorID: userID,
      members: [userID],
      laneOrder: [],
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    const lanes = await Promise.all([1, 2, 3].map(async (num) => {
      const newLane = await lanesCollection.add({
        title: `column ${num}`,
        boardID: newBoard.id,
        userID,
        cardIDs: [],
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });

      const cards = await Promise.all([1, 2].map((int) => {
        return cardsCollection.add({
          boardID: newBoard.id,
          title: `title ${int}`,
          content: `content ${int}`,
          laneID: newLane.id
        });
      }));

      newLane.update({
        cardIDs: cards.map((card) => card.id)
      });

      return newLane;
    }));

    newBoard.update({
      laneOrder: lanes.map((column) => column.id)
    });
  } catch (error) {
    console.log(error);
  }
};


seedFunction().then(() => {
  console.log('done');
});
