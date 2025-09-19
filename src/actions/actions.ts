'use server';

import {prisma} from "@/lib/db";
import {revalidatePath} from "next/cache";
import {Pet} from "@/lib/types";

export async function addPet(formData: FormData) {
    try {
        await prisma.pet.create({
            data: {
                name: formData.get('name') as string,
                ownerName: formData.get('ownerName') as string,
                imageUrl: formData.get('imageUrl') as string || 'https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png',
                age: parseInt(formData.get('age') as string),
                notes: formData.get('notes') as string
            }
        })
    } catch (error) {
        return {
            message: 'Coudn\'t add pet'
        }
    }
    revalidatePath('/app', 'layout');
}

export async function editPet(petId: Pet['id'], formData: FormData) {
    try {
        await prisma.pet.update({
            where: {
                id: petId
            },
            data: {
                name: formData.get('name') as string,
                ownerName: formData.get('ownerName') as string,
                imageUrl: formData.get('imageUrl') as string || 'https://byteurse-assets/react-nextjs/pet-placeholder.png',
                age: parseInt(formData.get('age') as string),
                notes: formData.get('notes') as string
            }
        })
    } catch (error) {
        return {
            message: 'Coudn\'t edit pet'
        }
    }
    revalidatePath('/app', 'layout');
}
