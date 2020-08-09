import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import HangmanContextProvider from "./context/HangmanContext";

ReactDOM.render(
  <React.StrictMode>
    <HangmanContextProvider>
      <App />
    </HangmanContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
