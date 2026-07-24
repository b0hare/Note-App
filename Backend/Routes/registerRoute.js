import express from 'express'
import registerCont from '../Controller/registerCont.js'
const registerRouter = express.Router()

registerRouter.post('/user-registration', registerCont)

export default registerRouter