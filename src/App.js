
import React, { useState } from 'react';
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
  const [originalWrittenNotesList, setOriginalWrittenNotesList] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [originalFriendsList, setOriginalFriendsList] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [accountsList, setAccountsList] = useState([]);
  const [originalAccountsList, setOriginalAccountsList] = useState([]);
  const [warningMessage, setWarningMessage] = useState("warningMessage");
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
            accountsList={accountsList}
            setAccountsList={setAccountsList}
            originalAccountsList={originalAccountsList}
            setOriginalAccountsList={setOriginalAccountsList}
            friendsList={friendsList}
            setFriendsList={setFriendsList}
            originalFriendsList={originalFriendsList}
            setOriginalFriendsList={setOriginalFriendsList}
            showMenu={showMenu}
            setShowMenu={setShowModal}
            warningMessage={warningMessage}
            setWarningMessage={setWarningMessage}
            />
        </header>
    
        <main>
          {!isLoggedIn && <LandingPage 
                          setIsLoggedIn={setIsLoggedIn}
                          warningMessage={warningMessage}
                          setWarningMessage={setWarningMessage}
                          />}
          {isLoggedIn && <HomePage 
                          showModal={showModal}
                          setShowModal={setShowModal}
                          activeModal={activeModal}
                          setActiveModal={setActiveModal}
                          writtenNotes={writtenNotes}
                          setWrittenNotes={setWrittenNotes}
                          originalWrittenNotesList={originalWrittenNotesList}
                          setOriginalWrittenNotesList={setOriginalWrittenNotesList}
                          accountsList={accountsList}
                          setAccountsList={setAccountsList}
                          originalAccountsList={originalAccountsList}
                          setOriginalAccountsList={setOriginalAccountsList}
                          sharedNotes={sharedNotes}
                          setSharedNotes={setSharedNotes}
                          friendsList={friendsList}
                          setFriendsList={setFriendsList}
                          originalFriendsList={originalFriendsList}
                          setOriginalFriendsList={setOriginalFriendsList}   
                          />}
        </main>        
      </div>
    </Router>
  );
}

export default App;
