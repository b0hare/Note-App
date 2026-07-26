import express from 'express'
import profileController from '../Controller/profileController.js';
import checkLogin from '../Middleware/Auth/userAuth.js';

const profileRouter = express.Router()

profileRouter.get("/profile", checkLogin , profileController);

export default profileRouter