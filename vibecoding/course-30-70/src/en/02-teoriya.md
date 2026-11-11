# Course Theory

This is 414 minutes of reading — 30% of the course. Each block is designed for 45 minutes.
Read one block before the practice of the corresponding module. Don't skip ahead.

---

## Module 1. How vibe coding actually works

### 1.1 The model doesn't understand your code

An LLM predicts the next token. When it writes a function, it continues the
most probable text that looks like code. Three practical facts follow from this:

- **It writes boilerplate better than you do.** CRUD, parsing, HTTP client plumbing,
  regexes, configs — here the probability of a "correct continuation" is high,
  because the training data contains millions of such examples.
- **It writes rare and new code badly.** Non-standard architecture, your
  internal framework, an API from three years ago, a niche library — it will
  confidently make things up, because a confident tone is statistically more probable than a cautious one.
- **It doesn't "remember" your project.** It only sees what made it into the context:
  open files, your messages, the instruction file, repository search results.

Hence the main conclusion of the course: **you don't manage code, you manage context and criteria.**
The more precisely you describe what should come out, the less the model has to guess.

### 1.2 Why a long context ruins the result

The model has a context window, and it isn't elastic. When 40 messages, three failed
fix attempts, and a 2000-line log pile up in it, the quality of
answers drops: the model starts clinging to old wrong hypotheses and
repeating failed solutions.

Practical consequences:
- A new task — a new chat. Always, unless the task is a continuation of the current one.
- Don't paste whole files if you can point to a path and ask it to read them.
- Don't keep long logs in the chat: first find the 5 key lines in them yourself.
- If two attempts failed, restarting the session with a clean problem description
  works better than a fifth attempt to "fix" it.

### 1.3 Three modes of working with AI

| Mode | What it does | Where it's useful | Limitation |
|---|---|---|---|
| Chat | Answers with text | Explanations, plans, reviews, learning | Doesn't see the project, code is copied by hand |
| Autocomplete | Completes a line/block | Typing familiar code by hand | You're still writing it yourself |
| Agent | Reads files, edits, runs commands | The whole course | Can break many files in one step |

The course is built on the **agent** (Claude Code, Cursor, Codex CLI, Windsurf). The difference is
fundamental: the agent opens files itself, applies patches itself, runs
tests itself. So your work shifts — you don't type, you set the task,
review the diff, and decide whether to accept or roll back.

### 1.4 Where the agent lies especially confidently

Memorize this list — it saves days:

1. **Names of API methods and parameters.** It invents `client.fetchData()` where
   it's actually `client.get_data()`. Cure: docs or curl before code.
2. **Library versions.** It suggests syntax from an old or nonexistent version.
   Cure: `package.json` / `pyproject.toml` in context + "use only the
   APIs available in this version".
3. **Causes of errors.** It confidently names a cause without looking at the log. Cure:
   "read the stack trace first, hypothesis after".
4. **"Done, everything works."** It didn't run anything. Cure: always ask for
   command output, not a claim about the result.
5. **Silent modification of other people's files.** Along the way it "improved" three files
   you didn't ask for. Cure: read the diff, not just the message.

### 1.5 Your role in the process

Vibe coding doesn't cancel engineering, it moves it to another level:

- **Before:** design the architecture → write the code → debug → test.
- **Now:** describe what should come out → break it into steps → accept or
  reject diffs → verify the result.

The skills that actually determine quality: framing the task, reading a diff,
testing hypotheses, rollback discipline. Programming in the sense of "remembering syntax"
is nearly unnecessary. Understanding **what** must happen is absolutely required.

### 1.6 Module summary

- The model predicts text; accuracy depends on your description.
- Context is a scarce resource; it has to be cleaned.
- The agent is the main tool; it does a lot and can break a lot.
- Your job: spec, diff, verification, commit. Everything else is detail.

---

## Module 2. The spec and framing the task

### 2.1 Why the spec decides more than the model

The same model on the same task produces results that differ severalfold, depending
on the wording. The reason is simple: without acceptance criteria the model
optimizes for "looks like a correct answer", and with criteria — for a specific
verifiable behavior.

