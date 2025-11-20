'use server';
import {prisma} from "@/lib/db";
import {revalidatePath} from "next/cache";
import {authSchema, petFormSchema, petIdSchema} from "@/lib/validations";
import {signIn, signOut} from "@/lib/auth";
import bcrypt from "bcryptjs";
import {checkAuth, getPetById} from "@/lib/server-utils";
import {redirect} from "next/navigation";
import {Prisma} from "@/generated/prisma";

// --- User actions ---
export async function logIn(formData: unknown) {
    if (!(formData instanceof FormData)) {
        return {
            message: "Invalid form data"
        }
    }

    await signIn('credentials', formData);
    redirect('/app/dashboard');
}

export async function signUp(formData: unknown) {
    if (!(formData instanceof FormData)) {
        return {
            message: "Invalid form data"
        }
    }
    const formDataObj = Object.fromEntries(formData);

    const validatedFormData = authSchema.safeParse(formDataObj);
    if (!validatedFormData.success) {
        return {
            message: "Invalid form data"
        }
    }

    const {email, password} = validatedFormData.data;
    const hashedPassword = await bcrypt.hash(
        password, 10
    );
try {
    await prisma.user.create({
        data: {
            email: email,
            hashedPassword,
        }
    })
 } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
            return {
                message: 'User already exists'
            }
        }
    }
    return {
        message: 'Coudn\'t create user'
    }
 }
    await signIn('credentials', validatedFormData.data);
}

export async function logOut() {
    await signOut({redirectTo: '/'});
}

// --- Pet actions ---
export async function addPet(pet: unknown) {

    const session = await checkAuth();

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
    const session = await checkAuth();

    const validatedPetId = petIdSchema.safeParse(petId);
    const validatedPet = petFormSchema.safeParse(newPetData);
    if (!validatedPetId.success || !validatedPet.success) {
        return {
            message: "Invalid pet data"
        }
    }

    const pet = await getPetById(validatedPetId.data);

    if (!pet) {
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
    const session = await checkAuth();

    const validatedPetId = petIdSchema.safeParse(petId);

    if (!validatedPetId.success) {
        return {
            message: "Invalid pet data"
        }
    }

    const pet = await getPetById(validatedPetId.data);
    if (!pet) {
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