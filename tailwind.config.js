// tailwind.config.js
const tailwindConfig = {
    darkMode: ["class"],
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    // theme: {
    //     extend: {
    //         colors: {
    //             accent: '#a4f839'
    //         }
    //     },
    // },
    plugins: [],
}

export default tailwindConfig