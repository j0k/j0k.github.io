# Vibe coding with OpenCode — a practical course

A course on how to get **predictable** results from AI agents in software development.
Not about "secret prompts", but about context, verification, and engineering discipline.

Author: course team · Version 1.0 · OpenCode V2

---

## What you will learn

By the end of the course you will be able to:

1. Explain how an LLM works and why it makes mistakes — without the mystique.
2. State a task so that the agent produces working code on the first or second attempt.
3. Set up a project for the agent: `AGENTS.md`, permissions, build and test commands.
4. Work in the loop "spec → plan → small diff → verification → commit".
5. Read the agent's diffs and find dangerous changes.
6. Calculate the cost of a session and pick a model for the task, not "the smartest one".
7. Build your own tooling: skills, commands, subagents.

---

## Who it is for

- Students, entrepreneurs, marketers, experts, founders.
- Anyone who tried "asking ChatGPT to write a project" and got a mess.

**Required beforehand:** git (branches, diff, revert), a terminal, one programming language
with tests (Python/JS/Go/Java — any), OpenCode installed.

Readiness check:

```bash
git --version
opencode --version
node --version   # или python3 --version
```

---

## How the course is structured

```
theory   ~40%  — concepts and mental models, no fluff
practice ~60%  — exercises with acceptance criteria
```

Each module is a folder with two mandatory files:

| File | What is inside |
| --- | --- |
| `README.md` | theory: concepts, mini-lecture, comprehension questions |
| `practice.md` | exercises, acceptance criteria, time |

**Course rule:** a module is not passed until the artifact is submitted to `labs/`.

---

## Syllabus

| # | Module | Theory | Practice | Hours |
| --- | --- | --- | --- | --- |
| 00 | [Orientation](modules/00-orientation/README.md) | what vibe coding is, roles, boundaries | set up the environment, first session | 2 |
| 01 | [How LLMs work](modules/01-llm-basics/README.md) | tokens, context, sampling, hallucinations | experiments that break your intuition | 4 |
| 02 | [Context engineering](modules/02-context/README.md) | window, `AGENTS.md`, session hygiene | write `AGENTS.md`, measure degradation | 4 |
| 03 | [Spec and prompt](modules/03-spec/README.md) | spec-first, criteria, plan | turn 3 tasks into specs | 5 |
| 04 | [Oracles and verification](modules/04-oracles/README.md) | tests, types, linters, CI | TDD loop with an agent | 5 |
| 05 | [Agent loop and permissions](modules/05-agent-loop/README.md) | tool calling, permissions, isolation | deny list, worktree, `--auto` | 4 |
| 06 | [Economics and model choice](modules/06-economics/README.md) | price, cache, window, latency | calculate cost, compare models | 3 |
| 07 | [Refactoring at scale](modules/07-refactor/README.md) | multi-file changes, green repo | migrate a module with an agent | 5 |
| 08 | [Review and quality gates](modules/08-review/README.md) | reading diffs, red flags, security | catch 3 bad diffs | 4 |
| 09 | [Customization](modules/09-custom/README.md) | skills, commands, subagents, MCP | build your own tooling | 4 |
| 10 | [Capstone](modules/10-capstone/README.md) | — | a feature from spec to CI + retro | 10 |

Total ≈ 50 hours. The order is mandatory: 01–04 are the foundation; without them, 05–09 turn into a set of buttons.

---

## Schedule

**Semester (16 weeks, 3 h/week):**

| Weeks | Modules |
| --- | --- |
| 1–2 | 00, 01 |
| 3–4 | 02, 03 |
| 5–6 | 04 |
| 7–8 | 05 |
| 9 | 06 |
| 10–11 | 07 |
| 12–13 | 08 |
| 14 | 09 |
| 15–16 | 10 |

**Intensive (2 weeks, 25 h/week):** one module per day, capstone in the last 2 days.

---

## Grading

| Part | Weight | What is graded |
| --- | --- | --- |
| Understanding | 25% | answers to module questions, oral defence |
| Practice | 45% | artifacts in `labs/`, meeting the acceptance criteria |
| Capstone | 30% | a feature up to green CI + retro based on metrics |

Passing score — **70%**, the capstone is mandatory. Details: [rubric.md](rubric.md).

---

## Repository structure

```
Vibecode/opencode/
├── README.md            ← you are here
├── rubric.md            ← grading criteria
├── glossary.md          ← concepts (grows as the course goes)
├── resources.md         ← what to read beyond the course
├── progress.md          ← progress tracker
├── templates/           ← artifact templates
│   ├── AGENTS.md
│   ├── spec.md
│   ├── review-checklist.md
│   └── retro.md
├── modules/             ← 00..10, each with README.md + practice.md
└── labs/                ← artifacts go here
    └── README.md
```

---

## Three rules that matter more than everything else

1. **Never accept a diff you have not read.** Vibe coding without reading the diff is a loan at 300%.
2. **No oracle — no task.** If the result cannot be checked with a command, the task is not ready for the agent.
3. **One task — one session.** Mixing goals in one context is the main reason "the model got dumb".

---

## Where to start right now

1. Read [modules/00-orientation/README.md](modules/00-orientation/README.md).
2. Fill in [progress.md](progress.md) — set the start date.
3. Open a terminal in your learning project and run `opencode`.
