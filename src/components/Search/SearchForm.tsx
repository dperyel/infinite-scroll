import React from "react";
import { OnQueryChange, useQuery } from "./useQuery";
import "./SearchForm.css";

interface SearchFormProps {
    onQueryChange: OnQueryChange;
    debounce?: number;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onQueryChange, debounce }) => {
    const setQuery = useQuery(onQueryChange, debounce);

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newText = e.target.value.trim();
        setQuery(newText);
    }

    return (
        <div className="SearchForm">
            <div className="SearchForm-inputWrapper">
                <input className="SearchForm-input" placeholder="Search for: kittens" type="text" onChange={onChange} />
            </div>
        </div>
    );
}
