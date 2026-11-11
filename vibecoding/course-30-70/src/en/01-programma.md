# Course syllabus

Format: 8 modules + capstone. 1380 minutes in total.
Theory 414 min = **30.0%**. Practice 966 min = **70.0%**.

## Summary table

| # | Module | Theory | Practice | Total | Cumulative |
|---|---|---|---|---|---|
| 1 | How vibe coding actually works | 45 | 105 | 150 | 150 |
| 2 | Spec and task definition | 45 | 105 | 150 | 300 |
| 3 | The loop: prompt → diff → verify → commit | 45 | 105 | 150 | 450 |
| 4 | Context: how the agent sees your project | 45 | 105 | 150 | 600 |
| 5 | Debugging when the agent goes in circles | 45 | 105 | 150 | 750 |
| 6 | Tests and protection against regressions | 45 | 105 | 150 | 900 |
| 7 | Data, APIs, environment, security | 45 | 105 | 150 | 1050 |
| 8 | Deployment, git hygiene, teamwork | 45 | 105 | 150 | 1200 |
| 9 | Capstone: your own project from scratch to a link | 54 | 126 | 180 | 1380 |
| | **Total** | **414 (30.0%)** | **966 (70.0%)** | **1380** | |

---

## Module 1. How vibe coding actually works — 150 min

**Theory (45 min)**
- What an LLM really does: predicts tokens, it doesn't "understand" code.
- Why long context degrades quality and what that changes in your day-to-day work.
- Three modes: chat, autocomplete, agent with tools. What only the agent can do.
- Limits: the agent confidently writes boilerplate code and confidently lies about an API it has never seen.
- Your role: not a programmer, but the person who states the task and accepts the result.

**Practice (105 min)**
- 20 min — environment: agent, git, Node, Python, an empty project folder.
- 20 min — first repository, first commit before any code, `.gitignore`.
- 45 min — first assignment: a 40–60 line console utility from a ready-made spec.
- 20 min — walk through the diff line by line: what you accepted, what you rejected, why.

**Result:** a repository with a history of 3+ commits and an understanding of why you need a spec.

---

## Module 2. Spec and task definition — 150 min

**Theory (45 min)**
- A spec of 6 blocks: goal, user, inputs/outputs, constraints, acceptance criteria, what we are NOT doing.
- Why acceptance criteria are the main quality lever: the agent verifies them instead of guessing.
- Phrasings that break the result: "make it beautiful", "like Airbnb", "optimize it".
- Decomposition: a task that takes the agent 15 minutes versus one that takes 3 hours.
- Spec template and anti-template side by side, on the same example.
- `/goal` — the goal as a completion condition: the agent decides for itself whether it's done, based on a verifiable signal.

**Practice (105 min)**
- 30 min — write the spec for your own small project (not the capstone), 10 lines.
- 30 min — two implementation attempts: with a bad phrasing and with a spec; compare the diffs.
- 20 min — cut the spec into 5 tasks, each with its own criteria.
- 15 min — rewrite an acceptance criterion as a condition for `/goal` and run it: tests green, diff only in your folder, step limit.
- 10 min — retro: what was superfluous in the spec, what had to be specified along the way.

**Result:** a spec that another person (or an agent) can use to reproduce the result without questions, and the ability to turn its criteria into a `/goal` condition.

---

## Module 3. The loop: prompt → diff → verify → commit — 150 min

**Theory (45 min)**
- Anatomy of a good request: context, task, constraints, response format, what not to do.
- Reading a diff: 6 red flags (deleted checks, "magic" constants, a silent `try/except`, rewritten files belonging to others, new dependencies, modified tests).
- Step size: why a step with more than 200 lines of diff almost always goes to the trash.
- When to ask the agent to explain, and when to just redo it.
- The commit as a rollback point; the commit message as documentation.

**Practice (105 min)**
- 25 min — 8 mini-exercises of 3 minutes each: phrasing a request for a given task.
- 40 min — a feature in an existing project in exactly 4 steps, with a commit after each.
- 25 min — deliberately crooked diff from the agent: find all the red flags using the checklist.
- 15 min — retro: how many times you rolled back and at which step you lost time.

**Result:** the ability to carry a feature in short, verifiable steps with rollback.

---

## Module 4. Context: how the agent sees your project — 150 min

**Theory (45 min)**
- What gets into the context: open files, project instructions, chat history, auto-search across the repository.
- The instructions file (`CLAUDE.md` / `AGENTS.md` / `.cursorrules`): what to write there so you don't repeat yourself every time.
- Why the agent doesn't know your stack until you tell it; why it "forgets" after 40 messages.
- Strategies: a new chat for a new task, references to files instead of retelling, "show me the plan before editing".
- Garbage in context = garbage in code: how large files and logs ruin a session.

