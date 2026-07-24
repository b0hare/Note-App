import express from 'express'
import Sendmail from '../services/Sendmail.js'
import validateMail from '../Middleware/validMail.js'

const mailRouter = express.Router()

mailRouter.post('/send-otp', validateMail, Sendmail)


export default mailRouter