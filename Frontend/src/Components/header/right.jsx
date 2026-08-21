import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faUser } from '@fortawesome/free-regular-svg-icons';
import { useContext } from 'react';
import { profileAvailable, ThemeData, UserData } from '../../Utils/NotesFunctionalities';
import { useNavigate } from 'react-router-dom';

function Right() {
    const { theme, themeToggle } = useContext(ThemeData)
    const {user} = useContext(UserData)

    const navigate = useNavigate()
    return (
        <div className='flex items-center gap-7'>
            <FontAwesomeIcon className={`cursor-pointer transition-transform duration-200 ease-in-out active:scale-95 ${theme === 'light' ? '!hidden' : ''}`} icon={faSun} onClick={() => {
                themeToggle()
            }} />
            <FontAwesomeIcon className={`cursor-pointer transition-transform duration-200 ease-in-out active:scale-95 ${theme === 'dark' ? '!hidden' : ''}`} icon={faMoon} onClick={() => {
                themeToggle()
            }} />
            <h2 onClick={() => {
                profileAvailable(user, navigate)
            }}
                className="flex items-center gap-1 border border-solid border-[#222222] rounded-3xl px-4 py-2 font-bold cursor-pointer transition-transform duration-200 ease-in-out active:scale-95"><FontAwesomeIcon icon={faUser} className='text-purple-700 transition-colors'
                />{user?.name || "Profile"}</h2>
        </div>
    )
}

export default Right;