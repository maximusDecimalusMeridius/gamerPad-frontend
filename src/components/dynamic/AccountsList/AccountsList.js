import React, { useState, useEffect } from "react";
import SearchBar from "../../static/SearchBar/SearchBar";
import "./AccountsList.css";

function AccountsList({setUserName}) {

    // const [filter, setFilter] = useState("all");
    // const [contentRating, setContentRating] = useState("3");
    // const [replayRating, setReplayRating] = useState("3");
    const [accountsList, setAccountsList] = useState([]);
    const [originalAccountsList, setOriginalAccountsList] = useState([]);

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {

        try {
            const token = localStorage.getItem("token");

            const result = await fetch("http://localhost:3001/api/accounts/currentUserAccounts", {
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

    console.log(accountsList);

    const accounts = accountsList.map((account, index) => {
        // TODO: iterate over platforms to populate below
        return(
            <div key="index">
                <div>{account.account}</div>
                <div>{account.type}</div>
                <div>{account.gamerTag}</div>
            </div>
        )
    })

    return (
        <div className="accountsContainer">
            <SearchBar originalList={originalAccountsList} setList={setAccountsList}/>
            {accounts}
        </div>
    );
}

export default AccountsList;