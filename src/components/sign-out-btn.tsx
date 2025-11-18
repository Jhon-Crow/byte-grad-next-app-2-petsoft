'use client';
import React from 'react';
import {Button} from "@/components/ui/button";
import {logOut} from "@/actions/actions";

export default function SignOutBtn() {
    return (
        <Button onClick={async () => await logOut()}>Sign out</Button>
    )
}