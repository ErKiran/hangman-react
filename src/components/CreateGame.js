import React, { useContext, useState } from "react";
import getSocket from "../socket";
import { HangmanContext } from "../context/HangmanContext";
import GameCreatorDashboard from "./GameCreatorDashboard";

// rafce
const CreateGame = () => {
  const { setSecretWord, secretWord, roomName, setRoomName } = useContext(
    HangmanContext
  );

  const [roomNameError, setRoomNameError] = useState(false);
  const [emptyRoomName, setEmptyRoomName] = useState(false);
  const [secretWordError, setSecretWordError] = useState(false);
  const [hasCreatedRoom, setHasCreatedRoom] = useState(false);

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
    if (roomName === "" && secretWord === "") {
      setEmptyRoomName(true);
      setSecretWordError(true);
      return;
    }

    setEmptyRoomName(false)
    setSecretWordError(false)

    socket.emit("check-rooms", roomName);
    socket.on("do-room-exists", (check) => {
      if (!check) {
        if (secretWord.length < 2) {
          setSecretWordError(true);
        }
        setRoomNameError(false);
        socket.emit("create-room", { roomName, secretWord });
        if (!secretWordError) {
          setHasCreatedRoom(true);
        }
      } else {
        setRoomNameError(true);
      }
    });
  }

  if (hasCreatedRoom) {
    return <>
    <GameCreatorDashboard/>
    </>;
  }

  if (!hasCreatedRoom) {
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
          {roomNameError ? (
            <span className="error">Roomname is already taken!!</span>
          ) : (
            ""
          )}
          {emptyRoomName ? (
            <span className="error">Roomname shouldn't be empty!!</span>
          ) : (
            ""
          )}
          <h5>Enter a SecretWord:</h5>
          <input
            name="secretword"
            placeholder="secretword"
            value={secretWord}
            onChange={setGameWord}
          />
          {secretWordError ? (
            <span className="error">
              Secret Word should be greater than 2 word!!
            </span>
          ) : (
            ""
          )}
          <button name="enter" id="enter">
            Enter
          </button>
        </form>
      </>
    );
  }
};

export default CreateGame;
