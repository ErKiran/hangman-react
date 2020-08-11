import React, { useState, useContext, useEffect } from "react";
import Header from "./components/Header";
import Figure from "./components/Figure";
import Initial from "./components/Initial";
import JoinGame from "./components/JoinGame";
import CreateGame from "./components/CreateGame";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import Popup from "./components/Popup";
import Notification from "./components/Notification";
import { HangmanContext } from "./context/HangmanContext";
import { showNotification as show } from "./helpers/helpers";

import "./App.css";

function App() {
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);


  const { userOption, secretWord: words, playable, setPlayable } = useContext(HangmanContext);
  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase()
        if (words.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, wrongLetters, playable, words]);

  function playAgain() {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);
  }

  if (userOption === "") {
    return (
      <>
        <Header />
        <Initial />
      </>
    );
  }

  if (userOption === "join") {
    return <JoinGame />;
  }

  if (userOption === "create") {
    return <CreateGame />;
  }

  if (userOption === "play") {
    return (
      <>
        <Header />
        <div className="game-container">
          <Figure wrongLetters={wrongLetters} />
          <WrongLetters wrongLetters={wrongLetters} />
          <Word selectedWord={words} correctLetters={correctLetters} />
        </div>
        <Popup
          correctLetters={correctLetters}
          wrongLetters={wrongLetters}
          selectedWord={words}
          setPlayable={setPlayable}
          playAgain={playAgain}
        />
        <Notification showNotification={showNotification} />
      </>
    );
  }
}

export default App;
