import React, { useState, useEffect } from "react";
import "./CommunitiesList.css";
import SearchBar from "../../static/SearchBar/SearchBar";

function CommunitiesList({originalCommsList, setOriginalCommsList}) {
  const [commsList, setCommsList] = useState([]);
  const [openIndex, setOpenIndex] = useState(-1);


  useEffect(() => {
    fetchComms();
    document.title = `gamerPad - Communities`;
  }, []);

  const fetchComms = async (event) => {
    try {
      const token = localStorage.getItem("token");
      const result = await fetch("https://gamerpad-backend.herokuapp.com/api/games/usergame/allUserGames", {
        method: "GET",
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
      });
      const data = await result.json();
      console.log(data);
      setCommsList(data);
      setOriginalCommsList(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommsClick = (index) => {
    setOpenIndex(index === openIndex ? -1 : index);
  };
  const comms = commsList.map((game, index) => {
    const isOpen = index === openIndex;
    return (
      <div className="commsCard" key={index}>
        <div className="commsCardHeader">
          <h2
            className="commTitle"
            onClick={() => handleCommsClick(index)}
          >
            {game.title}
          </h2>
         {isOpen && game.listOfFriends.length > 0 && (
          <ul className="friendsPlay">
            <li>friends who play:</li>
            {game.listOfFriends.map((friend) => (
              <li key={index}>{friend.username}</li>
            ))}
          </ul>
         )}
        </div>
      </div>
    );
  });
  return (


      <div className="commsContainer">{comms}</div>
   
  )
}

export default CommunitiesList;



