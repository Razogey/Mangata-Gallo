# Mangata & Gallo

A responsive luxury jewelry website built with React and Vite for Mangata & Gallo, a fictional brand focused on timeless and elegant designs.

## Features

- Responsive layouts for desktop, tablet, and mobile
- Luxury-inspired visual design with ivory, charcoal, and gold tones
- Responsive navigation with active route states
- Hero banners with calls to action
- Collection and product cards
- Product and collection detail pages
- Login and registration forms with validation
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
src/
├── assets/
│   ├── logo/
│   ├── products/
│   ├── about-hero.jpg
│   ├── banner.jpg
│   ├── collections-hero.jpg
│   └── contact-hero.jpg
├── components/
│   ├── Banner.jsx
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── Development.jsx
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   └── SocialAuth.jsx
├── data/
│   ├── about.js
│   ├── collections.js
│   ├── contact.js
│   ├── featuredProducts.js
│   ├── navigation.js
│   └── products.js
├── layouts/
│   └── MainLayout.jsx
├── pages/
│   ├── About.jsx
│   ├── CollectionDetails.jsx
│   ├── Collections.jsx
│   ├── Contact.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Notfound.jsx
│   ├── ProductDetails.jsx
│   └── Register.jsx
├── routes/
│   └── AppRoutes.jsx
├── styles/
│   └── *.css
├── App.jsx
├── index.css
└── main.jsx
```

## Getting Started

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Vite will provide the local URL in the terminal.

### Run the linter

```bash
npm run lint
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
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
| `*` | 404 Not Found |

## Deployment

The project is configured for GitHub Pages using GitHub Actions. Every push to the `main` branch runs the workflow in `.github/workflows/deploy.yml`, installs dependencies, builds the application, and deploys the generated `dist` directory to GitHub Pages.

## Design

The design combines warm ivory backgrounds, dark charcoal text, gold accents, elegant typography, subtle hover effects, and responsive layouts to create a refined jewelry-shopping experience.

This project was created for educational purposes.
