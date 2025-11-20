import React from 'react';
import AppFooter from "@/components/app-footer";
import BackgroundPattern from "@/components/background-pattern";
import AppHeader from "@/components/app-header";
import PetContextProvider from "@/contexts/pet-context-provider";
import SearchContextProvider from "@/contexts/search-context-provider";
import {Toaster} from "@/components/ui/sonner";
import {checkAuth, getPetsByUserId} from "@/lib/server-utils";

async function Layout({children}: { children: React.ReactNode }) {
    const session = await checkAuth();
    const pets = await getPetsByUserId(session.user.id);

    return (
        <>
            <BackgroundPattern/>
            <div className='max-w-[1050px] mx-auto px-4 flex flex-col min-h-screen'>
                <AppHeader/>
                <SearchContextProvider>
                    <PetContextProvider data={pets}>
                        {children}
                    </PetContextProvider>
                </SearchContextProvider>
                <AppFooter/>
            </div>
            <Toaster position={"bottom-right"}/>
        </>

    );
}

export default Layout;