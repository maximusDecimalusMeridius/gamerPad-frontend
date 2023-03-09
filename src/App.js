
import React from 'react';
import './App.css';
import Header from "./components/static/Header/Header";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import GamesPage from "./pages/GamesPage/GamesPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import NotesPage from "./pages/NotesPage/NotesPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SocialPage from "./pages/SocialPage/SocialPage";

function App() {
  return (
  <div>
    
            {/* <Link to="/dashboard">Dashboard</Link>  */}
    <header>
      <Header />
    </header>
    <main>
      <LandingPage />    
    </main>  
    {/* <Route path="/dashboard" element={<DashboardPage/>} /> */}
  </div>
  );
}

export default App;
