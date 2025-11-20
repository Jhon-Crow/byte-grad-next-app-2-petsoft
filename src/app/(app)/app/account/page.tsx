import React from 'react';
import H1 from "@/components/h1";
import ContentBlock from "@/components/content-block";
import SignOutBtn from "@/components/sign-out-btn";
import {checkAuth} from "@/lib/server-utils";

async function Page() {
    const session = await checkAuth();

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