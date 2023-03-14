import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import AccountsList from "../../components/dynamic/AccountsList/AccountsList";
// TODO: create a searchbar for other users
// TODO: create an add button that will add whichever user is currently selected
// TODO: create an accordian menu with multiple divs
// TODO: when a div is clicked on make that area expand to show full user info
// TODO: when the area expands it the user's profile image beneath their username, and their top games
// TODO: beneath the user image will be a lsit of their top usernames/gamertags they have linked
// TODO: when a username/gamertag is searched the acordian changes to reflect the search
function ProfilePage({accountsList, setAccountsList, originalAccountsList, setOriginalAccountsList}) {

  const [username, setUserName] = useState([]);

  useEffect(() => {
    document.title = `gamerPad - Profile`
  },[])

  return (
    <div className="profilePageContainer">
      <div className="profileHeader">
        <h3>{username}</h3>
      </div>
      <div className="profileInfo">

          <p className="userRowItem">Username: {username}</p>
          <p className="friendCodeRowItem">Friend Code: "My code"</p>

        <div className="passwordRow">
          <div className="passwordRowItem">
            {/* <form className="updatePasswordForm">
              <div className="passwordFormInputs">
                <input type="email" placeholder="old password"></input>
                <input type="email" placeholder="new password"></input>
                <input type="email" placeholder="re-enter new pw"></input>
              </div>
              <button> Update </button>
            </form> */}
             <button> Update password</button>
             <button> Update info</button>
          </div>
        </div>
      </div>
      <AccountsList 
        setUserName={setUserName}
        accountsList={accountsList}
        setAccountsList={setAccountsList}
        originalAccountsList={originalAccountsList}
        setOriginalAccountsList={setOriginalAccountsList}
        />

    </div>
  );
}

export default ProfilePage;





