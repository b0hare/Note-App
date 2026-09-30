import { Link } from "react-router-dom"

function Left() {
    return (
        <Link to={"/"}><h2 className='font-extrabold text-[24px] text-white'>My <img className='w-7 rounded-md inline' src="https://w7.pngwing.com/pngs/38/113/png-transparent-post-it-note-ipod-touch-notes-sticky-note-text-logo-ipad.png" alt="" /></h2></Link>
    )
}

export default Left