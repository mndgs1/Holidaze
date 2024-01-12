/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        fontSize: {
            sm: ["14px", "20px"],
            base: ["16px", "24px"],
            lg: ["18px", "26px"],
            xl: ["22px", "28px"],
            "2xl": ["24px", "32px"],
            "3xl": ["32px", "40px"],
        },
        extend: {
            fontFamily: {
                heading: ["Montserrat", "Quicksand", "sans-serif"],
                text: ["Roboto", "ui-serif"],
            },
            fontWeight: {
                heading: {
                    light: 300,
                    normal: 400,
                    semibold: 500,
                    bold: 700,
                },
                text: {
                    light: 300,
                    normal: 400,
                    bold: 700,
                },
            },
            spacing: {
                13: "52px",
                76: "304px",
            },
            colors: {
                primary: {
                    100: "#CDFADD",
                    200: "#9DF5C6",
                    300: "#68E3AD",
                    400: "#40C799",
                    DEFAULT: "#10A37F",
                    600: "#0B8C79",
                    700: "#08756F",
                    800: "#055A5E",
                    900: "#03434E",
                },
                secondary: {
                    100: "#EAF1F5",
                    200: "#D6E2EB",
                    300: "#A9B8C3",
                    400: "#717D88",
                    DEFAULT: "#2D333A",
                    600: "#202731",
                    700: "#161D29",
                    800: "#0E1421",
                    900: "#080D1B",
                },
                warning: {
                    100: "#FEEBD5",
                    200: "#FDD2AB",
                    300: "#FBB281",
                    400: "#F79361",
                    DEFAULT: "#F2622E",
                    600: "#D04321",
                    700: "#AE2A17",
                    800: "#8C150E",
                    900: "#74080A",
                },
            },
        },
    },
    plugins: [],
};
