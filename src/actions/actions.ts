'use server';

import {prisma} from "@/lib/db";
import {revalidatePath} from "next/cache";
import {petFormSchema, petIdSchema} from "@/lib/validations";
import {signIn, signOut} from "@/lib/auth";

// --- User actions ---
export async function logIn(formData: FormData) {
    const authData = Object.fromEntries(formData.entries());
    await signIn('credentials', authData);
}

export async function logOut() {
    await signOut({redirectTo: '/'});
}

// --- Pet actions ---
export async function addPet(pet: unknown) {

    const validatedPet = petFormSchema.safeParse(pet);
    if (!validatedPet.success) {
        return {
            message: "Invalid pet data"
        }
    }

    try {
        await prisma.pet.create({
            data: validatedPet.data
        })
    } catch (error) {
        return {
            message: 'Coudn\'t add pet'
        }
    }
    revalidatePath('/app', 'layout');
}

export async function editPet(petId: unknown, newPetData: unknown) {

    const validatedPetId = petIdSchema.safeParse(petId);
    const validatedPet = petFormSchema.safeParse(newPetData);
    if (!validatedPetId.success || !validatedPet.success) {
        return {
            message: "Invalid pet data"
        }
    }

    try {
        await prisma.pet.update({
            where: {
                id: validatedPetId.data
            },
            data: validatedPet.data
        })
    } catch (error) {
        return {
            message: 'Coudn\'t edit pet'
        }
    }
    revalidatePath('/app', 'layout');
}

export async function deletePet(petId: unknown) {
    const validatedPetId = petIdSchema.safeParse(petId);

    if (!validatedPetId.success) {
        return {
            message: "Invalid pet data"
        }
    }

    try {
        await prisma.pet.delete({
            where: {
                id: validatedPetId.data
            }
        });
    } catch (error) {
        return {
            message: 'Coudn\'t delete pet'
        }
    }
    revalidatePath('/app', 'layout');
}