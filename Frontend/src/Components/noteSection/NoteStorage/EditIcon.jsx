// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {faPenNib} from '@fortawesome/free-solid-svg-icons';

import { Pencil } from 'lucide-react';
import { useContext } from 'react';
import { ThemeData } from '../../../Utils/NotesFunctionalities';


function Edit(props) {
    const { theme } = useContext(ThemeData)
    return (
        <button className={`cursor-pointer p-2 rounded-md ${theme === 'light' ? 'bg-[#efeaff]' : 'bg-[#161629]'}`} onClick={() => {
            props.editNote(props.id, props.arIdx, props.setTitle, props.setDetails, props.notes, props.setEditingNoteId)
        }}>
            <Pencil color="#a855f7" size={16} />
        </button>

    )
}

export default Edit
