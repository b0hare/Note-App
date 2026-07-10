// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash} from '@fortawesome/free-solid-svg-icons';

import {Trash2 } from 'lucide-react';
import { useContext } from 'react';
import { ThemeData } from '../../../Utils/NotesFunctionalities';

function Delete(props) {
        const { theme } = useContext(ThemeData)
        
    return (
        <button className={`cursor-pointer p-2 rounded-md ${theme === 'light' ? 'bg-[#f9ecef]' : 'bg-[#19121d]'}`} onClick={() => {
            props.deleteNote(props.idx, props.setNotes)
        }}>
            <Trash2 color="#ef4444" size={17}  />
        </button>
    )
}

export default Delete