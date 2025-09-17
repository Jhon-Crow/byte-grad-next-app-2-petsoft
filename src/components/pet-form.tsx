import React from 'react';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";

type Props = {
    actionType: 'edit' | 'add',
}

export default function PetForm({actionType}: Props) {
    return (
        <form className={'flex-col flex'}>
            <div className={'space-y-3'}>
                <div className='space-y-1'>
                    <Label htmlFor={'name'}>Name</Label>
                    <Input id={'name'} type={'text'}/>
                </div>
                <div className='space-y-1'>
                    <Label htmlFor={'ownerName'}>Owner Name</Label>
                    <Input id={'ownerName'} type={'text'}/>
                </div>
                <div className='space-y-1'>
                    <Label htmlFor={'imageUrl'}>Image Url</Label>
                    <Input id={'imageUrl'} type={'text'}/>
                </div>
                <div className='space-y-1'>
                    <Label htmlFor={'age'}>Age</Label>
                    <Input id={'age'} type={'text'}/>
                </div>
                <div className='space-y-1'>
                    <Label htmlFor={'notes'}>Notes</Label>
                    <Textarea id={'notes'} rows={3}/>
                </div>
            </div>
            <Button type={'submit'} className={'mt-5 self-end'}>
                {actionType === 'add' ? 'Add a new pet' : 'Edit pet'}
            </Button>
        </form>
    )
}