import api from "../api";
import toast from "react-hot-toast";

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
        return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        toast.error("Invalid Email");
        return false;
    }
    try {
        toast.success('Please wait!', {
            icon: '⌛',
            duration: 3000,
        });
        const response = await api.post("/send-otp", { email })

        if (response.status === 200) {
            toast.success("OTP Sent!")
            setOtp(0)
            return true
        }
        else {
            toast.error("Failed to sent OTP")
            return false
        }

    } catch (er) {
        console.error(er.message)
        toast.error("Could not send OTP")
        return false
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
            const verified = await api.post("/verify-otp", { enteredOtp })

            if (verified.status === 200) {
                setVerifyStatus(true)
                toast.success("Email Verified")
            }

        } catch (error) {
            toast.error(error.response?.data || "Could not verify OTP")
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
        await api.post("/user-registration", { name, email, pass, verifyStatus })
        toast.success(`Account Created`)
        navigate("/", { replace: true })
    } catch (error) {
        if (error.response?.status === 403) {
            toast.error("Email not verified")
        }
        else {
            toast.error("Registraion Failed")
        }
    }
}


// login 

export async function validUser(email, pass, setUser, navigate) {
    try {
        const loggedIn = await api.post("/login", { email, pass })
        toast.success(`Welcome ${loggedIn.data.name}`)
        setUser(loggedIn.data)
        navigate('/', { replace: true })
    } catch (err) {
        console.error(err.response.data);
        toast.error("Incorrect Credentials")
    }
}

export async function resetPassword(email, pass, confPass, verifyStatus, navigate) {
    if (!verifyStatus) {
        toast.error("Verify your email first")
        return
    }

    if (pass !== confPass) {
        toast.error("Passwords do not match")
        return
    }

    if (pass.length < 8) {
        toast.error("Password must be at least 8 characters")
        return
    }

    try {
        await api.post("/reset-password", { email, pass, verifyStatus })
        toast.success("Password reset successfully")
        navigate("/login", { replace: true })
    } catch (error) {
        toast.error(error.response?.data || "Could not reset password")
    }
}



// to save edited name 

export async function updateName(name) {
    try {
        await api.patch("/profile/update-name", {name})
        toast.success("Updated")
    } catch {
        toast.error("Request Failed")
    }
}

export async function updateEmail(email) {
    try {
        await api.patch("/profile/update-email", {email})
        setTimeout(()=> {
            toast.success("Updated")
        }, 1500)
    } catch {
        toast.error("Request Failed")
    }
}

export async function logout() {
    await api.post('/logout')
}

export async function deleteAccount() {
    await api.delete('/account')
}

export async function updateProfileImage(imageData) {
    const response = await api.patch('/profile/update-image', { imageData })
    return response.data.profile_image
}
