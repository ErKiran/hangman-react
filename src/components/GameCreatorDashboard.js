import React, { useContext } from "react";
import { HangmanContext } from "../context/HangmanContext";

// rafce
const GameCreatorDashboard = () => {
  const {usersOfRoom} = useContext(HangmanContext);
  const test = [];
  usersOfRoom.map((i) =>
    test.push(
      <li key={i} className="players">
        {i}
      </li>
    )
  );
  return (
    <>
      <h1>Hangman</h1>
      <p>User's who are connected to your room</p>
      {test}
    </>
  );
};

export default GameCreatorDashboard;
