import React, { useContext, useState } from "react";
import getSocket from "../socket";
import { HangmanContext } from "../context/HangmanContext";

// rafce
const CreateGame = () => {
  const { setSecretWord, secretWord, roomName, setRoomName } = useContext(
    HangmanContext
  );

  const [roomNameError, setRoomNameError] = useState(false);

  const socket = getSocket("localhost:8000");

  function setUserRoomName(e) {
    e.preventDefault();
    setRoomName(e.target.value);
  }

  function setGameWord(e) {
    e.preventDefault();
    let value = e.target.value.toLowerCase();
    value = value.replace(/[^A-Za-z]/gi, "");
    setSecretWord(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (roomName !== "" && secretWord !== "") {
      socket.emit("check-rooms", roomName);
      socket.on("do-room-exists", (check) => {
        console.log("Exists", check);
        if (!check) {
          setRoomNameError(false)
          socket.emit("create-game", { roomName, secretWord });
        } else {
          setRoomNameError(true);
        }
      });
    }
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
        />
        {roomNameError ? <span className="error">Roomname is already taken!!</span> : ""}
        <h5>Enter a SecretWord:</h5>
        <input
          name="secretword"
          placeholder="secretword"
          value={secretWord}
          onChange={setGameWord}
        />
        <button name="enter" id="enter">
          Enter
        </button>
      </form>
    </>
  );
};

export default CreateGame;
