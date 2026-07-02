import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenNib} from '@fortawesome/free-solid-svg-icons';

function Edit(props) {
    return (
        <FontAwesomeIcon className='cursor-pointer' icon={faPenNib} onClick={() => {
            props.editNote(props.idx, props.setNotes, props.setTitle, props.setDetails, props.notes)
        }} />
    )
}

export default Edit