import express from 'express'
import Sendmail from '../services/Sendmail.js'

const mailRouter = express.Router()

mailRouter.post('/api/send-otp', Sendmail)


export default mailRouter