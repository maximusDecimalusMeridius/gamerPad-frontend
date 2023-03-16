import React, { useState, useEffect } from "react";
import SearchBar from "../../static/SearchBar/SearchBar";
import "./GamesList.css";

function GamesList({gamesList, setGamesList, originalGameList, setOriginalGameList}) {

    // const [filter, setFilter] = useState("all");
    // const [contentRating, setContentRating] = useState("3");
    // const [replayRating, setReplayRating] = useState("3");
    // const [valueRating, setValueRating] = useState("3");

    // useEffect hook to fetch all notes on page load
    useEffect(() => {
        fetchGames();
        document.title = `gamerPad - Games`;
    }, []);

    // TODO: Fetch data
    const fetchGames = async (event) => {

        try {
            const token = localStorage.getItem("token");

            const result = await fetch("https://gamerpad-backend.herokuapp.com/api/games/usergame", {
                method: "GET",
                headers: {
                    authorization: token ? `Bearer ${token}` : ''
                }
            })

            const data = await result.json();

            setGamesList(data.UserGames)
            setOriginalGameList(data.UserGames)

        } catch (error) {
            console.error(error);
        }
    }

    // Delete userGame
    const handleDeleteGame = async (e) => {
            
        try {
            const token = localStorage.getItem("token");

            let url = `https://gamerpad-backend.herokuapp.com/api/games/usergame/${e.target.parentNode.dataset.id}`;

            const result = await fetch(url, {
                method: "DELETE",
                headers: {
                    authorization: token ? `Bearer ${token}` : ''
                }
            })


            if (result.ok) {
                fetchGames()
            }

        } catch (error) {
            console.error(error);
        }

    }

    // map over data to display 
    const games = gamesList.map((game, index) => {

        // TODO: iterate over platforms to populate below
        const platforms = game.Platforms.map((platform, index) => {
            return (
                <li className="gamePlatform" key={index}>{platform.platform}</li>
            )
        })

        const addBubbles = (rating) => {

            const bubbleArray = new Array(5).fill("");

            const bubbles = bubbleArray.map((bubble, index) => ((index + 1) <= rating ? <div key={index} className="bubble filled">{bubble}</div> : <div key={index} className="bubble">{bubble}</div>));

            return (
                <div className="bubbles">
                    {bubbles}
                </div>
            )
        }

        return (
            <div className="gameCard" key={index} data-id={game.id}>
                <div className="closeMenu cursor" onClick={handleDeleteGame}>x</div>
                <div className="gameCardHeader">
                    <div><span>{game.Game.title}</span>{(game.favorite) ? "⭐" : ""}</div>
                    <ul className="gameCardPlatforms">
                        {platforms}
                    </ul>
                </div>
                <div className="ratingsContainer">
                    <div className="ratings" id="contentRatings" data-rating={game.content}>
                        <h3>Content</h3>
                        {addBubbles(game.content)}
                    </div>
                    <div className="ratings" id="replayRatings" data-rating={game.replay}>
                        <h3>Replay</h3>
                        {addBubbles(game.replay)}
                    </div>
                    <div className="ratings" id="valueRatings" data-rating={game.value}>
                        <h3>Value</h3>
                        {addBubbles(game.value)}
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className="gamesContainer">
            <SearchBar originalList={originalGameList} setList={setGamesList} />
            {games}
        </div>
    );
}

export default GamesList;