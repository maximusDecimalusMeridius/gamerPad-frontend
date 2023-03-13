import React from "react";
import "./DashboardPage.css";
import GamesList from "../../components/dynamic/GamesList/GamesList";
import NotesList from "../../components/dynamic/NotesList/NotesList";
import SocialPage from "../SocialPage/SocialPage";
import { Routes, Route, Link } from "react-router-dom";
import FriendsList from "../../components/dynamic/FriendsList/FriendsList";
import ProfilePage from "../ProfilePage/ProfilePage";
// psuedocode:
// dashboard will need to only be rendered when logged in
// will need boxes that will conditionally render games,
//  social, and notes pages
// beneath link boxes there will need to be carosel of top communites/recommended communities
// under carosel there will need to be a card which contains the friends list of said used
// only the first online, or most recently online users to populate on friend's list
// when friend's list is clicked it will take user to full friend's list, clicking on individual user on list will take you to their page
// TODO: Import dependencies (required files and needed packages)
// TODO: Create Div for carosel, with A tags on each image within carosel, have background linked to communities page
// TODO: conditionally rendered friend list, games list, note list
// TODO: Create card element for friend's list each friend on list is linked to their own pages)
function DashboardPage({writtenNotes, setWrittenNotes, originalWrittenNotesList, setOriginalWrittenNotesList,
                        sharedNotes, setSharedNotes, friendsList, setFriendsList, originalFriendsList, setOriginalFriendsList}) {
  return (
    <div className="dashboardContainer">
      <ul className="pageTabs">
        <li className="pageTab" id="pageTab-1">
          <Link to="/dashboard/">Social</Link>
        </li>
        <li className="pageTab" id="pageTab-2">
          <Link to="/dashboard/notes">Notes</Link>
        </li>
        <li className="pageTab" id="pageTab-3">
          <Link to="/dashboard/games">Games</Link>
        </li>
      </ul>

      <Routes>
        <Route path="/">
          <Route path="" element={<SocialPage 
                                  friendsList={friendsList}
                                  setFriendsList={setFriendsList}
                                  originalFriendsList={originalFriendsList}
                                  setOriginalFriendsList={setOriginalFriendsList} />}
                                  />
          <Route path="social">
            <Route path="" element={<SocialPage 
                                    friendsList={friendsList}
                                    setFriendsList={setFriendsList}
                                    originalFriendsList={originalFriendsList}
                                    setOriginalFriendsList={setOriginalFriendsList}
                                    />} />
            <Route index={true} element={<SocialPage 
                                          friendsList={friendsList}
                                          setFriendsList={setFriendsList}
                                          originalFriendsList={originalFriendsList}
                                          setOriginalFriendsList={setOriginalFriendsList}
                                            />} />
          </Route>
          <Route path="notes">
            <Route path="" element={<NotesList 
                                      writtenNotes={writtenNotes}
                                      setWrittenNotes={setWrittenNotes}
                                      originalWrittenNotesList={originalWrittenNotesList}
                                      setOriginalWrittenNotesList={setOriginalWrittenNotesList}
                                      sharedNotes={sharedNotes}
                                      setSharedNotes={setSharedNotes}/>} />
            <Route index={true} element={<NotesList 
                                            writtenNotes={writtenNotes}
                                            setWrittenNotes={setWrittenNotes}
                                            originalWrittenNotesList={originalWrittenNotesList}
                                            setOriginalWrittenNotesList={setOriginalWrittenNotesList}
                                            sharedNotes={sharedNotes}
                                            setSharedNotes={setSharedNotes}/>} />
          </Route>
          <Route path="games">
            <Route path="" element={<GamesList />} />
            <Route index={true} element={<GamesList />} />
          </Route>
          </Route>
      </Routes>
    </div>
  );
}
export default DashboardPage;
