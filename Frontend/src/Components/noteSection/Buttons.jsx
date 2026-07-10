import { useContext } from "react";
import { ThemeData } from "../../Utils/NotesFunctionalities";

function Btns(props) {

    const {theme} = useContext(ThemeData)

    return (
        <div className="btns flex gap-5">
            <button type="submit" className={`${theme === 'light' ? "bg-gradient-to-r from-[#0ea5b7] via-[#22c7b5] to-[#63e47c] transition-all duration-300 transform active:scale-95 hover:brightness-105 shadow-[0_4px_12px_rgba(14,165,183,0.22)] hover:shadow-[0_8px_20px_rgba(34,199,181,0.35)]" : "bg-gradient-to-br from-[#362d99] via-[#4b3097] to-[#683490] transition-all duration-300 transform active:scale-95 hover:brightness-125 hover:contrast-110 shadow-[0_0_15px_rgba(54,45,153,0.2)] hover:shadow-[0_0_30px_rgba(104,52,144,0.5)]"}  p-3 rounded-md w-1/2 active:scale-95 text-white shadow-md`}>Save</button>
            <button type="button" className={`${theme === 'light' ? "bg-gradient-to-r from-[#f94f67] via-[#ff6f86] to-[#ff9eb2] transition-all duration-300 transform active:scale-95 hover:brightness-105 shadow-[0_4px_12px_rgba(249,79,103,0.22)] hover:shadow-[0_8px_20px_rgba(255,111,134,0.35)]" : "bg-gradient-to-r from-[#8937a6] to-[#cc3e75] transition-all duration-300 transform active:scale-95 hover:brightness-125 hover:contrast-110 shadow-[0_0_15px_rgba(137,55,166,0.2)] hover:shadow-[0_0_25px_rgba(204,62,117,0.45)]"} p-3 rounded-md w-1/2 active:scale-95 text-white shadow-md`} onClick={props.clearNote}>Clear</button>
        </div>
    )
}

export default Btns;