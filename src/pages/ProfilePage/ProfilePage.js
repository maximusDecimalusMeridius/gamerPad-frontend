import React from 'react';
import './ProfilePage.css';
import SearchBar from "../../components/static/SearchBar/SearchBar"
// TODO: create a searchbar for other users
// TODO: create an add button that will add whichever user is currently selected
// TODO: create an accordian menu with multiple divs
// TODO: when a div is clicked on make that area expand to show full user info
// TODO: when the area expands it the user's profile image beneath their username, and their top games
// TODO: beneath the user image will be a lsit of their top usernames/gamertags they have linked
// TODO: when a username/gamertag is searched the acordian changes to reflect the search
function ProfilePage() {

  return (
  <div>
    <p>profile</p>
    <SearchBar/>
  </div>
  );
}

export default ProfilePage;