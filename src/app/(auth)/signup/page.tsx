import React from 'react';
import H1 from "@/components/h1";
import AuthForm from "@/components/auth-form";
import Link from "next/link";

function Page() {
    return (
        <main>
            <H1 className={'text-center'}>Sign up</H1>
            <AuthForm/>
            <p className={'mt-6 text-sm text-zinc-500'}>Already have an account?
                <Link className={'font-medium'} href={'/login'}> Log in</Link>
            </p>
        </main>
    );
}

export default Page;
