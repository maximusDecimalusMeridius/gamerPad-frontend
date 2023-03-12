
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
  
  return (
    <Router>
      <div className="appContainer">
       
        <header>
          <Header 
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            />
        </header>
    
        <main>
          {!isLoggedIn && <LandingPage 
                          setIsLoggedIn={setIsLoggedIn} />}
          {isLoggedIn && <HomePage />}
        </main>
   
                    <Routes>
                        <Route exact path="/dashboard" element={<DashboardPage/>} />
                        <Route exact path="/profilepage" element={<ProfilePage/>} />
                    </Routes>
        
      </div>
    </Router>
  );
}

export default App;
