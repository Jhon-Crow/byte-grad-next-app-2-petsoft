import React from 'react';
import H1 from "@/components/h1";
import AuthForm from "@/components/auth-form";
import Link from "next/link";

function Page() {
    return (
        <main>
            <H1 className={'text-center'}>Login page</H1>
            <AuthForm/>
            <p className={'mt-6 text-sm text-zinc-500'}>Don&apos;t have an account?
                <Link className={'font-medium'} href={'/signup'}> Sign up</Link>
            </p>
        </main>
    );
}

export default Page;
