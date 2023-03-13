import React, { useState, useEffect } from "react";
import "./SearchBar.css"

function SearchBar(props) {
    const [searchBarInput, setsearchBarInput] = useState("")

    const originalList = props.originalList

    const handleInputChange = async (e) => {
        setsearchBarInput(e.target.value)
    }

    const setList = props.setList

    useEffect(() => {
        if (searchBarInput === "") {
            setList(originalList)
        } else {
            const searchedArr = []
            originalList.forEach(item => {
                const itemToString = JSON.stringify(item).toLocaleLowerCase()
                if(itemToString.includes(searchBarInput.toLocaleLowerCase())){
                    searchedArr.push(item)
                }
            });
            setList(searchedArr)
        }
    }, [searchBarInput, originalList, setList])

    return (
        <div id="searchbarContainer" className="searchbarContainer">
            <input className="searchbarInput" placeholder="type to search" value={searchBarInput} onChange={handleInputChange}></input>
        </div>
    );
}

export default SearchBar;