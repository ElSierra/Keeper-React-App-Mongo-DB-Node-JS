import React, { useState } from "react";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Zoom } from "@mui/material";
function CreateArea(props) {
  const [note, updateNote] = useState({ title: '', content: '' })
  const [contentState, setContentState] = useState(false);

  function contentListener(e) {
    const name = e.target.name;
    const value = e.target.value
    updateNote(prev => {
      if (name === 'title') {
        return {
          title: value,
          content: prev.content,
        }
      } else {
        return {
          title: prev.title,
          content: value,
        }
      }
    })

  }
  return (
    <div onClick={(e) => {
      //setContentState(true);
    }}>

      <form className="create-note">
        {contentState ? <input name="title" placeholder="Title" onChange={contentListener} value={note.title} /> : null}
        <textarea name="content" placeholder="Take a note..." rows={contentState ? "3" : '1'} onChange={contentListener} value={note.content} onClick={() => {
          setContentState(true);
        }} on />
        <Zoom in={contentState}><Fab color="primary" onClick={(e) => {
          setContentState(false)
          props.button(e, note, updateNote)
        }}><AddIcon /></Fab></Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
