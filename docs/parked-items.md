# Parked items — running backlog (WatchList)

Future / deferred work. Not for the current session — the active goal lives in `handoff.md`. Pull an item from here when ready to take it on; move it into `handoff.md` once it's the live goal. Add new ideas as they come up.

Last updated: 2026-06-17

---

## In plain English — what's on this list

This is the "someday" list: worth doing eventually, but not what we're working on right now.

- **Save the data so it sticks.** Right now everything you add disappears when the app closes — it's only held in memory. Adding storage (AsyncStorage) would keep your movies, shows, and progress between sessions. This is the biggest real feature still missing.

- **Polish the look.** A cleaner, higher-contrast, easy-to-scan layout — grouping movies (To Watch vs Watched) and TV shows into clear sections, larger tap targets. The bones are there; this is refinement.

- **Fold WatchList into Remember When.** Once it's solid on its own, bring it in as another screen of the main app, the way My Day and Pets Day live there. The app was kept modular on purpose so this is straightforward later.

- **Provider niceties (low priority).** Things like syncing or deep-linking to a streaming service. Nice-to-have, not needed for the core tool.

- **Inset the "Tracking Items" list from the screen edges (UI fix, found on the real phone).** On the device, the "Tracking Items" heading and the list rows below it sit right at the screen's outer margin and feel too close to both sides. Cause: the form card up top has its own extra inset, but the list area (`listContainer` in `App.js`) has no left/right padding of its own, so it hugs the 20pt screen edge. Fix: give the list section its own horizontal padding so the heading and rows line up with the form's comfortable inset. Small, isolated change. (Patrick verified the movie "To Watch"/"Watched" labels are working fine — no change needed there.)

---

## Notes for whoever picks these up

- **Persistence first.** Of everything here, saving data is the one that makes the app genuinely useful day to day. Mirror how Remember When stores its lists (a storage key per list, load on start, save on every change). Do it after WatchList is running on a real build path, not before.
- **Integration last.** Don't fold it into Remember When until both the build path and persistence are settled — otherwise the merge inherits the open problems.
