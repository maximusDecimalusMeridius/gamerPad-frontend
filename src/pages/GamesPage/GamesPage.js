
import React from 'react';
import './GamesPage.css';
import SearchBar from "../../components/static/SearchBar/SearchBar";
import GamesList from "../../components/dynamic/GamesList/GamesList";

// TODO: create a button for sort
// TODO: create a button for Add 
// TODO: create a card element to hold the games accordian
// TODO: create an accordian of games 
// TODO: on each div within the accordian create 3 rating sections with 5 star values (content, replay, value)
function GamesPage() {
  return (
  <div>
    {/* for testing */}
    {<GamesList />}
  </div>
  );
}

export default GamesPage;