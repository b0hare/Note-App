import express from 'express'
import authUser from '../Middleware/Auth/userAuth.js';
import {createNote, deleteNote, getAllNotes, getNote} from '../Controller/noteController.js';

const noteRouter = express.Router();

noteRouter.get("/:userId", authUser, getAllNotes)
noteRouter.post("/create", authUser, createNote);
noteRouter.get("/get/:id", authUser, getNote);
noteRouter.delete("/delete/:id", authUser, deleteNote);

export default noteRouter;