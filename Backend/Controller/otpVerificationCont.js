const otpVerification = (req, res) => {
    const{enteredOtp, otp} = req.body;
    
    if (otp === -1) {
        return res.status(404).send("Get OTP first")
    }
    if (Number(enteredOtp) === otp) {
        return res.status(200).send("Verified")
    }
    else if (Number(enteredOtp) !== otp && otp !== -1) {
        return res.status(400).send("Invalid OTP")
    }
}

export default otpVerification