import React, { createContext, useState } from 'react'

export const HangmanContext = createContext()

const HangmanContextProvider = ({ children }) => {
    const [userOption, setUserOption] = useState("");

    return (
        <HangmanContext.Provider
          value={{ 
              userOption,
              setUserOption
             }}
        >
          {children}
        </HangmanContext.Provider>
      )
}

export default HangmanContextProvider