
import React, {useState} from 'react';
import './SocialPage.css';

import FriendsList from '../../components/dynamic/FriendsList/FriendsList';
import CommunitiesList from '../../components/dynamic/CommunitiesList/CommunitiesList';

// TODO: create a searchbar for other users
// TODO: create an add button that will add whichever user is currently selected
// TODO: create an accordian menu with multiple divs
// TODO: when a div is clicked on make that area expand to show full user info
// TODO: when the area expands it the user's profile image beneath their username, and their top games
// TODO: beneath the user image will be a lsit of their top usernames/gamertags they have linked
// TODO: when a username/gamertag is searched the acordian changes to reflect the search


function SocialPage() {
  const [currentPage, setCurrentPage] = useState("Communities");
  const [otherPage, setOtherPage] = useState("Friends");
 
  const renderPage = () => {
    if (currentPage === "Friends"){
      return <FriendsList/>
    } else {
      return <CommunitiesList/>
    }
  }

  const setPage = () => {
    if(currentPage === "Friends"){
        setCurrentPage("Communities");
        setOtherPage("Friends");
    } else {
        setCurrentPage("Friends");
        setOtherPage("Communties");
    }
}
   
  return (
  <div className='socialPageContainer'>
    <div className='socialPageCards'>

       <h2 className="socialTitle">{currentPage} Page</h2>
            {renderPage()}
            <button id="swapButton" onClick={setPage}>Click to {otherPage}</button>
          
    </div>
  </div>
            
  )
  }
export default SocialPage;