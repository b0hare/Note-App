const otpVerification = (req, res) => {
    const { enteredOtp } = req.body;
    const { pendingOtp, pendingOtpEmail, pendingOtpExpiresAt } = req.session;
    
    if (!pendingOtp || !pendingOtpEmail) {
        return res.status(404).send("Get OTP first")
    }

    if (Date.now() > pendingOtpExpiresAt) {
        delete req.session.pendingOtp
        delete req.session.pendingOtpEmail
        delete req.session.pendingOtpExpiresAt
        return res.status(400).send("OTP has expired")
    }

    if (Number(enteredOtp) === pendingOtp) {
        req.session.verifiedEmail = pendingOtpEmail
        delete req.session.pendingOtp
        delete req.session.pendingOtpEmail
        delete req.session.pendingOtpExpiresAt
        return res.status(200).send("Verified")
    }

    return res.status(400).send("Invalid OTP")
}

export default otpVerification
