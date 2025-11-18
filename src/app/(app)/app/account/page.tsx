import React from 'react';
import H1 from "@/components/h1";
import ContentBlock from "@/components/content-block";
import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";
import SignOutBtn from "@/components/sign-out-btn";

async function Page() {
    const session = await auth();
    if (!session?.user){
        redirect('/login');
    }

    return (
        <main>
            <H1 className={'my-8 text-white'}>Your account</H1>
            <ContentBlock className={'h-[500px] flex items-center flex-col gap-3 justify-center'}>
                <p>Logged in as {session.user.email}.</p>
                <SignOutBtn/>
            </ContentBlock>
        </main>
    );
}

export default Page;