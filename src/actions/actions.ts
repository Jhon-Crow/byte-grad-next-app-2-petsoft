'use server';

import {prisma} from "@/lib/db";
import {revalidatePath} from "next/cache";
import {Pet} from "@/lib/types";

export async function addPet(pet: Omit<Pet, 'id'>) {
    try {
        await prisma.pet.create({
            data: pet
        })
    } catch (error) {
        return {
            message: 'Coudn\'t add pet'
        }
    }
    revalidatePath('/app', 'layout');
}

export async function editPet(petId: Pet['id'], newPetData: Omit<Pet, 'id'>) {
    try {
        await prisma.pet.update({
            where: {
                id: petId
            },
            data: newPetData
        })
    } catch (error) {
        return {
            message: 'Coudn\'t edit pet'
        }
    }
    revalidatePath('/app', 'layout');
}

export async function deletePet(petId: Pet['id']) {
    try {
        await prisma.pet.delete({
            where: {
                id: petId
            }
        });
    } catch (error) {
        return {
            message: 'Coudn\'t delete pet'
        }
    }
    revalidatePath('/app', 'layout');
}