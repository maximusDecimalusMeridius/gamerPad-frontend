import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import AccountsList from "../../components/dynamic/AccountsList/AccountsList";
import SearchBar from '../../components/static/SearchBar/SearchBar';
// TODO: create a searchbar for other users
// TODO: create an add button that will add whichever user is currently selected
// TODO: create an accordian menu with multiple divs
// TODO: when a div is clicked on make that area expand to show full user info
// TODO: when the area expands it the user's profile image beneath their username, and their top games
// TODO: beneath the user image will be a lsit of their top usernames/gamertags they have linked
// TODO: when a username/gamertag is searched the acordian changes to reflect the search
function ProfilePage({accountsList, setAccountsList, originalAccountsList, setOriginalAccountsList}) {

  const [username, setUserName] = useState([]);
  const [userInfo, setuserInfo] = useState({})

  const getCurrentUserInfo = async () => {
    
    try {
      const token = localStorage.getItem("token");

      const result = await fetch("https://gamerpad-backend.herokuapp.com/api/users/currentUserInfo", {
          method: "GET",
          headers: {
              authorization: token ? `Bearer ${token}` : ''
          }
      })
      
      const data = await result.json();
      setuserInfo(data)
  } catch (error) {
      console.error(error);
  }
  }

  useEffect(() => {
    document.title = `gamerPad - Profile`;
    getCurrentUserInfo()
  },[])

  return (
    <div className="profilePageContainer">
      <div className="profileHeader">
        <h3 className='profileTitle'>Welcome to your profile {username}</h3>
      </div>
      <div className="profileInfo">
          <img id="mainProfilePicture" src={userInfo.profilePicture} alt='profile'></img>
          <div className='profileInnerDiv'>
          <div>
          <p className="userRowItem">Username: {username}</p>
          <p className="emailRowItem">email: {userInfo.email}</p>
          </div>
          <div>
          <p className="friendCodeRowItem">Friend Code: {userInfo.friendCode}</p>
          {userInfo.lookingForFriends ? <p className="LFFRowItem">Looking for friends: ✔️</p> : <p className="LFFRowItem">Looking for friends: ❌</p>}
          </div>
          <div>
          <p className="friendCountRowItem">{userInfo.Friends.length} friends 👤</p>
          <p className="gameCountRowItem">{userInfo.UserGames.length} games 🎮</p>
          </div>
          </div>
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
             <button> Update profile</button>
          </div>
        </div>
      </div>
      <h2 className='yourAccounts'>Your Accounts</h2>
      <SearchBar originalList={originalAccountsList} setList={setAccountsList}/>
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





