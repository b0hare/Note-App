import { createContext } from "react";
import toast from "react-hot-toast";
import axios from 'axios'

export const deleteNote = async (id, setNotes, setUser) => {
    let deleted = []
    try {
        deleted = await axios.delete(`http://localhost:3000/notes/delete/${id}`, { withCredentials: true })
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

export const editNote = (idToEdit, arIdx, setNotes, setTitle, setDetails, notes, userId, setUser) => {
    setTitle(notes[arIdx].title)
    setDetails(notes[arIdx].content)
    submitHandler(idToEdit, notes[arIdx].title, notes[arIdx].content, setTitle, setDetails, setNotes, userId, setUser)
}


export const submitHandler = async (id, title, details, setTitle, setDetails, setNotes, userId, setUser) => {
    if (title == "" && details == "") {
        toast.error("Oops! This process requires some input.");
        return;
    }
    if (id > -1) {
        console.log("inside edit note id > -1");
        
        try {
            const create = await axios.patch(`http://localhost:3000/notes/edit/${id}`, {title, details, userId}, { withCredentials: true })
            toast.success("Saved")
            setNotes(prev => [create.data, ...prev])
            setTitle("")
            setDetails("")
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
            const create = await axios.post("http://localhost:3000/notes/create", { title, details }, { withCredentials: true })
            toast.success("Saved")
            setNotes(prev => [create.data, ...prev])
            setTitle("")
            setDetails("")
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
    try {
        const notes = await axios.get(`http://localhost:3000/notes/${userId}`, { withCredentials: true })
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


