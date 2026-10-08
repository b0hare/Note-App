import transporter from "../config/mail.js";
import { randomInt } from "node:crypto";

const Sendmail = async (req, res) => {
    const { email } = req.body
    const otp = randomInt(100000, 1000000)
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "verify email",
            text: `Your verification code is ${otp}. It expires in 5 minutes.`
        })
        req.session.pendingOtp = otp
        req.session.pendingOtpEmail = email
        req.session.pendingOtpExpiresAt = Date.now() + 5 * 60 * 1000
        req.session.pendingOtpAttempts = 0
        req.session.verifiedEmail = null
        return res.status(200).send("OTP sent")
    } catch (error) {
        console.error('Failed to send OTP', error)
        return res.status(502).send("Unable to send verification email")
    }
}

export default Sendmail
