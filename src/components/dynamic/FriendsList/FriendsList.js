import React, { useEffect, useState } from "react";
import SearchBar from "../../static/SearchBar/SearchBar";
import "./FriendsList.css";

function FriendsList() {
  const [openIndex, setOpenIndex] = useState(-1);
  const [friendsList, setFriendsList] = useState([]);
  const [originalFriendsList, setOriginalFriendsList] = useState([]);
  useEffect(() => {
    fetchFriends();
    document.title = `gamerPad - Friends`;
  }, []);

  // TODO: fetch friendsList
//   TODO: map over friends list
 //  TODO: display friends list
//  TODO: display usernames, on click open all other data
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
      console.log(data.Friends);
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
        {/* <div className="faveGamesContainer">
            </div> */}
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
