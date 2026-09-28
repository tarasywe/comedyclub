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

---

## Task 3 — Amplitude analytics, liked jokes, favorite shows, filter & sort

**Date:** 2026-09-28 · **Tool:** Claude Code (Opus 5.5)

**Prompt:**

> TASK 3
>
> Integrate app with @amplitude/analytics-react-native
> the api key is located in .env.local
>
> when app is starting generate unique user identifier to set user id in analytics servce
> in reference folder there is already analytics helpers, use them also set the user on start
>
> ```ts
> import { setUserId } from '@amplitude/analytics-react-native';
>
> // Set a unique identifier for the current user
> setUserId('user_123456');
> ```
>
> so we can track ticket purchasing with another session events, like time in app, visiting rooms etc.
>
> i header menu add 'smile' icon that cry and smile, and add that icon on card with joke. when user press on that emogy (put it besides the next button), the joke is saving to local stogare. then, when user press on button in header he is navigating to new screen with liked jokes. implement list of the jokes using legendary list. add 'unlike' button, so it will remove from storage. the newest jokes on top
>
> also add 'start' icons to the rooms. when user starred room, it should keep as well in storage. when user navigate to the room he can see star on top, pressing on icon the room becomes 'unstarred'
> add filter option on home screen. if user press on star besides near the title 'upcoming shows', the list is filtering and only favorite rooms is visible. impelemt 'onmount' and 'onmount' animation so when count of lines changed, user can see some sliding down and up of rows.
>
> the events to track
> 1) user is open app (first time set user id)
> 2) user is reques new joke
> 3) user like or unlike the joke
> 4) user request manula refresh
> 5) user favorite or unfavorite the room
> 6) user books the sits

**Follow-up prompt (same task):**

> i missed to add sorting option. the rooms shouuld be sorted by date or fewest seets. implement the button with calendar icon or with chair.

**Summary of what was implemented:**

- **Env file:** the key was in `env.local` (no leading dot). It was renamed to `.env.local`, because Expo
  only auto-loads `.env.local` and only that name is gitignored. Variable: `EXPO_PUBLIC_AMPLITUDE_KEY`,
  read in `src/config/env.ts`.
