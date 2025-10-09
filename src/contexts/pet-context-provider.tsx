'use client'
import React, {createContext, useOptimistic, useState} from 'react';
import {addPet, deletePet, editPet} from "@/actions/actions";
import {PetEssentials} from "@/lib/types";
import {Pet} from "@/generated/prisma";

type PetsContextType = {
    pets: Pet[],
    numberOfPets: number,
    selectedPetId: Pet['id'] | null,
    selectedPet: Pet | null,
    handleChangeSelectedPetId: (id: Pet['id']) => void,
    handleCheckoutPet: (id: Pet['id']) => void,
    handleAddPet: (newPet: PetEssentials) => Promise<{
        message: string;
    } | undefined>,
    handleEditPet: (petId: Pet['id'], newPetData: PetEssentials) => Promise<{
        message: string;
    } | undefined>
}
export const PetContext = createContext<PetsContextType | null>(null);

export default function PetContextProvider(
    {children, data}:
        { children: React.ReactNode, data: Pet[] }
) {
    const [optimisticPets, setOptimisticPets] = useOptimistic(data, (state, {
        action,
        payload
    }) => {
        switch (action) {
            case 'add':
                return [...state, {
                    ...payload,
                    id: crypto.randomUUID()
                }];
            case 'edit':
                return state.map((pet) => pet.id === payload.id ? {...pet, ...payload.newPetData} : pet);
            case 'delete':
                return state.filter((pet) => pet.id !== payload);
            default:
                return state;
        }
    });
    const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
    const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId) || null;
    const numberOfPets = optimisticPets.length;
    const handleAddPet = async (newPet: PetEssentials) => {
        setOptimisticPets({action: 'add', payload: newPet});
        return await addPet(newPet);
    };
    const handleChangeSelectedPetId = (id: Pet['id']) => setSelectedPetId(id);
    const handleEditPet = async (petId: Pet['id'], newPetData: PetEssentials) => {
        setOptimisticPets({
            action: 'edit',
            payload: {newPetData, id: petId}
        });
        return await editPet(petId, newPetData);
    }
    const handleCheckoutPet = async (petId: Pet['id']) => {
        setOptimisticPets({action: 'delete', payload: petId});
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