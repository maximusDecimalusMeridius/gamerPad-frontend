import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./Homepage.css"
import DashboardPage from "../DashboardPage/DashboardPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import GamesPage from "../GamesPage/GamesPage";
import GamesList from "../../components/dynamic/GamesList/GamesList";
import NotesList from "../../components/dynamic/NotesList/NotesList";
import NotesPage from "../NotesPage/NotesPage";
import SocialPage from "../SocialPage/SocialPage";
import FriendsList from "../../components/dynamic/FriendsList/FriendsList";


function HomePage({ showModal, setShowModal, activeModal, setActiveModal }) {


    return (
        <div className="homeContainer" id="homePage">
            <Routes>
                <Route path="profile" element={<ProfilePage />} />
                <Route path="dashboard" element={<DashboardPage
                    showModal={showModal}
                    setShowModal={setShowModal}
                    activeModal={activeModal}
                    setActiveModal={setActiveModal} />}>
                        <Route path="notes" element={<NotesList />} />
                        <Route path="games" element={<GamesList />} />
                </Route>
                <Route path="games" element={<GamesPage />} />
                <Route path="notes" element={<NotesList />} />
                <Route path="social" element={<FriendsList />} />
                <Route path="communities" element={<FriendsList />} />
            </Routes>      

        </div>
    )
} export default HomePage;