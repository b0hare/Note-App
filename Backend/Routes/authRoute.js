import express from 'express'
import { loginControll, registerCont, resetPasswordCont, sendUserInfo, logoutControll, deleteAccountControll } from '../Controller/authController.js'
import authUser from '../Middleware/Auth/userAuth.js';
import { rateLimit } from 'express-rate-limit';

const authRouter = express.Router()

authRouter.get('/me', sendUserInfo)
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: 'Too many login attempts. Try again later.'
})

authRouter.post('/login', loginLimiter, loginControll)
authRouter.post('/user-registration', registerCont)
authRouter.post('/reset-password', resetPasswordCont)
authRouter.post('/logout', authUser, logoutControll)
authRouter.delete('/account', authUser, deleteAccountControll)

export default authRouter
