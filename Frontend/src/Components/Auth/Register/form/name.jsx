import { useState } from "react";

function NameField() {

    const [alpha, setAlpha] = useState("")
    
        const handleName = (e) => {
            const name = e.target.value
            if (/^[a-zA-Z]*$/.test(name)) {
                setAlpha(name);
            }
        }

    return (
        <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-600" htmlFor="username">Name</label>
            <input onChange={handleName} className="text-md border-1 rounded-lg p-2 px-3 border-[#888] placeholder:text-xs placeholder:font-semibold focus:outline-none focus:border-b focus:border-[#FE6C24]" type="text" name="username" id="username" value={alpha} placeholder="Enter your name..." required />
        </div>
    )
}

export default NameField