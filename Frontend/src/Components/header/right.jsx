import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faSun, faMoon, faUser } from '@fortawesome/free-regular-svg-icons';
import { useContext } from 'react';
import { ThemeData } from '../../Utils/NotesFunctionalities';

function Right() {
    const { theme, themeToggle } = useContext(ThemeData)
    return (
        <div className='flex items-center gap-7'>
            <FontAwesomeIcon className={`cursor-pointer transition-transform duration-200 ease-in-out active:scale-95 ${theme === 'light' ? '!hidden' : ''}`} icon={faSun} onClick={() => {
                themeToggle()
                console.log("Theme changed to ", theme);
            }} />
            <FontAwesomeIcon className={`cursor-pointer transition-transform duration-200 ease-in-out active:scale-95 ${theme === 'dark' ? '!hidden' : ''}`} icon={faMoon} onClick={() => {
                themeToggle()
                console.log("Theme changed to ", theme);
            }} />
            <h2 className="border border-solid border-[#222222] rounded-3xl px-4 py-2 font-bold cursor-pointer transition-transform duration-200 ease-in-out active:scale-95"><FontAwesomeIcon icon={faUser} className='text-purple-700 transition-colors'/> Profile</h2>
        </div>
    )
}

export default Right;