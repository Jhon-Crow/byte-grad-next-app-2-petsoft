'use client'
import React, {createContext, useState} from 'react';
import {Pet} from "@/lib/types";

type PetsContextType = {
    pets: Pet[],
    selectedPetId: string | null,
    selectedPet: Pet | null,
    handleChangeSelectedPetId: (id: string) => void
}
export const PetContext = createContext<PetsContextType | null>(null);

export default function PetContextProvider(
    {children, data}: { children: React.ReactNode , data: Pet[]}
) {
    const [pets, setPets] = useState(data);
    const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
    const selectedPet = pets.find((pet) => pet.id === selectedPetId) || null;
    const handleChangeSelectedPetId = (id: string) => setSelectedPetId(id);
    return (
        <PetContext.Provider value={{pets, selectedPetId, selectedPet, handleChangeSelectedPetId}}>
            {children}
        </PetContext.Provider>
    )
}