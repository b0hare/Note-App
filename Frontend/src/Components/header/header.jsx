import { useContext } from "react";
import Left from "./left";
import Right from "./right";
import { ThemeData } from "../../Utils/NotesFunctionalities";

function Header() {
    const {theme} = useContext(ThemeData)
    return (
        <header className={`w-screen h-15 border-b-2 border-solid ${theme === 'light' ? 'bg-[#F9F9FF] text-black border-b-[#dddddd]' : 'bg-[#000] border-b-[#111111]'} flex items-center p-5 justify-between`}>
            <Left/>
            <Right/>
        </header>
    );
}

export default Header