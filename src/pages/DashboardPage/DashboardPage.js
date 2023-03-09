import React from "react";
import "./DashboardPage.css";
import GamesList from "../../components/dynamic/GamesList/GamesList";
import FriendsList from "../../components/dynamic/FriendsList/FriendsList";
import CommunitiesList from "../../components/dynamic/CommunitiesList/CommunitiesList ";
import NotesList from "../../components/dynamic/NotesList/NotesList";

// psuedocode:
// dashboard will need to only be rendered when logged in
// will need boxes that will conditionally render games,
//  social, and notes pages
// beneath link boxes there will need to be carosel of top communites/recommended communities
// under carosel there will need to be a card which contains the friends list of said used
// only the first online, or most recently online users to populate on friend's list
// when friend's list is clicked it will take user to full friend's list, clicking on individual user on list will take you to their page
// TODO: Import dependencies (required files and needed packages)
// TODO: Create Div for carosel, with A tags on each image within carosel, have background linked to communities page
// TODO: conditionally rendered friend list, games list, note list
// TODO: Create card element for friend's list each friend on list is linked to their own pages)
function DashboardPage() {
    return(
        <div>

        </div>
    )
}
export default DashboardPage;