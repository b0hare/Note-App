import { createContext } from "react";
import toast from "react-hot-toast";
import api from '../api'

export const deleteNote = async (id, setNotes, setUser) => {
    let deleted = []
    try {
        deleted = await api.delete(`/notes/delete/${id}`)
        setNotes(prevNotes => {
            return prevNotes.filter(
                note => note.id !== id
            );
        });
        toast.success(deleted.data)

    } catch (error) {
        if (error.response?.status === 401) {
            setUser(null)
            toast.error("Please login")
            setNotes([])
        } else {
            toast.error("Note coudn't save")
        }

    };
}

export const editNote = (idToEdit, arIdx, setTitle, setDetails, notes, setEditingNoteId) => {
    setTitle(notes[arIdx].title)
    setDetails(notes[arIdx].content)
    setEditingNoteId(idToEdit)
}


export const submitHandler = async (id, title, details, setTitle, setDetails, setNotes, setUser) => {
    if (title == "" && details == "") {
        toast.error("Oops! This process requires some input.");
        return;
    }
    if (id > -1) {
        console.log("inside edit note id > -1");
        
        try {
            const updated = await api.patch(`/notes/edit/${id}`, {title, details})
            toast.success("Saved")
            setNotes(prev => prev.map((note) => note.id === id ? updated.data : note))
            setTitle("")
            setDetails("")
            return true
        } catch (error) {
            if (error.response?.status === 401) {
                setUser(null)
                setTitle(title)
                setDetails(details)
                setNotes([])
                toast.error("Please login")
            } else {
                toast.error("Note coudn't save")
            }
        }
    }
    else if(id === -1) {
        try {
            const create = await api.post("/notes/create", { title, details })
            toast.success("Saved")
            setNotes(prev => [create.data, ...prev])
            setTitle("")
            setDetails("")
            return true
        } catch (error) {
            if (error.response?.status === 401) {
                setUser(null)
                setTitle(title)
                setDetails(details)
                setNotes([])
                toast.error("Please login")
            } else {
                toast.error("Note coudn't save")
            }
        }
    }

}

// to get user info as page reload
export const getUser = async (setUser) => {
    try {
        const res = await api.get("/me");
        setUser(res.data.user);
    } catch {
        setUser(null);
    }
};

// to get all the notes 
export async function allNotes() {
    try {
        const notes = await api.get('/notes')
        return notes.data
    } catch {
        toast.error("Failed to get Notes")
        return []
    }
}


//to navigate through profiles

export async function profileAvailable(user, navigate) {
    if (user !== null) {
        navigate('/profile')
    }
    else {
        navigate("/login")
    }
}


export const ThemeData = createContext()

export const UserData = createContext()


