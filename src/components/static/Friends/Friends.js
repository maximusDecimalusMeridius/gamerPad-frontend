import React, {useState} from "react";
import "./Friends.css";
import SearchBar from "../../static/SearchBar/SearchBar"
import FriendsList from "../../dynamic/FriendsList/FriendsList";

function Friends() {

    return (
        <div className="friendsContainer">
            {SearchBar}
            {FriendsList}
        </div>
    );
}

export default Friends;