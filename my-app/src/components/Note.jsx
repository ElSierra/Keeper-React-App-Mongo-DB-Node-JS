import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';




function Note(props) {
  const [updatedNote, setUpdatedNote] = useState({ title: 'test', content: 'test' });
  const [changeNote, setChange] = useState({ title: false, content: false });

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setChange(prev => {
      if (name === 'title') {
        return ({
          title: true,
          content: prev.content
        }
        );
      } else {
        return ({
          title: prev,
          content: true
        });
      }
    })

  }
  return (
    <div className="note">
      <input className="text-note" name='title' onChange={handleChange} value={!setChange.title ? props.title : updatedNote.title} />
      <input className="text-note" name='content' onChange={(e) => { console.log(e.target.value) }} value={props.content} />

      <button value='dlete' onClick={(e) => {
        props.delete(e, props.itemId)
      }}><DeleteIcon /></button>
    </div>
  );
}

export default Note;
