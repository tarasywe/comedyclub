import { useEffect } from 'react';

import { initAnalytics, trackEvent } from './analytics';
import { getOrCreateUserId } from './user-id';

let started = false;

// Runs once per app process (the guard also covers StrictMode's double effect).
export function useAnalyticsStart() {
  useEffect(() => {
    if (started) return;
    started = true;
    const { userId, isNew } = getOrCreateUserId();
    initAnalytics(userId);
    trackEvent('app_opened', { first_open: isNew });
  }, []);
}
