# AI Usage Log

## Task 1 — Expo project setup with stack navigation

**Date:** 2026-09-28 · **Tool:** Claude Code (Opus 5.5)

**Prompt:**

> setup new Expo project. All dependencies described in CLAUDE.md file
>
> implement each step separately, without desicions about next steps.
> Do not write unit test for now, only lint and typescript checks.
> Finalize every step and instructions with running application in simulor.
> Put every prompt into AI_USAGE_LOG file with short sammury what was implemented.
>
> TASK 1
> Setup Expo project with stack navigation.
> Run it in emulator, make sure it works. Log the request and results into md file.
> Then i will retest, make commit and give next task

**Summary of what was implemented:**

- **Project scaffold** (package.json written by hand, not via `create-expo-app`, so versions stay exact):
  Expo SDK **57.0.4**, React 19.2.3, React Native 0.86.0, Expo Router 57.0.4, `main: expo-router/entry`.
- **Version pinning per CLAUDE.md:** every dependency has an exact version; `overrides` pins the
  transitive `expo-*` / `@expo/*` packages to the versions current on 2026-07-07 (release day of
  57.0.4). Third-party native libs use versions from expo@57.0.4's `bundledNativeModules.json`.
  Verified after install that no Expo package drifted to 57.0.7+.
- **Stack dependencies installed** (only installed, not wired up yet): zustand, @tanstack/react-query,
  persist-client + sync-storage-persister, axios, zod, @legendapp/list, netinfo, react-native-svg,
  react-native-web / react-dom, gesture-handler, reanimated + worklets, keyboard-controller.
  (react-native-mmkv was briefly installed, then removed after CLAUDE.md dropped the MMKV mention.)
  CLAUDE.md Stack section got a short "Tooling (devDeps)" line for TypeScript / ESLint / @types (rule 8).
- **Config:** `app.config.ts` (light-only UI, bundle id `com.comedyclub.app`, typed routes, React
  Compiler), `.npmrc` (`legacy-peer-deps=true`), `tsconfig.json` (strict, path aliases from CLAUDE.md,
  `types: ["jest","node"]`, `reference/` excluded), `eslint.config.js` (expo flat config, no-console
  except warn/error, no-explicit-any), `.gitignore` (template + `.idea/`).
- **Stack navigation:**
  - `src/app/_layout.tsx` — root `Stack` wrapped in `AppProviders`.
  - `src/components/shared/app-providers.tsx` — `KeyboardProvider` + light navigation `ThemeProvider` + dark `StatusBar`.
  - `src/theme/navigation-theme.ts` — `Theme` type derived from `ComponentProps<typeof ThemeProvider>`.
  - `src/config/links.ts` — `home`, `showDetails(id)` route builders.
  - Routes `src/app/index.tsx` and `src/app/show/[id].tsx` only re-export screens from
    `@features/home` and `@features/show-details` (placeholder screens, unstyled).
- **Checks:** `npm run lint` ✅, `npm run typecheck` ✅ (also after typed-route generation).
- **Simulator run:** `expo prebuild` + `pod install` + `expo run:ios` on iPhone 17 Pro (iOS 26.2,
  Xcode 26.2) — build succeeded, 0 errors. Home → "Open show details" pushes the details screen
  (native back button shows "Comedy Club"), "Go back" pops back to Home. No runtime warnings in Metro.

**Not done in this step (intentionally):** styling (screens are unstyled placeholders),
React Query / persister wiring, `GestureHandlerRootView`, Android run, unit tests.
