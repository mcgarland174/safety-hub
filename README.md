# Psychedelic Safety Hub

A comprehensive React application providing evidence-based information about psychedelic substance safety, contraindications, and harm reduction practices.

## Features

- **Substance Explorer**: Detailed information about individual psychedelic substances
- **Condition Explorer**: Search medical conditions and medications for contraindications
- **Substance Comparison**: Side-by-side comparison of safety profiles
- **Harm Reduction Guide**: Evidence-based practices for minimizing risks

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)

### Installing Node.js

If you don't have Node.js installed:

1. Visit [nodejs.org](https://nodejs.org/)
2. Download the LTS (Long Term Support) version
3. Run the installer and follow the prompts
4. Verify installation by opening a terminal and running:
   ```bash
   node --version
   npm --version
   ```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including React, Vite, Tailwind CSS, and other dependencies.

### 2. Run Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173` (or another port if 5173 is in use).

### 3. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### 4. Preview Production Build

```bash
npm run preview
```

This serves the production build locally for testing.

## Project Structure

```
psychedelic-safety-hub-app/
├── src/
│   ├── components/        # React components
│   │   ├── home-page.tsx
│   │   ├── substance_explorer.tsx
│   │   ├── condition_explorer.tsx
│   │   ├── substance-comparison.tsx
│   │   └── harm-reduction-explorer.tsx
│   ├── data/              # JSON data files
│   │   ├── schema_registry.json
│   │   ├── general_risks_schema.json
│   │   ├── harm_reduction_schema.json
│   │   └── substance_*.json (9 files)
│   ├── utils/             # Utility functions
│   │   └── dataLoader.ts
│   ├── App.tsx            # Main app component with routing
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Deployment

### Deploy to Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Deploy:
   ```bash
   netlify deploy --prod
   ```

### Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

### Deploy to GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json` scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```

3. Update `vite.config.ts` with your repo name:
   ```ts
   export default defineConfig({
     plugins: [react()],
     base: '/your-repo-name/',
   })
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

## Data Sources

The application uses 12 JSON schema files containing evidence-based information about:
- 9 psychedelic substances (Psilocybin, LSD, MDMA, DMT, 5-MeO-DMT, Ayahuasca, Ketamine, Ibogaine, 2C-x)
- General risks and contraindications
- Harm reduction strategies
- Cross-referenced medical and safety data

## Medical Disclaimer

This application is for educational and harm reduction purposes only. It does not constitute medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals before making decisions about substance use.

## Contributing

This is an educational project. If you'd like to contribute updates to the safety data or improve the application, please ensure all information is evidence-based and properly cited.

## License

Educational use only. Please respect the sensitive nature of this content and use it responsibly.
