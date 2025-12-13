# Nuxt + Sanity V2

A modern blog application built with Nuxt 4 and Sanity CMS.

## Project Structure

```
nuxt-sanity-v2/
├── frontend/     # Nuxt 4 frontend application
└── studio/       # Sanity content management studio
```

## Prerequisites

- Node.js 18+
- pnpm 10+
- A Sanity account (free at [sanity.io](https://www.sanity.io))

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/nuxt-sanity-v2.git
cd nuxt-sanity-v2
```

### 2. Create a Sanity project

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Create a new project
3. Note your **Project ID**

### 3. Set up environment variables

**Frontend:**
```bash
cp frontend/.env.example frontend/.env
```

Edit `frontend/.env` and add your Sanity project ID:
```
NUXT_SANITY_PROJECT_ID=your_project_id_here
NUXT_SANITY_DATASET=production
NUXT_SANITY_API_VERSION=2025-10-01
```

**Studio:**
```bash
cp studio/.env.example studio/.env
```

Edit `studio/.env` and add your Sanity project ID:
```
SANITY_STUDIO_PROJECT_ID=your_project_id_here
SANITY_STUDIO_DATASET=production
```

### 4. Install dependencies

```bash
# Install frontend dependencies
cd frontend
pnpm install

# Install studio dependencies
cd ../studio
pnpm install
```

### 5. Deploy the schema to Sanity

```bash
cd studio
pnpm run deploy
```

### 6. Run the development servers

**Terminal 1 - Sanity Studio:**
```bash
cd studio
pnpm run dev
```
Studio will be available at http://localhost:3333

**Terminal 2 - Nuxt Frontend:**
```bash
cd frontend
pnpm run dev
```
Frontend will be available at http://localhost:3000

## Features

- Blog posts with rich text content
- Dynamic routing with slugs
- Image optimization via Sanity CDN
- TypeScript support
- Modern development tooling

## Tech Stack

- **Frontend:** Nuxt 4, Vue 3, TypeScript
- **CMS:** Sanity v4
- **Package Manager:** pnpm

## License

MIT
