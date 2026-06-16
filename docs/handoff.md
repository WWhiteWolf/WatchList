PROJECT: WatchList App (Cognitive Assistant - Production UI Phase)
FOUNDATION STATE: Initialized and verified via useWatchListState.js and types.js

OBJECTIVE FOR CLAUDE:
Generate a polished, production-ready, low-friction layout for the React Native App.js component. Maintain strict structural alignment with the existing data layer hooks while replacing the basic verification layout with a clean UI.

CURRENT ARCHITECTURE REFERENCE:
1. types.js:
   - Contains INITIAL_PROVIDERS array [{ id, name, isActive }].
   - Contains templates for MOVIE_TEMPLATE and TV_SHOW_TEMPLATE.

2. useWatchListState.js:
   - Core State hooks: providers, movies, tvShows.
   - Core Action hooks: 
     * addMovie(title, providerId)
     * addTvShow(title, providerId)
     * incrementEpisode(showId)
     * incrementSeason(showId)
     * toggleMovieStatus(movieId)

UI DESIGN REQUIREMENTS SPECIFIED FOR CLAUDE:
- Theme: Clean, minimal, high-contrast, optimized for single-user mobile interaction.
- Form Layout: High-visibility text input field with flat selector tokens for providers. 
- Clear Visual Split: Group lists clearly into two distinct sections:
  1. "Movies Bucket" (Grouped by To Watch vs Watched).
  2. "TV Show Progress Tracker" (Clear display of Season and Episode counts with quick-tap increment controls).
- Alignment: Do not alter the custom state hook name or function signatures. Inject them directly into your layout mechanics.