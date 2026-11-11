# Course practice

966 minutes — 70% of the course. Every exercise ends with a verifiable result.
The `[commit]` marker means: before you move on, make a commit.

---

## Module 1. Environment and first result — 105 min

### 1.1 Environment (20 min)

1. Install an agent with file access (Claude Code / Cursor / Codex CLI).
2. Verify: `git --version`, `node --version`, `python --version`.
3. Create `~/projects/vibe-lab` and open it with the agent.

**Criterion:** the agent, on its own and without your hints, reads a file in that
folder after the request "read README.md and summarize it in one line".

### 1.2 First repository (20 min)

1. `git init` in `vibe-lab`.
2. Create `.gitignore` (node_modules, .env, .venv, __pycache__, dist).
3. Create `README.md` with one line about the project.
4. `[commit]` — the first commit **before** any AI-generated code.

**Criterion:** `git log --oneline` shows one commit; `git status` is clean.

### 1.3 First utility (45 min)

Task for the agent — strictly according to the spec below:

```
Goal: a CLI utility reads a text file line by line and prints statistics.

Input: file path as an argument. Output to stdout:
  lines: N
  words: N
  characters: N
  longest line: <number>: <first 40 characters>

Constraints: Python/Node standard library only, no new dependencies.
One file. No colored output, no flags, no configs.

Acceptance criteria:
- a 3-line file yields the correct three numbers
- empty file: all zeros, does not crash
- missing file: message to stderr and exit code 1
- file without read permission: no stack trace, clear message

What we are not doing: no flags, no reading from stdin, no log files.
```

**Order:** first ask for a plan (make no edits) → then the implementation →
verify the 4 criteria by hand → `[commit]`.

### 1.4 Diff review (20 min)

Open `git show` for the last commit and write down in `notes.md`:
- which files changed and whether all of them were part of the task;
- whether there are red flags from the theory (module 3, item 3.2) — for now just note them;
- what you accepted and what you would have rejected.

**Criterion:** at least 3 observations about the diff in `notes.md`.

---

## Module 2. Spec — 105 min

### 2.1 Project spec (30 min)

Pick a small project (not the capstone), for example "Markdown → HTML converter"
or "habit tracker in the console". Write a spec using the six blocks from the theory.

**Criterion:** spec ≤ 15 lines; the "acceptance criteria" block has at least 4 items,
each verifiable by a command or by observation; there is a "what we are not doing" block.

### 2.2 Bad wording vs. spec (30 min)

1. Create the branch `exp/bad` and give the agent the request: "make a markdown
   to html converter". Get the result, record: how many files, how many lines.
2. Roll back: `git checkout main`.
3. Branch `exp/good`, same project — according to your spec.
4. Fill in the table in `notes.md`:

| | Without a spec | With a spec |
|---|---|---|
| files changed | | |
| diff lines | | |
| acceptance criteria passed | | |
| iterations to acceptable | | |

**Criterion:** the table is filled in; you can name 2 specific reasons for the difference.

### 2.3 Decomposition (20 min)

Split the spec into 5 tasks, each 15–20 minutes of agent work.
Format for each: title + acceptance criterion + "do not touch".

**Criterion:** for each task the expected diff is < 80 lines; no task
contains the conjunction "and" in its title (a sign of two tasks glued together).

### 2.4 Acceptance criterion → `/goal` condition (15 min)

Take one task from the decomposition in 2.3 and rewrite its acceptance criterion as
an agent stopping condition. Requirements for the condition:

- a measurable end signal (return code, empty output, green lint);
- the proof is visible in the session (the agent shows the command output itself);
- boundaries: which files may be changed;
- a turn limit.

Example:

```
/goal pytest tests/ exits with code 0, ruff check src/ is clean,
git diff --name-only shows only src/converter/, or stop after 12 turns
```

Run it without interfering and record in `notes.md`:

| | Fact |
|---|---|
| turns until stop | |
| condition met on the first try: yes/no | |
| what the agent changed outside the allowed folder | |
| what the wording was missing | |

**Criterion:** the condition is written in `notes.md`; 4 rows are filled in the table;
if the condition turned out to be unachievable, you can name which signal was
unverifiable.

### 2.5 Retro (10 min)

In `notes.md`: what turned out to be redundant in the spec, what had to be added along
the way, which criterion turned out to be unverifiable.

`[commit]` — the spec and notes in the repository.

---

## Module 3. Work cycle — 105 min

### 3.1 Eight formulations (25 min)

One task for all eight: "in the utility from module 1, the output line length must be
limited to 40 characters". Write 8 variants of the request:

