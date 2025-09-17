'use client'
import React from 'react';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {usePetContext} from "@/lib/hooks";

type Props = {
    actionType: 'edit' | 'add',
    onFormSubmission: () => void
}

export default function PetForm({actionType, onFormSubmission}: Props) {
    const {handleAddPet} = usePetContext();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newPet = {
            name: formData.get('name') as string,
            ownerName: formData.get('ownerName') as string,
            imageUrl: formData.get('imageUrl') as string || 'https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png',
            age: +(formData.get('age') as string),
            notes: formData.get('notes') as string,
        };
        handleAddPet(newPet);
        onFormSubmission();
    }
    return (
        <form onSubmit={handleSubmit} className={'flex-col flex'}>
            <div className={'space-y-3'}>
                <div className='space-y-1'>
                    <Label htmlFor={'name'}>Name</Label>
                    <Input name={'name'} id={'name'} type={'text'} required/>
                </div>
                <div className='space-y-1'>
                    <Label htmlFor={'ownerName'}>Owner Name</Label>
                    <Input name={'ownerName'} id={'ownerName'} type={'text'} required/>
                </div>
                <div className='space-y-1'>
                    <Label htmlFor={'imageUrl'}>Image Url</Label>
                    <Input name={'imageUrl'} id={'imageUrl'} type={'text'}/>
                </div>
                <div className='space-y-1'>
                    <Label htmlFor={'age'}>Age</Label>
                    <Input name={'age'} id={'age'} type={'text'} required/>
                </div>
                <div className='space-y-1'>
                    <Label htmlFor={'notes'}>Notes</Label>
                    <Textarea name={'notes'} id={'notes'} rows={3} required/>
                </div>
            </div>
            <Button type={'submit'} className={'mt-5 self-end'}>
                {actionType === 'add' ? 'Add a new pet' : 'Edit pet'}
            </Button>
        </form>
    )
}