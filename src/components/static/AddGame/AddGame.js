import React, { useState, useEffect } from "react";
import "./AddGame.css"

function AddGame({ setShowModal, warningMessage, setWarningMessage }) {

    const [game, setGame] = useState("");
    const [platformInput, setPlatformInput] = useState('');
    const [contentRating, setContentRating] = useState(3);
    const [valueRating, setValueRating] = useState(3);
    const [replayRating, setReplayRating] = useState(3);

    const [platformList, setPlatformList] = useState([])
    const [isFavorite, setIsFavorite] = useState(false)
    const [isLFM, setIsLFM] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();
        const platformArr = []

        platformList.forEach(platform => {
            platformArr.push(platform.id)
        })

        const newUserGameObj = {
            favorite: isFavorite,
            lookingForMore: isLFM,
            content: contentRating,
            replay: valueRating,
            value: replayRating,
            GameId: game.id,
            platforms: platformArr
        }

        console.log(newUserGameObj)
        try {
            const token = localStorage.getItem("token");

            const result = await fetch("https://gamerpad-backend.herokuapp.com/api/games/usergame", {
                method: "POST",
                body: JSON.stringify(newUserGameObj),
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`
                }
            })

            const data = await result.json();

            if (result.ok) {
                setShowModal(false)
            }

        } catch (error) {
            console.error(error);
        }
    }


    const handleChange = (event) => {
        if (event.target.id === "contentRating") {
            setContentRating(event.target.value)
        } else if (event.target.id === "valueRating") {
            setValueRating(event.target.value)
        } else if (event.target.id === "replayRating") {
            setReplayRating(event.target.value)
        } else if (event.target.id === "favoriteCheckbox") {
            setIsFavorite(event.target.checked)
        } else if (event.target.id === "LFMCheckbox") {
            setIsLFM(event.target.checked)
        } else if (event.target.id === "platformInput") {
            setPlatformInput(event.target.value)
        } else if (event.target.id === "searchInput") {
            setSearchInput(event.target.value)
        }
    }

    const removePlatform = (platformId) => {
        setPlatformList(platformList.filter((platform) => {
            if (platform !== platformId) {
                return platform
            } else {
                return null
            }
        }))
    }

    const [platformsAutoComplete, setPlatformsAutoComplete] = useState([])

    const getPlatforms = async (e) => {
        try {
            const token = localStorage.getItem("token");

            const result = await fetch("https://gamerpad-backend.herokuapp.com/api/games/allPlatforms", {
                method: "GET",
                headers: {
                    authorization: token ? `Bearer ${token}` : ''
                }
            })
            const data = await result.json();
            if (data) {
                setPlatformsAutoComplete(data)
                setOriginalPlatformsList(data)
                console.log(data)
            }
        } catch (error) {
            console.error(error);
        }
    }

    // useEffect(() => {
    //     getPlatforms()
    // }, [])

    const selectPlatform = (e) => {
        const platformArr = []

        platformList.forEach(platform => {
            platformArr.push(platform.id)
        })
        if (!platformArr.includes(e.target.dataset.id)) {
            setPlatformList([
                { id: e.target.dataset.id, platform: e.target.textContent },
                ...platformList
            ])
            console.log(platformList)
        }
    }

    const [originalPlatformsList, setOriginalPlatformsList] = useState()

    useEffect(() => {
        handlePlatformSearch()
    }, [platformInput])

    const handlePlatformSearch = (e) => {

        const platformArr = []

        platformList.forEach(platform => {
            platformArr.push(platform.platform)
        })

        if (platformInput === "") {
            setPlatformsAutoComplete(originalPlatformsList)
        } else {
            const searchedArr = []
            originalPlatformsList.forEach(item => {
                const itemToString = JSON.stringify(item).toLocaleLowerCase()
                if (itemToString.includes(platformInput.toLocaleLowerCase())) {
                    searchedArr.push(item)
                }
            });
            setPlatformsAutoComplete(searchedArr)
        }
    }

    const [gamesList, setGamesList] = useState([])
    const [searchInput, setSearchInput] = useState("")

    const searchGames = async (e) => {
        e.preventDefault()

        if(searchInput.length>0){
            try {
                const searchTitle = (searchInput.toLocaleLowerCase()).split(' ').join('%20')
    
                const token = localStorage.getItem("token");
    
                const result = await fetch(`https://gamerpad-backend.herokuapp.com/api/games/searchGame/${searchTitle}`, {
                    method: "GET",
                    headers: {
                        authorization: token ? `Bearer ${token}` : ''
                    }
                })
                const data = await result.json();
                if (data) {
                    setGamesList(data)
                    console.log(data)
                } 
                if(data.length<1){
                    setWarningMessage(`Oh no! We did not find any games including ${searchInput}`);
                    setTimeout(() => {
                    setWarningMessage("");
                }, "3000")
                }
            } catch (error) {
                console.error(error);
            }
        }
    }


    const [searchingGame, setSearchingGame] = useState(true)

    const renderPage = () => {
        if (searchingGame) {
            return (
                <div className="modalForm" id="addGameModal">
                    <form>
                        <h2>Seach for your game</h2>
                        <input type="text" name="searchInput" value={searchInput} id="searchInput" onChange={handleChange}></input>
                        <button onClick={searchGames}>Search</button>
                    </form>
                    <h3>Results</h3>
                    <div id="listOfGamesContainer">
                        {gamesList.map((game, index) => {
                            return <p key={index} className="searchedGames" onClick={() =>{ setGame(game); setSearchingGame(false); getPlatforms()}}>{game.title}</p>
                        })}
                        {/* {gamesList.length ? null : <p>Oh no! We did not find any games including {searchInput} </p>} */}
                        <p className="warningMessage" id="warningMessage">{warningMessage}</p>
                    </div>
                </div>
            )
        }

        if (platformsAutoComplete && !searchingGame) {
            return (
                <div className="modalForm" id="addGameModal">
                    <div className="inputContainer">
                        <p type="text" id="gameId" name="friendName" placeholder="game id" onChange={handleChange}required>{game.title}</p>
                    </div>
                    <div className="ratingsInput">
                        <label htmlFor="favorite">Favorite</label>
                        <input type="checkbox" name="favorite" checked={isFavorite} id="favoriteCheckbox" onChange={handleChange}></input>
                        <label htmlFor="LFM">Looking for more</label>
                        <input type="checkbox" name="LFM" checked={isLFM} id="LFMCheckbox" onChange={handleChange}></input>
                    </div>
                    <div className="ratingsInput">
                        <div className="contentRatingContainer">
                            <label htmlFor="content">Content: {contentRating}</label>
                            <input type="range" id="contentRating" name="volume" min="1" max="5" value={contentRating} onChange={handleChange}></input>
                        </div>
                        <div className="valueRatingContainer">
                            <label htmlFor="value">Value: {valueRating}</label>
                            <input type="range" id="valueRating" name="volume" min="1" max="5" value={valueRating} onChange={handleChange}></input>
                        </div>
                        <div className="replayRatingContainer">
                            <label htmlFor="replay">Replay: {replayRating}</label>
                            <input type="range" id="replayRating" name="volume" min="1" max="5" value={replayRating} onChange={handleChange}></input>
                        </div>
                    </div>
                    <div className="addPlatformContainer">
                        <div className="inputContainer">
                            <input type="text" name="platformName" id="platformInput" placeholder="Platforms" onChange={handleChange} value={platformInput}></input>
                            <div id="platformSearchList">
                                {platformsAutoComplete.map((platform, index) => {
                                    return <p key={index} data-id={platform.id} className="selectPlatform" onClick={selectPlatform} value={platform.platform}>{platform.platform}</p>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="platformList">
                        {platformList.map((platform, index) => {
                            return (
                                <div className="platformDiv" key={index}>
                                    <p>{platform.platform}</p>
                                    <p onClick={() => removePlatform(platform)} className={"removePlatformBtn"}>x</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className="statusWindow">
                        <p className="warningMessage" id="warningMessage">{warningMessage}</p>
                    </div>
                    <div id="addGameBtnsContainer">
                        <button onClick={() => { setSearchingGame(true) }}>Change Game</button>
                        <button onClick={handleSubmit}>Add Game</button>
                    </div>
                </div>
            );
        }
    }

    return (
        <div className="contentModalWindow">

            {renderPage()}

        </div>
    );
}

export default AddGame;