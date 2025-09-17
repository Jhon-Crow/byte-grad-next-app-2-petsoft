'use client'
import React, {createContext, useState} from 'react';
import {Pet} from "@/lib/types";

type PetsContextType = {
    pets: Pet[],
    numberOfPets: number,
    selectedPetId: string | null,
    selectedPet: Pet | null,
    handleChangeSelectedPetId: (id: string) => void,
    handleCheckoutPet: (id: string) => void
}
export const PetContext = createContext<PetsContextType | null>(null);

export default function PetContextProvider(
    {children, data}: { children: React.ReactNode, data: Pet[] }
) {
    const [pets, setPets] = useState(data);
    const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
    const selectedPet = pets.find((pet) => pet.id === selectedPetId) || null;
    const numberOfPets = pets.length;
    const handleChangeSelectedPetId = (id: string) => setSelectedPetId(id);
    const handleCheckoutPet = (id: string) => {
        setPets(pets.filter((pet) => pet.id !== id));
        setSelectedPetId(null);
    };
    return (
        <PetContext.Provider value={{
            pets,
            numberOfPets,
            selectedPetId,
            selectedPet,
            handleChangeSelectedPetId,
            handleCheckoutPet
        }}>
            {children}
        </PetContext.Provider>
    )
}