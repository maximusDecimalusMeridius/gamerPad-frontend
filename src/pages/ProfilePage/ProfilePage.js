import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import SearchBar from "../../components/static/SearchBar/SearchBar";
import AccountsList from "../../components/dynamic/AccountsList/AccountsList";
// TODO: create a searchbar for other users
// TODO: create an add button that will add whichever user is currently selected
// TODO: create an accordian menu with multiple divs
// TODO: when a div is clicked on make that area expand to show full user info
// TODO: when the area expands it the user's profile image beneath their username, and their top games
// TODO: beneath the user image will be a lsit of their top usernames/gamertags they have linked
// TODO: when a username/gamertag is searched the acordian changes to reflect the search
function ProfilePage() {

  const [username, setUserName] = useState([]);
  const [friendCount, setFriendCount] = useState(0)

  return (
    <div className="profilePageContainer">
      <div className="profileHeader">
        <div>Games</div>
        {/* put in games counter */}
        <h3>{username}</h3>
        <div>Friends: {`${friendCount}`}</div>
        {/* put in Friend counter */}
        {/* pass down setter to account */}
      </div>
      <div className="profileInfo">
        <div className="userRow">
          <p className="userRowItem">Username: </p>
          <p className="userRowItem">{username}</p>
          <div className="userRowItem editButton">✏️</div>
        </div>
        <div className="friendCodeRow">
          <p className="friendCodeRowItem">Friend Code: </p>
          <p className="friendCodeRowItem" id="friend-code">"My code"</p>
          <div className="friendCodeRowItem editButton">✏️</div>
        </div>
        <div className="passwordRow">
          <div className="passwordRowItem"><p>Update Password:</p></div>
          <div className="passwordRowItem">
            <form className="updatePasswordForm">
              <div className="passwordFormInputs">
                <input type="email" placeholder="old password"></input>
                <input type="email" placeholder="new password"></input>
                <input type="email" placeholder="re-enter new pw"></input>
              </div>
              <button> Update PW</button>
            </form>
          </div>
        </div>
        <div className="lfmRow"></div>
      </div>
      <AccountsList 
        setUserName={setUserName}/>

    </div>
  );
}

export default ProfilePage;





