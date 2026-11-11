# Module 02 — Context Engineering

**Time:** 4 hours · **Format:** 80 min theory + 160 min practice

---

# Theory

## 1. Context is working memory, not a warehouse

Every request to the model is assembled anew from:

```
system policy → project instructions → open files → history → your question
```

All of this is a **budget**. The more junk there is, the less is left for what matters.

Mental model: the agent does not have a "project memory", it has a **desk** onto which you lay out
papers every time. Whatever you did not put there is not there.

## 2. Three levels of instructions

| Level | File | Scope |
| --- | --- | --- |
| Global | `~/.config/opencode/opencode.jsonc` | your habits, models, permissions |
| Project | `<project>/AGENTS.md` | stack, commands, conventions |
| Session | your request | the specific task |

`AGENTS.md` is the most underrated file in vibe coding. It is read automatically
in every session, so 20 lines there save hours of explanation.

## 3. What to write in AGENTS.md

A good `AGENTS.md` answers the questions the agent would otherwise figure out by guessing:

```markdown
# Project: <name>
## Stack
Python 3.12, FastAPI, pytest, Ruff
## Commands
- tests: `pytest -q`
- linter: `ruff check .`
- run: `uvicorn app.main:app --reload`
## Conventions
- typing is mandatory, `mypy` strict
- no new dependencies without discussion
- errors go through `AppError`, not `raise ValueError`
## Forbidden
- touching `migrations/` by hand
- changing `.env`
- committing to `main`
```

Rules: short, imperative, only what cannot be guessed.

## 4. Session hygiene

| Signal | Action |
| --- | --- |
| The agent forgot a requirement from the beginning | restate it in the question, don't dig through history |
| 3+ failed attempts in a row | new session + a precise description |
| Two tasks got mixed together | split into two sessions |
| The context is almost full | compaction or a new session |

**Compaction** (compressing the history) helps, but it does not compress everything equally — important details
may get lost. The more reliable option is to move the result into a file (a plan, `TODO.md`) and start over.

## 5. Links instead of retelling

| Bad | Good |
| --- | --- |
| "We have an auth module, it's like this…" | `src/auth/session.py, the refresh_token function` |
| "I'll paste the code here" (500 lines) | "see the file, only change `parse_date`" |
| "How is it in our project?" | "like in `services/billing.py`" |

The model can read files with a tool. Give it a path — you save tokens and get
the current version instead of your retelling.

## 6. A request structure that works

```
1. Context: where we are, what has already been done (2–3 lines)
2. Task: one sentence
3. Constraints: what is forbidden, what is mandatory
4. Definition of done: how we will verify
5. Answer format: plan / diff / file X only
```

Item 5 is underrated: "plan first, no code" saves the most time.

## 7. Compaction and memory

OpenCode has a `compaction` setting — automatic compression of the history.
Useful, but not free: compression is another model call.

Practical rule: **keep only the current task in the context**, and store long-term
knowledge in repository files (`AGENTS.md`, `docs/`, `TODO.md`).

---

## Comprehension checklist

1. Why is "the model will remember our conversation" a dangerous misconception?
2. What is more effective: retelling the module in words or giving a path to the file? Why?
3. Name three signs that it is time to close the session.
4. Why does "plan first" save context?

---

# Practice

See [practice.md](practice.md).
