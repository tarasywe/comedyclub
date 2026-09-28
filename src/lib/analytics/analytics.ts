import * as amplitude from '@amplitude/analytics-react-native';

import { env } from '@/config/env';

import type { AnalyticsEventName, AnalyticsEvents } from './events';

const isEnabled = Boolean(env.amplitudeApiKey);

export function initAnalytics(userId: string) {
  if (!env.amplitudeApiKey) {
    console.warn('Analytics disabled: EXPO_PUBLIC_AMPLITUDE_KEY is not set in .env.local');
    return;
  }
  amplitude.init(env.amplitudeApiKey, undefined, {
    // session_start / session_end events give time spent in the app.
    trackingSessionEvents: true,
  });
  amplitude.setUserId(userId);
}

// Calls made before init are queued by the SDK and sent once it is ready.
export function trackEvent<TName extends AnalyticsEventName>(
  name: TName,
  properties: AnalyticsEvents[TName],
) {
  if (!isEnabled) return;
  amplitude.track(name, properties);
}
