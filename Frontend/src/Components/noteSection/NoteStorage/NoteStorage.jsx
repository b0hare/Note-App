import SavedNotes from "./SavedNotes"

function NoteStorage(props) {
    // const revNotes = [...props.notes].reverse();
    const totalNotes = props.notes.length;
    return (
        <div className="noteStorage w-full h-full p-5 sm:w-1/2">
            <h2 className='text-[24px] bg-[#5b31b4] rounded-md font-bold text-center w-full p-[1px]'>Saved Notes : {totalNotes}</h2>

            <div className="notesContainer w-full h-100 flex gap-2 justify-center flex-wrap overflow-y-auto hide-scrollbar">
                {
                    props.notes.map(function (elem, idx) {
                        return (
                            <SavedNotes notes={props.notes} key={idx} note={elem} idx={idx} setNotes={props.setNotes} setTitle={props.setTitle} setDetails={props.setDetails} deleteNote={props.deleteNote} editNote={props.editNote}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default NoteStorage

