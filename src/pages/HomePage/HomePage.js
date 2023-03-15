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


function HomePage({ showModal, setShowModal, activeModal, setActiveModal,
                    writtenNotes, setWrittenNotes, originalWrittenNotesList, setOriginalWrittenNotesList,
                    sharedNotes, setSharedNotes, friendsList, setFriendsList, originalFriendsList, setOriginalFriendsList, accountsList, setAccountsList,
                    originalAccountsList, setOriginalAccountsList, originalCommsList, setOriginalCommsList}) {


    return (
        <div className="homeContainer" id="homePage">
            <Routes>
                <Route path="/" element={<DashboardPage
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
                                                    friendsList={friendsList}
                                                    setFriendsList={setFriendsList}
                                                    originalFriendsList={originalFriendsList}
                                                    setOriginalFriendsList={setOriginalFriendsList}
                                                    originalCommsList={originalCommsList}
                                                    setOriginalCommsList={setOriginalCommsList}
                                                     />}/>
                <Route path="profile" element={<ProfilePage 
                                                accountsList={accountsList}
                                                setAccountsList={setAccountsList}
                                                originalAccountsList={originalAccountsList}
                                                setOriginalAccountsList={setOriginalAccountsList}/>}
                                                 />
                <Route path="dashboard" element={<DashboardPage
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
                                                    friendsList={friendsList}
                                                    setFriendsList={setFriendsList}
                                                    originalFriendsList={originalFriendsList}
                                                    setOriginalFriendsList={setOriginalFriendsList}
                                                    originalCommsList={originalCommsList}
                                                    setOriginalCommsList={setOriginalCommsList}
                                                    />}>
                        <Route path="notes" element={<NotesList 
                                                        writtenNotes={writtenNotes}
                                                        setWrittenNotes={setWrittenNotes}
                                                        originalWrittenNotesList={originalWrittenNotesList}
                                                        setOriginalWrittenNotesList={setOriginalWrittenNotesList}
                                                        sharedNotes={sharedNotes}
                                                        setSharedNotes={setSharedNotes}/>} />
                        <Route path="games" element={<GamesList />} />
                </Route>
                <Route path="games" element={<GamesPage />} />
                <Route path="notes" element={<NotesList 
                                                writtenNotes={writtenNotes}
                                                setWrittenNotes={setWrittenNotes}
                                                originalWrittenNotesList={originalWrittenNotesList}
                                                setOriginalWrittenNotesList={setOriginalWrittenNotesList}
                                                sharedNotes={sharedNotes}
                                                setSharedNotes={setSharedNotes}/>} />
                <Route path="social" element={<FriendsList />} />
                <Route path="communities" element={<FriendsList />} />
            </Routes>      

        </div>
    )
} export default HomePage;