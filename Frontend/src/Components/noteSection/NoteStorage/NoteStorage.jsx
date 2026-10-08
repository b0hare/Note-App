import { useContext, useEffect } from "react";
import SavedNotes from "./SavedNotes"
import { allNotes, ThemeData, UserData } from "../../../Utils/NotesFunctionalities";
import { LuNotepadText } from "react-icons/lu";

function NoteStorage({ notes, setNotes, setTitle, setDetails, editNote, deleteNote, setEditingNoteId }) {
    const { theme } = useContext(ThemeData)
    const { user } = useContext(UserData)
    // #ae81f7

    useEffect(() => {
        const loadNotes = async () => {
            if (!user) return;

            try {
                const userNotes = await allNotes();
                setNotes(userNotes);
            } catch {
                setNotes([]);
            }
        };

        loadNotes();
    }, [user, setNotes])

    return (
        <div className="noteStorage w-full h-full p-5 sm:w-1/2">
            <div className={`w-full p-3 text-[24px] text-[#9E71F5] border border-solid ${theme === 'light' ? 'bg-[#c2b5ff] text-[#7040d8] brightness-[1.02] border-[#ae81f7]' : 'bg-[#140E29] brightness-125 border-[#291746]'} rounded-md font-bold flex items-center transition-all duration-200`}>
                <p className={`p-2 rounded-md ${theme === 'light' ? 'bg-[#cdc2ff]' : 'bg-[#1F153C]'}`}><LuNotepadText /></p>
                <h2 className="mx-auto">Saved Notes : {notes.length}</h2>
            </div>


            <div className="notesContainer w-full h-100 flex gap-3 mt-5 justify-center flex-wrap overflow-y-auto hide-scrollbar">
                {
                    notes.map(function (elem, idx) {
                        return (
                            <SavedNotes notes={notes} key={elem.id} note={elem} id={elem.id} arIdx={idx} setNotes={setNotes} setTitle={setTitle} setDetails={setDetails} deleteNote={deleteNote} editNote={editNote} setEditingNoteId={setEditingNoteId} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default NoteStorage
