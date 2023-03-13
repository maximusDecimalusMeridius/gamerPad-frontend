import React, { useState, useEffect } from "react";
import "./CommunitiesList.css";
import SearchBar from "../../static/SearchBar/SearchBar";

function CommunitiesList() {
  const [commsList, setCommsList] = useState([]);
  const [openIndex, setOpenIndex] = useState(-1);
  const [originalCommsList, setOriginalCommsList] = useState([]);

  useEffect(() => {
    fetchComms();
    document.title = `gamerPad - Communities`;
  }, []);

  const fetchComms = async (event) => {
    try {
      const token = localStorage.getItem("token");
      const result = await fetch("https://gamerpad-backend.herokuapp.com/api/games", {
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
            {isOpen && (
              <ul className="topMems">
                  <li>person 1</li>
                  <li>person 2</li>
                  <li>person 3</li>
              </ul>
            )}
          </div>
        </div>
      );
    });
    return (
        <div className="commsContainer">
      <SearchBar  originalList={originalCommsList} setList={setCommsList}/>
      <div className="commsPage">
        {comms}
    </div>
    </div> 
  )
}

export default CommunitiesList;



