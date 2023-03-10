
import React, {useState} from 'react';
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
  <div>
    {/* TODO: conditionally render dashboard if user is logged (tokens) */}
    {/* TODO: conditionally render landing page if user is not logged in (tokens) */}

            {/* <Link to="/dashboard">Dashboard</Link>  */}
    <header>
      <Header />
    </header>
    <button id='loginBtn' onClick={handleClick}>login</button>
    <main>
      {!loggedIn && <LandingPage />}
      {loggedIn && <DashboardPage/>}    
    </main>  
    {/* <Route path="/dashboard" element={<DashboardPage/>} /> */}
  </div>
  );
}

export default App;
