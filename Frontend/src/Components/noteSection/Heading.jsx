function Heading(props){
    return(
        <input onChange={(e) => {
            props.setTitle(e.target.value)
        }} className='border-none outline-none w-full p-1 border-b-2 border-solid border-b-[#333333] text-[20px] font-bold' type="text" name="heading" id="heading" placeholder='Heading...' value={props.title}/>
    )
}

export default Heading