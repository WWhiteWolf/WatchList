# Hand-off note — read at the start of the next session

## FIRST THING TO CONFIRM

This clean set of docs (`session-start.md`, this `handoff.md`, `parked-items.md`) was written 2026-06-17 to reset the project onto a working footing after an Expo Go version mismatch sent earlier sessions in circles. **Confirm these docs were committed.** Then Patrick states the one goal for the session.

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

A low-friction memory aid for tracking what to watch and where it streams. Patrick is 72, retired; he built it the same spirit as Remember When. It must stay modular so it can run on its own now and be folded into Remember When later.

**What the app does today (verified against the code 2026-06-17):**

- You type a movie or show title, pick a streaming provider (YouTube TV, Netflix, Paramount, HBO), and tap **Add Movie** or **Add TV Show**.
- **Movies** carry a status you flip between "To Watch" and "Watched."
- **TV shows** track progress with a season/episode count and two buttons, **+Ep** and **+Seas** (+Seas bumps the season and resets the episode to 1).
- Everything lives in memory only. Nothing is saved when the app closes yet — persistence is parked.

**The code is clean and coherent.** `App.js` (the screen), `useWatchListState.js` (the data/actions hook), and `types.js` (the provider list) all line up with each other. The trouble was never in this logic.

## Files in the project

- `App.js` — the single screen: input form, provider selector, and the combined movie/TV list with its controls.
- `useWatchListState.js` — `useState` for providers, movies, tvShows, plus the actions: `addMovie`, `addTvShow`, `incrementEpisode`, `incrementSeason`, `toggleMovieStatus`.
- `types.js` — `INITIAL_PROVIDERS` (the four streaming services). (Note: the old `handoff.md` referenced `MOVIE_TEMPLATE`/`TV_SHOW_TEMPLATE` here — they do not exist in the code. Ignore that.)
- `index.js`, `app.json`, `package.json` — standard Expo entry/config.

## The decision that reset the project (2026-06-17)

**Stop using Expo Go. Put WatchList on the same build path as Remember When.**

- Expo Go is the ready-made app from the App Store. It runs only ONE version of Expo's engine — whatever that installed copy was built for. When the project sits on a different version than the Expo Go on the phone, the two won't run together. That version collision (Expo Go running ahead of what the project/Apple expected) is what sent earlier sessions chasing their tail. It is not a code bug.
- Remember When never uses Expo Go. It runs on Patrick's own build through TestFlight, with the matching Expo engine baked in. That path is proven and Patrick knows it.
- The trouble "continued into EAS" because EAS was never configured here: **there is no `eas.json`, and `app.json` has no iOS bundle id.** A build had nothing to stand on.

## Active next step (the named goal) — put WatchList on a real build path

Get WatchList running on Patrick's phone the same way Remember When does, instead of Expo Go. Rough shape (to be scoped one step at a time, with Patrick's go before each change):

1. Decide the iOS bundle id and add it to `app.json` (Remember When uses `com.molliedog.ElderlyAssistant`; WatchList needs its own).
2. Add `expo-dev-client` and/or an `eas.json` with build profiles, mirroring the Remember When setup.
3. Confirm the dependency versions install cleanly first — check that `package.json` (`expo ~54`, `react 19.1.8`, `react-native 0.81.6`) matches a real, installable Expo SDK 54 set before building. **Verify, don't assume.**
4. Build to the device and confirm the app itself runs (it should — the logic is sound).

Optional quicker check before all that: run it locally on the computer to confirm the app is fine, separate from any build/device questions.

## Files touched this session (2026-06-17)

- `docs/session-start.md` — rewritten clean (standing rules + how we begin).
- `docs/handoff.md` — this file, written fresh.
- `docs/parked-items.md` — tidied (see that file).
- `docs/SPEC-STYLE-RULES.md` — left untouched; it belongs to the Clue/MysteryTracker project and should be skipped.
- **No app code changed this session.** Patrick commits.

---

## ▶ PASTE THIS AT THE START OF THE NEXT SESSION

You're picking up my WatchList app (a small Expo / React Native project — a movie & TV show tracker, separate from Remember When for now).

The WatchList folder needs to be connected through Cowork's folder picker — if you can't see it, give me the folder-request button; don't ask me to upload files.

Once it's connected, read `docs/session-start.md` first (our standing rules and how we work), then `docs/handoff.md` (current state, the decisions we've made, and the next job), and skim `docs/parked-items.md` (the someday list). Confirm the last session's work was committed before doing anything.

The key thing already decided: WatchList will stop using Expo Go and move to the same build-to-my-phone path Remember When uses — EAS isn't set up yet, and that's the first real job. Don't re-litigate that.

Then wait for me to give you the one goal for the session, tell me roughly how heavy it looks, and wait for my "go" before changing anything. One step at a time, plain English, no boxed multiple-choice questions, and I do all the git commits.
