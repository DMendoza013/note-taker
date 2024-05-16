const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET route for notes.html
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
  );

// returns db data in json
app.get('/api/notes', (req, res) =>{
    res.json(db);
})

app.post('/api/notes',(req,res)=>{
    console.info(`${req.method} request received to add a note`);
    
    const {title, text} = req.body;

    if(title && text) {
        const newNote = {
            title,
            text
        }
    
    fs.readFile('./db/db.json','utf8', (err, data) =>{
        if(err){
            console.log(err);
        } else {
            const parseNotes = JSON.parse(data);

            parseNotes.push(newNote);

            fs.writeFile('./db/db.json', JSON.stringify(parseNotes, null, 4), (writeErr) =>
                writeErr ? console.log(writeErr) : console.log('Updated Notes')
            );
        }
    });

    const response = {
        status: 'success',
        body: newNote,
    };
        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error in adding note')
    }
})  

// any other routes will be sent to index.html
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
  