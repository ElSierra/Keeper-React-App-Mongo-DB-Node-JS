import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from 'axios';



function App() {
  //State to refresh Page once the data in the database has changed
  const [backEndData, setBackEndData] = useState([{}]);

  // Make a Get Request to Server Every time the page refreshes
  useEffect(() => {
    // Get the notes in the Db
    axios.get('/api')
      .then(function (response) {
        // Sends the data response to the {backEndData constant}
        setBackEndData(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

  })
  function noteUpdate(e,content, id)
  {

  }

  // Button to Add Notes to the DB
  function buttonAdd(e, content, updateNote) {
    console.log(content);
    // Makes a post request with the notes to the DB
    axios.post('/api/notes', { content },)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });


    updateNote({ title: '', content: '' });

    e.preventDefault();

  }
  // Delete Specific Notes form the DB
  function buttonDelete(e, itemID) {
    //itemID is a passed _id of the item from Mongo DB Database

    axios.delete(`api/notes/${itemID}`)
      .then(res => {
        console.log(res);
        console.log(res.data);


      })



    //console.log(i);

  }
  return (
    <div>
      <Header />
      <CreateArea button={buttonAdd} />
      {backEndData.map((notes, i) => {
        //console.log(notes);
        return <Note key={i}
          itemId={notes._id}
          title={notes.title}
          content={notes.content}
          delete={buttonDelete} />
      })}

      <Footer />
    </div>
  );
}

export default App;
