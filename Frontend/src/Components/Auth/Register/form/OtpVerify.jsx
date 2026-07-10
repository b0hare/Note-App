import { useState } from "react"
import toast from "react-hot-toast";

function OtpField() {
    const [enteredOtp, setEnteredOtp] = useState("") //user entered otp

    const otpcheck = (e) => {
        setEnteredOtp(e.target.value)
        if (e.target.value > 999999) {
            setEnteredOtp(999999)
            toast.error("OTP is of 6 digits")
        }
    }

    const otpVerify = () => {
        if (otp === -1) {
            setTimeout(() => {
                toast.error("Get a verification code first")
            }, 400);
        }

        if (Number(enteredOtp) === otp) {
            toast.success("Verified!")
        }
        else if (enteredOtp !== "" && Number(enteredOtp) !== otp && otp !== -1) {
            toast.error("Incorrect OTP")
        }
    }

    return (
        <div className="flex flex-col gap-1 relative">
            <input className="text-md border-1 rounded-lg p-2 px-3 border-[#888] placeholder:text-xs placeholder:font-semibold focus:outline-none focus:border-b focus:border-[#FE6C24]" type="number" name="" id="" placeholder="Enter OTP received through email..." value={enteredOtp} required onChange={otpcheck} />

            <button type="button" className="bg-[#FE6602] absolute right-1 bottom-1 text-white px-2 py-1 rounded-md cursor-pointer transition-all active:scale-95 " onClick={otpVerify}>Verify</button>
        </div>
    )
}

export default OtpField