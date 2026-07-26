import { createContext } from "react";
import toast from "react-hot-toast";
import axios from 'axios'

export const deleteNote = (idxToDelete, setNotes) => {

    setNotes(prevNotes => {
        const updated = prevNotes.filter(
            (_, idx) => idx !== idxToDelete
        );

        return updated;
    });
};


export const editNote = (idxToEdit, setNotes, setTitle, setDetails, notes) => {
    setTitle(notes[idxToEdit].title)
    setDetails(notes[idxToEdit].details)
    deleteNote(idxToEdit, setNotes);
}


export const submitHandler = async (title, details, setNotes, setTitle, setDetails, notes) => {
    if (title == "" && details == "") {
        toast.error("Oops! This process requires some input.");
    }
    else {
        try {
            const create = await axios.post("http://localhost:3000/notes/create", { title, details }, { withCredentials: true })
            toast.success(create.data.message)
        } catch (error) {
            console.log(error);
            toast.error("Note Couldn't save")
        }

        const formattedDate = new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).format(new Date())
            .replace(',', '')
            .replace('at', '•');

        const newNote = {
            title: title,
            details: details,
            dateTime: formattedDate
        }
        setNotes([...notes, newNote])

        setTitle('')
        setDetails('')
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
export async function allNotes() {
    const notes = await axios.get(`http://localhost:3000/notes/${user.userId}`)
    return notes
}


export const ThemeData = createContext()

export const EmailData = createContext()

export const UserData = createContext()



