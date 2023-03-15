import React, { useState } from "react";
import "./SocialPage.css";
import FriendsList from "../../components/dynamic/FriendsList/FriendsList";
import CommunitiesList from "../../components/dynamic/CommunitiesList/CommunitiesList";
import SearchBar from "../../components/static/SearchBar/SearchBar";

// TODO: when a div is clicked on make that area expand to show full user info
// TODO: when the area expands it the user's profile image beneath their username, and their top games
// TODO: beneath the user image will be a lsit of their top usernames/gamertags they have linked
// TODO: when a username/gamertag is searched the acordian changes to reflect the search

function SocialPage({
  friendsList,
  setFriendsList,
  originalFriendsList,
  setOriginalFriendsList,
  originalCommsList,
  setOriginalCommsList,
  setProfilePicture
}) {
  const [currentPage, setCurrentPage] = useState("Friends");
  const [otherPage, setOtherPage] = useState("Communities");


  const renderPage = () => {
    if (currentPage === "Friends") {
      return (
        <FriendsList
          friendsList={friendsList}
          setFriendsList={setFriendsList}
          originalFriendsList={originalFriendsList}
          setOriginalFriendsList={setOriginalFriendsList}
          setProfilePicture={setProfilePicture}   
        />
      );
    } else {
      return <CommunitiesList 
      originalCommsList={originalCommsList}
      setOriginalCommsList={setOriginalCommsList}/>;
    }
  };
  
  const handleChange = (event) => {
    if (event.target.value === "friends") {
      setCurrentPage("Friends");
      setOtherPage("Communities");
    } else if (event.target.value === "communities") {
      setCurrentPage("Communities");
      setOtherPage("Friends");
    }
  };
  const renderSearchBar = () => {
    if (currentPage === "Communities") {
        return (
            <SearchBar originalList={originalCommsList} setList={setOriginalCommsList} />
        )
    } else if (currentPage === "Friends") {
        return (
            <SearchBar originalList={originalFriendsList} setList={setOriginalFriendsList} />
        )
    }
}

  return (
    <div className="socialPageContainer">
        {renderSearchBar()}
      <div className="socialPageCards">
        <div className="buttonContainer" onChange={handleChange}>
          <div>
            <input type="radio" id="swapButton" name="swap" value="communities"/>
            <label htmlFor="swapButton">Communities</label>
          </div>
          <div>
            <input type="radio" id="swapButton" name="swap" value="friends" defaultChecked/>
            <label htmlFor="swapButton">Friends</label>
          </div>
        </div>
        {renderPage()}
      </div>
    </div>
  );
}
export default SocialPage;
