import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./AddFriend.css"

function AddFriend({setShowModal, friendsList, setFriendsList, originalFriendsList, setOriginalFriendsList, warningMessage, setWarningMessage}) {
    
    const navigate = useNavigate();

    const [friendName, setFriendName] = useState([]);
    const [friendCode, setFriendCode] = useState([]);

    const handleSubmit = async (event) => {

        event.preventDefault();
        
        try {
            const token = localStorage.getItem("token");

            const newFriendObj = {
                username: friendName,
                friendCode: friendCode
            }

            const result = await fetch ("https://gamerpad-backend.herokuapp.com/api/friends/addFriend", {
                method: "POST",
                body: JSON.stringify(newFriendObj),
                headers: {
                    "Content-Type":"application/json",
                    authorization: `Bearer ${token}`
                }
            })

            // const data = await result.json();

            if(result.ok){
                console.log("friend added");
                setShowModal(false);
                navigate("/", {replace: true})
                //we can reload if we persist "loggedInData"
                // window.location.reload();
                try {
                    const token = localStorage.getItem("token");
              
                    const result = await fetch(
                      "https://gamerpad-backend.herokuapp.com/api/friends/currentUserFriends",
                      {
                        method: "GET",
                        headers: {
                          authorization: token ? `Bearer ${token}` : "",
                        },
                      }
                    );
                    const data = await result.json();
              
                    setFriendsList(data.Friends);
                    setOriginalFriendsList(data.Friends);
              
                  } catch (error) {
                    console.error(error);
                  }
            } else {
                setWarningMessage("Error adding friend");
                setTimeout(() => {
                    setWarningMessage("");
                }, "2000")
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