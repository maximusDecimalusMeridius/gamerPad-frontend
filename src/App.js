
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from "./components/static/Header/Header";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import GamesPage from "./pages/GamesPage/GamesPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import NotesPage from "./pages/NotesPage/NotesPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SocialPage from "./pages/SocialPage/SocialPage";
import HomePage from "./pages/HomePage/HomePage"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
// TODO: set state for rendering dashboard and landing page with boolean value 
function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeModal, setActiveModal] = useState("Add Account");
  const [writtenNotes, setWrittenNotes] = useState([]);
  const [sharedNotes, setSharedNotes] = useState([]);
  const [originalWrittenNotesList, setOriginalWrittenNotesList] = useState([])
  const [showMenu, setShowMenu] = useState(false);

  const [token, setToken] = useState("");

  const validateToken = async (token) => {

    try {
        const result = await fetch("http://localhost:3001/api/users/isValidToken", {
            method: "GET",
            headers: {
                authorization: token ? `Bearer ${token}` : ''
            }
        })
        return result.json()
    } catch (error) {
        console.error(error);
    }
}

  useEffect(()=>{
    const savedToken = localStorage.getItem("token");
    console.log(savedToken)
    if(savedToken){
      validateToken(savedToken).then(tokenData=>{
        if(tokenData.isValid){
          setToken(savedToken);
          setIsLoggedIn(true)
        } else {
          localStorage.removeItem("token")
        }
      })
    }
  },[])
  
  return (
    <Router>
      <div className="appContainer">
       
        <header>
          <Header 
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            showModal={showModal}
            setShowModal={setShowModal}
            activeModal={activeModal}
            setActiveModal={setActiveModal}
            writtenNotes={writtenNotes}
            setWrittenNotes={setWrittenNotes}
            originalWrittenNotesList={originalWrittenNotesList}
            setOriginalWrittenNotesList={setOriginalWrittenNotesList}
            sharedNotes={sharedNotes}
            setSharedNotes={setSharedNotes}
            showMenu={showMenu}
            setShowMenu={setShowModal}
            />
        </header>
    
        <main>
          {!isLoggedIn && <LandingPage 
                          setIsLoggedIn={setIsLoggedIn} />}
          {isLoggedIn && <HomePage 
                          showModal={showModal}
                          setShowModal={setShowModal}
                          activeModal={activeModal}
                          setActiveModal={setActiveModal}
                          writtenNotes={writtenNotes}
                          setWrittenNotes={setWrittenNotes}
                          originalWrittenNotesList={originalWrittenNotesList}
                          setOriginalWrittenNotesList={setOriginalWrittenNotesList}
                          sharedNotes={sharedNotes}
                          setSharedNotes={setSharedNotes}/>}
        </main>        
      </div>
    </Router>
  );
}

export default App;
