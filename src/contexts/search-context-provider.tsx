'use client'
import React, {createContext, useState} from 'react';

type SearchContextType = {
    searchQuery: string,
    handleChangeSearchQuery: (query: string) => void
}
export const SearchContext = createContext<SearchContextType | null>(null);

export default function SearchContextProvider(
    {children}: { children: React.ReactNode }
) {
    const [searchQuery, setSearchQuery] = useState('');
    const handleChangeSearchQuery = (query: string) => setSearchQuery(query);
    return (
        <SearchContext.Provider value={{
            searchQuery,
            handleChangeSearchQuery
        }}>
            {children}
        </SearchContext.Provider>
    )
}
