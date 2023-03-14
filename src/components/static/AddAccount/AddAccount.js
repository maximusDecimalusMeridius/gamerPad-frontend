import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./AddAccount.css"

function AddAccount({setShowModal, accountsList, setAccountsList, originalAccountsList, setOriginalAccountsList, warningMessage, setWarningMessage}) {
    
    const navigate = useNavigate();

    const verificationArray = ["Xbox Live", "Playstation", "blizzard.net", "nintendo id", "Steam", "Riot Games", "Epic Games", "Discord"]
    const [accountUsername, setAccountUsername] = useState("");
    const [accountType, setAccountType] = useState("");
    const [gamertag, setGamertag] = useState("");    
    const dropdown = verificationArray.map((platform, index) => {
        return (
            <option key={index}>{platform}</option>
        )
    })

    const handleSubmit = async (event) => {

        event.preventDefault();
        
        try {
            const token = localStorage.getItem("token");

            const newAccountObj = {
                account: document.querySelector("#accountName").value,
                type: accountType,
                username: accountUsername,
                gamerTag: gamertag
            }

            const result = await fetch ("http://localhost:3001/api/accounts", {
                method: "POST",
                body: JSON.stringify(newAccountObj),
                headers: {
                    "Content-Type":"application/json",
                    authorization: `Bearer ${token}`
                }
            })

            const data = await result.json();

            console.log(data);

            if(result.ok){
                setAccountsList([...accountsList, {
                    UserId: data.UserId,
                    account: `${data.account}`,
                    createdAt: `${data.createdAt}`,
                    gamerTag: `${data.gamerTag}`,
                    id: data.id,
                    type: `${data.type}`,
                    username: `${data.username}`
                }])
                setOriginalAccountsList([...originalAccountsList, {
                    UserId: data.UserId,
                    account: `${data.account}`,
                    createdAt: `${data.createdAt}`,
                    gamerTag: `${data.gamerTag}`,
                    id: data.id,
                    type: `${data.type}`,
                    username: `${data.username}`
                }])
                setShowModal(false);
                navigate("/profile", {replace: true})
            } else {
                setWarningMessage("Error adding account");
                setTimeout(() => {
                    setWarningMessage("");
                }, "2000")
            }

        } catch(error) {
            console.error(error);
        }
    }

    const handleChange = (event) => {
        if(event.target.id === "accountUsername") {
            setAccountUsername(event.target.value);
        } else if(event.target.id === "accountType") {
            setAccountType(event.target.value);
        } else if(event.target.id === "gamertag"){
            setGamertag(event.target.value);
        }
    }

    return (
        <div className="contentModalWindow">
            <form className="modalForm" id="signupForm" onSubmit={handleSubmit}>
            <div className="inputContainer">
                <select type="text" id="accountName" name="accountName" placeholder="account name" onChange={handleChange} required>
                    {dropdown}
                </select>
                <input type="text" id="accountUsername" name="accountUsername" placeholder="account_name#3232" onChange={handleChange} value={accountUsername}required></input>
                <input type="text" id="accountType" name="accountType" placeholder="account type" onChange={handleChange} value={accountType}required></input>
                <input type="text" id="gamertag" name="gamertag" placeholder="gamer tag / friend code" onChange={handleChange} value={gamertag}></input>
            </div>
            <div className="statusWindow">
                <p className="warningMessage" id="warningMessage">{warningMessage}</p>
                <button className="addSubmitButton">Add Account</button>
            </div>
        </form>
        </div>
    );
}

export default AddAccount;