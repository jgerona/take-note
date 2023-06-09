const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = 3001;
const app = express();
var notes = [];

const { v4: uuidv4 } = require('uuid');
//import {v4 as uuidv4} from 'uuid';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req,res) => {
    fs.readFile(path.join(__dirname,'./db/db.json'),"utf-8", (err,data) =>{
        if (err){
            console.error(err);
        }
        else {
            res.json(JSON.parse(data));
            notes = JSON.parse(data);
        }
    })
})

app.post('/api/notes', (req, res) => {
    console.log(`${req.method} request recieved to add note`);
    //getNotes();
    const { title, text } = req.body;
    const newNote = {
        title,
        text,
        id: uuidv4()
    }
    //console.log(notes);
    notes.push(newNote);
    //console.log(`${notes} again`);
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(notes))
    res.json(newNote);
});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
