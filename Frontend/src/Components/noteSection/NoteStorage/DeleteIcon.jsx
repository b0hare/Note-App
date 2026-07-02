import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash} from '@fortawesome/free-solid-svg-icons';
function Delete(props) {
    return (
        <FontAwesomeIcon className='cursor-pointer' icon={faTrash} onClick={() => {
            props.deleteNote(props.idx, props.setNotes)
        }} />
    )
}

export default Delete