// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {faPenNib} from '@fortawesome/free-solid-svg-icons';

import { Pencil } from 'lucide-react';
import { useContext } from 'react';
import { ThemeData, UserData } from '../../../Utils/NotesFunctionalities';


function Edit(props) {
    const { theme } = useContext(ThemeData)
    const {user, setUser} = useContext(UserData)
    return (
        <button className={`cursor-pointer p-2 rounded-md ${theme === 'light' ? 'bg-[#efeaff]' : 'bg-[#161629]'}`} onClick={() => {
            props.editNote(props.id, props.arIdx, props.setNotes, props.setTitle, props.setDetails, props.notes, user.userId, setUser)
        }}>
            <Pencil color="#a855f7" size={16} />
        </button>

    )
}

export default Edit