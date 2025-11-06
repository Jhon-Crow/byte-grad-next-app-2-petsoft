import {z} from "zod/v3";
import {DEFAULT_PET_IMAGE_URL} from "@/lib/consts";

export const petIdSchema = z.string().cuid();
export const petFormSchema = z.object({
    name: z.string().trim().min(1, 'Name is required').max(40, 'Name must be less than 40 characters'),
    ownerName: z.string().trim().min(1, 'Owner name is required').max(40, 'Owner name must be less than 40 characters'),
    imageUrl: z.union([
        z.literal(''),
        z.string().trim().url({message: 'Image URL is invalid'})
    ]),
    age: z.coerce.number().int().positive().max(100, 'Age must be less than 100'),
    notes: z.union([z.literal(''), z.string().trim().max(800, 'Notes must be less than' +
        ' 800 characters')
    ])
})
    .transform((data) => ({
        ...data,
        imageUrl: data.imageUrl || DEFAULT_PET_IMAGE_URL,
    }))

export type TFormData = z.infer<typeof petFormSchema>;
