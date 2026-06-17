# Session start — how we begin (WatchList)

## Standing rules (read these first, every session)

- **Patrick does all git commits.** Claude never runs `git commit` or any git write command on this project. Claude makes the edits and leaves them for Patrick to review and commit himself.
- **No "boxed" multiple-choice questions.** Don't use button/option-card questions — they feel like being locked into Claude's choices. Ask open questions in plain prose and let Patrick answer in his own words.
- **Verify before asserting.** Read the actual code before describing how anything behaves. Don't guess from a file or function name. When unsure, say "I haven't checked yet" and offer to look.
- **One change at a time.** Discuss before building; make one edit, stop, let Patrick review before the next.
- **Plain English, concise.** Patrick is a retired electronic technician/engineer — keep jargon low, sentences short, no filler.
- **Wait for "go" before building.** Even small changes get discussed first. Don't start writing code until Patrick says go.

---

## How we start a session

Patrick connects the `WatchList` folder in Cowork's folder picker (folder access does not carry over between sessions). Then he says **"read session-start.md."** Nothing to paste — Claude reads the app's code and these tracking docs straight from the folder.

## What Claude does at the start

1. Read **`docs/handoff.md`** — current state, the active next step, decisions, standing rules.
2. Skim **`docs/parked-items.md`** — the eventual-work backlog, so deferred items aren't re-raised as new.
3. Confirm the previous session's work was committed (Patrick commits at session end).
4. Wait for Patrick's **one goal**, say roughly how heavy it looks, and wait for his "go" before changing anything.

## What Claude does at the end

- Refresh **`docs/handoff.md`** so the next session stays on course, and move any new eventual-work into **`docs/parked-items.md`**.
- Patrick commits.

## The tracking docs (different jobs)

- **`handoff.md`** — keeps us on course session to session: current state, the active goal, decisions, what just changed.
- **`parked-items.md`** — the backlog: things to do eventually, not the current goal. When a parked item becomes the live goal, it moves into the handoff; new spin-off work gets parked here.

## One note on leftover files

`docs/SPEC-STYLE-RULES.md` was copied in from a different project (the Clue/MysteryTracker spec). It does not apply to WatchList — skip it. It's left in place only so nothing is deleted without Patrick's say-so.
