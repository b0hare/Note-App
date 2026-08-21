import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function ConfPass(props) {
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const togConfPasVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    const matched = props.pass === "" || props.confPass === "" ? "Re-enter Password" : props.pass === props.confPass ?
        "Matched✅" : "Password didn't Match❌"

    return (
        <div className="flex flex-col gap-1 relative">
            <label className="text-xs font-semibold text-gray-600" htmlFor="confirm-password">Confirm Password</label>
            <input className="text-md border-1 rounded-lg p-2 px-3 border-[#888] placeholder:text-xs placeholder:font-semibold focus:outline-none focus:border-b focus:border-[#FE6C24]" type={showConfirmPassword === false ? 'password' : 'text'} name="confirm-password" value={props.confPass} id="confirm-password" placeholder="Confirm password..." onChange={(e) => {
                props.setConfPass(e.target.value)
            }} required />
            <FontAwesomeIcon className="absolute bottom-9 right-2 cursor-pointer" onClick={togConfPasVisibility} icon={showConfirmPassword ? faEye : faEyeSlash} />

            <div className="strength-meter w-full text-xs font-bold mt-1">
                {matched}
            </div>
        </div>
    )
}

export default ConfPass