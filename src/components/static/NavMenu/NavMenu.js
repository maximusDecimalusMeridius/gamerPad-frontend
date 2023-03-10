import React from "react";
import DashboardPage from "../../../pages/DashboardPage/DashboardPage";
import GamesPage from "../../../pages/GamesPage/GamesPage";
import SocialPage from "../../../pages/SocialPage/SocialPage";
import NotesPage from "../../../pages/NotesPage/NotesPage";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

import "./NavMenu.css"

function NavMenu() {

    return (
        <Router>

            <div className="navMenu">
                <ul>
                    <li className="navMenuItem" id="navMenuItem-1">
                   <Link to="/">Home</Link>
                    </li>
                    <li className="navMenuItem" id="navMenuItem-2">
                   <Link to="/games">Games</Link>
                    </li>
                    <li className="navMenuItem" id="navMenuItem-3">
                   <Link to="/friends">Friends</Link>
                    </li>
                    <li className="navMenuItem" id="navMenuItem-4">
                   <Link to="/notes">Notes</Link>
                    </li>
                    <li className="navMenuItem" id="navMenuItem-5">
                   <Link to="/communities">Communities</Link>
                    </li>
                    {/* <li className="navMenuItem" id="navMenuItem-6">
                   <Link to="/Logout">Logout</Link>
                    </li> */}
                </ul>
            </div>
            <div className="navRoutesContainer">
        <Routes>
            <Route path="/" element={<DashboardPage/>}/>
            <Route path="/games" element={<GamesPage/>}/>
            <Route path="/Friends" element={<SocialPage/>}/>
            <Route path="/Notes" element={<NotesPage/>}/>
            <Route path="/communities" element={<SocialPage/>}/>
            {/* <Route path="/Logout" element={<Logout/>}/> */}
        </Routes>
            </div>

        </Router>
    )
}
export default NavMenu;