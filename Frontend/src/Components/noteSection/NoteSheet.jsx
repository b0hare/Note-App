import Heading from "./Heading";
import Detail from "./NotesDetail";
import Btns from './Buttons';
import toast from "react-hot-toast";
import { useContext } from "react";
import { UserData } from "../../Utils/NotesFunctionalities";

function NoteSheet(props) {

    const clearNote = () => {
        if (props.title === "" && props.details === "") {
            toast("It's CLEAR", {
                icon: '😑',
            });
        }
        props.setTitle("")
        props.setDetails("")
    }

    const {user, setUser} = useContext(UserData)

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            props.submitHandler(-1, props.title, props.details, props.setTitle, props.setDetails, props.setNotes, user.userId, setUser);

        }} className="min-w-80 lg:w-1/2 h-1/2 md:w-1/2 w-70  p-5 rounded-md noteSheet flex flex-col gap-2">
            <Heading title={props.title} setTitle={props.setTitle} />
            <Detail details={props.details} setDetails={props.setDetails} />
            <Btns clearNote={clearNote} />
        </form>
    )
}

export default NoteSheet;