'use client'
import React, {createContext, useState} from 'react';
import {Pet} from "@/lib/types";

type PetsContextType = {pets: Pet[], selectedPet: string | null}
export const PetContext = createContext<PetsContextType | null>(null);

export default async function PetContextProvider(
    {children, data}: { children: React.ReactNode , data: Pet[]}
) {
    const [pets, setPets] = useState(data);
    const [selectedPet, setSelectedPet] = useState(null);
    return (
        <PetContext.Provider value={{pets, selectedPet}}>
            {children}
        </PetContext.Provider>
    )
}