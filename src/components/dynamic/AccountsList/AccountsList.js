import { type } from "@testing-library/user-event/dist/type";
import React, { useState, useEffect } from "react";

import "./AccountsList.css";

function AccountsList({ setUserName, accountsList, setAccountsList, originalAccountsList, setOriginalAccountsList }) {

    // const [filter, setFilter] = useState("all");
    // const [contentRating, setContentRating] = useState("3");
    // const [replayRating, setReplayRating] = useState("3");
    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {

        try {
            const token = localStorage.getItem("token");

            const result = await fetch("https://gamerpad-backend.herokuapp.com/api/accounts/currentUserAccounts", {
                method: "GET",
                headers: {
                    authorization: token ? `Bearer ${token}` : ''
                }
            })

            const data = await result.json();

            console.log(data);

            setAccountsList(data.Accounts)
            setOriginalAccountsList(data.Accounts)
            setUserName(data.username)

        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteAccount = async (e) => {
        e.preventDefault()

        try {
            const token = localStorage.getItem("token");

            const result = await fetch(`https://gamerpad-backend.herokuapp.com/api/accounts/${e.target.parentNode.dataset.id}`, {
                method: "Delete",
                headers: {
                    "Content-Type": "application/json",
                    authorization: token ? `Bearer ${token}` : ''
                }
            })

            if (result.ok) {
                fetchAccounts()
            }

        } catch (error) {
            console.error(error);
        }
    }

    const accounts = accountsList.map((account, index) => {
        // TODO: iterate over accounts to populate below
        let type = account.type;
        let style = {
            border: ""
        }
        
        style.background = `${account.color}`;

        if (type === "Chat") {
            style.border = `5px solid purple`;
        } else if (type === "Streaming"){
            style.border = `5px solid orange`
        } else if (type === "Gaming") {
            style.border = `5px solid red`
        }
        return (
            // add border for type
            // add style background for VideoColorSpace

            <div key={crypto.randomUUID()} className="accountDiv" style={style} data-id={account.id}>
                <div className="closeMenu cursor" onClick={handleDeleteAccount}>x</div>
                <h3>{account.username}</h3>
                <p>{account.gamerTag}</p>
                <p>{account.account}</p>
            </div>
        )
    })

    return (
        <div className="accountsContainer">
            {accounts}
        </div>
    );
}

export default AccountsList;