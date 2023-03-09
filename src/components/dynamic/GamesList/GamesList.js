import React, {useState} from "react";
import "./GamesList.css";

function GamesList() {
    
    const [filter, setFilter] = useState("all");
    const [contentRating, setContentRating] = useState("3");
    const [replayRating, setReplayRating] = useState("3");
    const [valueRating, setValueRating] = useState("3");

    // TODO: filter data from data array
    // TODO: map over data to display 

    return (
        <div className="gamesContainer">
            <p>Games</p>
        </div>
    );
}

export default GamesList;