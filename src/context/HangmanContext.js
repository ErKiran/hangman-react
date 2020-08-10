import React, { createContext, useState } from 'react'

export const HangmanContext = createContext()

const HangmanContextProvider = ({ children }) => {
    const [userOption, setUserOption] = useState("");
    const [secretWord, setSecretWord] = useState("");
    const [roomName, setRoomName] = useState("");

    return (
        <HangmanContext.Provider
          value={{ 
              userOption,
              setUserOption,
              secretWord,
              setSecretWord,
              roomName,
              setRoomName
             }}
        >
          {children}
        </HangmanContext.Provider>
      )
}

export default HangmanContextProvider