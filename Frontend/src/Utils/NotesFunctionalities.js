import { createContext } from "react";
import toast from "react-hot-toast";
import axios from 'axios'

export const deleteNote = async (id, setNotes) => {

    let deleted = []
    try {
        deleted = await axios.delete(`http://localhost:3000/notes/delete/${id}`, { withCredentials: true })
        toast.success(deleted.data)
    } catch (error) {
        toast.error("Couldn't Delete")
    }

    if (deleted.status === 200) {
        setNotes(prevNotes => {
            return prevNotes.filter(
                note => note.id !== id
            );
        });
    }
    
};


export const editNote = (idToEdit, arIdx, setNotes, setTitle, setDetails, notes) => {
    setTitle(notes[arIdx].title)
    setDetails(notes[arIdx].content)
    deleteNote(idToEdit, setNotes);
}


export const submitHandler = async (title, details, setNotes, setTitle, setDetails, notes) => {
    if (title == "" && details == "") {
        toast.error("Oops! This process requires some input.");
    }
    else {
        try {
            const create = await axios.post("http://localhost:3000/notes/create", { title, details }, { withCredentials: true })
            toast.success("Saved")
            setNotes(prev => [...prev, create.data])
        } catch (error) {
            toast.error("Note Couldn't save")
        }

    }

}

// to get user info as page reload
export const getUser = async (setUser) => {
    try {
        const res = await axios.get("http://localhost:3000/me", {
            withCredentials: true
        });
        setUser(res.data.user);
    } catch {
        setUser(null);
    }
};

// to get all the notes 
export async function allNotes(userId) {
    const notes = await axios.get(`http://localhost:3000/notes/${userId}`, { withCredentials: true })
    return notes.data
}


export const ThemeData = createContext()

export const EmailData = createContext()

export const UserData = createContext()



