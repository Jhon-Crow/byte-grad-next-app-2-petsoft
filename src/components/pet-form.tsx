'use client'
import React from 'react';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {usePetContext} from "@/lib/hooks";
import {addPet, editPet} from "@/actions/actions";
import PetFormBtn from "@/components/pet-form-btn";
import {toast} from "sonner";

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
    return (
        <form className={'flex-col flex'}
              action={async (formData) => {
                  onFormSubmission();
                  const petData = {
                      name: formData.get('name') as string,
                      ownerName: formData.get('ownerName') as string,
                      imageUrl: formData.get('imageUrl') as string || 'https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png',
                      age: parseInt(formData.get('age') as string),
                      notes: formData.get('notes') as string
                  };
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
                    <Input name={'name'} id={'name'} type={'text'}
                           required
                           defaultValue={actionType === 'edit' ? selectedPet?.name : ''}
                    />
                </div>
                <div className='space-y-1'>
                    <Label htmlFor={'ownerName'}>Owner Name</Label>
                    <Input name={'ownerName'} id={'ownerName'}
                           type={'text'} required
                           defaultValue={actionType === 'edit' ? selectedPet?.ownerName : ''}
                    />
                </div>
                <div className='space-y-1'>
                    <Label htmlFor={'imageUrl'}>Image Url</Label>
                    <Input name={'imageUrl'} id={'imageUrl'}
                           type={'text'}
                           defaultValue={actionType === 'edit' ? selectedPet?.imageUrl : ''}
                    />
                </div>
                <div className='space-y-1'>
                    <Label htmlFor={'age'}>Age</Label>
                    <Input name={'age'} id={'age'} type={'text'}
                           required
                           defaultValue={actionType === 'edit' ? selectedPet?.age : ''}
                    />
                </div>
                <div className='space-y-1'>
                    <Label htmlFor={'notes'}>Notes</Label>
                    <Textarea
                        name={'notes'} id={'notes'} rows={3} required
                        defaultValue={actionType === 'edit' ? selectedPet?.notes : ''}
                    />
                </div>
            </div>
            <PetFormBtn actionType={actionType}/>
        </form>
    )
}