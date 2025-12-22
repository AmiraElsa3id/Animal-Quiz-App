# Animal Quiz App

A responsive, front-end web application for creating and taking animal-themed quizzes. Includes teacher and student dashboards, sign-up / sign-in flows, quiz creation, quiz taking, and results screens.

Repository: https://github.com/AmiraElsa3id/Animal-Quiz-App

Primary languages: HTML, CSS, JavaScript

---

## Table of contents
- Features
- Tech stack
- Quick start
- Development
- Usage
- Project structure
- Notes
- Contributing
- License

---

## Features
- Sign up / Sign in flows (client-side)
- Teacher dashboard: create and manage exams/quizzes
- Student dashboard: take quizzes and view results
- Per-quiz results page with scoring
- Responsive UI using Tailwind and custom CSS
- Sample quiz data included in the repository

## Tech stack
- HTML (structure)
- CSS (Tailwind + custom styles)
- JavaScript (vanilla)
- Static front-end; data and auth are handled client-side (localStorage / sample data)

## Quick start
To run the app locally (static):

1. Clone the repo

   git clone https://github.com/AmiraElsa3id/Animal-Quiz-App.git

2. Open index.html in your browser by double-clicking it, or serve the folder with a simple static server (recommended):

   npx http-server . -p 8080

   Then open http://localhost:8080

## Development
The repository includes Tailwind configuration and npm files. If you want to rebuild Tailwind or run development tools:

1. Install dependencies

   npm install

2. Common tasks (if scripts are present in package.json):

   - Start dev/watch: npm run dev
   - Build for production: npm run build

If there are no relevant scripts, you can edit the HTML/CSS/JS files directly and reload index.html in your browser.

## Usage
- Sign up as a teacher or student via the sign-up page.
- Teachers can create and manage quizzes from the teacher dashboard.
- Students can select and take quizzes and view results at the end.

## Project structure (top-level)
- index.html — main entry file
- assets/ — images and media
- css/ — custom styles
- js/ — JavaScript logic
- data/ — sample exam / quiz data files
- pages/ — additional pages (dashboards, results, etc.)
- tailwind.config.js — Tailwind configuration
- package.json / package-lock.json — project metadata & dependencies

## Notes
- This is a static front-end application. Persistence (if present) is client-side (localStorage). If you need server-backed storage or authentication, add a backend.
- No LICENSE file is present in the repository. Add a license (for example, MIT) if you want to allow reuse.

## Contributing
1. Fork the repo.
2. Create a feature branch: git checkout -b feat/your-feature
3. Commit your changes and push.
4. Open a pull request describing your changes and how to test them.

## License
This repository does not include a license file. If you want an open, permissive license, consider adding an MIT LICENSE file.

---

If you'd like, I can also add a LICENSE file (MIT) and basic screenshots to the README.