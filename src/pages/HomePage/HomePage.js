import React from "react";
import {Routes, Route, Link} from "react-router-dom";
import "./Homepage.css"
import DashboardPage from "../DashboardPage/DashboardPage";


function HomePage() {
    
    
    return(
        <div className="homeContainer"id="homePage">
            <DashboardPage/>
        </div>
    )
} export default HomePage;