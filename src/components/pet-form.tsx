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

export default function PetForm({actionType, onFormSubmission}: Props) {
    const {selectedPet} = usePetContext();
    return (
        <form className={'flex-col flex'}
              action={async (formData) => {
                  const error = actionType === 'add' ? await addPet(formData) : await editPet(selectedPet!.id, formData);
                  if (error) {
                      toast.error(error.message);
                      return;
                  }
                  onFormSubmission();
              }}
        >
            <div className={'space-y-3'}>
                <div className='space-y-1'>
                    <Label htmlFor={'name'}>Name</Label>
                    <Input name={'name'} id={'name'} type={'text'} required
                           defaultValue={actionType === 'edit' ? selectedPet?.name : ''}
                    />
                </div>
                <div className='space-y-1'>
                    <Label htmlFor={'ownerName'}>Owner Name</Label>
                    <Input name={'ownerName'} id={'ownerName'} type={'text'} required
                           defaultValue={actionType === 'edit' ? selectedPet?.ownerName : ''}
                    />
                </div>
                <div className='space-y-1'>
                    <Label htmlFor={'imageUrl'}>Image Url</Label>
                    <Input name={'imageUrl'} id={'imageUrl'} type={'text'}
                           defaultValue={actionType === 'edit' ? selectedPet?.imageUrl : ''}
                    />
                </div>
                <div className='space-y-1'>
                    <Label htmlFor={'age'}>Age</Label>
                    <Input name={'age'} id={'age'} type={'text'} required
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