# Hand-off note — read at the start of the next session

## FIRST THING TO CONFIRM

Confirm the **2026-06-17 (session 2)** work was committed: the `package.json` version fix and the `App.js` layout changes (see "Files touched" below). Then Patrick states the one goal for the session.

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

A low-friction memory aid for tracking what to watch and where it streams. Patrick is retired; he built it in the same spirit as Remember When. It must stay modular so it can run on its own now and be folded into Remember When later.

**What the app does today (verified against the code 2026-06-17):**

- You type a movie or show title, pick a streaming provider (YouTube TV, Netflix, Paramount, HBO), and tap **Add Movie** or **Add TV Show**.
- **Movies** carry a status you flip between "To Watch" and "Watched." The status now shows **beside the title** on the same line (label reads "To Watch" / "Watched").
- **TV shows** track progress with a season/episode count and two buttons, **+Ep** and **+Seas** (+Seas bumps the season and resets the episode to 1).
- The layout was tightened this session — less vertical space throughout, Add buttons spread across the row.
- Everything lives in memory only. **Nothing is saved when the app closes or reloads yet** — persistence is still parked (see `parked-items.md`). Patrick saw this firsthand: reloading the simulator wiped the list. The real phone will behave the same until persistence is added.

**The code is clean and coherent.** `App.js` (the screen), `useWatchListState.js` (the data/actions hook), and `types.js` (the provider list) all line up with each other.

## CORRECTED root-cause story (important — supersedes the earlier note)

The earlier sessions blamed the trouble on **Expo Go version mismatch**. Running it in the iOS Simulator this session proved that was **not** the real cause. The actual blocker was a **dependency version mismatch inside the project itself**:

- `package.json` had pinned `react 19.1.8` and `react-native 0.81.6`. React Native requires that `react` and its internal renderer carry the *exact* same version, and those two did not agree (renderer was 19.1.4). The app threw "Incompatible React versions" the instant it tried to render.
- **Fix applied:** aligned to Expo SDK 54's official tested set — `react 19.1.0`, `react-dom 19.1.0`, `react-native 0.81.5`. Verified in a sandbox that this set is internally consistent (renderer comes out as 19.1.0, matching react). After a clean reinstall (`rm -rf node_modules package-lock.json && npm install`) and `npx expo start --clear`, the app runs clean in the simulator.
- **Takeaway for the build path:** the original "stop using Expo Go" decision still stands as the long-term direction, but it was solving the wrong problem. The app itself was healthy once the versions matched. Whatever happened on the physical phone earlier may also have been version drift, not Expo Go as such — worth keeping in mind, not re-litigating.

## Current state

- Runs clean in the **iOS Simulator** (Patrick has Xcode). Quick local check is: `cd ~/Projects/WatchList`, `npm install`, `npx expo start`, press `i`. Use `npx expo start --clear` if a stale bundle is suspected, then Cmd+R / `r` to reload.
- In the simulator, Expo CLI auto-installs the *matching* Expo Go, so the simulator sidesteps the version-pinning pain a physical-phone App Store Expo Go can hit.
- Still **no `eas.json`** and **no iOS bundle id** in `app.json` — so a build-to-phone still has nothing to stand on.

## Active next step (the named goal) — put WatchList on a real build path

Get WatchList running on Patrick's phone the same way Remember When does (his own build via TestFlight), instead of Expo Go. Rough shape, scoped one step at a time with Patrick's go before each change:

1. Decide the iOS bundle id and add it to `app.json` (Remember When uses `com.molliedog.ElderlyAssistant`; WatchList needs its own).
2. Add an `eas.json` with build profiles, mirroring the Remember When setup.
3. Build to the device and confirm the app runs (it should — the logic is sound and now installs/runs clean).

**Strong candidate to do next instead / soon after:** persistence (saving the data). Patrick directly felt the pain this session — every reload wipes the list. It's the top parked item and the change that makes the app genuinely useful day to day. Order is Patrick's call; the original plan was build path first, persistence second.

## Files touched this session (2026-06-17, session 2)

- `package.json` — version fix: react → 19.1.0, added react-dom 19.1.0, react-native → 0.81.5.
- `App.js` — movie status moved beside the title ("To Watch" / "Watched"); spacing tightened throughout (header, form, provider row, list rows); Add buttons spread across the row with less vertical space around them.
- `docs/handoff.md` — this file, rewritten with the corrected root-cause story.
- **`node_modules` / `package-lock.json`** were regenerated locally by the reinstall (not committed; ignored by `.gitignore`).
- Patrick commits.

---

## ▶ PASTE THIS AT THE START OF THE NEXT SESSION

You're picking up my WatchList app (a small Expo / React Native project — a movie & TV show tracker, separate from Remember When for now).

The WatchList folder needs to be connected through Cowork's folder picker — if you can't see it, give me the folder-request button; don't ask me to upload files.

Once it's connected, read `docs/session-start.md` first (our standing rules and how we work), then `docs/handoff.md` (current state, the corrected root-cause story, and the next job), and skim `docs/parked-items.md` (the someday list). Confirm the last session's work was committed before doing anything.

What we proved last session: the app runs clean in the iOS Simulator once the dependency versions were aligned — the old trouble was a react/react-native version mismatch, not Expo Go. The build-to-phone path (EAS + an iOS bundle id) still isn't set up; that and persistence (saving data, which currently doesn't survive a reload) are the two live candidates for the next goal.

Then wait for me to give you the one goal for the session, tell me roughly how heavy it looks, and wait for my "go" before changing anything. One step at a time, plain English, no boxed multiple-choice questions, and I do all the git commits.
