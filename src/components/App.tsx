import React, { useState } from "react";
import "./App.css";
import { Tape } from "./ImageTape/Tape";
import { SearchForm } from "./Search/SearchForm";
import { withLoadedData } from "./DataLoader/WithLoadedData";
import { GiphyApi } from "../utils/request/GiphyApi";

const App: React.FC = () => {
    const [query, setQuery] = useState("kittens");
    const giphyApi = new GiphyApi("VR8zLh7EW0IgB3AethVFn2iseXA94K6i");
    const TapeWithData = withLoadedData(Tape, giphyApi);

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
