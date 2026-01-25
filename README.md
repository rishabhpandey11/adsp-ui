📘 Interactive Learning Platform

An interactive, chapter-based learning platform built using Angular, Angular Material, D3.js, GSAP animations, and Pyodide, designed to visually explain complex concepts through simulations, charts, and interactive controls.

🚀 Tech Stack

Angular – Frontend framework for building modular, scalable UI

Angular Material (Material UI) – Prebuilt UI components and theming

D3.js – Interactive data visualizations and charts

GSAP (GreenSock Animation Platform) – Smooth, high-performance animations

Pyodide – Running Python directly in the browser for computations and algorithms

Tailwind CSS  – Utility-first styling (if used)

Project Structure

src/
│
├── app/
│   ├── components/
│   │   ├── chapter1/
│   │   ├── chapter2/
│   │   ├── chapter3/
│   │   └── ...
│   │
│   ├── subtopics/
│   │   ├── chapter1/
│   │   │   ├── subtopictopic1/
│   │   │   ├── lab2/
│   │   │   └── ...
│   │   ├── chapter2/
│   │   └── ...
│   │
│   └── shared/
│
├── assets/
│   ├── images/
│        ├── chap1/
│        └── chap2/
│
└── styles/

🧩 Folder Explanation

🔹 components/

Contains all main chapters of the platform.

Each chapter is a standalone Angular component.

Chapters act as top-level learning modules.

 
subtopics/

Represents subcategories of each chapter.
Each subtopic focuses on a specific concept, simulation, or interactive demo.
Often includes:
Sliders
D3 charts
Python Editor
Audio or signal visualizations

utils/
it has directives and other helper components

🛠️ Setup & Installation
🛠️ Angular Project Setup Commands
1️⃣ Install Node.js

Angular requires Node.js (LTS).

👉 Download from:
https://nodejs.org/

Verify installation:
node -v
npm -v

2️⃣ Install Angular CLI (Global)
npm install -g @angular/cli

verify:
ng version

3️⃣ Create a New Angular Project
ng new project-name


How to insall dependencies?
npm install

run the project
ng serve

App runs at default port:4200
http://localhost:4200


📦 Common Dependency Installs 
Angular Material
ng add @angular/material

D3.js
npm install d3

GSAP
npm install gsap

Pyodide
npm install pyodide
(or load via CDN if required)

Tailwind CSS (Optional)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init

🧪 Useful Angular Commands
Generate Component
ng generate component component-name


Short form:
ng g c component-name

Build Project
ng build


Production build:
ng build --configuration production