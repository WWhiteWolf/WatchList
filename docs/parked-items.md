# Parked items — running backlog (WatchList)

Future / deferred work. Not for the current session — the active goal lives in `handoff.md`. Pull an item from here when ready to take it on; move it into `handoff.md` once it's the live goal. Add new ideas as they come up.

Last updated: 2026-06-17 (session 4)

---

## Recently done — moved off this list

- **✅ Save the data so it sticks (persistence).** Done in session 4. Added AsyncStorage (2.2.0) and rewrote `useWatchListState.js` to load on start and save on every change, mirroring Remember When. Tested in the Simulator. See `handoff.md`.
- **✅ Inset the "Tracking Items" list from the screen edges.** Done in session 4. Added `paddingHorizontal: 12` to `listContainer` in `App.js`; the list now lines up with the form above it.

---

## In plain English — what's on this list

This is the "someday" list: worth doing eventually, but not what we're working on right now.

- **Polish the look.** A cleaner, higher-contrast, easy-to-scan layout — grouping movies (To Watch vs Watched) and TV shows into clear sections, larger tap targets. The bones are there; this is refinement.

- **Fold WatchList into Remember When.** Once it's solid on its own, bring it in as another screen of the main app, the way My Day and Pets Day live there. The app was kept modular on purpose so this is straightforward later.

- **Provider niceties (low priority).** Things like syncing or deep-linking to a streaming service. Nice-to-have, not needed for the core tool.

---

## Notes for whoever picks these up

- **Persistence is done** (session 4) — that was the big one. The app now saves and reloads its data like Remember When.
- **Integration last.** The build path is now settled — Patrick upgraded his Expo plan and the app is running on his physical phone. Folding it into Remember When can happen whenever it's wanted, but keep it last so the merge starts from a solid standalone app.
