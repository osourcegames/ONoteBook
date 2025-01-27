import { useState } from "react"
import NoteContext from "./noteContext"

const NoteState = (props) => {
    const host = "https://onotebook-backened.herokuapp.com"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)
  
    // Get all Notes
    const getNotes = async () => {
      // API Call 
      const response = await fetch(`${host}/api/notes/notes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("token")
        }
      });
      const json = await response.json() 
      setNotes(json)
    }
  
    // Add a Note
    const addNote = async (title, description, tag) => {
      // TODO: API Call
      // API Call 
      const response = await fetch(`${host}/api/notes/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({title, description, tag})
      });
  
      const note = await response.json();
      setNotes(notes.concat(note))
    }
  
    // Delete a Note
    const deleteNote = async (id) => {
      // API Call
      const response = await fetch(`${host}/api/notes/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("token")
        }
      });
      const json = response.json(); 
      const newNotes = notes.filter((note) => { return note._id !== id })
      setNotes(newNotes)
    }
  
    // Edit a Note
    const editNote = async (id, title, description, tag) => {
      // API Call 
      const response = await fetch(`${host}/api/notes/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({title, description, tag})
      });
      const json = await response.json(); 
  
       let newNotes = JSON.parse(JSON.stringify(notes))
      // Logic to edit in client
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag; 
          break; 
        }
      }  
      setNotes(newNotes);
    }
  
    return (
      <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
        {props.children}
      </NoteContext.Provider>
    )
  
  }
  export default NoteState;