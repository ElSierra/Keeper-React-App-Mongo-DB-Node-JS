const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://127.0.0.1:27017/notes")

noteSchema = {
  title: String,
  content: String,
}

const Note = mongoose.model('Note', noteSchema);
// simple route
app.get("/api/", (req, res) => {
  Note.find((err, found) => {
    !err ? res.send(found) : console.log(err);
  })
});
app.post('/api/notes', (req, res) => {
  const note = req.body.content;
  // console.log('Adding notes:::::', note);
  // notes.push({ title: note.title, content: note.content });
  // res.json("entry addedd");
  // console.log(notes)
  const newNote = new Note({
    title: note.title,
    content: note.content,
  })
  newNote.save((err) => {
    if (!err) {
      res.send(`Successfully added ${note}`);
    } else {
      throw err;
    }
  })
});

app.delete('/api/notes/:noteID', (req, res) => {
  Note.findOneAndRemove({ _id: req.params.noteID }, function (err, found) {
    if (!err && found) {
      res.send('Succesfully deleted note with ID ' + req.params.noteID);
    }
  })
})

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