1. Too short: "limit the line length".
2. Too broad: "improve the utility's output".
3. No context: "add truncation".
4. With context and file: "in `stat.py`, the output function…".
5. With a criterion: "…a line longer than 40 characters is truncated and gets `...`".
6. With a boundary: "exactly 40 characters is not truncated".
7. With a prohibition: "…don't change the character count, don't refactor anything else".
8. With a format: "show the plan first, make no edits".

**Criterion:** in `notes.md` eight variants and next to each one a prediction of
what the agent will do (whether it comes true or not — mark it after running 2–3 variants).

### 3.2 Feature in four steps (40 min)

Take a task from 2.3 and complete it in exactly four steps, with a check and
`[commit]` after each:

- step 1: a test or manual check that pins down the current behavior;
- step 2: the minimal edit to meet the criterion;
- step 3: an edge case (empty / maximum / wrong type);
- step 4: an error message or the README.

**Criterion:** 4 commits; each diff is readable in 5 minutes; `git log --oneline`
shows 4 different messages.

### 3.3 Find the red flags (25 min)

Ask the agent: "add error handling to the utility". Most likely you will get a
diff with 2–4 flags. Go through the list in 3.2 and write down what you find in `notes.md`
with line numbers.

**Criterion:** at least 2 flags found; for each one, a note on why it is dangerous.

### 3.4 Retro (15 min)

How many rollbacks did you make, at which step did you lose the most time, which
element of the request (context/criterion/prohibition) helped the most.

---

## Module 4. Context — 105 min

### 4.1 Instructions file (30 min)

Create `AGENTS.md` (or `CLAUDE.md`) using the template from theory 4.2, fill it in for
your project: stack, commands, rules, prohibitions.

Check: in a new chat ask "what are the test commands in this project?" —
the agent should answer from the file without asking you.

**Criterion:** the file is in place, the agent answers correctly; `[commit]`.

### 4.2 One chat vs. three (45 min)

Take 3 small tasks (for example: add a word counter; fix the output format;
add a file encoding check).

- Run A: all three tasks in one chat in a row, without clearing.
- Run B (`git reset` in between): each task in a new chat.

Record: the number of iterations until the criteria passed, the number of extra edits,
how many times the agent referred to outdated code.

**Criterion:** an A/B comparison table in `notes.md` + a one-line conclusion.

### 4.3 Session reset (20 min)

Take any broken situation (or an artificial one: ask the agent to make a deliberately
wrong change). Practice the technique: new chat + 3 facts (what is happening, what you
expected, the stack trace) + "propose 3 verifiable hypotheses, make no edits".

**Criterion:** `notes.md` contains the reset message template that worked.

### 4.4 Retro (10 min)

Which rule in the instructions saved the most time? Which one turned out to be
useless? Delete the useless ones.

---

## Module 5. Debugging — 105 min

### 5.1 Three bugs (20 min)

Create a broken project yourself — ask the agent: "add three bugs to the utility:
crash on an empty file, wrong word count with a hyphen, infinite loop on a
file without a trailing newline. Don't say where exactly".

For each bug: the command/file that reproduces it.

**Criterion:** three reproducible cases recorded in `bugs.md`.

### 5.2 Three fixes (50 min)

For each bug — strictly by the cycle: hypothesis → check → fix → `[commit]`.
The hypothesis must be formulated before the fix and recorded in `bugs.md`
in the form "if ..., then ...".

**Criterion:** 3 commits; for each bug it is noted whether the hypothesis was confirmed;
after each fix the two neighboring scenarios are verified by hand.

### 5.3 Provoke an argument (25 min)

Give the agent a deliberately wrong hypothesis: "the problem is the file encoding,
fix the reading as latin-1". See whether it argues.

If it argues — good. If not — learn to phrase it: "before fixing, check this hypothesis
and say whether it is confirmed. If not, make no edits".

**Criterion:** `notes.md` contains the wording after which the agent started
checking the hypothesis instead of executing it.

### 5.4 Retro (10 min)

How many cycles to a fix on average? What would halve that?

---

## Module 6. Tests — 105 min

### 6.1 Test runner (20 min)

Install vitest (Node) or pytest (Python). One test for an existing function
from module 1. Run it.

**Criterion:** `npm test` / `pytest` is green; the command is recorded in `AGENTS.md`.

### 6.2 TDD cycle, 5 tests (45 min)

New feature: in the utility — a `--top N` flag showing the N longest lines.

For each of the 5 tests: write the test → confirm it fails **for the right
reason** → implementation → green → `[commit]`.

