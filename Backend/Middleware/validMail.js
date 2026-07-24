
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateMail(req,res,next) {
    const {email} = req.body;

    if (!email.trim()) {
        res.status(400).send("please provide the email.")
    }

    if (!emailRegex.test(email)) {
        res.status(404).send("Invalid email")
    }
    else{
        next()
    }
}

export default validateMail