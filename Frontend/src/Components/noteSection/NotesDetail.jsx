function Detail(props) {
    return (
        <textarea onChange={(e)=>{
            props.setDetails(e.target.value)
        }} className='w-full h-72 border-2 border-solid border-black rounded-md resize-none outline-none bg-black text-white p-1' name="details" id="details" placeholder='Details here...' value={props.details}></textarea>
    )
}

export default Detail