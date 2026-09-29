# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal homepage website built with Vue 3 and Vite. It features a dynamic wallpaper background with a loading animation, a main content section displaying project links, and a footer with author information and social links.

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server with hot reload
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint and fix code
pnpm lint

# Format code with Prettier
pnpm format
```

## Architecture

### Core Structure
- **Entry Point**: `src/main.js` - Simple Vue 3 app initialization
- **Root Component**: `src/App.vue` - Manages overall layout and loading states
- **State Management**: `src/store/store.js` - Minimal reactive state using Vue 3 Composition API

### Component Architecture
The application follows a component-based architecture with clear separation of concerns:

- **WallpaperView.vue**: Handles background image loading with Bing daily wallpaper API and blur animation
- **LoadingView.vue**: Shows loading screen while wallpaper loads
- **MainView.vue**: Displays project cards and main content
- **FooterView.vue**: Contains author info, ICP filing numbers, and social links

### Configuration
- **Site Configuration**: `src/config/site.config.js` - Centralized configuration for:
  - Author information
  - ICP filing numbers (Chinese regulatory requirement)
  - Social media links
  - Project list with icons and descriptions

### Styling
- Uses SCSS for styling with scoped styles in components
- Global styles in `src/assets/style.scss`
- CSS custom properties for theming

## Key Features

### Dynamic Wallpaper System
The wallpaper system uses Bing's daily image API with a sophisticated loading animation:
- Initial blur effect that animates to clear
- Minimum 1.6s display time for loading animation
- Fallback to local images if needed
- Overlay gradient for better text readability

### Project Card Display
Projects are configured in `site.config.js` and displayed as cards with:
- Custom SVG icons
- Hover effects
- External link navigation

### Chinese Compliance
The application includes Chinese ICP filing numbers in the footer, which is a legal requirement for websites hosted in China.

## Development Notes

- Uses Vue 3 Composition API with `<script setup>` syntax
- Vite for build tooling with path aliases (`@` maps to `src/`)
- ESLint with Vue plugin and Prettier integration
- No TypeScript - plain JavaScript with Vue SFCs
- Uses pnpm as package manager (specified in engines)

## File Organization

```
src/
├── assets/         # Static assets (CSS, SCSS, images)
├── components/     # Vue components
│   ├── icons/     # SVG icon components
│   └── [views].vue
├── config/         # Configuration files
├── store/          # State management
└── main.js         # Application entry point
```

## Build Output

The build process creates optimized static files in the `dist/` directory suitable for deployment to any static hosting service.