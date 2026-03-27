This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



## Running Environment

- **Node.js**: Recommended LTS version (18+). Download from [nodejs.org](https://nodejs.org/en).
- **Package manager**: [**pnpm**](https://pnpm.io/) (recommended).

## Tech Stack
- **Framework**: [Next.js](https://nextjs.org) App Router (TypeScript, React 19, Next 16).
- **Styling**:
  - [Tailwind CSS](https://tailwindcss.com/)
  - [shadcn/ui](https://ui.shadcn.com/) component library under `components/ui`
- **State & Data Fetching**:
  - [@tanstack/react-query](https://tanstack.com/query/latest) for server state management and data fetching
  - [axios](https://axios-http.com/) Promise based HTTP client for the browser and node.js
- **Forms & Validation**:
  - [react-hook-form](https://react-hook-form.com/)
  - [Zod](https://zod.dev/) schemas for type‑safe validation
  - Integration pattern: [use react-hook-form with shadcn/ui](https://ui.shadcn.com/docs/forms/react-hook-form)
- **Linting & Quality**:
  - [ESLint](https://eslint.org/) for static analysis

## Project Structure

```
.
├─ app/
│ ├─ api/ # API route handlers (App Router)
│ ├─ layout.tsx # Root layout (metadata, providers, global shells)
│ ├─ page.tsx # Main entry page
│ └─ globals.css # Global styles (Tailwind base + app-wide CSS)
│
├─ components/
│ ├─ provider/
│ │ └─ index.tsx # Global providers (e.g. React Query, theme, etc.)
│ └─ ui/ # shadcn/ui based components
│   ├─ button.tsx
│   ├─ dialog.tsx
│   ├─ input.tsx
│   └─ ... # other reusable UI primitives
│
├─ hooks/
│ └─ use-mobile.ts # Example custom hook(s)
│
├─ public/ # Static assets
│ └─ .gitkeep
│
├─ package.json
├─ pnpm-lock.yaml
└─ README.md
```

## Getting Started


### 1. Install Dependencies

Use **pnpm**:

```bash
pnpm install
# or
pnpm i
```

### 2.Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
* The main page is defined in [app/page.tsx](./app/page.tsx).
* Changes to this file (and other files under app/) will trigger hot reload automatically.

## Run with Production

### 1. Build
```bash
pnpm build
```
### 2. Start in Production Mode

```bash
pnpm start
```

By default, the app will run on http://localhost:3000 in production mode. Make sure you have configured all required environment variables before deploying.
