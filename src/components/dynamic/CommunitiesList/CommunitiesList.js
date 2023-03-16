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

  const getColor = () => {
    
    const colorArray = ["red", "blue", "green", "purple", "orange"];

    const yourColor = colorArray[Math.floor(Math.random() * colorArray.length)];

    return (
      {
        height: "fit-content",
        width: "fit-content",
        padding: "5px",
        border: "3px solid white",
        borderRadius: "5px",
        background: "#323232",
        backgroundColor: `${yourColor}`
      }
    )
  }

  const openCard = (game, index) => {
    return (
      <>
        <div className="openCommsCard growWide cursor" onClick={() => handleCommsClick(index)}>
        <div className="openCommsHeader" >
          <h2 className="commTitle">{game.title}</h2>
          <p className="whosPlaying">{game.allPlayers} Playing</p>
        </div>
        <p className="releaseDate">Released: {game.releaseDate}</p>
        <h3>Friends Who Play:</h3>
        <ul className="friendsPlay">
          {game.listOfFriends.map((friend) => (
            <li style={getColor()} key={index}>{friend.username}</li>
            ))}
        </ul>
          </div>
  
      </>
    )
  }

  const handleCommsClick = (index) => {
    setOpenIndex(index === openIndex ? -1 : index);
  };
  const comms = commsList && commsList.length > 0 ? commsList.map((game, index) => {
      const isOpen = index === openIndex;
      return (
        <>
        {!isOpen ? (<div className="commsCard cursor" onClick={() => handleCommsClick(index)}><div className="closedCommsHeader">
          <h2 className="commTitle" >{game.title}</h2>
          <p className="whosPlaying">{game.allPlayers} Playing</p>
        </div></div>) : openCard(game, index)}
        </>
    );
}) : "No communities - Add some games!";
  return (
    

      <div className="commsContainer">{comms}</div>
   
  )
}

export default CommunitiesList;



