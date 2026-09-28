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

---

## Task 2 — Jokes API, shows list, booking form, MMKV persistence

**Date:** 2026-09-28 · **Tool:** Claude Code (Opus 5.5)

**Prompt:**

> TASK 2
>
> i reference folder there are 3 files
> data - the helpers that is using for generating random jokes, show rooms, etc.
> replace hardcoded fetchRandomJoke using https://official-joke-api.appspot.com/jokes/random API
> create use query abstract layer to that.
>
> on the top of the screen is card with joke. the joke is changed with animation every 30 second.
> load new joke from api
>
> the entry screen is home screen. when app is loaded show the list of available sits.
> each room has seats left. when user press on every room hi is navigate to the screen ShowDetailsScreen.
>
> for book the the ticket implemented using formic, i would like to use native react feature useActionState instead
> form should be on the bottom of the screen. use font icon to show ticket image
> install MMKV to keep the information about ticket between rerun the app, imitating sever integration.
>
> separate all logic into custom hooks. for rooms displaying use legendary list.
> also put styles in separate file as well, while we do not use any styled libs in this step.

(Follow-up prompt: "continue" — the session had paused on transient permission-check errors.)

**Summary of what was implemented:**

- **New dependencies** (exact versions, added to CLAUDE.md Stack): `react-native-mmkv@4.3.2`,
  `react-native-nitro-modules@0.37.1`, `@expo/vector-icons@15.1.1`. Expo pins verified unchanged.
- **Shared layers (`src/lib`)**
  - `http/http-client.ts` (axios instance) + `http/get-parsed.ts` (GET + zod parse).
  - `query/use-api-query.ts` — **the generic useQuery abstraction**: `useApiQuery({ queryKey, url, schema, ...options })`,
    every response is zod-validated before use.
  - `query/query-client.ts`, `query/use-app-state-focus.ts` (pauses refetch in background),
    `query/online-manager.ts` (NetInfo → React Query online state). `QueryClientProvider` added to `AppProviders`.
  - `storage/storage.ts` (MMKV instance) + `storage/json-storage.ts` (zod-validated JSON read/write).
- **`features/jokes`** — replaces the hardcoded `fetchRandomJoke`:
  `api/endpoints.ts` (URL), `types/joke.ts` (zod), `api/queries.ts` (`useRandomJokeQuery`,
  `refetchInterval` 30 s), `hooks/use-joke-card.ts` + `hooks/use-joke-card-animation.ts`
  (Reanimated fade/slide on each new joke id), `components/joke-card.tsx` (+ "New joke" button).
- **`features/shows`**
  - `data/shows.mock.ts` (seed from reference, `capacity` per show).
  - `server/shows-server.ts` — **fake backend** with latency; bookings saved to MMKV
    (`server/bookings-storage.ts`), `seatsLeft = capacity − booked`, rejects overbooking.
  - `api/queries.ts` (`useShowsQuery`, `useShowQuery`, `useShowBookingsQuery`), `api/mutations.ts`
    (`useBookTicketsMutation`, invalidates show queries), `api/query-keys.ts`, zod types in `types/`.
  - Hooks: `use-show-list.ts`, `use-show-details.ts`, `use-booking-form.ts` — **React 19 `useActionState`**
    (zod validation → mutation → idle/invalid/error/success state; `isPending` drives the button;
    a field's stale error hides once it is edited).
  - Components: `show-list.tsx` (**LegendList**, pull-to-refresh), `show-row.tsx`, `booking-form.tsx`
    (pinned to the bottom, bottom safe-area, Ionicons `ticket` font icons), `form-field.tsx`, `ticket-card.tsx`.
  - `screens/show-details-screen.tsx` — details + "Your tickets" + booking form, in a `KeyboardAwareScrollView`.
- **`features/home`** — Home screen: joke card fixed on top, show list below. `features/show-details`
  placeholder removed; `src/app/show/[id].tsx` now imports from `@features/shows`.
- **Styles** — every component has its own `*.styles.ts` with `StyleSheet.create`; light palette in
  `src/theme/colors.ts`, navigation theme uses it.
- **Checks:** `npm run lint` ✅, `npm run typecheck` ✅.
- **Simulator run** (iPhone 17 Pro, iOS 26.2): `pod install` + `expo run:ios` — build succeeded.
  Verified:
  - A joke loads from the API and rotates automatically every 30 s with the animation.
  - The list shows seats left, and tapping a show opens its details.
  - Submitting empty fields shows the name/email errors, and a quantity of 21 shows "No more than 6 tickets".
  - Booking 2 tickets showed the ticket card and success message.
  - Marcus Lin went from 4 to 2 seats left, and the booking was still there after a cold restart (MMKV).

**Not verified in the UI:** the server-side "Only N seats left" rejection (the logic is in
`shows-server.ts`), Android.

---

## Task 2.1 — Limit ticket quantity to seats left (before submit)

**Date:** 2026-09-28 · **Tool:** Claude Code (Opus 5.5)

**Prompt:**

> in booking form do not allow user enter the number of ticket that is higher then seats left. before user submit the form

**Summary of what was implemented:**

- `features/shows/utils/ticket-quantity.ts` — `maxTicketsFor(seatsLeft)` = min(6, seats left);
  `clampQuantityInput(text, max)` keeps digits only and caps the value at `max`.
- `use-booking-form.ts` now takes `seatsLeft`: the quantity is capped on every keystroke and again
  on every render (so it also shrinks if seats left drops after a refetch). The zod schema became
  `createBookingFormSchema(maxTickets)`, so submit-time validation uses the same limit as a backup.
- `booking-form.tsx` gets `seatsLeft` instead of `soldOut`: a hint "Up to N tickets per booking",
  `maxLength` equal to the limit's digit count, and the field is read-only when sold out.
- **Checks:** `npm run lint` ✅, `npm run typecheck` ✅.
- **Simulator** (hot reload): on Marcus Lin (2 seats left) the hint reads "Up to 2 tickets per
  booking", and typing more digits does not change the "2". The cap was also checked in Node with
  sample inputs: "5" with 2 seats → "2", "9"/"12" with 27 seats → "6", "a3" → "3".

**Not verified in the UI:** replacing the digit with a larger one (the simulator tool can't send
backspace or select text); that path was checked in Node only.
