import { useState, useEffect } from 'react';

export type OnQueryChange = (query: string) => void;

export const useQuery = (onQueryChange: OnQueryChange, debounce: number = 1000) => {

    const [query, setQuery] = useState("");

    useEffect(() => {
        if (!query) {
            return;
        }

        const timer = setTimeout(() => {
            onQueryChange(query);
        }, debounce);

        return () => {
            clearTimeout(timer);
        };
    });

    return setQuery;
}
