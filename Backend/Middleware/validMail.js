
import { emailPattern, normalizeEmail } from '../utils/validation.js';

function validateMail(req,res,next) {
    const email = normalizeEmail(req.body.email)
    if (!email) {
        return res.status(400).send("Please provide an email address")
    }

    if (!emailPattern.test(email)) {
        return res.status(400).send("Invalid email address")
    }

    req.body.email = email
    return next()
}

export default validateMail
