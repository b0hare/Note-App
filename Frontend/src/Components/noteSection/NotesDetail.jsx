import { useContext } from "react"
import { ThemeData } from "../../Utils/NotesFunctionalities"

function Detail(props) {
    const {theme} = useContext(ThemeData)
    return (
        <textarea onChange={(e)=>{
            props.setDetails(e.target.value)
        }} className={`w-full h-72 rounded-md resize-none outline-none ${theme == 'light' ? "bg-[#F9F9FF] text-black" : "bg-black text-white"} p-1 placeholder:text-gray-500`} name="details" id="details" placeholder='Details here...' value={props.details}></textarea>
    )
}

export default Detail