Bad: "write a script to process CSV".
Good: "the script reads `data.csv` with columns id,date,amount; drops rows
with amount ≤ 0; writes to `out.csv` the total per month, sorted descending;
if the amount column is missing, it exits with code 2 and a message to stderr".

The agent can verify the second option itself. The first — only you, with your eyes.

### 2.2 Six blocks of a spec

```
1. GOAL: what becomes possible after the task is done (1-2 lines)
2. USER: who uses it and in what situation
3. INPUTS/OUTPUTS: formats, data examples, edge cases
4. CONSTRAINTS: stack, versions, no new dependencies, don't touch files X
5. ACCEPTANCE CRITERIA: a list of verifiable statements, each one yes/no
6. WHAT WE'RE NOT DOING: explicit boundaries so the agent doesn't expand the scope
```

Block 6 is underestimated, and it saves the most: without it the agent will "for company"
add auth, caching, and Docker, because "that's how it's done".

### 2.3 Acceptance criteria: the main lever

An acceptance criterion is a statement that can be verified with a command or by observation.

- Not a criterion: "the code should be clean", "the UI should be convenient".
- A criterion: "with an empty list, the text "Nothing here yet" is shown",
  "`npm test` passes", "a request with an invalid email returns 400".

Rule: if a criterion can't be verified in 30 seconds, it's badly formulated.
Good criteria automatically turn into tests — that's the bridge to module 6.

### 2.4 Phrasings that break the result

| Phrasing | What happens | How to rephrase |
|---|---|---|
| "make it pretty" | random design, then 10 iterations | "minimalist, white background, one accent color, system-ui font" |
| "like in Notion" | a copy of someone else's product without your requirements | list the 3 specific elements you need |
| "optimize it" | micro-edits without measurements | "cut the /api/search response time from 800 ms to <200 ms, measured via X" |
| "add error handling" | a silent `except: pass` | "on 4xx show the server's error text, on 5xx — "try again later", cover both cases with a test" |
| "refactor it" | the whole project rewritten | "move validation out of the route into a separate module, behavior doesn't change, tests pass" |

### 2.5 Decomposition: step size

Guideline for task size for the agent:

- **15 minutes** — one function, one component, one endpoint. A diff of 30–80 lines.
  Such a step almost always passes on the first try.
- **1 hour** — a feature as a whole: data model + endpoint + minimal UI.
  It requires splitting into 3–4 steps, otherwise the diff is 400+ lines and you won't review it.
- **3+ hours** — "build an app". Almost guaranteed garbage: the agent guesses
  the architecture, you can't review the diff, rollback is impossible.

Rule: **a step should be such that the diff reads in 5 minutes.** If it doesn't
read — cut it.

### 2.6 Spec template (copy this)

```markdown
## Goal
After the task the user can <action> in order to <value>.

## User and scenario
Who: <role>. When: <situation>. Does: <steps>.

## Inputs/outputs
Input: <format, example>. Output: <format, example>.
Edge cases: <empty>, <very many>, <wrong type>, <network unavailable>.

## Constraints
Stack: <...>. Don't add dependencies: <...>. Don't change files: <...>.

## Acceptance criteria
- [ ] <verifiable statement 1>
- [ ] <verifiable statement 2>
- [ ] <verifiable statement 3>

## What we're not doing
- <explicit exclusion 1>
- <explicit exclusion 2>
```

### 2.7 `/goal`: the goal as a completion condition

A normal request ends when the model decides it's done. `/goal` changes
that: you declare a verifiable condition, and the agent keeps working turn by turn until
the condition is met. The judge isn't the one who did the work, but a separate fast model —
it looks at what the agent has already shown in the session: test output, build logs,
the list of changed files.

```
/goal pytest tests/auth exits with code 0, ruff check src/auth is clean,
git diff --name-only shows only src/auth/, or stop after 15 turns
```

Three parts without which the condition doesn't work:

1. **A measurable end signal.** Exit code, empty queue, green lint.
   Not "make it cleaner" and not "so it's convenient" — there's nothing to check those with.
2. **Proof in the session.** The condition must be verifiable from what the agent
   can show right in the chat. If verification requires your access to prod —
   `/goal` isn't suitable.
