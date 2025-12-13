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
                        "background-light": "#f8fcf9",
                        "background-dark": "#102216",
                        "text-main": "#0d1b12",
                        "text-sub": "#4c9a66",
                    },
                    fontFamily: {
                        "display": ["Lexend", "sans-serif"]
                    },
                    borderRadius: {
                        "DEFAULT": "1rem",
                        "lg": "2rem",
                        "xl": "3rem",
                        "full": "9999px"
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