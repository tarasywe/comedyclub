import { storage } from '@/lib/storage/storage';

const USER_ID_KEY = 'analytics.user-id';

// RFC 4122 v4 shape. Only used as an anonymous analytics id, not for security.
function generateUserId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0;
    return (char === 'x' ? random : (random & 0x3) | 0x8).toString(16);
  });
}

// Generated on the first launch, then reused so every session maps to the same user.
export function getOrCreateUserId() {
  const existing = storage.getString(USER_ID_KEY);
  if (existing) return { userId: existing, isNew: false };

  const userId = generateUserId();
  storage.set(USER_ID_KEY, userId);
  return { userId, isNew: true };
}
