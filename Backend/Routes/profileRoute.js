import express from 'express'
import {editName, profileController, editEmail} from '../Controller/profileController.js';
import authUser from '../Middleware/Auth/userAuth.js';

const profileRouter = express.Router()

profileRouter.get("/profile", authUser , profileController);
profileRouter.patch("/profile/update-name", authUser, editName)
profileRouter.patch("/profile/update-email", authUser, editEmail)

export default profileRouter