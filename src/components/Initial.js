import React, { useContext } from "react";
const { HangmanContext } = require("../context/HangmanContext");

// rafce
const Initial = () => {
  const { userOption, setUserOption } = useContext(HangmanContext);
  function setPlay() {
    setUserOption("join");
  }

  function setCreate() {
    setUserOption("create");
  }

  console.log("User Option", userOption);
  return (
    <>
      <div id="init-container">
        <button type="button home-button" id="options" onClick={setPlay}>
          Join Game
        </button>{" "}
        <button type="button contact-button" id="options" onClick={setCreate}>
          Create Game
        </button>
      </div>
    </>
  );
};

export default Initial;
