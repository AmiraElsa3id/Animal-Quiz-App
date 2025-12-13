export default {
  content: [
    "./index.html",
    "./pages/**/*.{js,html}"
  ],
  darkMode: "class",
            theme: {
                extend: {
                     colors: {
                        "primary": "#2bee6c",
                        "primary-hover": "#25d660",
                        "background-light": "#f8fcf9",
                        "background-dark": "#102216",
                        "surface-light": "#ffffff",
                        "surface-dark": "#1a2e22",
                        "text-main-light": "#0d1b12",
                        "text-main-dark": "#f0fdf4",
                        "text-sub-light": "#4c9a66",
                        "text-sub-dark": "#8ecfa3",
                        "border-light": "#e7f3eb",
                        "border-dark": "#2a4535",
                    fontFamily: {
                        "display": ["Lexend", "sans-serif"],
                        "body": ["Noto Sans", "sans-serif"],
                    },
                     borderRadius: {"DEFAULT": "1rem", "lg": "1.5rem", "xl": "2rem", "2xl": "3rem", "full": "9999px"},
                },
                },
            },
}


// {
//             darkMode: "class",
//             theme: {
//                 extend: {
//                     colors: {
//                         "primary": "#2bee6c",
//                         "background-light": "#f8fcf9",
//                         "background-dark": "#102216",
//                         "text-main": "#0d1b12",
//                         "text-sub": "#4c9a66",
//                     },
//                     fontFamily: {
//                         "display": ["Lexend", "sans-serif"]
//                     },
//                     borderRadius: {
//                         "DEFAULT": "1rem",
//                         "lg": "2rem",
//                         "xl": "3rem",
//                         "full": "9999px"
//                     },
//                 },
//             },
//         }