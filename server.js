// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
  projectID: 'savethedrags',
  keyFilename: '/Users/yansentjandra/Important/savethedrags-76496b4cd7c0.json',
});

app.get('/', (req, res) => {
  // res.status(200).sendFile(__dirname + '/client/public/index.html');
  res.end();
  var docRef = db.collection('users').doc('alovelace');

  var setAda = docRef.set({
    first: 'Ada',
    last: 'Lovelace',
    born: 1815
  });

  var aTuringRef = db.collection('users').doc('aturing');

  var setAlan = aTuringRef.set({
    'first': 'Alan',
    'middle': 'Mathison',
    'last': 'Turing',
    'born': 1912
  });
});

app.get('/authorized', (req,res) => {
  res.status(200).sendFile(__dirname + '/client/public/index.html');
});

app.get('/result', (req, res) => {
  db.collection('users').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data().first);
    });
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });
});

app.get('/input', (req, res) => {
  name = "Victim"
  var aTuringRef = db.collection('reports').doc('aturing');

  var setAlan = aTuringRef.set({
    'first': 'Alan',
    'middle': 'Mathison',
    'last': 'Turing',
    'born': 1912
  });
});

app.listen(PORT, () => {
  console.log(`App is up and running. Listening on port ${PORT}`);
});