3. **Boundaries.** What can't be changed (`only src/auth/`) and a turn limit
   (`or stop after 15 turns`). Without a limit, an autonomous run burns tokens.

| | Normal request | `/goal` |
|---|---|---|
| Who decides "done" | the same model, one turn | a separate evaluator after each turn |
| Turns | one, until you rewrite it | as many as needed until the condition is met |
| Where it's useful | edits, recon, questions | migrations, "until the tests are green", backlog burn-down |
| Where it hurts | — | subjective quality, recon, tasks without boundaries |

Practical consequences:

- **`/goal` doesn't replace the spec, it builds on it.** The acceptance criterion from block 5
  is almost a ready-made condition. If a criterion can't be verified with a command, `/goal`
  won't save it — it will turn it into an infinite loop.
- **One active goal per session.** A new one replaces the old one and immediately starts a turn.
  Clicking on the status shows the condition, time, turn count, tokens, and the reason
  for the last evaluation.
- **Stop and clear:** `clear` (synonyms `stop`, `off`, `reset`, `cancel`).
  `/clear` also clears the active goal.
- **Requires a trusted workspace.** If hooks are disabled
  (`disableAllHooks`), the command doesn't work.
- **Expensive not in tokens but in turns.** The evaluation runs on a cheap model,
  but the turns themselves run on the full one. A limit in the condition is mandatory.
- **Autonomy isn't always needed.** The value of `/goal` is in the absence of
  "continue?" after every step, not in skipping review. You still review the diff
  yourself, and there's a rollback for a failed autonomous attempt.

`/goal` exists in Claude Code and OpenAI Codex CLI. It's not in Cursor and Windsurf:
there the role of the goal is played by the plan plus explicit criteria in the request.

### 2.8 Module summary

- A spec is 10 lines, six blocks, acceptance criteria are mandatory.
- An acceptance criterion = a verifiable yes/no, otherwise it's a wish.
- The "what we're not doing" block limits arbitrary scope creep.
- A step whose diff doesn't read in 5 minutes is too big.
- `/goal` is the same acceptance criterion, but as a stop condition for the agent.

---

## Module 3. The cycle: prompt → diff → verification → commit

### 3.1 Anatomy of a working request

Five elements, in this order:

1. **Context**: where we are, what already exists, which files matter. Links to paths, not a retelling.
2. **Task**: one action in the imperative. Not two, not three.
3. **Constraints**: what can't be changed, which APIs to use, what style.
4. **Result format**: "edit the files directly", "show me the plan first",
   "show only the diff", "add a test".
5. **A ban on improvisation**: "don't refactor anything outside this function".

Example:
> In `src/api/orders.ts` the `GET /orders` endpoint returns all orders without a
> filter. Add a `status` query parameter (values `new`, `paid`, `cancelled`),
> return everything by default. Invalid value → 400 with the text
> `unknown status`. Only this file. Add a test for the 400. Don't refactor anything.

### 3.2 Reading the diff: six red flags

Check every diff against this list — 80% of problems are caught here:

1. **Removed or weakened checks.** Removed `if (!user) return 401`,
   replaced validation with "let's try and see". The most dangerous category.
2. **`try/except` around everything.** Silent handling that hides the error and
   turns a bug into "strange behavior".
3. **Magic constants and hardcoding.** `if (id === 42)`, local paths
   `C:\Users\...`, a hardcoded key.
4. **Edits to files outside the task.** The agent "improved along the way" the config,
   dependencies, styles. Every such edit is an unplanned risk.
5. **New dependencies.** A new library for one function is almost always a
   bad trade: weight, vulnerabilities, maintenance.
6. **Modified tests.** The test was fitted to the code, not the other way around. That's the same
   as deleting the check.

Additionally: a file rewritten entirely where one line was needed.
A 500-line diff instead of 5 is a signal that the step was too big.

### 3.3 How to verify: three levels

- **Level 1 — it runs.** The code starts, the command runs without errors.
  The minimum, mandatory.
- **Level 2 — behavior.** You manually check exactly the acceptance criteria
  you wrote in the spec. Not "seems to work", but item by item.
- **Level 3 — test.** The criterion has been turned into an automated test. That's the goal of module 6.

