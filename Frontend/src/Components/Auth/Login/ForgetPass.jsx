import { useContext, useState } from "react";
import { handleOTP, resetPassword } from "../../../Utils/form";
import { MdMailOutline } from "react-icons/md";
import { ThemeData } from "../../../Utils/NotesFunctionalities";
import OtpField from "../Register/form/OtpVerify";
import ConfPass from "../Register/form/confPass";
import PassField from "../Register/form/password";
import EmailField from "../Register/form/email";
import { Link, useNavigate } from "react-router-dom";

function ForgetPass() {
    const { theme } = useContext(ThemeData)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        pass: "",
        confPass: "",
        otp: -1,
        verifyStatus: false,
    })
    const [passMsg, setPassMsg] = useState("Password Strength")
    const [isSendingOtp, setIsSendingOtp] = useState(false)
    const [isResetting, setIsResetting] = useState(false)
    const [otpRequested, setOtpRequested] = useState(false)

    const sendOtp = async () => {
        setIsSendingOtp(true)
        const sent = await handleOTP((otp) => setFormData(prev => ({ ...prev, otp })), formData.email)
        if (sent) setOtpRequested(true)
        setIsSendingOtp(false)
    }

    const submitReset = async (event) => {
        event.preventDefault()
        setIsResetting(true)
        await resetPassword(formData.email, formData.pass, formData.confPass, formData.verifyStatus, navigate)
        setIsResetting(false)
    }


    return (
        <div className={`flex items-center justify-center p-10 ${theme === 'light' ? "bg-[#F9F9FF] text-black" : "bg-black text-white"}`}>
            <form className="flex flex-col gap-3 min-w-[300px]" onSubmit={submitReset}>
                    <EmailField email={formData.email} setEmail={(email) => {
                        setOtpRequested(false)
                        setFormData(prev => ({
                            ...prev,
                            email,
                            otp: -1,
                            verifyStatus: false,
                        }))
                    }} />

                    <button type="button" disabled={isSendingOtp || otpRequested} className="bg-[#faeddc] flex justify-center items-center gap-2 text-[#FE6C24] text-sm font-semibold p-2 rounded-md cursor-pointer transition-all duration-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60" onClick={sendOtp}>
                        <MdMailOutline size={20} /> {isSendingOtp ? "Sending..." : otpRequested ? "Verification Code Sent" : "Get Verification Code"}
                    </button>

                    {otpRequested && <>
                        <OtpField otp={formData.otp} setVerifyStatus={(verifyStatus) => setFormData(prev => ({ ...prev, verifyStatus }))} />

                        <PassField setPass={(pass) => setFormData(prev => ({ ...prev, pass }))} setPassMsg={setPassMsg} passMsg={passMsg}/>

                        <ConfPass pass={formData.pass} confPass={formData.confPass} setConfPass={(confPass) => setFormData(prev => ({ ...prev, confPass }))}/>

                        <button type="submit" disabled={!formData.verifyStatus || isResetting} className="bg-[#FE6602] text-white p-2 rounded-md font-semibold transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-60">
                            {isResetting ? "Resetting password..." : "Reset Password"}
                        </button>
                    </>}

                    <Link to="/login" className="text-center text-sm font-semibold text-[#FE6C24]">Back to login</Link>
            </form>
        </div>
    )
}

export default ForgetPass;
