import React from 'react';
import {Button, ButtonProps} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";

type PetButtonProps = {
    actionType: 'edit' | 'checkout' | 'add',
}
type Props = PetButtonProps & ButtonProps;

export default function PetButton({actionType, children, ...props}: Props) {
    if (actionType === 'add') {
        return (
            <Button
                {...props}
                size={"icon"}>
                <PlusIcon className={'w-6 h-6'}/>
                {children}
            </Button>
        )
    }
    if (actionType === 'edit') {
        return (
            <Button
                {...props}
                variant={"secondary"}>{children}</Button>
        )
    }

    if (actionType === 'checkout') {
        return (
            <Button
                variant={"secondary"}
                {...props}
            >{children}</Button>
        )
    }
}