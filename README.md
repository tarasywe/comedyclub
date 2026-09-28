# Comedy Club

Expo (SDK 57) app: a joke of the moment, upcoming shows, ticket booking, liked jokes and favorite shows.

## Requirements

- macOS with **Xcode 26.2** and an iOS Simulator (tested on iPhone 17 Pro, iOS 26.2)
- **Node 20+** and npm
- CocoaPods
- Android Studio for Android (not tested yet)

The app uses native modules (MMKV, Amplitude), so it needs a **development build**. Expo Go won't work.

## Setup

```bash
npm install
```

Create `.env.local` in the project root (it is gitignored):

```bash
EXPO_PUBLIC_AMPLITUDE_KEY=<your Amplitude API key>
```

Without the key the app still runs; analytics is just switched off (you'll see a warning in the console).

## Run (development)

```bash
LANG=en_US.UTF-8 npm run ios
```

This runs `expo run:ios`: it generates `ios/`, installs pods, builds the app, installs it on the
simulator and starts Metro. `LANG` is needed, or `pod install` fails with an ASCII-8BIT error.

After the first build, when only JS changed, just start Metro and open the installed app:

```bash
npm start
```

Restart Metro after editing `.env.local`, because the values are inlined at bundle time.

Android: `npm run android` (not tested yet).

## Build (local release)

```bash
LANG=en_US.UTF-8 npx expo run:ios --configuration Release
```

This builds the Release configuration, with the JS bundle embedded, and installs it on the simulator.

> **Not verified yet.** The first local attempt failed compiling react-native-svg (`glog/logging.h` /
> `folly/Range.h` not found in the prebuilt React Native dependency headers). A retry then hit
> "build database is locked" because another build was running. The Debug build (`npm run ios`) works.

## Checks

```bash
npm run check
```

This runs `npm run lint` (ESLint, expo config) and `npm run typecheck` (`tsc --noEmit`).

## Project structure

```
src/
  app/          Expo Router routes (thin: import a screen from a feature)
  features/     jokes, shows, home: screens, components, hooks, api, types, store
  lib/          http (axios + zod), query (React Query), storage (MMKV), analytics (Amplitude)
  components/   shared components (app providers)
  config/       env, route links
  theme/        colors, navigation theme
  utils/        shared helpers
```

## Things to know

- **Expo is pinned to 57.0.4** (newer 57.0.x can't compile with Xcode 26.2). Don't run
  `npx expo install --fix`; it removes the pins. See `CLAUDE.md`.
- **The shows / bookings backend is a fake**: `src/features/shows/server/`, with data kept in MMKV.
  Jokes come from the real [Official Joke API](https://official-joke-api.appspot.com/jokes/random).
- **Reset local data** (bookings, liked jokes, favorites, analytics user id): delete the app from
  the simulator.
