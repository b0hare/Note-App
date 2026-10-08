// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash} from '@fortawesome/free-solid-svg-icons';

import { Trash2 } from 'lucide-react';
import { useContext } from 'react';
import { ThemeData, UserData } from '../../../Utils/NotesFunctionalities';

function Delete(props) {
    const { theme } = useContext(ThemeData)
    const {setUser} = useContext(UserData)
    return (
        <button className={`cursor-pointer p-2 rounded-md ${theme === 'light' ? 'bg-[#f9ecef]' : 'bg-[#19121d]'}`} onClick={() => {
            props.deleteNote(props.id, props.setNotes, setUser, false)
        }}>
            <Trash2 color="#ef4444" size={17} />
        </button>
    )
}

export default Delete