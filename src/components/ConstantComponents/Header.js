import React from "react";
import "./Header.css"
import Hamburger from "./Hamburger";
function Header() {
    return (
        <div>
            <a>
                <image>
                    {}
                </image>
            </a>
            <h1 id="title">
                gamerPad
            </h1>
            <div>
                <Hamburger/>
            </div>
            <hr/>
        </div>
    )
}
export default Header;