**Practice (105 min)**
- 30 min — write the project instructions file: stack, run commands, style rules, prohibitions.
- 45 min — three tasks in a row in one chat and the same three in separate chats; measure the difference.
- 20 min — when the agent starts hallucinating: restart techniques with minimal context.
- 10 min — retro: which rules in the instructions saved the most time.

**Result:** a project with an instructions file that the agent follows without reminders.

---

## Module 5. Debugging when the agent goes in circles — 150 min

**Theory (45 min)**
- Three circles of hell: the agent guesses the cause, the agent "fixes" the symptom, the agent breaks something nearby.
- The one-fact rule: first a reproducible minimal case, then the fix.
- How to make the agent look at logs and stack traces instead of fantasizing.
- The "explain what you checked" technique and the "propose 3 hypotheses with a check" technique.
- When rolling back and rewriting from scratch is cheaper than fixing.

**Practice (105 min)**
- 20 min — a broken project with 3 known bugs; reproduce each one with a minimal case.
- 50 min — fix all three, recording for each: hypothesis → check → fix → commit.
- 25 min — give the agent a deliberately wrong hypothesis: see whether it argues, and learn to provoke an argument.
- 10 min — retro: how many cycles until the fix and what would have halved them.

**Result:** three closed bugs with commits and a working debugging algorithm.

---

## Module 6. Tests and protection against regressions — 150 min

**Theory (45 min)**
- The test as an acceptance criterion in executable form: a spec you can't fool with words.
- The pyramid for vibe coding: many unit tests on logic, few e2e, almost no UI snapshots.
- Test first, code later: why that's easier for the agent than the other way around.
- A ban on the agent editing tests without your consent — how to phrase it.
- Coverage as a decoy metric: 100% of lines and zero checks of meaning.

**Practice (105 min)**
- 20 min — install a test runner (vitest/pytest), first test for an existing function.
- 45 min — a TDD cycle on a new feature: 5 tests, each failing before the implementation.
- 30 min — ask the agent to break the feature and check that the tests caught it.
- 10 min — retro: which tests turned out to be useless and why.

**Result:** a project with tests that fail on a regression, and the habit of "test before code".

---

## Module 7. Data, APIs, environment, security — 150 min

**Theory (45 min)**
- Secrets: `.env`, `.gitignore`, why a key in git history = a compromised key.
- The agent and external APIs: hallucinated methods, outdated parameters, invented response fields.
- Checking an API by hand: documentation, curl, a real response before any code.
- Validating input data at the boundary; types as cheap protection.
- What never to give the agent: production databases, private data, other people's tokens.

**Practice (105 min)**
- 20 min — `.env`, `.env.example`, reading the config, checking that the key didn't get into git.
- 50 min — integration with a public API: curl first, then the client, then error handling.
- 25 min — validation of responses and input data, tests for malformed data.
- 10 min — retro: what the agent lied about and how you caught it.

**Result:** a working API integration, secrets outside the repository, errors handled.

---

## Module 8. Deployment, git hygiene, teamwork — 150 min

**Theory (45 min)**
- Branches and small PRs: why an agent on a branch is safer than an agent in main.
- Build and production environment: why "it works on my machine" doesn't mean "it deployed".
- Environment variables on the host, logs, rollback to the previous deployment.
- Reviewing AI code: what a human should check first.
- How to write commit messages and PR descriptions so you're not guessing a month later.

**Practice (105 min)**
- 15 min — branch, PR, protecting main from direct pushes.
- 40 min — deploy the project to Vercel/Netlify with environment variables.
- 35 min — deliberately break production and roll back: first via redeploy, then via revert.
- 15 min — a 12-point AI code review checklist, applied to your own PR.

**Result:** a public link to a working project and the ability to roll back in 2 minutes.

---

## Module 9. Capstone — 180 min

**Theory, walkthrough (54 min)**
- Choosing a project by the "value / uncertainty" criterion, not "what's impressive".
- The build plan: 4 steps, each ending with something runnable.
- What to cut from the MVP to fit into 126 minutes of practice.
- The handoff checklist: it runs, the link is live, README, tests, no leaked secrets.

**Practice (126 min)**
- 16 min — a 10-line spec + a list of 4 steps + the repository.
- 60 min — the core: the main scenario works locally, 4 commits.
- 30 min — the wrapping: error handling, one test for the main scenario, README.
- 20 min — deploy, check the link from your phone, final commit.

**Result:** a deployed project and a completed handoff checklist.

---

## How to keep the 30/70 ratio in practice

- Set a timer for theory. 45 minutes are up — close it and go do the work.
- If you're stuck in practice for more than 20 minutes, that's not a reason to read more theory,
  it's a reason to shrink the step and go back to a short spec.
- Skipped practice doesn't carry over to the next module: without it the next
  module makes no sense, because they all build on the previous skill.
