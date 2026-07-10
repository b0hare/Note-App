import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function PassField() {
    const [showPassword, setShowPassword] = useState(false)
    
        const togglePasswordVisibility = () => {
            setShowPassword(!showPassword)
        }
    return (
        <div className="flex flex-col gap-1 relative">
            <label className="text-xs font-semibold text-gray-600" htmlFor="password">Password</label>
            <input className="text-md border-1 rounded-lg p-2 px-3 border-[#888] placeholder:text-xs placeholder:font-semibold focus:outline-none focus:border-b focus:border-[#FE6C24]" type={showPassword === true ? 'text' : 'password'} name="password" id="password" placeholder="Enter password..." required />
            <FontAwesomeIcon className="absolute bottom-3 right-2 cursor-pointer" onClick={togglePasswordVisibility} icon={showPassword ? faEye : faEyeSlash} />
        </div>
    )
}

export default PassField