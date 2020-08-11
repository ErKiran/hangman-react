import React, { useState, useContext } from "react";
import { HangmanContext } from "../context/HangmanContext";
import getSocket from "../socket";
// rafce
const JoinGame = () => {
  const {
    setSecretWord,
    roomName,
    setRoomName,
    setUserOption,
    setPlayable,
  } = useContext(HangmanContext);
  const [nickName, setNickName] = useState("");

  const socket = getSocket("localhost:8000");

  function setUserRoomName(e) {
    e.preventDefault();
    setRoomName(e.target.value);
  }

  function setUserNickName(e) {
    e.preventDefault();
    setNickName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (roomName !== "" && nickName !== "") {
      socket.emit("join-game", { roomName, nickName });
    }

    socket.on("all-games", (res) => {
      if (res && res.length > 0) {
        if (res.some((i) => i.roomName === roomName)) {
          const filtered = res.filter((i) => i.roomName === roomName);
          if (filtered && filtered.length > 0) {
            setSecretWord(filtered[0].secretWord.toLowerCase());
            setUserOption("play");
            setPlayable(true)
          }
        }
      }
    });
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
