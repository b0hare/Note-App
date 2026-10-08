import express from 'express'
import Sendmail from '../services/Sendmail.js'
import validateMail from '../Middleware/validMail.js'
import { rateLimit } from 'express-rate-limit';

const mailRouter = express.Router()

const otpSendLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: 'Too many verification emails requested. Try again later.'
})

mailRouter.post('/send-otp', otpSendLimiter, validateMail, Sendmail)


export default mailRouter
