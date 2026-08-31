# Mangata & Gallo

A responsive luxury jewelry website built with React and Vite for Mangata & Gallo, a fictional jewelry brand specializing in timeless and elegant designs.

## Features

* Responsive design for desktop, tablet, and mobile devices
* Luxury-focused visual design
* Responsive navigation
* Hero banner with call-to-action
* Jewelry collection cards
* React component-based structure
* React Router navigation
* Custom 404 / Not Found page
* GitHub Pages deployment with GitHub Actions
* Optimized image handling using Vite assets

## Technologies

* React
* Vite
* React Router
* JavaScript
* HTML5
* CSS3
* Git & GitHub
* GitHub Actions

## Project Structure

```text
src/
├── assets/
│   ├── banner.jpg
│   ├── collection.jpg
│   ├── engagement.jpg
│   ├── wedding.jpg
│   └── logo/
│
├── components/
│   ├── Header.jsx
│   ├── Banner.jsx
│   ├── Card.jsx
│   ├── Footer.jsx
│   ├── Home.jsx
│   ├── Development.jsx
│   └── NotFound.jsx
│
├── App.jsx
├── App.css
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

The application will be available at the local URL provided by Vite.

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Pages

| Route          | Page              |
| -------------- | ----------------- |
| `/`            | Home              |
| `/collections` | Under Development |
| `/about`       | Under Development |
| `/contact`     | Under Development |
| `*`            | 404 Not Found     |

## Deployment

The project is configured for deployment to GitHub Pages using GitHub Actions.

Every push to the deployment branch triggers the workflow, which builds the React application and deploys the generated `dist` folder to GitHub Pages.

## Design

The design uses a luxury-inspired visual style with:

* Warm ivory backgrounds
* Dark charcoal tones
* Gold accents
* Elegant typography
* Subtle hover effects
* Responsive layouts


This project was created for educational purposes.
