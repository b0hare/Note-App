import { useContext, useState } from "react"
import { ThemeData, UserData } from "../../../Utils/NotesFunctionalities"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { validUser } from "../../../Utils/form";

export const LoginPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)

    const { theme } = useContext(ThemeData)
    const {setUser} = useContext(UserData)
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

   function loginSubmit(e) {
        e.preventDefault();
        validUser(email,pass, setUser, navigate);
    }

    return (
        <div className={`w-full h-full ${theme === 'light' ? "bg-[#F9F9FF] text-black" : "bg-black text-white"} bg-[#000] flex`}>
            <div className="card flex my-40 mx-auto flex-col gap-2">
                <form onSubmit={(e) => {
                    loginSubmit(e)
                }} className="min-w-[300px] flex flex-col gap-3 bg-transparent " action="" method="">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-gray-600" htmlFor="">Email</label>
                            <input className="text-md border-1 rounded-lg p-2 px-3 border-[#888] placeholder:text-xs placeholder:font-semibold focus:outline-none focus:border-b focus:border-purple-700" type="email" value={email} id="" placeholder="Enter your email..." required onChange={(e) => {
                                setEmail(e.target.value)

                            }} />
                        </div>
                        <div className="flex flex-col gap-1 relative">
                            <label className="text-xs font-semibold text-gray-600" htmlFor="">Password</label>
                            <input className="text-md border-1 rounded-lg p-2 px-3 border-[#888] placeholder:text-xs placeholder:font-semibold focus:outline-none focus:border-b focus:border-purple-700" type={showPassword === true ? 'text' : 'password'} value={pass} id="" placeholder="Enter password..." required onChange={(e) => {
                                setPass(e.target.value)

                            }} />
                            <FontAwesomeIcon className="absolute bottom-3 right-2 cursor-pointer" onClick={togglePasswordVisibility} icon={showPassword ? faEye : faEyeSlash} />
                        </div>

                        <div className="text-sm flex justify-between items-center">
                            <label className="text-sm flex justify-between items-center gap-1" htmlFor="">
                                <input className="w-4 h-4 appearance-none rounded border border-zinc-700 bg-purple-500 checked:bg-purple-700 cursor-pointer transition-colors relative checked:after:content-[''] checked:after:absolute checked:after:left-[4px] checked:after:top-[1px] checked:after:w-[5px] checked:after:h-[9px] checked:after:border-white checked:after:border-r-2 checked:after:border-b-2 checked:after:rotate-45" type="checkbox" name="" id="" /><span className="text-gray-600 font-semibold self-start">Remember Me</span>
                            </label>
                            <span className="text-[#6b46d9] font-semibold"><Link to='/forgetPass'>Forgot password?</Link></span></div>

                        <button className="bg-gradient-to-r from-[#6b46d9] to-[#8b5ea1] flex py-2 px-4 rounded-md text-white justify-between active:scale-95" type="submit">
                            <span className="text-lg opacity-0">&#8594;</span>
                            <p className="text-center">Login</p>
                            <span className="text-lg">&#8594;</span>
                        </button>

                </form>

                <div className="text-center">
                    <p className="text-xs font-semibold">OR</p>
                    <Link className="text-[#6b46d9]" to='/register'>Register with Email</Link>
                </div>
            </div>
        </div>
    )
}
