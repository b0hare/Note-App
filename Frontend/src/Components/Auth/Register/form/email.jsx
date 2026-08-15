import { handleMail } from "../../../../Utils/form";

function EmailField({ email, setEmail }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-600" htmlFor="email">Email</label>
            <input className="text-md border-1 rounded-lg p-2 px-3 border-[#888] placeholder:text-xs placeholder:font-semibold focus:outline-none focus:border-b focus:border-[#FE6C24]" type="email" name="email" id="email" placeholder="Enter your email..." onChange={(e) => {
                handleMail(e, setEmail)
            }} value={email} required />
        </div>
    )
}

export default EmailField
