import express from 'express'
import {loginControll, registerCont, sendUserInfo} from '../Controller/authController.js'

const authRouter = express.Router()

authRouter.get('/me', sendUserInfo)
authRouter.post('/login', loginControll)
authRouter.post('/user-registration', registerCont)

export default authRouter