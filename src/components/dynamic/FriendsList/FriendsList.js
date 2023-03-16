import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../static/SearchBar/SearchBar";
import "./FriendsList.css";

function FriendsList({
  friendsList,
  setFriendsList,
  originalFriendsList,
  setOriginalFriendsList,
  setProfilePicture,
  showModal,
  setShowModal,
  activeModal,
  setActiveModal
}) {
  const [openIndex, setOpenIndex] = useState(-1);

  const navigate = useNavigate();

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async (event) => {
    try {
      const token = localStorage.getItem("token");

      const result = await fetch(
        "https://gamerpad-backend.herokuapp.com/api/friends/currentUserFriends",
        {
          method: "GET",
          headers: {
            authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const data = await result.json();

      setFriendsList(data.Friends);
      setOriginalFriendsList(data.Friends);
      if (data.profilePicture === localStorage.getItem("profileURL")) {
        return;
      } else {
        setProfilePicture(data.profilePicture);
        localStorage.profilePicture = data.profilePicture;
      }

    } catch (error) {
      console.error(error);
    }
  };
  const handleFriendClick = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const handleDelete = async (event) => {
    try {
      const token = localStorage.getItem("token");

      const result = await fetch(`https://gamerpad-backend.herokuapp.com/api/friends/${event.target.dataset.id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`
        }
      }
      );

      const data = await result.json();

      if (result.ok) {
        fetchFriends();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addFriend = () => {
    setShowModal(true);
    setActiveModal("Add Friend");
  }

  const goToProfile = () => {

    navigate("/profile", { replace: true })
  }

  const openCard = (friend, index) => {
    return (
      <>
        <div className="openCardHeader">
          <h2 className="friendUsername" onClick={() => handleFriendClick(index)}>{friend.username}</h2>
          <img className="friendPic" src={friend.profilePicture} alt="user profile identity" />
          <span className="deleteButton" onTouchStart={handleDelete} onClick={handleDelete} data-id={friend.id}>
            Delete
          </span>
        </div>
        <div className="friendAccounts">
          <span className="tableHeader">Accounts:</span>
          <div className="accountTable">
            {friend.Accounts.length === 0 ? <p style={{padding: "5px", fontSize: "12px"}}>User hasn't added accounts!</p> : <>
            {friend.Accounts.map((account) => (
              <ul className="account" key={crypto.randomUUID()}>
                  <li>{account.account}</li>
                  <li>{account.username}</li>
              </ul>
              ))}
            </>}
          </div>
        </div>
        <div className="friendGames">
          <span className="tableHeader">Games:</span>
          <div className="gameTable">
          {friend.UserGames.length === 0 ? <p style={{padding: "5px", fontSize: "12px"}}>User hasnt added games!</p> : <>
          {friend.UserGames.map((game) => (
              <ul className="game" key={crypto.randomUUID()}>
                  <li>{game.Game.title}</li>
              </ul>
              ))}
            </>}
          </div>
        </div>
      </>
    )
  }

  const friends = friendsList.map((friend, index) => {
    const isOpen = index === openIndex;

    return (
      <div className="friendCard" key={index}>
        <div className="friendCardHeader">
          {isOpen ? openCard(friend, index) : ( <h2 className="friendUsernameClosed cursor" onClick={() => handleFriendClick(index)}>
            {friend.username}
          </h2>
          )}
        </div>
      </div>
    );
  });

  return (
    <div className="friendContainer">{friends.length === 0 ? <>
      <p className="welcomeP">Let's <span className="hotLink cursor" onClick={addFriend}>add a friend</span> to get started!</p>
      <br />
      OR<br />
      <p className="welcomeP">View your friend code on your <span className="hotLink cursor" onClick={goToProfile}>PROFILE</span> page!</p>
    </> : friends}
    </div>
  );
}

export default FriendsList;
