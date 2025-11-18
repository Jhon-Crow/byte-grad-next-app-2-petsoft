import React from 'react';
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {logIn, signUp} from "@/actions/actions";

type AuthFormProps = {
    type: 'login' | 'signup';
}

export default function AuthForm({
                                     type
                                 }: AuthFormProps) {
    return (
        <form action={type === 'login' ? logIn : signUp}>
            <div className={'space-y-1'}>
                <Label htmlFor={'email'}>Email</Label>
                <Input name={'email'} type={'email'} id={'email'} placeholder={'Email'}/>
            </div>
            <div className={'space-y-1 mb-4 mt-2'}>
                <Label htmlFor={'password'}>Password</Label>
                <Input name={'password'} type={'password'} id={'password'} placeholder={'Password'}/>
            </div>
            <Button>{type === 'signup' ? 'Sign up' : 'Log in'}</Button>
        </form>
    )
}