Tests: (1) without the flag the behavior is unchanged; (2) `--top 3` yields 3 lines;
(3) `--top 0` — empty output, code 0; (4) `--top abc` — error, code 1;
(5) a file with 2 lines and `--top 5` — 2 lines.

**Criterion:** 5 commits; for each test, `notes.md` records the reason it failed
before the implementation (not "module not found").

### 6.3 Robustness check (30 min)

Ask the agent: "break the `--top` implementation — return all lines. The tests must
catch this. Don't touch the tests".

- If the tests caught it — restore the implementation, `[commit]`.
- If they did not catch it — the test is decorative, rewrite it and repeat.

**Criterion:** at least one test caught the breakage; in `notes.md` — which tests
turned out to be useless and why.

### 6.4 Retro (10 min)

How many tests per line of code did you end up with? How many boundaries are covered:
empty / maximum / wrong type / no network?

---

## Module 7. Data, API, security — 105 min

### 7.1 Secrets (20 min)

`.env` with a test key, `.env.example` without a value, `.gitignore` with `.env`.
Check: `git status` does not see `.env`; `git log --all -p | grep <key>` is empty.

**Criterion:** the key is absent from the git history; `.env.example` is in the repository.

### 7.2 API: curl → client → errors (50 min)

Take a public API without a key (for example, open exchange rates or weather).

1. `curl` by hand, save the real response to `fixtures/sample.json`.
2. Give the agent this file: "here is the real response shape, use only these fields".
3. Client + response validation.
4. Error handling: 4xx, 5xx, timeout, invalid JSON.

**Criterion:** 4 error scenarios handled and verified by hand; not a single field
that is not in `sample.json`.

### 7.3 Tests for bad data (25 min)

Tests: empty response, missing required field, a string instead of a number,
timeout. Behavior: a clear error, no crash, no silent `except`.

**Criterion:** 4 tests green; when the validation is removed they fail.

### 7.4 Retro (10 min)

What did the agent lie about (method, parameter, field) and how did you catch it?

`[commit]` — everything together.

---

## Module 8. Deploy and hygiene — 105 min

### 8.1 Branches and PRs (15 min)

`main` is protected (in the GitHub settings). Work only through a branch and a PR.
Make one PR for a task from module 6.

**Criterion:** a direct push to `main` is rejected; the PR contains a description: what/why/how
to verify.

### 8.2 Deploy (40 min)

Deploy the project to Vercel or Netlify: connect the repository, set the
environment variables in the panel, wait for the build, open the link.

**Criterion:** the link opens from a phone; the main scenario's functionality
works in production, not just locally.

### 8.3 Break and roll back (35 min)

1. Deploy a commit with an obvious breakage (for example, it throws on the main page).
2. Confirm that production is broken.
3. Rollback #1: redeploy the previous version from the panel. Time it.
4. Rollback #2: `git revert` into a branch → PR → merge → autodeploy. Time it.
5. Record both timings in `notes.md`.

**Criterion:** both methods worked; the time of each measurement is recorded.

### 8.4 Review by checklist (15 min)

Take your last PR and go through the 12 review items from theory 8.4.
Problems — in a PR comment, the fix — in a separate commit.

**Criterion:** the checklist is complete, at least one problem found and fixed.

---

## Module 9. Capstone — 126 min of practice

### 9.1 Start (16 min)

- Choose a project from `05-proekty.md`.
- A 10-line spec + 4 build steps (from theory 9.2).
- `git init`, `.gitignore`, `.env.example`, `AGENTS.md`, README draft.
- `[commit]`

**Criterion:** the spec and plan are in the repository; the repository is created on GitHub.

### 9.2 Core (60 min)

The main scenario end-to-end on minimal data. Branch → 4 commits → verify
the main scenario by hand at every step.

**Criterion:** the main scenario passes entirely locally.

### 9.3 Wrapping (30 min)

- Error handling: at least 3 scenarios.
- One test for the main scenario (+ one for a boundary, if you have time).
- README: running from scratch, known limitations.

**Criterion:** `npm test` is green; the README lets you run the project from scratch
(check in a clean folder: `git clone` → follow the instructions → it works).

### 9.4 Deploy and submission (20 min)

- Deploy, environment variables on the hosting.
- Open the link from a phone, go through the main scenario.
- Go through the submission checklist from theory 9.4, mark the items in `06-tracker.md`.
- `[commit]` + `[merge PR]`

**Criterion:** the public link is live, the submission checklist is fully marked.

---

## How to tell a module is complete

A module is considered complete when **all** of its practice criteria are met and
the marks are in `06-tracker.md`. Not "mostly", not "almost" — a criterion is either
met or not. It is the same discipline you demand from the agent.
