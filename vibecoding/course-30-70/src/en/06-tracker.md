# Progress tracker

Filled in by hand. A `[x]` mark = the criterion is met, not "almost".
An empty checkbox is an honest answer.

Start date: ____________

Finish date: ____________

---

## Module 1 — How vibe coding works (150 min)

- [ ] The agent reads the project files (check from 1.1)
- [ ] The repo is created, the first commit is made before AI writes code
- [ ] `.gitignore` is correct, `git status` is clean
- [ ] The utility works, 4 acceptance criteria verified by hand
- [ ] `notes.md` has at least 3 observations about diffs
- Theory min: 45 / actual: ____
- Practice min: 105 / actual: ____
- What was hard: ______________________________________

---

## Module 2 — Spec (150 min)

- [ ] The spec is ≤15 lines, 6 blocks, 4+ verifiable criteria
- [ ] The `exp/bad` and `exp/good` branches are created, both checked
- [ ] The A/B comparison table is filled in
- [ ] 2 specific reasons for the difference are named
- [ ] The spec is split into 5 tasks, each with an acceptance criterion
- [ ] The criterion is rewritten as a `/goal` condition and run (measurable signal, boundaries, turn limit)
- [ ] The `/goal` run table is filled in: turns, completed, extra files
- [ ] The retro is written down
- Theory min: 45 / actual: ____
- Practice min: 105 / actual: ____
- What was hard: ______________________________________

---

## Module 3 — The work loop (150 min)

- [ ] 8 phrasings are written, predictions recorded
- [ ] The feature is done in 4 steps, 4 commits
- [ ] Every diff is read in 5 minutes (verified in practice)
- [ ] 2+ red flags found, each danger explained
- [ ] Retro: the number of rollbacks and the time lost are recorded
- Theory min: 45 / actual: ____
- Practice min: 105 / actual: ____
- What was hard: ______________________________________

---

## Module 4 — Context (150 min)

- [ ] `AGENTS.md` is created, the agent answers from it in a new chat
- [ ] Run A (one chat) and B (three chats) are completed
- [ ] The A/B table is filled in with metrics
- [ ] The reset message template is written down and tested
- [ ] Useless rules have been removed from the instructions
- Theory min: 45 / actual: ____
- Practice min: 105 / actual: ____
- What was hard: ______________________________________

---

## Module 5 — Debugging (150 min)

- [ ] Three bugs are injected artificially, each with a reproducible case
- [ ] Three fixes, each with an "if..., then..." hypothesis before the change
- [ ] After each fix the neighbouring scenarios were checked
- [ ] A phrasing that makes the agent test the hypothesis has been found
- [ ] Retro: the average number of cycles to a fix is recorded
- Theory min: 45 / actual: ____
- Practice min: 105 / actual: ____
- What was hard: ______________________________________

---

## Module 6 — Tests (150 min)

- [ ] The test runner is installed, the first test is green
- [ ] The test command is recorded in `AGENTS.md`
- [ ] 5 TDD tests, for each one the reason it failed before implementation is recorded
- [ ] Mutation check: at least one test caught the break
- [ ] Useless tests identified and rewritten
- Theory min: 45 / actual: ____
- Practice min: 105 / actual: ____
- What was hard: ______________________________________

---

## Module 7 — Data and APIs (150 min)

- [ ] `.env` is out of git, `.env.example` is in the repo
- [ ] Verified: the key is not in the git history
- [ ] A real API response is captured with curl and lives in `fixtures/`
- [ ] 4 error scenarios handled and checked
- [ ] Not a single invented API field in the code
- [ ] 4 tests for bad data, they fail when validation is removed
- [ ] Retro: what the agent lied about and how you caught it
- Theory min: 45 / actual: ____
- Practice min: 105 / actual: ____
- What was hard: ______________________________________

---

## Module 8 — Deploy (150 min)

- [ ] `main` is protected, a direct push is rejected
- [ ] A PR describing what/why/how to check
- [ ] The project is deployed, the link opens from a phone
- [ ] Environment variables are set in the hosting panel
- [ ] Production is deliberately broken and rolled back two ways, the time measured
- [ ] The 12-point review checklist is done, 1 problem fixed
- Theory min: 45 / actual: ____
- Practice min: 105 / actual: ____
- What was hard: ______________________________________

---

## Module 9 — Capstone (180 min)

- [ ] The project is chosen, a 10-line spec and 4 steps are in the repo
- [ ] The repo is on GitHub, `AGENTS.md` and `.env.example` are in place
- [ ] The main scenario passes locally end to end
- [ ] 3+ error scenarios handled
- [ ] The test for the main scenario is green
- [ ] README: `git clone` → follow the instructions → it works (verified in a clean folder)
- [ ] The public link is live, checked from a phone
- [ ] There are no secrets in the repo
- [ ] Known limitations are recorded in the README
- [ ] The commit history reads clearly: what and why is obvious
- Theory min: 54 / actual: ____
- Practice min: 126 / actual: ____
- What was hard: ______________________________________

---

## Final ratio calculation

```
Theory:     ____ min
Practice:   ____ min
Total:      ____ min
Theory share:   ____ %   (target 30%)
Practice share: ____ %   (target 70%)
```

If theory went above 35% — you are reading instead of doing. Go back to the
rule: a 45-minute timer, then practice.

If practice went above 75% — check whether acceptance criteria were skipped
("done and not verified" is not practice, it is hope).

---

## Final reflection

1. Which skill turned out to be the hardest? ______________________
2. Which prompt from `04-promptoteka.md` did you rewrite for yourself? ______
3. What will you never do with an agent again? ________
4. Link to your project: ______________________
5. One sentence that explains what vibe coding is for you now:
   __________________________________________________________
