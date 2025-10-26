# Random ABC Generator

A random letter generator built with Next.js and optimized for Vercel deployment.

## Features

- Generate random letters with customizable options
- Support for multiple languages (English, Spanish, French)
- Responsive design for desktop and mobile
- Dark mode support
- Copy to clipboard functionality
- Modern UI with smooth animations

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This app is optimized for Vercel deployment:

```bash
npm run build
```

The app will be built as a static export suitable for Vercel hosting.

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- CSS Modules
- Vercel deployment

## Project Structure

```
randomletter/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── package.json
├── next.config.js
├── tsconfig.json
├── vercel.json
└── README.md
```