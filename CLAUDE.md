# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based web application using the "basics" starter template. The project uses TypeScript with strict configuration and follows Astro's standard project structure.

## Development Commands

All commands should be run from the project root:

- `npm run dev` - Start development server at localhost:4321
- `npm run build` - Build production site to ./dist/
- `npm run preview` - Preview production build locally
- `npm run astro` - Access Astro CLI commands
- `npm run astro -- --help` - Get Astro CLI help

## Architecture

The project follows Astro's file-based routing system:

- **Components**: Reusable Astro components in `src/components/`
- **Layouts**: Page templates in `src/layouts/` (currently uses `Layout.astro` as base layout)
- **Pages**: Route definitions in `src/pages/` (index.astro serves as homepage)
- **Assets**: Static assets in `src/assets/` and `public/`

## Key Configuration

- **TypeScript**: Uses Astro's strict TypeScript configuration (`astro/tsconfigs/strict`)
- **Build**: Minimal Astro configuration in `astro.config.mjs`
- **Entry Point**: `src/pages/index.astro` imports and renders the Welcome component within the Layout

## Development Notes

- The project uses Astro's component-based architecture with `.astro` files
- TypeScript is enabled with strict mode
- No additional frameworks or libraries beyond Astro core
- Static assets are served from the `public/` directory