import React, {useState, useEffect} from "react";
import { Routes, Route, Link} from "react-router-dom";
import "./Homepage.css"
import DashboardPage from "../DashboardPage/DashboardPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import GamesPage from "../GamesPage/GamesPage";
import GamesList from "../../components/dynamic/GamesList/GamesList";
import NotesList from "../../components/dynamic/NotesList/NotesList";
import NotesPage from "../NotesPage/NotesPage";
import SocialPage from "../SocialPage/SocialPage";
import FriendsList from "../../components/dynamic/FriendsList/FriendsList";

function HomePage({ backgroundColor, setBackgroundColor, showModal, setShowModal, activeModal, setActiveModal, warningMessage, setWarningMessage,
    writtenNotes, setWrittenNotes, originalWrittenNotesList, setOriginalWrittenNotesList,
    sharedNotes, setSharedNotes, friendsList, setFriendsList, originalFriendsList, setOriginalFriendsList, accountsList, setAccountsList,
    originalAccountsList, setOriginalAccountsList, originalCommsList, setOriginalCommsList, commsList, setCommsList, profilePicture, setProfilePicture, userInfo }) {

    const handleModal = (event) => {
        toggleMenu(event);
        if (event.target.id === "account") {
            setShowModal(true);
            setActiveModal("Add Account");
        } else if (event.target.id === "friend") {
            setShowModal(true);
            setActiveModal("Add Friend");
        } else if (event.target.id === "game") {
            setShowModal(true);
            setActiveModal("Add Game");
        } else if (event.target.id === "note") {
            setShowModal(true);
            setActiveModal("Add Note");
        }
    }

    const toggleMenu = (event) => {
        if (event.target.id === "addAllButton") {
            event.target.nextSibling.classList.toggle("grow");
            document.querySelector("#addAllButton").classList.toggle("openButton");
        } else {
            event.target.parentNode.classList.toggle("grow");
            document.querySelector("#addAllButton").classList.toggle("openButton");
        }
    }

    
    const [primaryColor, setPrimaryColor] = useState('#bd4b3a')
    const [colorModalVisibility, setColorModalVisibility] = useState('none')

    const handleChange = (event) => {
        if(event.target.id === "backgroundColor") {
            setBackgroundColor(event.target.value)
        }
    }

    const [gamesList, setGamesList] = useState([]);
    const [originalGameList, setOriginalGameList] = useState([]);

    // useEffect hook to fetch all notes on page load
    useEffect(() => {
        fetchGames();
        document.title = `gamerPad - Games`;
    }, []);

    // Fetch data
    const fetchGames = async (event) => {

        try {
            const token = localStorage.getItem("token");

            const result = await fetch("https://gamerpad-backend.herokuapp.com/api/games/usergame", {
                method: "GET",
                headers: {
                    authorization: token ? `Bearer ${token}` : ''
                }
            })

            const data = await result.json();

            setGamesList(data.UserGames)
            setOriginalGameList(data.UserGames)

        } catch (error) {
            console.error(error);
        }
    }

    const handleCloseColors = (e) => {
        e.preventDefault()
        setColorModalVisibility('none')
        localStorage.backgroundColor = backgroundColor
    }

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
                    setProfilePicture={setProfilePicture}
                    commsList={commsList}
                    setCommsList={setCommsList}
                    originalCommsList={originalCommsList}
                    setOriginalCommsList={setOriginalCommsList}
                    gamesList={gamesList}
                    setGamesList={setGamesList}
                    originalGameList={originalGameList}
                    setOriginalGameList={setOriginalGameList}
                />} />
                <Route path="profile" element={<ProfilePage
                    {...userInfo}
                    accountsList={accountsList}
                    setAccountsList={setAccountsList}
                    originalAccountsList={originalAccountsList}
                    setOriginalAccountsList={setOriginalAccountsList}
                    profilePicture={profilePicture}
                    setProfilePicture={setProfilePicture}
                    warningMessage={warningMessage}
                    setWarningMessage={setWarningMessage} />}
                />
                <Route path="dashboard/*" element={<DashboardPage
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
                    setProfilePicture={setProfilePicture}
                    commsList={commsList}
                    setCommsList={setCommsList}
                    originalCommsList={originalCommsList}
                    setOriginalCommsList={setOriginalCommsList}
                    gamesList={gamesList}
                    setGamesList={setGamesList}
                    originalGameList={originalGameList}
                    setOriginalGameList={setOriginalGameList}
                />}>
                    <Route path="notes" element={<NotesList
                        writtenNotes={writtenNotes}
                        setWrittenNotes={setWrittenNotes}
                        originalWrittenNotesList={originalWrittenNotesList}
                        setOriginalWrittenNotesList={setOriginalWrittenNotesList}
                        sharedNotes={sharedNotes}
                        setSharedNotes={setSharedNotes} />} />
                    <Route path="games" element={<GamesList 
                                                    gamesList={gamesList}
                                                    setGamesList={setGamesList}
                                                    originalGameList={originalGameList}
                                                    setOriginalGameList={setOriginalGameList}/>} />
                </Route>
                <Route path="games" element={<GamesPage
                                                gamesList={gamesList}
                                                setGamesList={setGamesList}
                                                originalGameList={originalGameList}
                                                setOriginalGameList={setOriginalGameList}/>} />
                <Route path="notes" element={<NotesList
                    writtenNotes={writtenNotes}
                    setWrittenNotes={setWrittenNotes}
                    originalWrittenNotesList={originalWrittenNotesList}
                    setOriginalWrittenNotesList={setOriginalWrittenNotesList}
                    sharedNotes={sharedNotes}
                    setSharedNotes={setSharedNotes} />} />
                <Route path="social" element={<FriendsList
                    setProfilePicture={setProfilePicture} />} />
                <Route path="communities" element={<FriendsList
                    setProfilePicture={setProfilePicture} />} />
            </Routes>
            <div>
                <div className="addAllButtonBox">
                    <div id="addAllButton" className="addAllButton cursor" onClick={toggleMenu}>+</div>
                    <ul className="addAllMenu">
                        <li className="cursor sublink" id="account" value="Add Account" onClick={handleModal}>Add Account</li>
                        <li className="cursor sublink" id="friend" value="Add Friend" onClick={handleModal}>Add Friend</li>
                        <li className="cursor sublink" id="game" value="Add Game" onClick={handleModal}>Add Game</li>
                        <li className="cursor sublink" id="note" value="Add Note" onClick={handleModal}>Add Note</li>
                    </ul>
                </div>
            </div>
            <div className="colorSelection">
                <p id="addColor" className="addAllButton cursor" onClick={() => {setColorModalVisibility('flex')}} >🌈</p>
                <div  className="colorModal" style={{ display: `${colorModalVisibility}`}}>
                <ul className="shareDiv">
                        <p className="shareNoteCloseBtn" onClick={handleCloseColors}>X</p>
                        <h2 className="cursor sublink">Add Background Color</h2>
                        <input className="cursor" id="backgroundColor" type="color" onChange={handleChange}></input>
                        {/* <li className="cursor sublink">Add Primary Color</li>
                        <li><input className="cursor" id="primaryColor" type="color" onChange={handleChange}></input></li> */}
                </ul>
                </div>
            </div>
        </div>
    )
} export default HomePage;