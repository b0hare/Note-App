import express from 'express'
import loginControll from '../Controller/loginController.js'
import checkLogin from '../Middleware/Auth/loginAuth.js'


const authRouter = express.Router()

authRouter.post('/login', checkLogin, loginControll) 

export default authRouter