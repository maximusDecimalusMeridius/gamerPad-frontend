import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import AccountsList from "../../components/dynamic/AccountsList/AccountsList";
import SearchBar from '../../components/static/SearchBar/SearchBar';
// import bcrypt from 'bcrypt'
// TODO: create a searchbar for other users
// TODO: create an add button that will add whichever user is currently selected
// TODO: create an accordian menu with multiple divs
// TODO: when a div is clicked on make that area expand to show full user info
// TODO: when the area expands it the user's profile image beneath their username, and their top games
// TODO: beneath the user image will be a lsit of their top usernames/gamertags they have linked
// TODO: when a username/gamertag is searched the acordian changes to reflect the search
function ProfilePage({ accountsList, setAccountsList, originalAccountsList, setOriginalAccountsList, profilePicture, setProfilePicture, warningMessage, setWarningMessage}) {

  const [username, setUserName] = useState([]);
  const [userInfo, setuserInfo] = useState({})

  const [friendsNum, setfriendsNum] = useState(0)
  const [gamesNum, setGamesNum] = useState(0)

  const [mode, setMode] = useState("profile")

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newPassword2nd, setNewPassword2nd] = useState("")

  const [profilePicUrl, setProfilePicUrl] = useState("")
  const [usernameChange, setUsernameChange] = useState("")
  const [emailChange, setEmailChange] = useState("")
  const [friendCodeChange, setFriendCodeChange] = useState("")
  const [LFFCheckbox, setLFFCheckbox] = useState(false)



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
      setfriendsNum(data.Friends.length)
      setGamesNum(data.UserGames.length)
      setProfilePicUrl(data.profilePicture)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    document.title = `gamerPad - Profile`;
    getCurrentUserInfo()
  }, [])

  const handleModeChange = (e) => {
    e.preventDefault()

    if (e.target.id === "updatePassword") {
      setMode("updatePassword")
    } else if (e.target.id === "updateProfile") {
      setUsernameChange(userInfo.username)
      setEmailChange(userInfo.email)
      setFriendCodeChange(userInfo.friendCode)
      setLFFCheckbox(userInfo.lookingForFriends)
      setMode("updateProfile")
    } else if (e.target.id === "cancel") {
      setMode("profile")
    }
  }

  


  const handleChange = (e) => {
    if (e.target.id === "oldPassword") {
      setOldPassword(e.target.value)
    } else if (e.target.id === "newPassword") {
      setNewPassword(e.target.value)
    } else if (e.target.id === "newPassword2nd") {
      setNewPassword2nd(e.target.value)
    } else if (e.target.id === "profilePicUrl") {
      setProfilePicUrl(e.target.value)
    } else if (e.target.id === "usernameChange") {
      setUsernameChange(e.target.value)
    } else if (e.target.id === "emailChange") {
      setEmailChange(e.target.value)
    } else if (e.target.id === "friendCodeChange") {
      setFriendCodeChange(e.target.value)
    } else if (e.target.id === "LFFCheckbox") {
      setLFFCheckbox(e.target.checked)
    }
  }

  const editProfile = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem("token");
      const profilObject = {
        username: usernameChange,
        email: emailChange,
        lookingForFriends: LFFCheckbox,
        friendCode: friendCodeChange,
        profilePicture: profilePicUrl
      }
      const result = await fetch(`https://gamerpad-backend.herokuapp.com/api/users/${userInfo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(profilObject)
      })

      if (result.ok) {
        getCurrentUserInfo()
        setMode("profile");
        setProfilePicture(profilePicUrl);
        localStorage.setItem("profilePicture", profilePicUrl);
      } else if(result.status === 403) {
        console.log(`error`);
        setWarningMessage("You must be logged in to update an acount");
        setTimeout(() => {
            setWarningMessage("");
        }, "2000");
      } else if(result.status === 404) {
        console.log(`error`);
        setWarningMessage("No record matching that user");
        setTimeout(() => {
            setWarningMessage("");
        }, "2000");
      } else if(result.status === 500) {
        console.log(`error`);
        setWarningMessage("User name is already taken");
        setTimeout(() => {
            setWarningMessage("");
        }, "2000");
      }

    } catch (error) {
      console.error(error);
    }
  }

  const renderProfile = () => {
    if (mode === "updatePassword") {
      return (
        <form className="updatePasswordForm">
          <img id="mainProfilePicture" src={profilePicUrl} alt='profile'></img>
          <div className="passwordFormInputs">
            <input type="password" placeholder="old password" id="oldPassword" value={oldPassword} onChange={handleChange}></input>
            <input type="password" placeholder="new password" id="newPassword" value={newPassword} onChange={handleChange}></input>
            <input type="password" placeholder="re-enter new pw" id="newPassword2nd" value={newPassword2nd} onChange={handleChange}></input>
          </div>
          <div className="updateAndCancelBtns">
            <button id='update' onClick={handleModeChange}>Update</button>
            <button id='cancel' onClick={handleModeChange}>Cancel</button>
          </div>
        </form>
      )
    } else if (mode === "updateProfile") {
      return (
        <form className="updatePasswordForm">
          <img id="mainProfilePicture" src={profilePicUrl} alt='profile'></img>
          <div className="passwordFormInputs">
            <input type="text" placeholder="Profile picture Url" id='profilePicUrl' value={profilePicUrl} onChange={handleChange}></input>
            <input type="text" placeholder="username" id='usernameChange' value={usernameChange} onChange={handleChange}></input>
            <input type="email" placeholder="email" id="emailChange" value={emailChange} onChange={handleChange}></input>
            <input type="text" placeholder="FriendCode" id='friendCodeChange' value={friendCodeChange} onChange={handleChange}></input>
            <div>
              <label htmlFor='LFF'>Looking For Friends: </label>
              <input type="checkbox" name='LFF' id="LFFCheckbox" checked={LFFCheckbox} onChange={handleChange}></input>
            </div>
            <p className="warningMessage" id="warningMessage">{warningMessage}</p>
          </div>
          <div className="updateAndCancelBtns">
            <button id='update' onClick={editProfile}>Update</button>
            <button id='cancel' onClick={handleModeChange}>Cancel</button>
          </div>
        </form>
      )
    } else if (mode === "profile") {
      return (
        <div className='profileInfo'>
          <img id="mainProfilePicture" src={profilePicture || localStorage.getItem("profilePicture")} alt='profile'></img>
          <div className='profileInnerDiv'>
            <div>
              <p className="userRowItem">Username: {username}</p>
              <p className="emailRowItem">email: {userInfo.email}</p>
            </div>
            <div>
              <p className="friendCodeRowItem">Friend Code: {userInfo.friendCode}</p>
              {userInfo.lookingForFriends ? <p className="LFFRowItem">Looking for friends: ✔️</p> : <p className="LFFRowItem">Looking for friends: ❌</p>}
            </div>
          </div>
          <div className="updateAndCancelBtns">
            {/* <button id='updatePassword' onClick={handleModeChange}> Update password</button> */}
            <button id='updateProfile' onClick={handleModeChange}> Update profile</button>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="profilePageContainer">
      <div className="profileHeader">
        <div>{gamesNum} Games</div>
        <h3>{username}</h3>
        <div>{friendsNum} Friends</div>
      </div>
      <div className="profileContent">
        {renderProfile()}
        <h2 className='yourAccounts'>Your Accounts</h2>
        <SearchBar originalList={originalAccountsList} setList={setAccountsList} />
        <AccountsList
          setUserName={setUserName}
          accountsList={accountsList}
          setAccountsList={setAccountsList}
          originalAccountsList={originalAccountsList}
          setOriginalAccountsList={setOriginalAccountsList}
        />
      </div>

    </div>
  );
}

export default ProfilePage;





