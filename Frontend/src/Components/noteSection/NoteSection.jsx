import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenNib } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react'
import NoteSheet from './NoteSheet';
import NoteStorage from './NoteStorage/NoteStorage';
import {editNote, deleteNote, submitHandler} from '../../Utils/NotesFunctionalities';

function NoteSection() {

    const [title, setTitle] = useState("")
    const [details, setDetails] = useState("")
    const [notes, setNotes] = useState([])

    
    return (

        <div className="noteSection w-full flex flex-col sm:flex-row items-center sm:items-start">

            <NoteSheet notes={notes} title={title} setTitle={setTitle} details={details} setDetails={setDetails} setNotes={setNotes} submitHandler={submitHandler} />

            <span className='border-1 border-solid border-[#111] sm:h-100'></span>

            <NoteStorage notes={notes} setTitle={setTitle} setDetails={setDetails} setNotes={setNotes} editNote={editNote} deleteNote={deleteNote}/>

        </div>
    )
}

export default NoteSection