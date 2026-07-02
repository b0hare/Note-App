import { createContext } from "react";
import toast from "react-hot-toast";

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


export const submitHandler = (title, details, setNotes, setTitle, setDetails, notes) => {
    if (title == "" && details == "") {
        toast.error("Oops! This process requires some input.");
    }
    else {
        const notesCopy = [...notes];
        notesCopy.push({ title, details })
        setNotes(notesCopy)

        setTitle('')
        setDetails('')
    }

}

export const ThemeData = createContext()