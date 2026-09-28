import type { StateStorage } from 'zustand/middleware';

import { storage } from './storage';

// Lets zustand's persist middleware keep client state in MMKV.
export const zustandStorage: StateStorage = {
  getItem: (key) => storage.getString(key) ?? null,
  setItem: (key, value) => storage.set(key, value),
  removeItem: (key) => {
    storage.remove(key);
  },
};
