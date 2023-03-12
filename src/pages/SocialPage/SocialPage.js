
import React from 'react';
import './SocialPage.css';
import Friends from "../../components/static/Friends/Friends";
import Communities from "../../components/static/Communities/Communities";
import FriendsList from '../../components/dynamic/FriendsList/FriendsList';

// TODO: create a searchbar for other users
// TODO: create an add button that will add whichever user is currently selected
// TODO: create an accordian menu with multiple divs
// TODO: when a div is clicked on make that area expand to show full user info
// TODO: when the area expands it the user's profile image beneath their username, and their top games
// TODO: beneath the user image will be a lsit of their top usernames/gamertags they have linked
// TODO: when a username/gamertag is searched the acordian changes to reflect the search


function SocialPage() {
  return (
    <FriendsList/>
  );
}

export default SocialPage;