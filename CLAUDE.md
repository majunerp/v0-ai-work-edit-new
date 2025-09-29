# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build production version
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Project Architecture

This is a Next.js 14 application generated from v0.app for an AI photo editing platform called "AI Work Editprotips". The project uses:

- **Framework**: Next.js 14 with App Router
- **Styling**: TailwindCSS 4.x with custom CSS variables and shadcn/ui components
- **UI Components**: Radix UI primitives via shadcn/ui
- **Package Manager**: pnpm (lockfile present)
- **Typography**: Geist Sans and Mono fonts
- **Analytics**: Vercel Analytics

### Key Architecture Details

- **Component Library**: Uses shadcn/ui with "new-york" style variant configured in `components.json`
- **Styling System**: CSS variables defined in `app/globals.css` for theming, with both light and dark mode support
- **Path Aliases**: `@/*` resolves to root directory, with specific aliases for components, utils, ui, lib, and hooks
- **Build Configuration**: ESLint and TypeScript errors are ignored during builds (`next.config.mjs`)

### Project Structure

- `app/` - Next.js App Router pages and layouts
- `components/ui/` - Reusable UI components from shadcn/ui
- `components/` - Custom React components including theme provider
- `lib/` - Utility functions (currently contains `cn` utility for className merging)
- `public/` - Static assets
- `styles/` - Global CSS files

### Important Notes

- The project is automatically synced with v0.app deployments
- Images are unoptimized in the build configuration
- Uses pnpm for package management - always use pnpm commands
- The application is a single-page landing page for an AI photo editing service

## Deployment

The project is deployed on Vercel and automatically syncs with v0.app changes. Any modifications should consider this sync relationship.