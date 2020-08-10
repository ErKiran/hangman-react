import React, { useContext } from "react";
import getSocket from "../socket";
import { HangmanContext } from "../context/HangmanContext";

// rafce
const CreateGame = () => {
  const { setSecretWord, secretWord, roomName, setRoomName } = useContext(
    HangmanContext
  );

  const socket = getSocket("localhost:8000");

  function setUserRoomName(e) {
    e.preventDefault();
    setRoomName(e.target.value);
  }

  function setGameWord(e) {
    e.preventDefault();
    setSecretWord(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("create-game", { roomName, secretWord });
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
