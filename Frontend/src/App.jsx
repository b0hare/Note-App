import './App.css'
import { useState } from "react";
import Header from './Components/header/header'
import NoteSection from './Components/noteSection/NoteSection';
import { ThemeData } from './Utils/NotesFunctionalities';

function App() {
  const [theme, setTheme] = useState('dark')
      const themeToggle = () => {
          setTheme(theme === 'light' ? 'dark' : 'light')
      }
  return (
    <ThemeData.Provider value={{theme, themeToggle}}>
      <div className="mainPage bg-[#000] w-screen h-full overflow-hidden">

            <Header />
            <NoteSection />

        </div>
    </ThemeData.Provider>
  )
}

export default App