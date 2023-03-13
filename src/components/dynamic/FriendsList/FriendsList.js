import React, { useEffect, useState } from "react";
import SearchBar from "../../static/SearchBar/SearchBar";
import "./FriendsList.css";

function FriendsList({friendsList, setFriendsList, originalFriendsList, setOriginalFriendsList}) {
  const [openIndex, setOpenIndex] = useState(-1);
  
  useEffect(() => {
    fetchFriends();
    document.title = `gamerPad - Friends`;
  }, []);

  //  TODO: fetch friendsList
  //  TODO: map over friends list
  //  TODO: display friends list
  //  TODO: display usernames, on click open all other data
  const fetchFriends = async (event) => {
    console.log(friendsList);
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
        </div>
        
      </div>
    );
  });

  return (
    <div className="friendsContainer">
      <SearchBar originalList={originalFriendsList} setList={setFriendsList}/>
      <div className="friendPage">{friends}</div>
    </div>
  );
}

export default FriendsList;
