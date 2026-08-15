
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateMail(req,res,next) {
    const {email} = req.body
    if (typeof email !== "string" || !email.trim()) {
        return res.status(400).send("Please provide an email address")
    }

    if (!emailRegex.test(email)) {
        return res.status(400).send("Invalid email address")
    }

    return next()
}

export default validateMail