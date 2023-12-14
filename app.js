const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;

// Update the MongoDB connection URL with your database name
const url = 'mongodb://localhost:27017/mydatabase'; // Change 'mydatabase' to your actual database name

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;

    const db = client.db(); // Access the database from the client

    const usersCollection = db.collection('users');

    usersCollection.insertOne({ name, email, password }, (err, result) => {
      if (err) throw err;

      console.log('User registered successfully!');
      client.close();
      res.send('Registration successful!');
    });
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
