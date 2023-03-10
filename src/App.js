
import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Header from "./components/static/Header/Header";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import GamesPage from "./pages/GamesPage/GamesPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import NotesPage from "./pages/NotesPage/NotesPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SocialPage from "./pages/SocialPage/SocialPage";
// TODO: set state for rendering dashboard and landing page with boolean value 
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
 const handleClick = () => {
  if (loggedIn) {
    setLoggedIn(false)
    console.log(document.querySelector('#loginBtn'))

    document.querySelector('#loginBtn').textContent = "login"
  } else {
    setLoggedIn(true)
    document.querySelector('#loginBtn').textContent = "logout"}
 }
  return (
    <Router>
  <div className="appContainer">
            {/* <Link to="/dashboard">Dashboard</Link>  */}
    <header>
      <Header
      Routes={Routes}
      Route={Route}
      Link={Link} />
    </header>
    <button id='loginBtn' onClick={handleClick}>login</button>
    <main>
      {!loggedIn && <LandingPage />}
      {loggedIn && <DashboardPage
                    Routes={Routes}
                    Route={Route}
                    Link={Link} />}    
    </main>  
    {/* <Route path="/dashboard" element={<DashboardPage/>} /> */}
  </div>
    </Router>
  );
}

export default App;
