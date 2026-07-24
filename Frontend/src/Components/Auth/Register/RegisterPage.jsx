import {useContext } from "react"
import { ThemeData } from "../../../Utils/NotesFunctionalities";
import RegisterTop from "./header.jsx";
import RegisterForm from "./form/form.jsx";

export const RegisterPage = () => {

    const { theme} = useContext(ThemeData)

    return (
        <div className={`w-full ${theme === 'light' ? "bg-[#F9F9FF] text-black" : "bg-black text-white"} flex flex-col justify-center items-center`}>
            <RegisterTop/>
            <RegisterForm/>
        </div>
    )
}

