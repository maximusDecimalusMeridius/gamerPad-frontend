import React, {useState} from "react";
import "./AddFriend.css"

function AddFriend({setShowModal, friendsList, setFriendsList, originalFriendsList, setOriginalFriendsList, warningMessage, setWarningMessage}) {
    
    const [friendName, setFriendName] = useState([]);
    const [friendCode, setFriendCode] = useState([]);

    const handleSubmit = async (event) => {

        event.preventDefault();
        
        try {
            const token = localStorage.getItem("token");

            const newFriendObj = {
                FriendId: friendName,
                friendCode: friendCode
            }

            const result = await fetch ("http://localhost:3001/api/friends/addFriend", {
                method: "POST",
                body: JSON.stringify(newFriendObj),
                headers: {
                    "Content-Type":"application/json",
                    authorization: `Bearer ${token}`
                }
            })

            const data = await result.json();

            if(result.ok){
                console.log("friend added");
                setShowModal(false);
                //we can reload if we persist "loggedInData"
                // window.location.reload();
            }

        } catch(error) {
            console.error(error);
        }
    }

    const handleChange = (event) => {
        if(event.target.id === "friendName"){
            setFriendName(event.target.value);
        } else if (event.target.id === "friendCode") {
            setFriendCode(event.target.value);
        }
    }
    
    return (
        <div className="contentModalWindow">
            <form className="modalForm" id="signupForm" onSubmit={handleSubmit}>
            <div className="inputContainer">
                <input type="text" id="friendName" name="friendName" placeholder="friend's name" onChange={handleChange} value={friendName}required></input>
                <input type="text" id="friendCode" name="friendCode" placeholder="friend's code" onChange={handleChange} value={friendCode}required></input>
            </div>
            <div className="statusWindow">
                <p className="warningMessage" id="warningMessage">{warningMessage}</p>
                <button className="addSubmitButton">Add Friend</button>
            </div>
        </form>
        </div>
    );
}

export default AddFriend;