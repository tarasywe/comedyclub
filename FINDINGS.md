# Findings

What was wrong or missing in the original code (`reference/`) and what changed.

## 1. React Native CLI → Expo

**Before:** RN CLI setup with React Navigation wired by hand (`RootStackParamList`, `useNavigation`).

**Now:** Expo SDK 57 with Expo Router (file-based stack, typed routes) and the React Compiler.
All route paths come from `src/config/links.ts`. The Expo SDK is pinned to 57.0.4 so it builds
with Xcode 26.2.

## 2. ScrollView → LegendList

**Before:** a `FlatList` nested inside a `ScrollView` (a virtualized list inside a scroll view, so it
doesn't virtualize). `keyExtractor` used the array index, so rows got mixed up after sorting.

**Now:** the shows list and the liked-jokes list use `AnimatedLegendList`, keyed by id. The joke
card sits above the list. Rows animate in and out, and slide when you filter or sort.

## 3. Feature-based architecture with layers

**Before:** one ~230-line `HomeScreen` mixing fetching, timers, list state, the form, analytics and styles.

**Now:**
- **Layers:** `app/` (routes, ≤15 lines) → `features/*` (screens, components, hooks, api, types, store)
  → `lib/` (http, query, storage, analytics) → `config/`, `theme/`, `utils/`.
- **Logic:** all of it lives in custom hooks. Each component has a separate `*.styles.ts` file.
- **Boundaries:** features only import each other through `index.ts`.
- **State:**
  - Server data → React Query.
  - Client state → Zustand.
  - Screen state → `useState`.
- **Forms:** Formik + Yup were replaced by React 19 `useActionState` + zod.

## 4. Real backend API

**Before:** `fetchRandomJoke()` returned the same hardcoded joke. The 30 s `setInterval` was never
cleared (a leak that kept fetching after unmount), and it had no loading or error state.

**Now:**
- **Jokes:** they come from the Official Joke API through a generic `useApiQuery` (axios + zod
  validation). React Query's `refetchInterval` handles the 30 s rotation and pauses in the background.
- **Screen states:** loading and error are both handled.
- **Shows and bookings:** there's still no real backend for these. They go through a fake server
  layer (`features/shows/server`) with the same React Query hooks, so a real API can replace it
  without touching the UI.

## 5. Missing event tracking

**Before:**
- **Missing events:** only 3 events were sent, and none had a user id.
- **Personal data:** `booking_submitted` sent the user's **name and email** to analytics.
- **Wrong event:** `booking_submitted` fired even when the form was invalid.

**Now:**
- **Setup:** Amplitude, with a persistent anonymous user id (`setUserId`) and session tracking (time in app).
- **Events:** typed events.
  - `app_opened` (with `first_open`).
  - `joke_refreshed`.
  - `joke_liked` / `joke_unliked` (with the joke text).
  - `shows_refreshed`, `shows_sorted`.
  - `show_viewed`.
  - `show_favorited` / `show_unfavorited`.
  - `booking_submitted`, sent only after a successful booking and without personal data.

## 6. Room capacity and validation

**Before:**
- **"Book now":** it skipped validation and always showed "You're on the list".
- **Ticket count:** it wasn't checked against the seats left.
- **Seats left:** the number never changed.

**Now:**
- **Validation:** zod checks the name, the email and the ticket count.
- **Ticket limit:** the ticket field can't go above min(6, seats left), and a hint shows the limit.
- **Server check:** the fake server also rejects overbooking.
- **Seats left:** booking lowers the number on the list and on the details screen.
- **Sold out:** the form is disabled.

## 7. Data kept between sessions (MMKV)

**Before:** everything was in memory and lost when the app restarted.

**Now:** MMKV keeps the following:
- Bookings (fake server).
- Liked jokes and favorite shows (Zustand `persist`).
- The analytics user id.

All of it survives an app restart. This was checked on the simulator.
