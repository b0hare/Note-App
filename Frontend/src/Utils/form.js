import axios from "axios";
import toast from "react-hot-toast";
import { replace } from "react-router-dom";

export function handleName(e, alpha, setAlpha) {        //Name
    alpha = e.target.value
    if (alpha === "" || /^[a-zA-Z][a-zA-Z0-9]*$/.test(alpha)) {
        setAlpha(alpha);
    }
}


export const handleMail = (e, setEmail) => {      //Email
    const mail = e.target.value;
    setEmail(mail)
}


export const handleOTP = async (setOtp, email) => {

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
        const response = await axios.post("http://localhost:3000/send-otp", { email })

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

export const otpcheck = (e, setEnteredOtp) => {
    setEnteredOtp(e.target.value)
    if (e.target.value > 999999) {
        setEnteredOtp(999999)
        toast.error("OTP is of 6 digits")
    }
}

export const otpVerify = async (enteredOtp, otp, setVerifyStatus) => {

    if (otp === -1) {
        setTimeout(() => {
            toast.error("Get a verification code first")
        }, 400);
    }

    else {
        if (enteredOtp === "") {
            setTimeout(() => {
                toast.error("Enter OTP")
            }, 400);
        }
        try {
            const verified = await axios.post("http://localhost:3000/verify-otp", { enteredOtp, otp })

            if (verified.status === 200) {
                setVerifyStatus(true)
                toast.success("Email Verified")
            }

        } catch (error) {
            if (error.response.status === 400) {
                toast.error("Incorrect OTP")
            }
        }
    }


}


export const validPass = (e, setPass, setPassMsg) => {
    if (e.target.value.length < 8) {
        setPassMsg("Must be of 8 Characters")
    } else if (!/[a-z]/.test(e.target.value)) {
        setPassMsg("Must have atleast 1 lowerCase")
    } else if (!/[A-Z]/.test(e.target.value)) {
        setPassMsg("Must have atleast 1 upperCase")
    } else if (!/\d/.test(e.target.value)) {
        setPassMsg("Must have atleast a number")
    } else if (!/[!@#$%^&*()?_<>-]/.test(e.target.value)) {
        setPassMsg("Must have atleast a special characters [!@#$%^&*()?_<>-]")
    } else {
        setPassMsg("Strong Password")
    }
    setPass(e.target.value)
}


export async function handleSubmit(e, name, email, pass, confPass, verifyStatus, navigate) {
    e.preventDefault()
    try {
        await axios.post("http://localhost:3000/user-registration", { name, email, pass, verifyStatus })
        toast.success(`Account Created`)
        navigate("/", { replace: true })
    } catch (error) {
        if (error.status === 400) {
            toast.error("OTP verifation Failed")
        }
        else {
            toast.error("Registraion Failed")
        }
    }
}


// login 

export async function validUser(email,pass, navigate) {
    try {
            const loggedIn = await axios.post("http://localhost:3000/login", { email, pass })
            toast.success(`Welcome ${loggedIn.data}`)
            navigate('/', {replace: true})
        } catch (err) {
            toast.error(err.response.data)
        }
}