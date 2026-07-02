import Nav from './Nav'
import SavedDetails from './SaveDetails'

function SavedNotes(props) {

    var title = props.note.title
    var details = props.note.details
    function trimNotes() {
        if (title.length > 10) {
            title = title.slice(0, 10)
            title += "..."
        }
        if (details.length > 100) {
            details = details.slice(0, 100)
            details += "..."
        }
    }
    return (
        <div onClick={trimNotes()} className='w-[200px] h-50 bg-white flex flex-col rounded-md m-1'>
            <Nav notes={props.notes} title={title} setTitle={props.setTitle} setDetails={props.setDetails} details={props.details} deleteNote={props.deleteNote} setNotes={props.setNotes} idx={props.idx} editNote={props.editNote} />
            <SavedDetails details={details} setNotes={props.setNotes} />
        </div>
    )
}


export default SavedNotes