import transporter from "../config/mail.js";

const Sendmail = async (req, res) => {
    const { email } = req.body
    const otp = Math.floor(Math.random() * (999999 - 99999) + 99999)
    const response = await transporter.sendMail({
        from: process.env.USER_EMAIL,
        to: email,
        subject: "verify email",
        text: `Your OTP is ${otp}`
    })

    if (response) {
        return res.status(200).send(otp)
    }
    return res.status(400).send("can't send otp")


}

export default Sendmail
