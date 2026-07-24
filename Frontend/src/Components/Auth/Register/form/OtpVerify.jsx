import { useState } from "react"
import { otpcheck, otpVerify } from "../../../../Utils/form";

function OtpField(props) {
    const [enteredOtp, setEnteredOtp] = useState("") //user entered otp

    return (
        <div className="flex flex-col gap-1 relative">
            <input className="text-md border-1 rounded-lg p-2 px-3 border-[#888] placeholder:text-xs placeholder:font-semibold focus:outline-none focus:border-b focus:border-[#FE6C24]" type="number" name="" id="" placeholder="Enter OTP received through email..." value={enteredOtp} required onChange={(e) => {
                otpcheck(e, setEnteredOtp)
            }} />

            <button type="button" className="bg-[#FE6602] absolute right-1 bottom-1 text-white px-2 py-1 rounded-md cursor-pointer transition-all active:scale-95 " onClick={() => {
                otpVerify(enteredOtp, props.otp, props.setVerifyStatus)
            }}>Verify</button>
        </div>
    )
}

export default OtpField