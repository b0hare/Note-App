import NameField from "./name.jsx";
import EmailField from "./email.jsx";
import GetOtp from './otpBtn.jsx';
import OtpField from './OtpVerify.jsx';
import PassField from './password.jsx';
import ConfPass from './confPass.jsx';
import FormSubmit from "./submitBtn.jsx";
import ServicePolicy from "./servicePolicy.jsx";
import { useState} from "react";
import { handleSubmit } from "../../../../Utils/form.js";
import {useNavigate} from 'react-router-dom';

function RegisterForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        pass: "",
        confPass: "",
        otp: -1,
        verifyStatus: false,
    });
    const [passMsg, setPassMsg] = useState("Password Strength")

    const navigate = useNavigate();
    
    return (
        <form className="flex flex-col gap-3 bg-transparent" onSubmit={(e) => {
            handleSubmit(e, formData.name, formData.email, formData.pass, formData.confPass, formData.verifyStatus, navigate)
        }}>
            <>
                <NameField name={formData.name} setName={(name) => {
                    setFormData(prev => ({
                        ...prev, name
                    }))
                }} />

                <EmailField email={formData.email} setEmail={(email) => {
                    setFormData(prev => ({
                        ...prev,
                        email
                    }))
                }} />

                <GetOtp email={formData.email} setOtp={(otp) => {
                    setFormData(prev => ({
                        ...prev, otp
                    }))
                }} />

                <OtpField otp={formData.otp} setOtp={(otp) => {
                    setFormData(prev => ({
                        ...prev, otp
                    }))
                }} setVerifyStatus={(verifyStatus) => {
                    setFormData(prev => ({
                        ...prev, verifyStatus
                    }))
                }} />

                <PassField setPass={(pass) => {
                    setFormData(prev => ({
                        ...prev, pass
                    }))
                }} passMsg={passMsg} setPassMsg={setPassMsg} />

                <ConfPass pass={formData.pass}  confPass={formData.confPass} setConfPass={(confPass) => {
                    setFormData(prev => ({
                        ...prev, confPass
                    }))
                }}/>

                <ServicePolicy />
                <FormSubmit />

            </>
        </form>
    )
}

export default RegisterForm
