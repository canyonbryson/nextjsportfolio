Plan: Games Expansion + First-Visit Gate

1) Clarify scope boundaries
   - Keep current dashboard/portfolio as official destination.
   - Add games as an optional expansion, not a replacement.

2) Define routing + information architecture
   - Add a first-visit landing gate (new route or overlay).
   - Ensure a direct path to the existing portfolio.
   - Add persistent nav links to both games.

3) First-visit logic
   - Decide storage (cookie or localStorage) for "hasVisited".
   - Implement a one-time gate that can be bypassed on return.
   - Include a clear "View Portfolio" option on the gate.

4) UI/UX for the initial gate
   - Implement the loading gag copy and three buttons.
   - Add the "View Portfolio" button cracking gag.
   - Provide a "Serious Mode" escape hatch (footer link).

5) Games structure
   - Create top-level routes for each game.
   - Add shared layout styles for game screens.
   - Add a lightweight game shell (frame, heading, CTA).

6) Game 1: Tower Defense (MVP)
   - Build the intro screen and tutorial steps.
   - Implement basic tower placement + waves (minimal mechanics).
   - Add resume-item "enemy" entries with satirical hit text.
   - Add defeat screen with CTA shuffle + hire gag.

7) Game 2: JRPG Boss Fight (MVP)
   - Build turn-based UI (recruiter vs candidate).
   - Implement phrase bank attacks + damage system.
   - Add the final blow sequence + "You died" popup.

8) Content + copy
   - Finalize punch-up copy for gate and both games.
   - Add recruiter/candidate phrase banks.
   - Add any fallback copy for missing assets or errors.

9) Navigation + portfolio continuity
   - Add nav items for games without changing portfolio prominence.
   - Ensure all paths can return to the main dashboard.

10) QA pass
   - First visit shows gate; repeat visit goes to portfolio.
   - All CTAs route correctly.
   - Mobile layout sanity check for game screens.
