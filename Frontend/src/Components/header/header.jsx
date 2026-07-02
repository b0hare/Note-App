import { useContext } from "react";
import Left from "./left";
import Right from "./right";
import { ThemeData } from "../../Utils/NotesFunctionalities";

function Header() {
    const {theme} = useContext(ThemeData)
    return (
        <header className={`w-screen h-15 ${theme === 'light' ? 'bg-white text-black' : 'bg-[#000]'} flex items-center p-5 justify-between border-b-2 border-b-[#111111] border-solid`}>
            <Left/>
            <Right/>
        </header>
    );
}

export default Header