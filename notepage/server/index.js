const express = require("express");
const app = express();
const mysql = require("mysql2");

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'NotesDatabase',  
})

db.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error);
  } else {
    console.log('Connected to the database');
  }
});

app.post('/api/notes', (req, res) => {
  const { title, content } = req.body;

  const query = 'INSERT INTO notes (title, content) VALUES (?, ?)';
  const values = [title, content];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error saving note:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json({ message: 'Note saved successfully' });
    }
  });
});

app.listen(3001, () => {
    console.log("running on port 3001");
});