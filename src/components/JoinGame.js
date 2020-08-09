import React, { useState } from "react";

// rafce
const JoinGame = () => {
  const [roomName, setRoomName] = useState("");
  const [nickName, setNickName] = useState("");

  function setUserRoomName(e) {
    e.preventDefault()
    setRoomName(e.target.value);
  }

  function setUserNickName(e) {
    e.preventDefault()
    setNickName(e.target.value);
  }
  

  function handleSubmit(e){
      e.preventDefault()
      console.log("roomName",roomName)
      console.log("nickName",nickName)

  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div className="join-game">
        <h1>Join Game</h1>
      </div>
      <h5>Enter a Roomname:</h5>
      <input
        name="roomname"
        placeholder="MyRoom"
        onChange={setUserRoomName}
      ></input>
      <h5>Enter a Nickname:</h5>
      <input
        name="nickname"
        placeholder="UniqueName"
        onChange={setUserNickName}
      ></input>
      <button name="enter" id="enter">
        Enter
      </button>
      </form>
    </>
  );
};

export default JoinGame;
