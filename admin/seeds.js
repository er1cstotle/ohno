const admin = require('firebase-admin');
const serviceAccount = require('./firebase-service-account.json');
const sampleMarkdown = `# This is a header And
this is a paragraph

\`\`\`mermaid
graph TD
  A[Christmas] -->|Get money| B(Go shopping)
  B --> C{Let me think}
  C -->|One| D[Laptop]
  C -->|Two| E[iPhone]
  C -->|Three| F[fa:fa-car Car]
\`\`\`

\`\`\`mermaid
classDiagram
  Animal <|-- Duck
  Animal <|-- Fish
  Animal <|-- Zebra
  Animal : +int age
  Animal : +String gender
  Animal: +isMammal()
  Animal: +mate()
  class Duck{
    +String beakColor
    +swim()
    +quack()
  }
  class Fish{
    -int sizeInFeet
    -canEat()
  }
  class Zebra{
    +bool is_wild
    +run()
  }			
\`\`\`

\`\`\`mermaid
sequenceDiagram
  Alice->>+John: Hello John, how are you?
  Alice->>+John: John, can you hear me?
  John-->>-Alice: Hi Alice, I can hear you!
  John-->>-Alice: I feel great!
\`\`\`

\`\`\`mermaid
stateDiagram
  [*] --> Still
  Still --> [*]

  Still --> Moving
  Moving --> Still
  Moving --> Crash
  Crash --> [*]
\`\`\`

\`\`\`mermaid
pie 
  title Pets adopted by volunteers
  "Dogs" : 386
  "Cats" : 85
  "Rats" : 15           
\`\`\`

\`\`\`mermaid
gantt
  dateFormat  YYYY-MM-DD
  title Adding GANTT diagram functionality to mermaid

  section A section
  Completed task            :done,    des1, 2014-01-06,2014-01-08
  Active task               :active,  des2, 2014-01-09, 3d
  Future task               :         des3, after des2, 5d
  Future task2              :         des4, after des3, 5d
\`\`\`

\`\`\`
const kill me 
\`\`\`
`;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://mermaid-v1.firebaseio.com'
});

const firestore = admin.firestore();

const usersCollection = firestore.collection('users');
const retrosCollection = firestore.collection('retros');
const columnsCollection = firestore.collection('columns');
const cardsCollection = firestore.collection('cards');

const seedFunction = async () => {
  const userID = 'sldnfsd99h';

  const newRetro = await retrosCollection.add({
    title: 'Demo Board',
    creatorID: userID,
    members: [userID],
    columnOrder: [],
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });


  const columns = await Promise.all([1, 2, 3].map(async (num) => {
    const newCol = await columnsCollection.add({
      title: `column ${num}`,
      retroID: newRetro.id,
      userID,
      cardIDs: [],
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    const cards = await Promise.all([1, 2].map((int) => {
      return cardsCollection.add({
        retroID: newRetro.id,
        title: `title ${int}`,
        content: `content ${int}`,
        columnID: newCol.id
      });
    }));

    newCol.update({
      cardIDs: cards.map((card) => card.id)
    });

    return newCol;
  }));

  newRetro.update({
    columnOrder: columns.map((column) => column.id)
  });

};


seedFunction().then(() => {
  console.log('done');
});
