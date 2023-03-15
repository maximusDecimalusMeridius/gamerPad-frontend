import React, { useState, useEffect } from "react";
import "./CommunitiesList.css";


function CommunitiesList({commsList, setCommsList, originalCommsList, setOriginalCommsList}) {
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
      setCommsList(data);
      setOriginalCommsList(data);

    } catch (error) {
      console.error(error);
    }
  };

  const handleCommsClick = (index) => {
    setOpenIndex(index === openIndex ? -1 : index);
  };
  const comms = commsList && commsList.length > 0 ? commsList.map((game, index) => {
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
          {isOpen && <p>released: {game.releaseDate}</p>}
          {isOpen && <p>Player count: {game.allPlayers}</p>}
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
}) : null;
  return (
    

      <div className="commsContainer">{comms}</div>
   
  )
}

export default CommunitiesList;