If the agent says "done" and you haven't passed level 1, the answer is not accepted.
Ask for command output, not a claim.

### 3.4 When to ask for an explanation and when to redo

- **Ask for an explanation**: the diff looks reasonable, but it's unclear why this
  solution was chosen. Useful, cheap, often reveals a wrong hypothesis.
- **Ask for a plan**: the task is bigger than one step. "Show me a 4-step plan, don't make
  any edits" — saves you a rollback.
- **Redo immediately**: a red flag from list 3.2, a diff outside the task, "done"
  without a run, a second attempt to fix the same place. Explanations won't help here.

Rule of two attempts: if the second attempt to fix the same place also failed —
roll back and rephrase the task. By the third attempt the agent cements a wrong
model of the problem.

### 3.5 Commit as a tool, not a formality

- Commit after every accepted step. A rollback point costs 5 seconds, debugging
  a broken mix costs an hour.
- The commit message is written by **you**, not the agent: `feat(orders): filter by status,
  test for 400` — in a month you'll understand what happened and why.
- Don't commit: secrets, `node_modules`, `.env`, local configs — these go into
  `.gitignore` before the first `git add`.
- One commit = one reason for change. "Feature + reformatting the whole project"
  in one commit is a guaranteed conflict and an unreadable diff.

### 3.6 Module summary

- A working request: context, task, constraints, format, a ban on extras.
- The diff is read against six red flags; tests and checks are untouchable.
- Verification: run → behavior against criteria → automated test.
- Two failures in a row = rollback, not a third attempt.
- Commit after every accepted step, you write the message.

---

## Module 4. Context: how the agent sees your project

### 4.1 What gets into the context

The agent works with what's available to it in the session:

- your messages and its previous answers;
- files it has read or that are open;
- the project instruction file (read automatically);
- the results of its own commands: test output, logs, errors;
- automatic search across the repository, if you gave a path instead of text.

What's **not** in the context: your head. The stack, conventions, "we don't do it that way",
the reason why `legacy/` can't be touched — all of that has to be written down explicitly.

### 4.2 The project instruction file

One file at the repository root. The names depend on the tool: `CLAUDE.md`,
`AGENTS.md`, `.cursorrules`, `.github/copilot-instructions.md`. Contents:

```markdown
# Project: <name>
Purpose: <one line>

## Stack
Node 20, TypeScript strict, Fastify, PostgreSQL 16, vitest.
Python 3.12 for scripts in /tools.

## Commands
- run: npm run dev
- tests: npm test
- lint: npm run lint (mandatory before commit)

## Rules
- TypeScript strict: no any without a comment justifying it
- API errors: 4xx with text, 5xx without internal details
- New dependencies only with approval: propose first, install after

## Prohibitions
- don't change /legacy/** without explicit instruction
- don't edit tests to make them pass
- don't touch .env, migrations, and CI configs
```

This file is the highest return on a minute invested in the whole course. Write it
once — every subsequent request is a third shorter.

### 4.3 Why the agent "forgets" and "gets dumber"

Quality drops not because of "model fatigue" but because of context:

- **40+ messages**: old wrong hypotheses compete with new facts.
- **Big files and whole logs**: the useful stuff drowns, the model clings to something random.
- **Mixing tasks**: edits for feature A and feature B in one chat produce diffs
  that can't be separated and rolled back.
- **Retelling instead of a link**: you describe the code in words — the model fills in the gaps.

Cure: a new chat for a new task; a path to the file instead of its contents; 5 key
log lines instead of 2000; an explicit "we're done with A, starting B" from a clean slate.

### 4.4 Context management techniques

1. **Plan before edits.** "Show me a 5-step plan, don't change anything" — catch
   the wrong understanding before a diff exists.
2. **One file per step.** "Only `parser.py` for now, the rest later".
3. **Explicit state handoff.** "Summary: X and Y done, Z left" — when
   you continue in a new chat.
4. **A targeted quote.** Paste 5–10 lines of code instead of the whole file.
5. **Reset.** Two failures — a new chat + a minimal problem description + the stack trace.

### 4.5 Module summary

