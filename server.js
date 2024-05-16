const express = require('express');
const path = require('path');
const db = require('./db/db.json');

const PORT = process.env.PORT || 3001;

const app = express();

// GET route for notes.html
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
  );

// returns db data in json
app.get('/api/notes', (req, res) =>{
    res.json(db);
})  

// any other routes will be sent to index.html
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.post('',(req,res)=>{

})  

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
  