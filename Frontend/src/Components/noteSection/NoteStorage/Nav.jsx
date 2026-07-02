import Edit from './EditIcon'
import Delete from './DeleteIcon'

function Nav(props) {
    return (
        <nav className="flex items-center justify-between p-2 bg-black navbar">
            <h2 className="showHeading font-semibold">{props.title}</h2>
            <div className="right flex items-center gap-3">
                <Edit notes={props.notes} idx={props.idx} setTitle={props.setTitle} setDetails={props.setDetails} details={props.details} editNote={props.editNote} setNotes={props.setNotes}/>
                <Delete deleteNote={props.deleteNote} idx={props.idx} setNotes={props.setNotes}/>
            </div>
        </nav >
    )
}

export default Nav