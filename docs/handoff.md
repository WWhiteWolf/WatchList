# Hand-off note — read at the start of the next session

## FIRST THING TO CONFIRM

Confirm the **2026-06-17 (session 3)** work was committed: the `app.json` changes (iOS `bundleIdentifier` + the `projectId` EAS added during the build) and the new `eas.json`. See "Files touched" below. Then Patrick states the one goal for the session.

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

**What the app does today:**

- You type a movie or show title, pick a streaming provider (YouTube TV, Netflix, Paramount, HBO), and tap **Add Movie** or **Add TV Show**.
- **Movies** carry a status you flip between "To Watch" and "Watched," shown beside the title.
- **TV shows** track progress with a season/episode count and two buttons, **+Ep** and **+Seas** (+Seas bumps the season and resets the episode to 1).
- Everything lives in memory only. **Nothing is saved when the app closes or reloads yet** — persistence is still parked (see `parked-items.md`).

The code is clean and coherent: `App.js` (the screen), `useWatchListState.js` (the data/actions hook), and `types.js` (the provider list) all line up.

## BIG MILESTONE THIS SESSION — WatchList is on a real build path and in TestFlight

The goal "WatchList on my phone" is now most of the way done. What we did:

1. **Bundle id** — added `"bundleIdentifier": "com.molliedog.WatchList"` to the `ios` block of `app.json` (matches Patrick's Remember When `com.molliedog.*` pattern).
2. **eas.json** — created it, then matched it line-for-line to Remember When's (Patrick uploaded his copy to compare). Identical now: same development/preview/production build profiles, same `submit.production`, `cli.version >= 18.6.0`, `appVersionSource: remote`.
3. **First EAS build** — ran `npx eas-cli@latest build --platform ios --profile production`. Created the EAS project (this is what added the `projectId` line to `app.json`), set up Apple credentials + provisioning profile, answered the encryption-compliance prompt as standard/exempt (yes). Build completed successfully.
4. **Submitted to TestFlight** — ran `npx eas-cli@latest submit --platform ios --profile production`, using Patrick's own App Store Connect API key (Team: Patrick Murphy, Individual). Upload succeeded.

**Where it stands right now:** the build shows **"Processing"** in App Store Connect → WatchList → TestFlight. Patrick accepted a pending Apple Developer Program License Agreement update (it had been flagged with a yellow banner and can hold up builds). 

**Remaining to finish the phone install (next session, or once processing ends):**
- When the build flips to **Ready to Test**, make sure Patrick's own Apple ID is in the **Internal Testing** group on the TestFlight tab (internal testers install with no Apple review).
- Open the **TestFlight app** on the iPhone (same Apple ID) → WatchList → **Install**.
- Note: the public App Store "Prepare for Submission" page (screenshots, metadata, Add for Review) is NOT needed for TestFlight — ignore it.

## Security housekeeping done this session

- GitHub flagged a **Google API Key** secret in repo `WWhiteWolf/WatchList`. Verified it: it's **not Patrick's** — it's a key baked into React Native's bundled Chrome dev-tools (`node_modules/@react-native/.../crux-manager.js`), only present because early commits had committed `node_modules`. Current code does not track `node_modules` (it's git-ignored). Nothing of Patrick's exposed; nothing to rotate. Patrick **dismissed the alert** on GitHub (now 0 open / 1 closed).
- Patrick **enabled Dependabot alerts** (notify-only). Left the auto-PR options (security updates, grouped, version updates) off to avoid PR noise.

## Current state of the build tooling

- `app.json` now has the iOS `bundleIdentifier` and the EAS `projectId`.
- `eas.json` exists and matches Remember When.
- App still runs clean in the iOS Simulator (`npm install`, `npx expo start`, press `i`; use `--clear` if a stale bundle is suspected).

## Files touched this session (2026-06-17, session 3)

- `app.json` — added iOS `bundleIdentifier`; EAS added a `projectId` during the build.
- `eas.json` — new file, matched to Remember When.
- `docs/handoff.md` — this file.
- Patrick commits.

## Two live candidates for the NEXT goal

1. **Finish the phone install** — just the TestFlight tester + install steps above; small, mostly waiting on Apple processing.
2. **Persistence (saving data)** — top parked item. Every reload still wipes the list. Mirror how Remember When stores its lists (a storage key per list, load on start, save on every change). This is the change that makes the app genuinely useful day to day.

---

## ▶ PASTE THIS AT THE START OF THE NEXT SESSION

You're picking up my WatchList app (a small Expo / React Native movie & TV show tracker, separate from Remember When for now).

The WatchList folder needs to be connected through Cowork's folder picker — if you can't see it, give me the folder-request button; don't ask me to upload files.

Once it's connected, read `docs/session-start.md` first (standing rules and how we work), then `docs/handoff.md` (current state and next job), and skim `docs/parked-items.md` (the someday list). Confirm last session's work was committed before doing anything.

Last session we got WatchList onto a real build path: added an iOS bundle id and an eas.json, ran the first EAS build, and submitted it to TestFlight — it was "Processing" in App Store Connect when we stopped. The remaining bit is making sure I'm an internal tester and installing it from the TestFlight app on my phone. The other live candidate is persistence (saving data, which still doesn't survive a reload).

Then wait for me to give you the one goal, tell me roughly how heavy it looks, and wait for my "go" before changing anything. One step at a time, plain English, no boxed multiple-choice questions, and I do all the git commits.
