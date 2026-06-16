# Spec Style Rules

Read this file at the start of every session. It's the short list of
patterns we've agreed on for the MysteryTracker spec — and the
mistakes Claude keeps making that need to be actively guarded against.

## 1. Session process

- **Read this file first.** Every session.
- **One concrete goal per session** (e.g., "finish B7.6 patch,"
  "scrub Page 9"). When that goal is done, stop — even if context
  is still open. Avoid open-ended scrubs.
- **If Patrick doesn't state the goal at session start, Claude
  reminds him to.** Don't begin work without an explicit goal.
- **Before Patrick logs off, Claude writes a hand-off note** —
  5-10 lines: current state, what's pending, decisions made.
  Patrick pastes this at the top of the next session.
- **Always wait for "go" before building.** Discuss every change
  first, even small ones.
- **One step at a time.** Work through changes in order, one at a
  time, so Patrick and Claude stay in sync. Don't batch multiple
  edits into one go.
- **After every applied edit, show the full rewritten block in
  chat** before moving on, so Patrick can check the result.
  ***Bold-italicize* the changed text** in the chat copy
  (proposals too) so Patrick can spot it at a glance — italics
  alone are too easy to miss; the file itself stays plain.
  (Patrick, 2026-06-10, strengthened same day.)
- **Exception — Off-page connector lines.** These edits are
  Claude's to verify and apply directly: no proposal, no go
  needed, no need to show the result. Patrick can't practically
  verify them. Claude just mentions that a connector line was
  updated. (Patrick, 2026-06-10.)
- **Size the work up front.** At session start, Claude says how heavy
  the page looks — roughly how many blocks, and how much code-tracing
  it'll take — so Patrick can decide whether to do one page or fold in
  a second.
- **Call it when checking gets thin.** If Claude notices its
  verification getting shallower as the session fills up — skimming a
  code path it would earlier have traced in full — it stops and says so
  rather than pushing through. A short, accurate session beats a long
  one that lets a discrepancy slip. **This one always applies — every
  session, not just the spec pass.**

## 2. Voice and tone

