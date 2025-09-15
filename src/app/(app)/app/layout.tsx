import React from 'react';
import AppFooter from "@/components/app-footer";
import BackgroundPattern from "@/components/background-pattern";
import AppHeader from "@/components/app-header";

function Layout({children}: { children: React.ReactNode }) {
    return (
        <>
            <BackgroundPattern/>
            <div className='max-w-[1050px] mx-auto px-4 flex flex-col min-h-screen'>
                <AppHeader/>
                {children}
                <AppFooter/>
            </div>
        </>

    );
}

export default Layout;