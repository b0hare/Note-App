import { useContext } from 'react'
import Nav from './Nav'
import SavedDetails from './SaveDetails'
import { ThemeData } from '../../../Utils/NotesFunctionalities'

function SavedNotes(props) {

    var title = props.note.title
    var details = props.note.details
    function trimNotes() {
        if (title.length > 15) {
            title = title.slice(0, 16)
            title += "..."
        }
        if (details.length > 180) {
            details = details.slice(0, 175)
            details += "..."
        }
    }

    

    const {theme} = useContext(ThemeData)

    return (
        // #f0eaff 
        <div onClick={trimNotes()} className={`w-[300px] h-50 border border-solid flex flex-col rounded-lg m-1 ${theme === 'dark' ? 'bg-[#070b16] border-gray-900' : 'bg-[#F9F9FF] border-gray-300'}`}>
            <Nav notes={props.notes} title={title} setTitle={props.setTitle} setDetails={props.setDetails} details={props.details} deleteNote={props.deleteNote} setNotes={props.setNotes} idx={props.idx} editNote={props.editNote} />
            <SavedDetails details={details} setNotes={props.setNotes} />
        </div>
    )
}


export default SavedNotes