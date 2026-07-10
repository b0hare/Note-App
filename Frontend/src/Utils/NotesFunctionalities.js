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

export const ThemeData = createContext()


