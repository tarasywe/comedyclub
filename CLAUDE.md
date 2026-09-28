# Project Instructions for AI Agents

## Stack

Expo SDK 57 · React 19.2 + React Compiler · Expo Router v6 · Zustand · React Query v5 · Axios · zod · Npm
package manager · @types/node (devDep, app.config.ts reads process.env / fs) ·
react-native-keyboard-controller (wrapped in KeyboardProvider in the root
layout; requires react-native-reanimated)

UI & interaction: react-native-gesture-handler · react-native-reanimated ·
· react-native-svg · react-dom and
react-native-web (required on native by gluestack v5's react-aria dependency)
· @legendapp/list
· @react-native-community/netinfo (connectivity) · @tanstack/react-query-persist-client +
@tanstack/query-sync-storage-persister · react-native-mmkv 4 + react-native-nitro-modules
(local key-value storage; the fake shows server keeps bookings here) · @expo/vector-icons
(font icons, Ionicons / MaterialCommunityIcons) · @amplitude/analytics-react-native (analytics;
key `EXPO_PUBLIC_AMPLITUDE_KEY` in .env.local) + @react-native-async-storage/async-storage 2.2.0
(Amplitude's storage; pinned in `overrides` so only one native copy exists)

Tooling (devDeps): TypeScript 6.0.3 · ESLint 9 + eslint-config-expo (flat config) · @types/jest ·
@types/react. Checks: `npm run lint`, `npm run typecheck`, `npm run check` (both).
iOS run: `npm run ios` (`expo run:ios`).

## Non-negotiable rules

1. Route files in src/app/ are ≤15 lines: import screen from a feature, export it.
2. Features import other features ONLY via their index.ts. Architecture check is
   planned (gen:arch / arch:check scripts not yet scaffolded).
3. Server data → React Query. Client state → Zustand. Screen-local → useState. Never mix.
4. Every API response is parsed with zod in features/\*/types before use. No `any`.
5. Do NOT write useMemo/useCallback/React.memo — React Compiler handles it.
8. No new dependencies without updating this file's Stack section.
10. Navigation paths come from src/config/links.ts, never hardcoded strings.

## Code culture (every session)

1. **Single responsibility per file.** endpoints.ts = URLs. queries.ts = reads. mutations.ts = writes. store.ts = client-only state. types/*.ts = zod + inferred types. If a second concern appears, split the file.
2**Aliases only for cross-cuts.** `@/lib`, `@/components/shared`, `@/utils`, `@/config`, `@/stores`, `@/theme`, `@features/<x>`, `@ui/*`, `@/assets`. Relative imports are intra-feature only. No deep `../../..`.
3**React Compiler owns memoization.** Never write useMemo / useCallback / React.memo.
4**Explicit public APIs.** A feature's index.ts is a deliberate allowlist, never `export *`.
6**Clean / testable / extensible by construction.** Small files, one job each, named exports, no `any`, no `console` (warn/error only), no hardcoded route strings (use links.ts).


- **Routes dir:** src/app/ (Expo Router modern default), not root app/. Functionally identical.
- **TS strict flags:** `verbatimModuleSyntax` is OFF (gluestack v5 alpha ships type-only imports
  without `import type`, pulled in transitively). Re-enable once gluestack v5 stabilizes.
- **`.npmrc` pins `legacy-peer-deps=true`** — expo-router's radix/vaul chain still declares
  React 19.0 peers. Removing it breaks `npm install`.
- **The Expo SDK is pinned to 57.0.4, exactly.** Every `expo-*` dependency has an exact
  version and `overrides` pins the transitive ones (`expo-modules-core@57.0.3`,
  `expo-modules-jsi@57.0.1`, `@expo/ui@57.0.4`). Reason: SDK 57.0.5+ cannot be compiled by
  Xcode 26.2 / Swift 6.2.3. **Never run `npx expo install --fix`** — it undoes the pins and
  breaks the iOS build. All Expo modules must move together; a mismatched one fails at
  *launch* with a dyld `Symbol not found: ...ExpoModulesCore...` error, not at compile time.
  Ranges do not work (`~57.0.4` resolves to 57.0.21). 
- **`expo-router@57.0.4` does not export the `Theme` type** — `src/theme/navigation-theme.ts`
  derives it from `ComponentProps<typeof ThemeProvider>`. Leave it that way while pinned.
- **`newArchEnabled` / `edgeToEdgeEnabled`** are not set in app.config.ts: both are always-on
  in SDK 57 and are no longer part of the `ExpoConfig` type.
- **Transitive Expo pins:** besides the three above, `overrides` also pins every other transitive
  `expo-*` / `@expo/*` package to the version that was current on the 57.0.4 release day
  (2026-07-07): expo-asset, expo-file-system, expo-keep-awake, expo-glass-effect, expo-symbols,
  expo-modules-autolinking, @expo/dom-webview, @expo/cli, @expo/router-server, @expo/metro-runtime,
  @expo/prebuild-config, expo-server. Without them npm resolves the `^57.0.x` ranges to 57.0.2x.
  Third-party native libs use the exact versions from expo@57.0.4's `bundledNativeModules.json`
  (react-native 0.86.0, reanimated 4.5.0, worklets 0.10.0, screens 4.25.2, svg 15.15.4, …).

- **Light theme only.** `userInterfaceStyle: 'light'` (native), `Uniwind.setTheme('light')` before the
  first render and `GluestackUIProvider mode="light"` (app-providers), light navigation theme, dark
  status-bar text. Tokens are plain `:root` variables in global.css, with no `@variant light/dark`:
  UniWind always registers both built-in themes and errors ("Theme dark is missing variable") if a
  themed variable exists in only one. Don't add `dark:` classes.

- **TS 6** defaults `types` to `[]`, so tsconfig lists `"types": ["jest", "node"]`.
  `noUncheckedIndexedAccess` is off because generated gluestack files fail it.
- **CocoaPods** needs `LANG=en_US.UTF-8` or `pod install` crashes with an ASCII-8BIT error.
