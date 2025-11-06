'use client'
import React from 'react';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {usePetContext} from "@/lib/hooks";
import PetFormBtn from "@/components/pet-form-btn";
import {toast} from "sonner";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {DEFAULT_PET_IMAGE_URL} from "@/lib/consts";
import {petFormSchema, TFormData} from "@/lib/validations";

type Props = {
    actionType: 'edit' | 'add',
    onFormSubmission: () => void
}


export default function PetForm({
                                    actionType,
                                    onFormSubmission
                                }: Props) {
    const {
        selectedPet,
        handleAddPet,
        handleEditPet
    } = usePetContext();

    const {
        getValues,
        register,
        trigger,
        formState: {errors}
    } = useForm<TFormData>({
        resolver: zodResolver(petFormSchema),
        defaultValues: {
            name: selectedPet?.name,
            ownerName: selectedPet?.ownerName,
            imageUrl: selectedPet?.imageUrl,
            age: selectedPet?.age,
            notes: selectedPet?.notes,
        }
    });

    return (
        <form className={'flex-col flex'}
              action={async () => {
                  const result = await trigger();
                  if (!result) return;
                  onFormSubmission();
                  const petData = getValues();
                  petData.imageUrl = petData.imageUrl || DEFAULT_PET_IMAGE_URL;
                  const error = actionType === 'add' ? await handleAddPet(petData) : await handleEditPet(selectedPet!.id, petData);
                  if (error) {
                      toast.error(error.message);
                      return;
                  }
              }}
        >
            <div className={'space-y-3'}>
                <div className='space-y-1'>
                    <Label htmlFor={'name'}>Name</Label>
                    <Input id={'name'} {...register('name')}/>
                    {errors.name &&
                        <p className="text-red-500">{errors.name.message}</p>}
                </div>
                <div className='space-y-1'>
                    <Label htmlFor={'ownerName'}>Owner Name</Label>
                    <Input id={'ownerName'} {...register('ownerName')}/>
                    {errors.ownerName &&
                        <p className="text-red-500">{errors.ownerName.message}</p>}
                </div>
                <div className='space-y-1'>
                    <Label htmlFor={'imageUrl'}>Image Url</Label>
                    <Input id={'imageUrl'} {...register('imageUrl')}/>
                    {errors.imageUrl &&
                        <p className="text-red-500">{errors.imageUrl.message}</p>}
                </div>
                <div className='space-y-1'>
                    <Label htmlFor={'age'}>Age</Label>
                    <Input id={'age'} {...register('age')}/>
                    {errors.age &&
                        <p className="text-red-500">{errors.age.message}</p>}
                </div>
                <div className='space-y-1'>
                    <Label htmlFor={'notes'}>Notes</Label>
                    <Textarea id={'notes'} {...register('notes')}/>
                    {errors.notes &&
                        <p className="text-red-500">{errors.notes.message}</p>}
                </div>
            </div>
            <PetFormBtn actionType={actionType}/>
        </form>
    )
}