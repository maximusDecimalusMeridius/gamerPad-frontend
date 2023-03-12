
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
  
  const [isLoggedIn, setIsLoggedIn] = useState(true);
 
  // const handleClick = () => {
  //   if (isLoggedIn) {
  //     setIsLoggedIn(false)
  //     console.log(document.querySelector('#loginBtn'))

  //     document.querySelector('#loginBtn').textContent = "login"
  //   } else {
  //     setIsLoggedIn(true)
  //     document.querySelector('#loginBtn').textContent = "logout"
  //   }
  // }
  return (
    <Router>
      <div className="appContainer">
        {/* <Link to="/dashboard">Dashboard</Link>  */}
        <header>
          <Header 
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            />
        </header>
        {/* <button id='loginBtn' onClick={handleClick}>login</button> */}
        <main>
          {!isLoggedIn && <LandingPage 
                          setIsLoggedIn={setIsLoggedIn} />}
          {isLoggedIn && <HomePage />}
        </main>
        {/* <Route path="/dashboard" element={<DashboardPage/>} /> */}
                    <Routes>
                        <Route exact path="/DashboardPage" component={DashboardPage} />
                        <Route exact path="/ProfilePage" component={ProfilePage} />
                    </Routes>
        
      </div>
    </Router>
  );
}

export default App;
