import React from "react";
import "./SearchBar.css"

function SearchBar() {
    return (
        <div id="searchbarContainer" className="searchbarContainer">
            <input className="searchbarInput" placeholder="type to search"></input>
            <button className="searchbarButton">Add</button>
        </div>
    );
}

export default SearchBar;