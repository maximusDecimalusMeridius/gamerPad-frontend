import React, { useState, useEffect } from "react";
import "./CommunitiesList.css";
import SearchBar from "../../static/SearchBar/SearchBar";

function CommunitiesList() {
  const [commsList, setCommsList] = useState([]);
  const [openIndex, setOpenIndex] = useState(-1);

  useEffect(() => {
    fetchComms();
    document.title = `gamerPad - Communities`;
  }, []);

  const fetchComms = async (event) => {
    try {
      const token = localStorage.getItem("token");
      const result = await fetch("http://localhost:3001/api/games", {
        method: "GET",
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
      });
      const data = await result.json();
      console.log(data);
      setCommsList(data);
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
            {isOpen && (
              <p classname="commMems">community members</p>
            )}
          </div>
        </div>
      );
    });
    return (
        <div className="commsContainer">
      <SearchBar />
      <div className="commsPage">
        {comms}
    </div>
    </div> 
  )
}

export default CommunitiesList;



