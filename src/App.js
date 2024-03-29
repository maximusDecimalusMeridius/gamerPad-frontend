
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from "./components/static/Header/Header";
import LandingPage from "./pages/LandingPage/LandingPage";
import HomePage from "./pages/HomePage/HomePage"
import { BrowserRouter as Router } from "react-router-dom";
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
  const [gamesList, setGamesList] = useState([]);
  const [originalGameList, setOriginalGameList] = useState([]);
  const [showMenu] = useState(false);
  const [accountsList, setAccountsList] = useState([]);
  const [originalAccountsList, setOriginalAccountsList] = useState([]);
  const [warningMessage, setWarningMessage] = useState("");
  const [originalCommsList, setOriginalCommsList] = useState([]);
  const [commsList, setCommsList] = useState([])
  const [profilePicture, setProfilePicture] = useState("")
  const [token, setToken] = useState("");

  const validateToken = async (token) => {
    setActiveModal("Checking Login Info...");
    setShowModal(true);
    try {
        const result = await fetch("https://gamerpad-backend.herokuapp.com/api/users/isValidToken", {
            method: "GET",
            headers: {
                authorization: token ? `Bearer ${token}` : ''
            }
        })

        if(result.ok){
          setActiveModal("Logged In!");
          setTimeout(() => {
            setShowModal(false);
          }, "1000")
        } else {
          setActiveModal("Error Logging In - Please Try Again");
          setTimeout(() => {
            setShowModal(false);
          }, "1000")
        }

        return result.json()
    } catch (error) {
        console.error(error);
    }
    
  }

  useEffect(()=>{
    const savedToken = localStorage.getItem("token");
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
    setBackgroundColor(localStorage.getItem("backgroundColor"))
  },[])

  const [backgroundColor, setBackgroundColor] = useState("#bebebe")
  
  return (
    <Router>
      <div className="appContainer" style={{backgroundColor:`${backgroundColor}`}}>
       
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
            gamesList={gamesList}
            setGamesList={setGamesList}
            originalGameList={originalGameList}
            setOriginalGameList={setOriginalGameList}
            commsList={commsList}
            setCommsList={setCommsList}
            originalCommsList={setOriginalCommsList}
            showMenu={showMenu}
            setShowMenu={setShowModal}
            warningMessage={warningMessage}
            setWarningMessage={setWarningMessage}
            profilePicture={profilePicture}
            setprofilePicture={setProfilePicture}
            />
        </header>
    
        <main>
          {!isLoggedIn && <LandingPage 
                          setIsLoggedIn={setIsLoggedIn}
                          warningMessage={warningMessage}
                          setWarningMessage={setWarningMessage}
                          />}
          {isLoggedIn && <HomePage 
                          setBackgroundColor={setBackgroundColor}
                          backgroundColor={backgroundColor}
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
                          gamesList={gamesList}
                          setGamesList={setGamesList}
                          originalGameList={originalGameList}
                          setOriginalGameList={setOriginalGameList}
                          sharedNotes={sharedNotes}
                          setSharedNotes={setSharedNotes}
                          friendsList={friendsList}
                          setFriendsList={setFriendsList}
                          originalFriendsList={originalFriendsList}
                          setOriginalFriendsList={setOriginalFriendsList}
                          profilePicture={profilePicture}
                          setProfilePicture={setProfilePicture}   
                          originalCommsList={originalCommsList}
                          setOriginalCommsList={setOriginalCommsList}
                          commsList={commsList}
                          setCommsList={setCommsList}
                          warningMessage={warningMessage}
                          setWarningMessage={setWarningMessage}
                          />}
        </main>        
      </div>
    </Router>
  );
}

export default App;
