import transporter from "../config/mail.js";
import { randomInt } from "node:crypto";

const Sendmail = async (req, res) => {
    const { email } = req.body
    const otp = randomInt(100000, 1000000)
    const response = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "verify email",
        text: `Your OTP is ${otp}`
    })

    if (response) {
        req.session.pendingOtp = otp
        req.session.pendingOtpEmail = email
        req.session.pendingOtpExpiresAt = Date.now() + 5 * 60 * 1000
        req.session.verifiedEmail = null
        return res.status(200).send("OTP sent")
    }
    return res.status(400).send("can't send otp")


}

export default Sendmail
