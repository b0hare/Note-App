import express from 'express'
import { loginControll, registerCont, resetPasswordCont, sendUserInfo } from '../Controller/authController.js'

const authRouter = express.Router()

authRouter.get('/me', sendUserInfo)
authRouter.post('/login', loginControll)
authRouter.post('/user-registration', registerCont)
authRouter.post('/reset-password', resetPasswordCont)

export default authRouter
