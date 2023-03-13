import React, { useEffect, useState } from "react";
import SearchBar from "../../static/SearchBar/SearchBar";
import "./FriendsList.css";

function FriendsList({ friendsList, setFriendsList, originalFriendsList, setOriginalFriendsList }) {
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
      color: "red"
    }
  }

  const fetchFriends = async (event) => {

    try {
      const token = localStorage.getItem("token");

      const result = await fetch(
        "http://localhost:3001/api/friends/currentUserFriends",
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

      const result = await fetch(`http://localhost:3001/api/friends/${event.target.dataset.id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      const data = await result.json();

      if(result.ok){
        fetchFriends();
      }

    } catch (error) {
      console.error(error);
    }
  }

  

  const friends = friendsList.map((friend, index) => {
    const isOpen = index === openIndex;

    return (
      <div className="friendCard" key={index}>
        <div className="friendCardHeader">
          <h2
            className="friendUsername"
            onClick={() => handleFriendClick(index)}
          >{friend.username}
          </h2>
          <span onClick={handleDelete} style={style.span} data-id={friend.id}>X</span>
          {isOpen && (
            <img
              className="friendPic"
              src={friend.profilePicture}
              alt="user profile identity"
            />
          )}
        </div>

      </div>
    );
  });

  return (
    <div className="friendsContainer">
      <SearchBar originalList={originalFriendsList} setList={setFriendsList} />
      <div className="friendPage">{friends}</div>
    </div>
  );
}

export default FriendsList;
