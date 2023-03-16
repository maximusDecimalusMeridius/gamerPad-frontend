import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./AddAccount.css"

function AddAccount({setShowModal, accountsList, setAccountsList, originalAccountsList, setOriginalAccountsList, warningMessage, setWarningMessage}) {
    
    const navigate = useNavigate();

    const typeArray = ["Streaming", "Chat", "Gaming"];
    const [accountName, setAccountName] = useState("");
    const [accountUsername, setAccountUsername] = useState("");
    const [accountType, setAccountType] = useState("");
    const [gamertag, setGamertag] = useState("");    
    const [accountColorCode, setAccountColorCode] = useState("#bebebe");
    const dropdown = typeArray.map((type, index) => {
        return (
            <option key={index}>{type}</option>
        )
    })

    const handleSubmit = async (event) => {

        event.preventDefault();
        
        try {
            const token = localStorage.getItem("token");

            const newAccountObj = {
                account: accountName.trim(),
                color: accountColorCode,
                type: document.querySelector("#accountType").value,
                username: accountUsername.trim(),
                gamerTag: gamertag.trim()
            }

            const result = await fetch ("http://gamerpad-backend.herokuapp.com/api/accounts", {
                method: "POST",
                body: JSON.stringify(newAccountObj),
                headers: {
                    "Content-Type":"application/json",
                    authorization: `Bearer ${token}`
                }
            })

            const data = await result.json();

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
        if (event.target.id === "accountName") {
            setAccountName(event.target.value);
        } else if (event.target.id === "accountUsername") {
            setAccountUsername(event.target.value);
        } else if(event.target.id === "accountType") {
            setAccountType(event.target.value);
        } else if(event.target.id === "gamertag"){
            setGamertag(event.target.value);
        } else if(event.target.id === "accountColorCode") {
            setAccountColorCode(event.target.value)
        }
    }

    return (
        <div className="contentModalWindow">
            <form className="modalForm" id="signupForm" onSubmit={handleSubmit}>
            <div className="inputContainer">
                <div className="firstInputRowContainer">
                    <input type="text" id="accountName" name="accountName" placeholder="account name" onChange={handleChange} value={accountName} required></input>
                    <input className="cursor" id="accountColorCode" type="color" value={accountColorCode} onChange={handleChange}></input>
                </div>
                <select type="text" id="accountType" name="accountType" placeholder="account type" required>
                    {dropdown}
                </select>
                <input type="text" id="accountUsername" name="accountUsername" placeholder="account_name#3232" onChange={handleChange} value={accountUsername}required></input>
                <input type="text" id="gamertag" name="gamertag" placeholder="gamer tag / friend code" onChange={handleChange} value={gamertag} required></input>
            </div>
            <div className="statusWindow">
                <button className="addSubmitButton">Add Account</button>
                <p className="warningMessage" id="warningMessage">{warningMessage}</p>
            </div>
        </form>
        </div>
    );
}

export default AddAccount;