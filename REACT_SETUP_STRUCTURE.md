# React Project Structure Setup

## Complete Directory Structure

When you create your new React project, you'll need this structure:

```
signal-frontend/
├── public/
│   └── vite.svg
├── server/
│   └── index.ts                 # Copy from server-index.ts
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   └── toaster.tsx        # Copy from toaster.tsx
│   │   ├── Layout/
│   │   │   ├── BaseLayout.tsx
│   │   │   └── index.ts
│   │   ├── Navigation/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── MobileNavbar.tsx
│   │   │   └── index.ts
│   │   ├── Search/
│   │   │   ├── SearchForm.tsx
│   │   │   ├── FilterPanel.tsx
│   │   │   └── index.ts
│   │   ├── Signal/
│   │   │   ├── SignalCard.tsx
│   │   │   ├── SignalList.tsx
│   │   │   └── index.ts
│   │   ├── Results/
│   │   │   ├── SearchResults.tsx
│   │   │   ├── ResultsTable.tsx
│   │   │   └── index.ts
│   │   └── Auth/
│   │       ├── ProtectedRoute.tsx
│   │       ├── LoginForm.tsx
│   │       └── index.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useSearch.ts
│   │   └── useSupabase.ts
│   ├── services/
│   │   ├── api.ts
│   │   ├── supabase.ts
│   │   └── searchApi.ts
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── SearchPage.tsx
│   │   ├── SearchResults.tsx
│   │   ├── SignalsPage.tsx
│   │   ├── SavedSearches.tsx
│   │   ├── SettingsPage.tsx
│   │   ├── ProfileSettings.tsx
│   │   ├── BillingSettings.tsx
│   │   └── NotFoundPage.tsx
│   ├── styles/
│   │   ├── variables.css
│   │   ├── layout.css
│   │   ├── sidebar.css
│   │   ├── search-form.css
│   │   ├── signal-card.css
│   │   ├── search-results.css
│   │   └── responsive.css
│   ├── types/
│   │   ├── auth.ts
│   │   ├── search.ts
│   │   └── api.ts
│   ├── utils/
│   │   ├── constants.ts
│   │   └── helpers.ts
│   ├── App.tsx                  # Copy from App.tsx
│   └── main.tsx                 # Copy from main.tsx
├── package.json                 # Copy from frontend-package.json
├── vite.config.ts              # Copy from frontend-vite.config.ts
├── tsconfig.json               # Copy from frontend-tsconfig.json
├── index.html                  # Copy from index.html
├── .env                        # Copy from frontend-env.example
└── README.md
```

## Quick Setup Commands

After creating your React project directory, run these commands:

```bash
# Create all directories
mkdir -p src/components/ui
mkdir -p src/components/Layout
mkdir -p src/components/Navigation
mkdir -p src/components/Search
mkdir -p src/components/Signal
mkdir -p src/components/Results
mkdir -p src/components/Auth
mkdir -p src/hooks
mkdir -p src/services
mkdir -p src/pages
mkdir -p src/styles
mkdir -p src/types
mkdir -p src/utils
mkdir -p server
mkdir -p public

# Copy configuration files (rename them)
cp frontend-package.json package.json
cp frontend-vite.config.ts vite.config.ts
cp frontend-tsconfig.json tsconfig.json
cp frontend-env.example .env
cp server-index.ts server/index.ts
cp App.tsx src/App.tsx
cp main.tsx src/main.tsx
cp toaster.tsx src/components/ui/toaster.tsx
# index.html stays in root

# Install dependencies
npm install
```

## File Locations Explained

**Current Files (in your Signal project):**
- `App.tsx` → Goes to `src/App.tsx`
- `main.tsx` → Goes to `src/main.tsx`
- `frontend-package.json` → Rename to `package.json`
- `frontend-vite.config.ts` → Rename to `vite.config.ts`
- `server-index.ts` → Goes to `server/index.ts`
- `index.html` → Stays in root directory

**Files You Need to Create:**
All the component files, hooks, services, pages, and styles need to be created based on the examples in:
- `REACT_COMPONENT_EXAMPLES.md`
- `REACT_STYLING_GUIDE.md`
- `REACT_FRONTEND_SPECIFICATION.md`

## Start Development

Once you have the structure:

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The `src/` directory is where all your React components, hooks, services, and styles will live. This is the standard React project structure that works with Vite and TypeScript.