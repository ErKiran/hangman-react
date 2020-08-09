import React, { useState } from "react";

// rafce
const CreateGame = () => {
  const [roomName, setRoomName] = useState("");
  const [secretWord, setSecretWord] = useState("");

  function setUserRoomName(e) {
    e.preventDefault()
    setRoomName(e.target.value);
  }

  function setGameWord(e) {
    e.preventDefault()
    setSecretWord(e.target.value);
  }
  

  function handleSubmit(e){
      e.preventDefault()
      console.log("roomName",roomName)
      console.log("secretword",secretWord)

  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div className="join-game">
        <h1>Create Game</h1>
      </div>
      <h5>Enter a Roomname:</h5>
      <input
        name="roomname"
        placeholder="MyRoom"
        onChange={setUserRoomName}
      ></input>
      <h5>Enter a SecretWord:</h5>
      <input
        name="secretword"
        placeholder="secretword"
        onChange={setGameWord}
      ></input>
      <button name="enter" id="enter">
        Enter
      </button>
      </form>
    </>
  );
};

export default CreateGame;
