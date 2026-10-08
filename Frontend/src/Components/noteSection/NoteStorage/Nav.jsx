import Edit from './EditIcon'
import Delete from './DeleteIcon'
import { useContext } from 'react'
import { ThemeData } from '../../../Utils/NotesFunctionalities'
import { LuFileText } from "react-icons/lu";
import dateFormate from '../../../Utils/formateDate';

function Nav(props) {
    const { theme } = useContext(ThemeData)
    const updatedAt = props.notes?.[props.arIdx]?.updated_at;

    const formattedDate = updatedAt
        ? dateFormate(updatedAt)
        : "";
        
    return (
        <nav className={`flex items-center justify-between p-2 border-b border-l-4 border-solid rounded-t-lg ${theme === 'light' ? "bg-[#F5F2FE] border-b-[#cccccc] text-white border-l-[#8c66de]" : "bg-[#0b0e1b] border-b-gray-900 border-l-[#9b58f7]"} navbar`}>

            <div className="navLeft flex items-center justify-center gap-2">
                <p className={`p-2 text-[#9E55DB] rounded-md ${theme === 'light' ? 'bg-[#EAE4FC]' : 'bg-[#2A1749]'}`}><LuFileText /></p>
                <div className="showHeading flex flex-col">
                    <h2 className={`font-bold text-[16px] ${theme === 'light' ? "text-gray-900" : "text-white"}`}>{props.title}</h2>
                    <span className={`text-[10px] ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>{formattedDate}</span>
                </div>
            </div>

            <div className="right flex items-center gap-3">

                <Edit notes={props.notes} id={props.id} arIdx={props.arIdx} setTitle={props.setTitle} setDetails={props.setDetails} editNote={props.editNote} setEditingNoteId={props.setEditingNoteId} />
                <Delete deleteNote={props.deleteNote} id={props.id} setNotes={props.setNotes} notes={props.notes} />

            </div>
        </nav >
    )
}

export default Nav
