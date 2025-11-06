import React from 'react';
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";

export default function AuthForm() {
    return (
        <form>
            <div className={'space-y-1'}>
                <Label htmlFor={'email'}>Email</Label>
                <Input type={'email'} id={'email'} placeholder={'Email'}/>
            </div>
            <div className={'space-y-1 mb-4 mt-2'}>
                <Label htmlFor={'password'}>Password</Label>
                <Input type={'password'} id={'password'} placeholder={'Password'}/>
            </div>
            <Button>Log in</Button>
        </form>
    )
}