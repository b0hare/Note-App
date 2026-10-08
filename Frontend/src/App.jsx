import './App.css'
import {useEffect, useState } from "react";
import Header from './Components/header/header'
import NoteSection from './Components/noteSection/NoteSection';
import { getUser, ThemeData, UserData } from './Utils/NotesFunctionalities';
import { Navigate, Routes, Route } from 'react-router-dom'
import toast from 'react-hot-toast';
import { RegisterPage } from './Components/Auth/Register/RegisterPage.jsx';
import { LoginPage } from './Components/Auth/Login/LoginPage.jsx';
import PageError from './PageError.jsx'
import ForgetPass from './Components/Auth/Login/ForgetPass.jsx';
import UserProfile from './Components/Auth/Profile.jsx';

function RequireLogin() {
  useEffect(() => {
    toast.error('Please login first')
  }, [])

  return <Navigate to="/login" replace />
}

function App() {
  const [theme, setTheme] = useState('dark')
  const themeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const [user, setUser] = useState(undefined)
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    getUser(setUser).finally(() => setAuthChecked(true));
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
            <Route path="/profile" element={authChecked ? (user ? <UserProfile key={user.userId}/> : <RequireLogin />) : null}/>
            <Route path="*" element={<PageError />} />
          </Routes>
        </div>

      </ThemeData.Provider>

    </UserData.Provider>
  )
}

export default App
