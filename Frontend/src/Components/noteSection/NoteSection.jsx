import { useState, useContext } from 'react'
import NoteSheet from './NoteSheet';
import NoteStorage from './NoteStorage/NoteStorage';
import {editNote, deleteNote, submitHandler} from '../../Utils/NotesFunctionalities';
import { ThemeData } from '../../Utils/NotesFunctionalities';

function NoteSection() {

    const [title, setTitle] = useState("")
    const [details, setDetails] = useState("")
    const [notes, setNotes] = useState([])
    const [editingNoteId, setEditingNoteId] = useState(null)
    const {theme} = useContext(ThemeData)
    
    return (

        <div className={`${theme == 'light' ? "bg-[#F9F9FF] text-black" : "bg-black text-white"} noteSection w-full flex flex-col sm:flex-row items-center sm:items-start`}>

            <NoteSheet notes={notes} title={title} setTitle={setTitle} details={details} setDetails={setDetails} setNotes={setNotes} submitHandler={submitHandler} editingNoteId={editingNoteId} setEditingNoteId={setEditingNoteId} />

            <span className={`border-1 border-solid ${theme === 'light' ? "border-[#dddddd]" : "border-[#111]"} sm:h-100`}></span>

            <NoteStorage notes={notes} setTitle={setTitle} setDetails={setDetails} setNotes={setNotes} editNote={editNote} deleteNote={deleteNote} setEditingNoteId={setEditingNoteId}/>

        </div>
    )
}

export default NoteSection
