/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        "./index.html",
        "./src/**/**/*.{js,ts,jsx,tsx}",
        "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
    ],
    theme: {
        screens: {
            'xs': '275px',
            ...defaultTheme.screens,
        },
        extend: {
            colors: {
                accent: 'rgb(var(--accent-color) / <alpha-value>)',
                appBg: 'var(--color-bg)',
                appText: 'var(--color-text)',
            },
            fontFamily: {
                display: ['var(--font-display-theme)', 'Georgia', 'serif'],
                sans: ['var(--font-body)', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [],
}