- **New dependencies** (exact, in CLAUDE.md Stack): `@amplitude/analytics-react-native@1.10.2`,
  `@react-native-async-storage/async-storage@2.2.0` (Expo's bundled version; also pinned in
  `overrides` so Amplitude doesn't pull a second native copy). Expo pins verified unchanged.
- **Analytics layer (`src/lib/analytics`)**
  - `analytics.ts`: `initAnalytics(userId)` runs `amplitude.init` with `trackingSessionEvents: true`
    (session_start/end give time in app) and then `setUserId`. `trackEvent(name, props)` is typed
    against `events.ts`. If the key is missing, analytics is off and a warning is logged.
  - `user-id.ts`: generates a UUID-v4 style id on the first launch, stores it in MMKV, and reuses it
    so every session maps to the same user.
  - `use-analytics-start.ts`: called once in `AppProviders`. Sets the user and tracks `app_opened { first_open }`.
- **Events** (reference names kept where they existed; no names or emails are sent):
  `app_opened`, `joke_refreshed` (New joke button), `joke_liked` / `joke_unliked` (source: card or list),
  `shows_refreshed` (pull-to-refresh), `show_favorited` / `show_unfavorited` (source: list or details),
  `booking_submitted { show_id, quantity }`, plus `show_viewed { show_id }` for "visiting rooms".
- **Client state in Zustand + MMKV:** `src/lib/storage/zustand-storage.ts` (persist adapter).
  `features/jokes/store.ts` (liked jokes, newest first) and `features/shows/store.ts` (favorite show ids).
- **Liked jokes:** `emoticon-lol` icon (face with tears of joy) next to "New joke" to like/unlike,
  header button with a count badge → new `/liked-jokes` route (`links.likedJokes`). `LikedJokesScreen`
  uses `AnimatedLegendList` with an "Unlike" button per row. All logic is in hooks
  (`use-joke-like`, `use-liked-jokes`, `use-liked-jokes-button`).
- **Favorite shows:** a star on every row, and a star in the details header (`Stack.Screen` `headerRight`) that
  toggles it. Logic in `use-favorite-show`.
- **Filter & sort on Home:** buttons next to the title. Star = only favorites (title becomes
  "Favorite shows"). Calendar/seat icon = sort by date / fewest seats (ties stay in date order,
  `utils/sort-shows.ts`). State lives in `use-show-list`.
- **Animations:** rows fade in/out on mount/unmount (Reanimated `entering`/`exiting`), and remaining rows
  slide to their new position (`itemLayoutAnimation={LinearTransition}`) when filtering, sorting or
  unliking. `recycleItems={false}` so rows remount and the animations play.
- **Checks:** `npm run lint` ✅, `npm run typecheck` ✅.
- **Simulator run** (iPhone 17 Pro): `pod install` + `expo run:ios` — build succeeded. Verified:
  - Liking a joke fills the icon and updates the header badge.
  - The liked-jokes screen lists the newest first, and Unlike fades the row out while the next one slides up.
  - Starring from a row and unstarring from the details header both work.
  - The favorites filter and the date/seats sort work, with rows sliding.
  - Liked jokes and stars survive a cold restart.
  - With temporary debug logging (since removed), Amplitude confirmed delivery ("Event tracked successfully",
    `success` response) for `app_opened { first_open: false }`, `joke_refreshed`, `joke_liked`, `show_favorited`.

**Not verified end-to-end:** that `joke_unliked`, `show_unfavorited`, `show_viewed`, `shows_refreshed`
and `booking_submitted` reach Amplitude (same `trackEvent` path, but debug logging was off when they
fired), and `first_open: true` (the id already existed on this simulator). Nothing was checked in the
Amplitude dashboard.

---

## Task 3.1 — Track sort changes, joke text in like/unlike events

**Date:** 2026-09-28 · **Tool:** Claude Code (Opus 5.5)

**Prompt:**

> add also track when user change sorting option. also when we try liked/unliked joke add test to information

(Read "add test to information" as: add the joke text to the event properties.)

**Summary of what was implemented:**

- New event `shows_sorted { sort_by: 'date' | 'seats' }`, tracked in `use-show-list.ts` when the
  calendar/seat button toggles the sort.
- `joke_liked` / `joke_unliked` now carry `joke_setup` and `joke_punchline` next to `joke_id` and
  `source`, built by `features/jokes/utils/joke-event-properties.ts`. The liked-jokes list's Unlike
  now passes the whole joke (not just the id) so the text is available there too.
- **Checks:** `npm run lint` ✅, `npm run typecheck` ✅.
- **Simulator** (with temporary Amplitude debug logging, removed afterwards): Amplitude confirmed
  `joke_liked` and `joke_unliked` with the joke text (e.g. "What's the best time to go to the dentist?" /
  "Tooth hurty.") and `shows_sorted { sort_by: "seats" }`, with no warnings or errors.

---

## Task 4 — README and findings

**Date:** 2026-09-28 · **Tool:** Claude Code (Opus 5.5)

**Prompt:**

> TASK 4
>
> implement short and README file how to run and build app on local environment
>
> also fill findings with what was changed
>
> 1) RN cli - > Expo
> 2) scroll view - > legend list
> 3) split the code into modern architecture folder, add the layers
> 4) connect real backend api
> 5) add misset event tracking (users/liked jokes etc)
> 6) check capacity of rooms, validation
> 7) keep the data between the session using mmkv
>
> for now this

(Follow-up during the task: "do not run any script". All work stopped at that point; the rest was
done by editing files only.)

**Summary of what was implemented:**

- `README.md` (was empty):
  - Requirements, and why a development build is needed (Expo Go won't work).
  - `.env.local` setup.
  - Running with `npm run ios` / `npm start`, the Release build command, and `npm run check`.
  - A short project structure and notes (Expo 57.0.4 pin, fake shows backend, how to reset local data).
- `FINDINGS.md` (was empty): the 7 points, each as "Before" (the problem in `reference/`) and "Now".
  It also covers bugs found in the reference code:
  - The `setInterval` was never cleared.
  - A FlatList was nested in a ScrollView, with index keys.
  - "Book now" skipped validation.
  - The user's name and email were sent to analytics.
  - The hardcoded joke; seats left never changed.
- It says plainly that shows/bookings still use a fake MMKV-backed server and only jokes use a real API.
- **Checks:** `npm run check` ✅ (run before the "do not run any script" message).

**Not verified:** the local Release build (`npx expo run:ios --configuration Release`).
- The first attempt failed compiling react-native-svg: `glog/logging.h` and `folly/Range.h` were not found.
- A retry failed with "build database is locked" (another build was running at the same time).
- No further runs after the user asked not to run scripts. The README marks this command as not verified.
- No code changed in this task, so the Debug app is the same one tested in Task 3.1.
