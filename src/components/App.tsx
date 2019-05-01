import React from "react";
import "./App.css";
import { Tape } from "./ImageTape/Tape";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Tape />
      </header>
    </div>
  );
}

export default App;