- Plain language, not programmer jargon.
- Short sentences.
- **Describe only what's there now.** Never explain, contrast with, or
  reference the thing being removed or replaced — the reader knows nothing
  about what is no longer there. Say what the feature does today; don't say
  what it "no longer" does. (e.g. "the Deck Bar swaps its contents to the
  per-turn directive in Play" — NOT "the Deck Bar no longer hides.")
- **Never** say "turn tag," "tagged with the turn number," "turn
  number attached," or "turn marks visible." Turn data is internal
  (used by Undo); it is not a user-facing concept.
- Avoid "Walks every X" / "Iterates through Y" — use plainer wording
  like "goes through each."

## 3. Terminology

- "house" not "room" (for the 2-player variant column)
- "popup" not "modal"
- "the Next button" when "Next" alone is ambiguous
- "Passers-loop ✗" — canonical name for the walk around the
  turn-order ring marking passers
- "mark pusher" for `markCell`
- Internal code names (`check`, `cross`, `asked`, `showed`…)
  appear only in data-shape blocks (e.g. B7.9); prose uses the
  symbols (✓, ✗, `?`, `!`).

## 4. Mark behavior truths

| Mark | Behavior |
|---|---|
| ✓ (check) | SINGLE — first one wins, no stacking |
| ✗ (cross) | SINGLE — first one wins, no stacking |
| `!` (showed) | SINGLE — first one wins, no stacking |
| `?` (asked) | STACKS across turns; no per-cell limit; builds the ask history |
| ✓\* (shownToMe) | lands with ✓ when a card is shown to Me |
| ←Me (iShowedMe) | placed when Me shows a card to an asker |
| ←Player (meShowedTo) | placed when shown to Me (also rendered as ✓\*) |

Other rules:

- Once ✓ or ✗ lands, no new `!` is placed (definitive answer
  makes `!` noise). Existing `!`s are also visually hidden (M11/11).
- `?` stays visible even after ✓ or ✗ (M11/19).
- Turn 0 = Setup phase + Start Game initial sweep. Undo never
  touches turn 0 marks.
- Me's column is finalized at Start Game; no auto-marks land
  there during Play.

## 5. Spec structure

### What the spec is for

The spec is a build document: it should carry enough detail that
the app could be rewritten from it alone. When deciding whether a
detail stays in or out, ask: would code written from this spec
behave differently without it? If yes, it stays.

**The spec reflects the final code.** When a change has been
decided but not yet coded, the spec describes the decided
behavior — the final state — not the interim code. (Patrick,
2026-06-10.)

The app has two companion documents: the flow diagram
(docs/mystery-tracker-design.drawio), tailored to the code, and
this spec, tailored to a human reader. Each one alone should
carry enough to regenerate the app.

### Page opening
1. Heading: `## Page X — Title`
2. Intro paragraph(s) in plain English — orient the reader to
   what this page covers and any underlying concepts, stages,
   or rules.
3. (Optional) Bulleted list of those concepts, stages, or rules.
4. Bridge line connecting the orientation to the block list,
   e.g. "The 11 blocks below describe the code, grouped by
   role rather than by call order..."
5. Block roadmap: bulleted list of `**Bx.y** Title` entries.
6. Then the blocks themselves.

### Block structure — what → how → why
- **Header:** `**Bx.y · Title.**` The (`code-name`) part is
  optional — existing headers keep whatever form they have; new
  blocks may add it or not. (Patrick, 2026-06-10.)
- **What** (1-2 sentences): plain-English description of what
  this block is or does.
- **How:** bullets or short paragraphs describing the
  mechanism — what it checks, what it does, in what order.
- **Why / context** (optional): when it runs, who calls it,
  special cases, or trade-offs worth noting.

### Net: lines
End a block with a short `Net: <takeaway>.` line when the
mechanism is complex enough that a one-line "so what" helps
the reader. Not every block needs one. The Net is the design
or user-facing consequence, not a recap of the steps.

Examples already in the spec:
- "Net: the user's three guesses are locked in; play now waits
  for someone to show."
- "Net: this protects the user from clicks they'd just have to
  undo."

### Cross-refs and connectors
- Cross-refs use bold **Bx.y** notation.
- Each page ends with "Within-page connectors" (calls within
  the page) and "Off-page connectors" (calls to/from other
  pages) sections.

## 6. Handling spillovers

When reviewing one section reveals an issue that affects other
sections, classify it in one breath:

- **Trivial** (one or two words elsewhere, no rule change, no
  code change) — fix it inline, mention it briefly. Doesn't
  break the session goal.
- **Non-trivial** (code change, multi-place spec update, new
  rule) — add to the task list. **Do not chase it.** Finish the
  original goal. At end of session, decide whether the spillover
  becomes next session's goal.
- **Invalidating** (the spillover means the current goal is
  wrong or built on a false premise) — stop. Decide: pivot to
  the spillover, or pause both until thought through.

The trap to avoid: treating every non-trivial spillover as
invalidating. Most aren't. Most can wait.

## 7. Recurring mistakes Claude must catch in itself

Before sending any proposal, Claude re-reads it as if it were
Patrick — looking for the problems below. The bar is that Patrick
shouldn't have to catch these.

- **Do what was asked — only that.** When Patrick asks for a
  specific change, propose that change and nothing else. No
  bundled side questions, no extra sentences, no new threads.
  If a side issue comes up, park it in one short line at the
  end, after the change is done.
- **Re-read for internal contradictions.** Bullets in the same
  proposal must not contradict each other. (A later bullet saying
  "persists" when an earlier one said "cleared" is the classic.)
- **Don't reintroduce killed jargon** — especially "turn tag." It
  sneaks back into rewrites unless actively checked against Section 2.
- **Don't assert code behavior from partial reads.** Read the
  actual code path — never infer from a function or variable name.
  Trace both the Me-as-asker and non-Me-as-asker paths; they often
  differ.
- **When Patrick pushes back, slow down and check — don't defend.**
  A pushback is a signal that something's wrong, not a prompt to
  justify the original answer.
- **Don't inherit the old text's framing.** When rewriting a block,
  describe the feature from the app's point of view, not the
  paragraph being replaced. Verify scope claims ("only during
  Play," "the handler for X") against the whole code base, not
  just the function under review.
