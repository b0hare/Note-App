import { useContext } from "react"
import { ThemeData } from "../../Utils/NotesFunctionalities"

function Heading(props){
    const {theme} = useContext(ThemeData)
    return(
        <input onChange={(e) => {
            props.setTitle(e.target.value)
        }} className={`border-none outline-none w-full p-1 border-b-2 border-solid ${theme === 'dark' ? "border-b-[#333333]" : "border-b-[#cccccc]"} text-[20px] font-bold`} type="text" name="heading" id="heading" placeholder='Heading...' value={props.title}/>
    )
}

export default Heading