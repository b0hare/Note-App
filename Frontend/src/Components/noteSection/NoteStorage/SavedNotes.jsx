import { useContext } from 'react'
import Nav from './Nav'
import SavedDetails from './SaveDetails'
import { ThemeData } from '../../../Utils/NotesFunctionalities'

function SavedNotes(props) {

    const noteTitle = props.note?.title ?? "";

    const title = noteTitle.length > 15
        ? `${noteTitle.slice(0, 15)}...`
        : noteTitle;

    const noteContent = props.note?.content ?? "";

    var details = noteContent.length > 180 ? `${noteContent.slice(0, 175)}...` : noteContent;

    const { theme } = useContext(ThemeData)

    return (
        // #f0eaff 
        <div className={`w-[300px] h-50 border border-solid flex flex-col rounded-lg m-1 ${theme === 'dark' ? 'bg-[#070b16] border-gray-900' : 'bg-[#F9F9FF] border-gray-300'}`}>

            <Nav notes={props.notes} title={title} setTitle={props.setTitle} setDetails={props.setDetails} details={props.details} deleteNote={props.deleteNote} setNotes={props.setNotes} id={props.id} arIdx={props.arIdx} editNote={props.editNote} setEditingNoteId={props.setEditingNoteId} />

            <SavedDetails details={details} setNotes={props.setNotes} />
        </div>
    )
}


export default SavedNotes
