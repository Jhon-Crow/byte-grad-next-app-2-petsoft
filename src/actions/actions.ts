'use server';
import {prisma} from "@/lib/db";
import {revalidatePath} from "next/cache";
import {petFormSchema, petIdSchema} from "@/lib/validations";
import {auth, signIn, signOut} from "@/lib/auth";
import bcrypt from "bcryptjs";
import {redirect} from "next/navigation";

// --- User actions ---
export async function logIn(formData: FormData) {
    await signIn('credentials', formData);
}

export async function signUp(formData: FormData) {
    const hashedPassword = await bcrypt.hash(formData.get('password') as string, 10);
    await prisma.user.create({
        data: {
            email: formData.get('email') as string,
            hashedPassword,
        }
    })
    await signIn('credentials', formData);
}

export async function logOut() {
    await signOut({redirectTo: '/'});
}

// --- Pet actions ---
export async function addPet(pet: unknown) {

    const session = await auth();
    if (!session?.user) {
        redirect('/login');
    }

    const validatedPet = petFormSchema.safeParse(pet);
    if (!validatedPet.success) {
        return {
            message: "Invalid pet data"
        }
    }

    try {
        await prisma.pet.create({
            data: {
                ...validatedPet.data,
                user: {
                    connect: {
                        id: session.user.id,
                    }
                }
            }
        })
    } catch (error) {
        return {
            message: 'Coudn\'t add pet'
        }
    }
    revalidatePath('/app', 'layout');
}

export async function editPet(petId: unknown, newPetData: unknown) {
    const session = await auth();
    if (!session?.user) {
        redirect('/login');
    }

    const validatedPetId = petIdSchema.safeParse(petId);
    const validatedPet = petFormSchema.safeParse(newPetData);
    if (!validatedPetId.success || !validatedPet.success) {
        return {
            message: "Invalid pet data"
        }
    }

    const pet = await prisma.pet.findUnique({
        where: {
            id: validatedPetId.data
        },
        select: {
            userId: true
        }
    })

    if (!pet){
        return {
            message: "Pet not found"
        }
    }
    if (pet.userId !== session.user.id) {
        return {
            message: "Not authorized"
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
    const session = await auth();
    if (!session?.user) {
        redirect('/login');
    }

    const validatedPetId = petIdSchema.safeParse(petId);

    if (!validatedPetId.success) {
        return {
            message: "Invalid pet data"
        }
    }

    const pet = await prisma.pet.findUnique({
        where: {
            id: validatedPetId.data
        },
        select: {
            userId: true
        }
    })
    if (!pet){
        return {
            message: "Pet not found"
        }
    }
    if (pet.userId !== session.user.id) {
        return {
            message: "Not authorized"
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