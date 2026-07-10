import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function ConfPass() {
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const togConfPasVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    return (
        <div className="flex flex-col gap-1 relative">
            <label className="text-xs font-semibold text-gray-600" htmlFor="confirm-password">Confirm Password</label>
            <input className="text-md border-1 rounded-lg p-2 px-3 border-[#888] placeholder:text-xs placeholder:font-semibold focus:outline-none focus:border-b focus:border-[#FE6C24]" type={showConfirmPassword === false ? 'password' : 'text'} name="confirm-password" id="confirm-password" placeholder="Confirm password..." required />
            <FontAwesomeIcon className="absolute bottom-3 right-2 cursor-pointer" onClick={togConfPasVisibility} icon={showConfirmPassword ? faEye : faEyeSlash} />
        </div>
    )
}

export default ConfPass