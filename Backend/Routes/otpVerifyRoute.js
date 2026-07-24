import express from 'express';
import otpVerification from '../Controller/otpVerificationCont.js';

const otpVerifyRouter = express.Router()
otpVerifyRouter.post("/verify-otp", otpVerification)

export default otpVerifyRouter