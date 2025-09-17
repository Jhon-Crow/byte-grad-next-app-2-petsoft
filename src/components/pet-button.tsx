'use client'
import React, {useState} from 'react';
import {Button, ButtonProps} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import PetForm from "@/components/pet-form";

type PetButtonProps = {
    actionType: 'edit' | 'checkout' | 'add',
}
type Props = PetButtonProps & ButtonProps;

export default function PetButton({actionType, children, ...props}: Props) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    if (actionType === 'checkout') {
        return (
            <Button
                variant={"secondary"}
                {...props}
            >{children}</Button>
        )
    }
    return (
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
                {actionType === 'add' ?
                    (
                        <Button {...props} size={"icon"}>
                            <PlusIcon className={'w-6 h-6'}/>
                            {children}
                        </Button>
                    ) : (
                        <Button {...props} variant={"secondary"}>{children}</Button>
                    )
                }
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {actionType === 'add' ? 'Add Pet' : 'Edit Pet'}
                    </DialogTitle>
                </DialogHeader>
                <PetForm actionType={actionType} onFormSubmission={() => setIsFormOpen(false)}/>
            </DialogContent>
        </Dialog>
    )


}