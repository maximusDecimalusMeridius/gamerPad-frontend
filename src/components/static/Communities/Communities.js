import React from "react";
import "./Communities.css";
// import SearchBar from "../../components/static/SearchBar/SearchBar"
import CommunitiesList from "../../dynamic/CommunitiesList/CommunitiesList";

function Communities() {

    return (
        <div className="communitiesContainer">
            {/* {SearchBar} */}
            {CommunitiesList}
        </div>
    );
}

export default Communities;