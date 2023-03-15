import React, { useState, useEffect } from "react";
import "./AddGame.css"

function AddGame({ setShowModal, warningMessage, setWarningMessage }) {

    const [gameId, setGameId] = useState("");
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
            GameId: gameId,
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
        if (event.target.id === "gameId") {
            setGameId(event.target.value);
        } else if (event.target.id === "contentRating") {
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

    const [gamesList, setGamesList] = useState([])

    const searchGames = (e) => {

    }

    useEffect(() => {
        getPlatforms()
    }, [])

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
                if(itemToString.includes(platformInput.toLocaleLowerCase())){
                    searchedArr.push(item)
                }
            });
            setPlatformsAutoComplete(searchedArr)
        }
    }

    if(platformsAutoComplete){
        return (
            <div className="contentModalWindow">
                <div className="modalForm" id="addGameModal">
                    <div className="inputContainer">
                        <input type="text" id="gameId" name="friendName" placeholder="game id" onChange={handleChange} value={gameId} required></input>
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
                            <input type="range" id="contentRating" name="volume" min="0" max="5" value={contentRating} onChange={handleChange}></input>
                        </div>
                        <div className="valueRatingContainer">
                            <label htmlFor="value">Value: {valueRating}</label>
                            <input type="range" id="valueRating" name="volume" min="0" max="5" value={valueRating} onChange={handleChange}></input>
                        </div>
                        <div className="replayRatingContainer">
                            <label htmlFor="replay">Replay: {replayRating}</label>
                            <input type="range" id="replayRating" name="volume" min="0" max="5" value={replayRating} onChange={handleChange}></input>
                        </div>
                    </div>
                    <div className="addPlatformContainer">
                        <div className="inputContainer">
                            <div>
                                <input type="text" name="platformName" id="platformInput" placeholder="Platform id" onChange={handleChange} value={platformInput}></input>
                            </div>
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
                        <button className="addSubmitButton" onClick={handleSubmit}>Add Game</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddGame;