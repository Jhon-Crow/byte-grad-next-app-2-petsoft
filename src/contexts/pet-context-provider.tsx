'use client'
import React, {createContext, useOptimistic, useState} from 'react';
import {Pet} from "@/lib/types";
import {addPet, deletePet, editPet} from "@/actions/actions";

type PetsContextType = {
    pets: Pet[],
    numberOfPets: number,
    selectedPetId: string | null,
    selectedPet: Pet | null,
    handleChangeSelectedPetId: (id: string) => void,
    handleCheckoutPet: (id: string) => void,
    handleAddPet: (newPet: Omit<Pet, 'id'>) => Promise<{
        message: string;
    } | undefined>,
    handleEditPet: (petId: string, newPetData: Omit<Pet, 'id'>) => Promise<{
        message: string;
    } | undefined>
}
export const PetContext = createContext<PetsContextType | null>(null);

export default function PetContextProvider(
    {children, data}:
        { children: React.ReactNode, data: Pet[] }
) {
    const [optimisticPets, setOptimisticPets] = useOptimistic(data, (state, newPet: Omit<Pet, 'id'>) => [...state, {
        ...newPet,
        id: crypto.randomUUID()
    }]);
    const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
    const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId) || null;
    const numberOfPets = optimisticPets.length;
    const handleAddPet = async (newPet: Omit<Pet, 'id'>) => {
        setOptimisticPets(newPet);
        return await addPet(newPet);
    };
    const handleChangeSelectedPetId = (id: string) => setSelectedPetId(id);
    const handleEditPet = async (petId: string, newPetData: Omit<Pet, 'id'>) => await editPet(petId, newPetData);
    const handleCheckoutPet = async (petId: string) => {
        await deletePet(petId);
        setSelectedPetId(null);
    };
    return (
        <PetContext.Provider value={{
            pets: optimisticPets,
            numberOfPets,
            selectedPetId,
            selectedPet,
            handleAddPet,
            handleEditPet,
            handleChangeSelectedPetId,
            handleCheckoutPet
        }}>
            {children}
        </PetContext.Provider>
    )
}