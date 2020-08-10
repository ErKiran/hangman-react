import React, { createContext, useState } from 'react'

export const HangmanContext = createContext()

const HangmanContextProvider = ({ children }) => {
    const [userOption, setUserOption] = useState("");
    const [secretWord, setSecretWord] = useState("");

    return (
        <HangmanContext.Provider
          value={{ 
              userOption,
              setUserOption,
              secretWord,
              setSecretWord,
             }}
        >
          {children}
        </HangmanContext.Provider>
      )
}

export default HangmanContextProvider