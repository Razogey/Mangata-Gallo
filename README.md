# Mangata & Gallo

A responsive luxury jewelry website built with React and Vite for Mangata & Gallo, a fictional brand focused on timeless and elegant designs.

## Features

- Responsive layouts for desktop, tablet, and mobile
- Luxury-inspired visual design with ivory, charcoal, and gold tones
- Responsive navigation with active route states
- Hero banners with calls to action
- Collection and product cards
- Product and collection detail pages
- Login, registration, and forgot-password forms with frontend validation
- Responsive mobile navigation with keyboard and Escape-key support
- Structured footer with navigation and contact links
- Accessible contact email and telephone links
- React Router navigation
- Custom 404 page
- Vite asset handling for images and logos
- GitHub Pages deployment through GitHub Actions

## Technologies

- React 19
- Vite
- React Router
- JavaScript
- HTML5 and CSS3
- React Icons
- ESLint
- GitHub Actions

## Project Structure

```text
frontend/
├── public/
├── src/
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

## Getting Started

### Install dependencies

```bash
cd frontend
npm install
```

### Run the development server

```bash
cd frontend
npm run dev
```

Vite will provide the local URL in the terminal.

### Run the linter

```bash
cd frontend
npm run lint
```

### Build for production

```bash
cd frontend
npm run build
```

### Preview the production build

```bash
cd frontend
npm run preview
```

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/collections` | Collections |
| `/collections/:slug` | Collection details |
| `/products/:slug` | Product details |
| `/about` | About Us |
| `/contact` | Contact Us |
| `/login` | Login |
| `/register` | Register |
| `/forgot-password` | Forgot Password |
| `*` | 404 Not Found |

## Deployment

The project is configured for GitHub Pages using GitHub Actions. Every push to the `main` branch runs the workflow in `.github/workflows/deploy.yml`, installs dependencies, builds the application, and deploys the generated `dist` directory to GitHub Pages.

## Current scope

This repository currently contains a frontend-only prototype. Product and contact data
are static, and the Login, Register, Forgot Password, and Contact forms perform local
validation and UI feedback only. Search, Cart, social authentication, checkout,
payments, and backend API integration are not implemented.

The frontend is prepared for future API integration through reusable components,
slug-based product routes, and a consistent product data structure.

## Design

The design combines warm ivory backgrounds, dark charcoal text, gold accents, elegant typography, subtle hover effects, and responsive layouts to create a refined jewelry-shopping experience.

This project was created for educational purposes.
