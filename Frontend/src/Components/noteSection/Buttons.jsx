function Btns(props) {
    return (
        <div className="btns flex gap-5">
            <button type="submit" className="bg-[#008000] p-3 rounded-md w-1/2 active:scale-95 hover:bg-[#005A00]">Save</button>
            <button type="button" className="bg-[#FF0000] p-3 rounded-md w-1/2 active:scale-95 hover:bg-[#B30000]" onClick={props.clearNote}>Clear</button>
        </div>
    )
}

export default Btns;