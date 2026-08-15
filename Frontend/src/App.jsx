import './App.css'
import {useEffect, useState } from "react";
import Header from './Components/header/header'
import NoteSection from './Components/noteSection/NoteSection';
import { getUser, ThemeData, UserData } from './Utils/NotesFunctionalities';
import { Routes, Route } from 'react-router-dom'
import { RegisterPage } from './Components/Auth/Register/RegisterPage.jsx';
import { LoginPage } from './Components/Auth/Login/LoginPage.jsx';
import PageError from './PageError.jsx'
import ForgetPass from './Components/Auth/Login/forgetPass.jsx';

function App() {
  const [theme, setTheme] = useState('dark')
  const themeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const [user, setUser] = useState(null)

  useEffect(() => {
    getUser(setUser);
  }, []);

  return (
    <UserData.Provider value={{ user, setUser }}>
      <ThemeData.Provider value={{ theme, themeToggle }}>

        <div className={`mainPage ${theme === 'light' ? "bg-[#F9F9FF]" : "bg-[#000]"} w-screen h-full overflow-hidden`}>
          <Header />
          <Routes>
            <Route path="/" element={<NoteSection />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path='/forgetPass' element={<ForgetPass/>}/>
            <Route path="*" element={<PageError />} />
          </Routes>
        </div>

      </ThemeData.Provider>

    </UserData.Provider>
  )
}

export default App