
import React from 'react';
import './NotesPage.css';
import SearchBar from "../../components/static/SearchBar/SearchBar";
import NotesList from "../../components/dynamic/NotesList/NotesList";
// TODO: create a searchbar for notes page
// TODO: create an add button 
// TODO: create an accordian menu with multiple divs
// TODO: when a div is clicked on make that area expand to show full note

const style = {
  searchbar: {
    width: "80%",
    height: "25px"
  }
}

function NotesPage() {
  return (
    <div>
      {/* for testing */}
        <div id="test-searchbar" style={style.searchbar}>Test</div>
    </div>
  );
}

export default NotesPage;             