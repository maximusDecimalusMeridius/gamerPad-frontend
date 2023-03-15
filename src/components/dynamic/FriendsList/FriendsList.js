import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    fetchFriends();
    document.title = `gamerPad - Friends`;
  }, []);

  // temporary styles for temporary elements
  const style = {
    span: {
      height: "20px",
      width: "20px",
      cursor: "pointer",
      fontWeight: "bold",
      color: "red",
    },
  };

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
      console.log(data);

      setFriendsList(data.Friends);
      setOriginalFriendsList(data.Friends);
      if(data.profilePicture === localStorage.getItem("profileURL")){
        console.log("pic already exists")
        return;
      } else {
        console.log("profile pic saved!")
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

  const friends = friendsList.map((friend, index) => {
    const isOpen = index === openIndex;

    return (
      <div className="friendCard" key={index}>
        <div className="friendCardHeader">
          <h2
            className="friendUsername"
            onClick={() => handleFriendClick(index)}
          >
            {friend.username}
          </h2>
          {isOpen && (
            <img
              className="friendPic"
              src={friend.profilePicture}
              alt="user profile identity"
            />
          )}
          {isOpen && friend.Accounts.length > 0 && (
            <ul className="friendAccounts">
              <li>Accounts:</li>
              {friend.Accounts.map((Account) => (
                <li key={crypto.randomUUID()}>{Account.account} </li>
                ))}
                {friend.Accounts.map((Account) => (
                  <li key={crypto.randomUUID()}>{Account.username}</li>
                  ))}
                  

            </ul>
          )}
          {isOpen && friend.UserGames.length > 0 && (
            <ul className="friendGames">
              <li>Top Games:</li>
              {friend.UserGames.map((userGame) => (
                <li key={crypto.randomUUID()}>{userGame.Game.title}</li>
              ))}
            </ul>
          )}
          {isOpen && (
          <span className="deleteButton" onTouchStart={handleDelete} onClick={handleDelete} style={style.span} data-id={friend.id}>
            X
          </span> )}
        </div>
      </div>
    );
  });

  return (
    <div className="friendContainer">{friends.length === 0 ? <p>Let's <span className="cursor" onClick={addFriend} style={{fontWeight: "bold"}}>add a friend</span> to get started!</p> : friends}</div>
  );
}

export default FriendsList;
