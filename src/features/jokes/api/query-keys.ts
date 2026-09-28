export const jokeKeys = {
  all: ['jokes'] as const,
  random: () => [...jokeKeys.all, 'random'] as const,
};
