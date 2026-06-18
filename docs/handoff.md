# Hand-off note — read at the start of the next session

## FIRST THING TO CONFIRM

The **persistence + spacing** work (session 4) is already committed — `git log` shows **"Data Persist & screen padding."** (`useWatchListState.js`, `App.js`, `package.json`). Only the **docs updates** from session 4 remain to be committed (this file + `parked-items.md`). Confirm those got committed, then Patrick states the one goal.

## What I need to be fresh and synced (read this first)

Each session starts blank. Folder access does not carry over. Before I can help, Patrick connects the `WatchList` folder in Cowork's folder picker (a UI action — not a file upload). If I ever say the folder looks empty, that's the missing step: ask Patrick to connect it.

Once connected, I read the app's code and these tracking docs straight from the folder. Patrick tells me **the one goal**, I say how heavy it looks, and I wait for his "go" before changing anything. At session end I write a fresh version of this note.

## Standing rules (always apply)

- **Patrick does all git commits.** Claude edits files and leaves them for Patrick to commit.
- **No "boxed" multiple-choice questions.** Ask open questions in plain prose.
- **Verify before asserting.** Read the actual code before describing behavior. When unsure, say so and offer to look.
- **One change at a time.** Discuss before building; make one edit, stop, let Patrick review before the next.
- **Plain English, concise.** Low jargon, short sentences.

## Project — what WatchList is

A low-friction memory aid for tracking what to watch and where it streams. Patrick is retired; he built it in the same spirit as Remember When (the `elderlyassistant` project). It must stay modular so it can run on its own now and be folded into Remember When later.

**What the app does today:**

- You type a movie or show title, pick a streaming provider (YouTube TV, Netflix, Paramount, HBO), and tap **Add Movie** or **Add TV Show**.
- **Movies** carry a status you flip between "To Watch" and "Watched," shown beside the title.
- **TV shows** track progress with a season/episode count and two buttons, **+Ep** and **+Seas** (+Seas bumps the season and resets the episode to 1).
- **Data now persists.** Movies, shows, and progress are saved to the device and survive closing/reloading the app. (New this session — see below.)

The code is clean and coherent: `App.js` (the screen), `useWatchListState.js` (the data/actions hook), and `types.js` (the provider list) all line up.

## BIG ITEM THIS SESSION (session 4) — persistence is DONE

The top parked item is finished. WatchList now saves its data.

1. **Storage library** — added `@react-native-async-storage/async-storage`, pinned to **`2.2.0`** in `package.json` to match Remember When. (Note: `npx expo install` couldn't reach Expo's compatibility checker from the workspace, so it was installed directly with npm. 2.2.0 is the correct version for SDK 54.)
2. **`useWatchListState.js` rewritten to mirror Remember When's pattern** — exactly how `elderlyassistant` screens (shopping.tsx, todo.tsx, etc.) do it:
   - A `loadData()` runs once on mount (in a `useEffect`), reading the saved lists back and only setting state `if (saved)`.
   - `saveMovies(m)` / `saveTvShows(t)` each update state **and** write to AsyncStorage in the same step.
   - All five actions (addMovie, addTvShow, incrementEpisode, incrementSeason, toggleMovieStatus) call those save functions, so data is written the instant anything changes.
   - This is why **no "hydration guard" is needed** — saving only happens inside explicit actions, never on the empty first render.
   - Keys: **`watchlist_movies`** and **`watchlist_shows`**. Providers are NOT persisted (they're the static `INITIAL_PROVIDERS` list).
3. **Tested in the iOS Simulator** — Patrick confirmed items survive a reload. ✓

## ALSO DONE THIS SESSION — the "Tracking Items" edge-spacing fix

The parked UI item is finished. The list area used to hug the screen edges because `listContainer` in `App.js` had no horizontal padding, while the form card above it did. Fix: added `paddingHorizontal: 12` to `listContainer`, so the heading and rows line up with the form's inset. Patrick confirmed it looks better. ✓

## RESOLVED — new version is on the phone

The Expo build limit that blocked the phone install is no longer an issue. Patrick **upgraded his Expo plan**, then built and loaded the new (persistence) version onto his **physical phone**.

- On the real device: **the padding looks right and data is saving.** ✓
- So persistence and the spacing fix are now confirmed on both the Simulator **and** the actual phone.
- The old "Processing" TestFlight uploads from session 3 (1.0.0 (1) and (2)) are moot — they predate persistence and were superseded by this build.

## Current state of the build tooling

- `app.json` has the iOS `bundleIdentifier` (`com.molliedog.WatchList`) and the EAS `projectId`.
- `eas.json` exists and matches Remember When.
- App runs clean in the iOS Simulator (`npm install`, `npx expo start`, press `i`; `r` to reload; use `--clear` if a stale bundle is suspected).

## Files touched this session (2026-06-17, session 4)

- `package.json` — added `@react-native-async-storage/async-storage` at `2.2.0`.
- `useWatchListState.js` — added load-on-start + save-on-change persistence (Remember When pattern).
- `App.js` — added `paddingHorizontal: 12` to `listContainer`.
- `docs/handoff.md` + `docs/parked-items.md` — these updates (commit pending).
- Code already committed as "Data Persist & screen padding."; docs commit still to do.

## Candidates for the NEXT goal

The two big things — persistence and the phone install — are both done. Remaining parked work:

1. **Polish the look** — cleaner, higher-contrast layout; group movies (To Watch vs Watched) and TV shows into clear sections; bigger tap targets. (Parked.)
2. **Fold WatchList into Remember When** — once it's solid standalone, bring it in as another screen. (Parked; do last.)
3. **Provider niceties** — syncing or deep-linking to a streaming service. (Low priority.)

---

## ▶ PASTE THIS AT THE START OF THE NEXT SESSION

You're picking up my WatchList app (a small Expo / React Native movie & TV show tracker, separate from Remember When / elderlyassistant for now).

The WatchList folder needs to be connected through Cowork's folder picker — if you can't see it, give me the folder-request button; don't ask me to upload files.

Once it's connected, read `docs/session-start.md` first (standing rules and how we work), then `docs/handoff.md` (current state and next job), and skim `docs/parked-items.md` (the someday list). Confirm last session's work was committed before doing anything.

Last session we added data persistence (the app now saves movies, shows, and progress so they survive a reload — done the same way as Remember When) and fixed the "Tracking Items" list hugging the screen edges. I upgraded my Expo plan, built it, and loaded it on my physical phone — the padding looks right and data is saving on the device. So persistence and the phone install are both done and confirmed.

Then wait for me to give you the one goal, tell me roughly how heavy it looks, and wait for my "go" before changing anything. One step at a time, plain English, no boxed multiple-choice questions, and I do all the git commits.
