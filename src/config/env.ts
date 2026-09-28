// EXPO_PUBLIC_* values are inlined at build time from .env.local, so access them directly.
export const env = {
  amplitudeApiKey: process.env.EXPO_PUBLIC_AMPLITUDE_KEY,
};
