import React, { useState } from "react";
import "./App.css";
import { Tape } from "./ImageTape/Tape";
import { SearchForm } from "./Search/SearchForm";
import { withLoadedData } from "./DataLoader/WithLoadedData";

const App: React.FC = () => {
    const [query, setQuery] = useState("kittens");
    const TapeWithData = withLoadedData(Tape);

    return (
        <div className="App">
            <header className="App-header">
                <SearchForm onQueryChange={setQuery} />
                <TapeWithData query={query} />
            </header>
        </div>
    );
}

export default App;