- Only what's explicitly said gets into the context; the rest the model fills in.
- The instruction file is a mandatory part of a project, not a luxury.
- Quality degradation = a cluttered context, not a "bad model".
- A new chat for a new task; plan before edits; one file per step.

---

## Module 5. Debugging when the agent goes in circles

### 5.1 Three circles of hell

1. **Guessing the cause.** The agent sees the symptom and immediately names a cause without
   looking at the log. The fix misses, the symptom remains.
2. **Treating the symptom.** "The error doesn't appear" — because a `catch` was added
   that swallows it. The cause is alive.
3. **Breaking the neighbor.** The fix works but breaks another scenario; the next
   fix breaks the first one. Classic ping-pong.

All three are cured by one rule.

### 5.2 The one-fact rule

**First a reproducible minimal case, then the fix.**

The order is mandatory:
1. A command that reliably reproduces the problem (or exact steps in the UI).
2. The full error text / stack trace — into the context.
3. A hypothesis formulated as a verifiable statement: "if the problem is an
   empty array, then `[]` in the request will give the same stack trace".
4. Verifying the hypothesis before the fix: log, breakpoint, `console.log`, curl.
5. Only after confirmation — the fix.

Without step 3 the agent edits everything that looks like the cause. Usually that's 3–4 files,
2 of which were fine.

### 5.3 How to make the agent look instead of fantasize

Phrasings that work:

- "First read the `npm test` output in full and quote the 3 lines where it fails.
  Don't propose a hypothesis until you quote them."
- "Propose 3 hypotheses. For each — a command that confirms or
  refutes it. Don't make any edits."
- "Explain what exactly you checked and what remains unchecked."
- "Here's the stack trace. Which line of our code participates in it?"

Phrasings that don't work: "fix it", "fix the error", "it doesn't work,
figure it out" — they give carte blanche for guessing.

### 5.4 When to roll back

A rollback is cheaper than a fix if:

- two attempts in a row haven't moved the symptom;
- the diff has spread to files that weren't in the task;
- the agent started "refactoring along the way" the place where the bug is;
- you don't understand what's happening in the diff.

Procedure: `git stash` or `git reset --hard HEAD`, then a **rephrased**
task with a new fact (stack trace, minimal case, library version). Not the same
wording — otherwise the result will repeat.

### 5.5 The specifics of AI debugging

- **False "fixes"**: the code changes, the error leaves this scenario and
  surfaces in a neighboring one. Check not only the case, but the neighboring scenario.
- **Version mismatch**: the agent often suggests syntax from the wrong library
  version. Check `package.json`/`pyproject.toml`.
- **Silent errors**: `except Exception: pass` turns a crash into wrong data.
  That's worse than a crash — always look for such places in the diff.
- **A fix without a test**: without a test the bug will come back. Every fix means plus one
  test (the bridge to module 6).

### 5.6 Module summary

- First reproduction and fact, then hypothesis, then fix. Not the other way around.
- "Fix it" is a bad prompt; "quote the stack trace and propose 3 verifiable
  hypotheses" is a good one.
- Two failures in a row = rollback and a new formulation.
- A fix without a test isn't considered closed.

---

## Module 6. Tests and protection against regressions

### 6.1 A test = an acceptance criterion in executable form

The criterion "with an empty list, "Nothing here yet" is shown" can be fooled with words.
The test `expect(render([])).toContain('Nothing here yet')` can't be fooled: it either
passes or it doesn't.

For vibe coding this is critical, because the agent optimizes for the text of the task.
If the criterion exists only in text, it can "fulfill" it formally. A test is a
specification that can't be rephrased in its own favor.

### 6.2 Which tests to write (and how many)

A pyramid adapted for AI development:

- **70% unit** — pure functions: parsing, validation, calculations, formatting.
  Fast, stable, they catch the bulk of regressions from the agent's edits.
- **20% integration** — one endpoint or one component with mocks. They check
  the glue: is the response code right, what landed in the database.
- **10% e2e** — one or two end-to-end scenarios: "the user opened, entered, saw".
  Expensive and fragile; you don't need more than two or three per project in this course.

**Don't write**: UI snapshots at the start of a project — the agent changes the layout, you
get 50 failing snapshots and start "updating" them, that is, disabling the
check. Don't write tests for getters or for the framework.

