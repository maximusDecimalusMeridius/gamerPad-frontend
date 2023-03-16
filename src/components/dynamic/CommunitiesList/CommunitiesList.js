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

  const openCard = (game, index) => {
    return (
      <>
        <div className="openCommsHeader cursor" onClick={() => handleCommsClick(index)}>
          <h2 className="commTitle">{game.title}</h2>
          <p className="whosPlaying">{game.allPlayers} Playing</p>
        </div>
        <p>Released: {game.releaseDate}</p>
        <ul className="friendsPlay"><span>Friends Playing:</span>
          {game.listOfFriends.map((friend) => (
            <li key={index}>{friend.username}</li>
            ))}
        </ul>
            
  
      </>
    )
  }

  const handleCommsClick = (index) => {
    setOpenIndex(index === openIndex ? -1 : index);
  };
  const comms = commsList && commsList.length > 0 ? commsList.map((game, index) => {
      const isOpen = index === openIndex;
      return (
        <div className="commsCard" key={index}>
        <div className="commsCardHeader">
          {!isOpen ? (<div className="openCommsHeader cursor" onClick={() => handleCommsClick(index)}>
          <h2 className="commTitle" >{game.title}</h2>
          <p className="whosPlaying">{game.allPlayers} Playing</p>
        </div>) : openCard(game, index)}
        </div>
      </div>
    );
}) : "No communities - Add some games!";
  return (
    

      <div className="commsContainer">{comms}</div>
   
  )
}

export default CommunitiesList;



