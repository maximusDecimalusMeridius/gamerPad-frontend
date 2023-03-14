import React, { useState, useEffect } from "react";

import "./AccountsList.css";

function AccountsList({setUserName, accountsList, setAccountsList, originalAccountsList, setOriginalAccountsList}) {

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

            
                setAccountsList(data.Accounts)
                setOriginalAccountsList(data.Accounts)
                setUserName(data.username)
            
            

        } catch (error) {
            console.error(error);
        }
    }

    const accounts = accountsList.map((account, index) => {
        // TODO: iterate over accounts to populate below
        let typeClass = "gamingAccount accountDiv"
        if(account.type === 'Chat'){
            typeClass = "chatAccount accountDiv"
        }
        return(
            <div key={crypto.randomUUID()} className={typeClass}>
                <h3>{account.username}</h3>
                <p>{account.gamerTag}</p>
                <p>{account.account}</p>
                <button>remove</button>
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