### 6.3 Why test before code

An agent that's given a test works fundamentally differently from an agent with a text
description: it has feedback. The cycle becomes mechanical:

1. We write a test for behavior that doesn't exist.
2. We run it — the test fails (be sure to check that it fails **for the right
   reason**: not "module not found" but "expected X, got Y").
3. We ask for the implementation.
4. We run it — it passes.
5. We ask it to break the implementation — the test must fail. If it didn't fail, the test is useless.

Step 5 is the most underrated. It separates a real check from a decorative one.

### 6.4 The ban on editing tests

The most common degradation in vibe coding: the agent can't pass a test and changes the test.
Wording for the instruction file and for the request:

> Tests are a specification. If a test fails, fix the implementation. You may change a test
> only if I explicitly asked for it, and then first explain why the old expectation
> was wrong.

Check in the diff: any change in `*.test.*` / `test_*.py` without your request is
red flag #1.

### 6.5 Coverage as a decoy metric

100% line coverage is achievable without a single meaningful check: a test calls
a function and doesn't verify the result. It's more useful to look not at the percentage but at the questions:

- Is the main scenario covered? (mandatory)
- Are the boundaries covered: empty, very many, wrong type, no network? (mandatory)
- Is there a test for every bug you've already caught? (mandatory)
- Is there a test for every line? (doesn't matter)

### 6.6 Module summary

- A test is the only acceptance criterion that can't be bypassed with wording.
- 70/20/10: unit — integration — e2e; avoid UI snapshots.
- Test before code, check "fails for the right reason", mutation check.
- The agent doesn't edit tests. Period.
- Coverage is not the goal; the goal is covered boundaries and caught bugs.

---

## Module 7. Data, APIs, environment, security

### 7.1 Secrets

- Keys only in `.env`, and `.env` in `.gitignore` **before** the first commit.
- The repository contains `.env.example` with variable names and empty values.
- Code reads config from the environment; a hardcoded key in code is a red flag.
- A key that got into git history is considered compromised: `git rm` of the file
  doesn't remove it from history. You need to revoke the key (rotate), not "we deleted the file".
- On hosting, variables are set in the panel, not in code; the local `.env` and
  prod variables are different sets.

### 7.2 The agent and external APIs: where it lies

Three typical hallucinations:

1. **A nonexistent method/endpoint.** It confidently writes `api.getUserByEmail()`.
2. **An outdated parameter.** It uses `?limit=` where it's now `?page_size=`.
3. **Invented response fields.** It reads `data.items`, though it's actually `data.results`.

A procedure that closes 90% of problems:

1. Open the docs (or `openapi.json` / `swagger`).
2. Make a `curl` call by hand and look at the **real** response.
3. Paste the real response (abbreviated) into the context: "here's the response shape, use
   only these fields".
4. Only then ask for the client and error handling.

### 7.3 Validation at the boundary

Any data from outside — user input, an API response, a file, an environment
variable — is untrusted. Validate **on input**, once, in one place:

- a schema (zod/pydantic) instead of manual `if`s;
- checking required fields and types;
- explicit behavior on invalid data: 400 with a clear message, not a crash;
- tests for "empty", "wrong type", "too long".

Types in TypeScript/Python are cheap protection inside the code, but not a substitute for validation
at the boundary: data from the network arrives as `any` / `dict`.

### 7.4 What not to give to the agent

- The prod database and prod dumps. A local copy or fixtures.
- Private user data, other people's tokens, internal URLs.
- Passwords, private keys, certificates.
- Repositories under NDA without checking company policy.

Check before sending: "if this message ends up in a public log, will it be a
problem?" If yes — don't send it.

### 7.5 Module summary

- `.env` + `.gitignore` + `.env.example`; a key in history = revoke the key.
- First curl and the real API response, then code.
- Validation at the boundary and tests for bad data.
- Secrets, prod, and personal data don't get into the context.

---

## Module 8. Deployment, git hygiene, teamwork

### 8.1 Branches and small PRs

- The main branch is protected: no direct pushes, not even for you.
- Every task — a branch, every change — a PR. Even if you work alone:
  a PR is the place where the diff is visible and where you can roll back in one click.
- A PR of 100–300 lines gets reviewed; at 1500 it's "approving without looking", meaning not
  reviewed at all. Split it up.
- The agent works on a branch: a broken branch doesn't touch the working main.

### 8.2 Build and the prod environment

"It works on my machine" ≠ "it deployed". The differences that catch you at deploy time:

- environment variables: present locally, not set on the host;
- runtime version: Node 22 locally, 18 on the host;
- case in paths: Windows forgives `Components/Button`, Linux doesn't;
- dependencies: `devDependencies` aren't installed in the prod build;
- filesystem: locally you can write to `./data`, on serverless you can't.

Practice: the first deploy is done **before** the project is ready — on an empty or
almost empty app. That way you separate environment problems from code problems.

### 8.3 Logs, monitoring, rollback

- Logs are the only source of truth about prod; without them debugging is impossible.
- An error in prod: first logs and status code, then hypotheses (the same one-fact
  rule as in module 5).
- Rollback: `revert` the commit or redeploy the previous version. Being able to roll back in
  2 minutes matters more than never making mistakes.
- Never "fix prod by hand": the edit goes through a branch and a deploy, otherwise
  the state of prod doesn't match the repository.

### 8.4 Reviewing AI code: what a human looks at

A checklist, 12 items, by priority:

1. Removed or weakened checks and validation.
2. Modified tests without a request.
3. Silent error handling (`catch`/`except` with no action).
4. Secrets, keys, tokens, local paths.
5. SQL queries: concatenation instead of parameters.
6. Access-permission checks where they used to be.
7. New dependencies: are they needed, what do they pull in.
8. Edge cases: empty, very many, wrong type.
9. The logic of money, dates, time zones, rounding.
10. Edits to files outside the task.
11. Readability: will you understand this in a month.
12. Compliance with the spec: all acceptance criteria closed.

Items 1–4 take a minute to check and catch most real problems.

### 8.5 Commit messages and PR descriptions

- Commit: `type(scope): what was done` — for example `fix(orders): 400 on
  unknown status`.
- PR: what changes, why, how to verify (steps), what's out of scope.
- Separately: "what trade-offs were made" — in a month that will save you from wrong
  conclusions.

### 8.6 Module summary

- A branch + PR for every task; main is protected.
- The first deploy — early, to separate the environment from the code.
- Rollback is a skill; debug only from logs.
- Reviewing AI code: first checks, tests, errors, secrets — then everything else.

---

## Module 9. Capstone: analysis before the build

### 9.1 How to choose a project

Criterion: **high value for you / low unknown for the agent.**
A bad choice is an "Airbnb clone": huge unknown, zero personal value.
A good one is "a utility that parses my bank export and computes categories":
little unknown, high value, real data to verify against.

### 9.2 Four build steps

Each step ends with something runnable:

1. **Skeleton.** Repository, `.gitignore`, `.env.example`, instruction file,
   "Hello world" on the chosen stack. Check: it runs locally.
2. **Core.** The main scenario end-to-end on minimal data. Check:
   the scenario completes fully.
3. **Wiring.** Error handling, one or two tests for the main scenario, README.
   Check: tests pass, the README lets you run it from scratch.
4. **Deploy.** A public link, environment variables on the host, a check from
   your phone. Check: the link opens and works.

### 9.3 What to cut from the MVP

Cut without mercy: auth (if it's not the point), an admin panel, dark theme,
settings, export, multilingual support, "pretty". The first version proves that
the main scenario works. Everything else — after the link.

### 9.4 Delivery checklist

- [ ] `git clone` + the README instructions → the app runs from scratch
- [ ] The main scenario works on real data
- [ ] There's at least one test for the main scenario, `npm test` is green
- [ ] The public link is live, checked not only in your own browser
- [ ] There are no secrets in the repository, `.env.example` is up to date
- [ ] The project instruction file is in place
- [ ] The commit history reads well: it's clear what was done and why
- [ ] Known limitations are documented in the README

### 9.5 Course summary

The skill you've gained isn't "the ability to write code with AI". It's the ability
to **take an undefined task to a verifiable result**: spec,
small steps, reading the diff, tests, rollback, deploy. Models will change,
this cycle won't.
