import React, { useEffect, useState } from "react";
import SearchBar from "../../static/SearchBar/SearchBar";
import "./FriendsList.css";

function FriendsList({
  friendsList,
  setFriendsList,
  originalFriendsList,
  setOriginalFriendsList,
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
      
    });

      const data = await result.json();

      if (result.ok) {
        fetchFriends();
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          <span onClick={handleDelete} style={style.span} data-id={friend.id}>
            X
          </span>
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
                <li key={index}>{Account.account} </li>
                ))}
                {friend.Accounts.map((Account) => (
                  <li key={index}>{Account.username}</li>
                  ))}
                  

            </ul>
          )}
          {isOpen && friend.UserGames.length > 0 && (
            <ul className="friendGames">
              <li>Top Games:</li>
              {friend.UserGames.map((userGame) => (
                <li key={userGame.id}>{userGame.Game.title}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  });

  return (
    <div className="friendContainer">{friends}</div>
  );
}

export default FriendsList;
