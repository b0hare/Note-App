import { useState } from "react";
import { MdMailOutline } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

function GetOtp() {
    const [otp, setOtp] = useState(-1) //Generated otp

    const handleOTP = async () => {
        
        if (!email.trim()) {
            toast.error("Email is required")
            return
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            toast.error("Invalid Email");
            return;
        }
        try {
            const response = await axios.post("http://localhost:3000/api/send-otp", { email })

            if (response.status === 200) {
                toast.success("OTP Sent!")
                setOtp(response.data)
            }
            else {
                toast.error("Failed to sent OTP")
            }

        } catch (er) {
            console.error(er.message)
        }

    }
    return(
        <button type="button" className="bg-[#faeddc] flex justify-center items-center gap-2 text-[#FE6C24] text-sm font-semibold p-2 rounded-md cursor-pointer transition-all duration-300 active:scale-95 " onClick={handleOTP}><MdMailOutline size={20} /> Get Verification Code</button>
    )
}

export default GetOtp