// Every analytics event and its properties. No personal data (names, emails) goes here.
export type AnalyticsEvents = {
  app_opened: { first_open: boolean };
  joke_refreshed: { source: 'button' };
  joke_liked: JokeEventProperties;
  joke_unliked: JokeEventProperties;
  shows_refreshed: { source: 'pull_to_refresh' };
  shows_sorted: { sort_by: 'date' | 'seats' };
  show_viewed: { show_id: string };
  show_favorited: { show_id: string; source: ShowFavoriteSource };
  show_unfavorited: { show_id: string; source: ShowFavoriteSource };
  booking_submitted: { show_id: string; quantity: number };
};

export type JokeLikeSource = 'joke_card' | 'liked_jokes';

type JokeEventProperties = {
  joke_id: number;
  joke_setup: string;
  joke_punchline: string;
  source: JokeLikeSource;
};
export type ShowFavoriteSource = 'show_list' | 'show_details';

export type AnalyticsEventName = keyof AnalyticsEvents;
