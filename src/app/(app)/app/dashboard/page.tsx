import React from 'react';
import Stats from "@/components/stats";
import Branding from "@/components/branding";

function Page() {
    return (
        <main>
            <div className="flex items-center justify-between text-white py-8">
                <Branding/>
                <Stats/>
            </div>
        </main>
    );
}

export default Page;