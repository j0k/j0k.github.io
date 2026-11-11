# Module 03 — Spec and Prompt

**Time:** 5 hours · **Format:** theory 100 min + practice 200 min

---

# Theory

## 1. A prompt is not a request, it's a specification

The difference between "make it nice" and "make it like this" is the presence of **verifiable criteria**.

```
Task without a spec:  "add authorization"
Task with a spec:     "POST /login endpoint, accepts {email, password},
                       returns 200 {token} or 401 {error},
                       password is hashed with bcrypt, token lives 24h,
                       tests: valid login, wrong password, missing email"
```

The second one can be checked. The first one — only "by eye".

## 2. Anatomy of a spec

A minimal working spec is 6 blocks:

```markdown
## Context
What already exists, where it lives, what must not break.

## Goal
One sentence: what should appear.

## Requirements
A numbered list of verifiable statements.

## Constraints
What is forbidden: dependencies, files, patterns, style.

## Acceptance criteria
Concrete checks: commands, tests, scenarios.

## Out of scope
An explicit "we are not doing this" — protection against scope creep.
```

The "out of scope" block saves the most: the agent loves to "improve things along the way".

## 3. Phrasings that work

| Works | Doesn't work |
| --- | --- |
| "function `parse_date(s: str) -> date`" | "a function for dates" |
| "return `None` if parsing fails" | "handle errors" |
| "same as in `services/billing.py`" | "in our style" |
| "no more than 50 lines" | "compactly" |
| "plan first, don't write code" | "do it well" |

Rule: **replace every adjective with a verifiable condition.**

## 4. Plan-first: the cheapest trick

Ask for a plan before the code:

```
Don't write code. Make a plan: which files you'll touch, which functions you'll add,
how we'll verify. List the risks and what might break.
```

What this gives you:

- misunderstandings are visible in 30 seconds, not after 300 lines;
- the plan can be fixed with words;
- the plan becomes an acceptance checklist;
- context is saved.

A bad plan is a reason to restate the task, not to "explain to the model that it's wrong".

## 5. Decomposition

A big task → a chain of verifiable steps:

```
1. Add the data model + migration
2. Add the access layer
3. Add the endpoint + tests
4. Wire it into the UI
5. Remove the old code
```

Each step: its own diff, its own commit, green tests. That way an error is localized to one step,
not "somewhere in 800 lines".

## 6. Examples (few-shot) and format

Want a specific style — give one example of finished code. The model copies structure
more reliably than it understands a description.

Want a specific response format — say it explicitly: "diff only", "file X only",
"a table", "no explanations".

## 7. What to avoid

- **Double requirements**: "make it fast and high-quality".
- **Hidden requirements**: "you know what I mean" → the model understood it its own way.
- **Monster tasks**: 5 goals in one request.
- **"Rewrite everything" requests**: nothing to verify, everything breaks at once.

## 8. The prompt as an artifact

A good spec outlives the session: you can put it in `docs/specs/`, discuss it in review,
reuse it. A prompt that "worked" is a project asset, not trash in the history.

---

## Comprehension checklist

1. How does a spec differ from a request? Name the distinguishing feature.
2. Why is the "out of scope" block needed?
3. Why is plan-first cheaper than going straight to code?
4. What to do if the plan is bad — and what you must not do?

---

# Practice

See [practice.md](practice.md).
