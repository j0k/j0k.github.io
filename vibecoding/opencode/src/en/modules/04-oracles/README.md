# Module 04 — Oracles and Verification

**Time:** 5 hours · **Format:** theory 90 min + practice 210 min

---

# Theory

## 1. The oracle is the main tool

An **oracle** is an automatic source of "yes/no" about the result. A test, a compiler, a linter,
a type checker, running the app, comparing against a reference.

Without an oracle, vibe coding turns into reading beautifully written lies.

```
Without an oracle:  the agent says "done" → you believe it → a bug a week later
With an oracle:     the agent says "done" → pytest → 2 failures → the agent fixes them
```

An oracle doesn't just catch errors — it **gives the model feedback**. That changes everything:
instead of "explaining in words what's wrong", you paste the command's output.

## 2. The pyramid of checks

From cheap and fast to expensive:

```
1. Syntax / compilation           seconds
2. Types (mypy, tsc)              seconds
3. Linter (ruff, eslint)          seconds
4. Unit tests                     seconds-minutes
5. Integration tests              minutes
6. Running the app / e2e          minutes
7. Human review                   minutes
```

Rule: **the agent must have access to all levels 1–5 with a single command.**

## 3. One entry point, not ten

Bad:

```
"Run pytest, then ruff, then mypy, and also check..."
```

Good — one command in `AGENTS.md`:

```bash
make check      # или: npm run check, ./scripts/check.sh
```

Inside:

```bash
ruff check . && mypy . && pytest -q
```

The agent calls `make check`, gets compact output, fixes it. This is cheaper
and more reliable than making it remember five commands.

## 4. TDD with an agent

The classic loop works better if **a human writes the test** (or a human approves it):

```
1. Human: spec + a failing test
2. Agent: the minimal code to make the test pass
3. Human: reads the diff
4. Agent: refactoring, tests stay green
```

Why a test from a human: the test is your spec in executable form.
If the agent invented the test, it will be checking its own understanding of the task.

A compromise for speed: the agent writes tests **from your list of cases**, approved by you.

## 5. An error is data

The correct fix loop:

```
1. Run the check
2. Paste the output in full (not a retelling!)
3. "Fix the cause, not the symptom. Explain in 2 lines."
4. Repeat
```

Bad: "my test is failing, take a look". Good: the full pytest output with a traceback.

## 6. Golden files and comparison

For tasks like "generate a config/report/text" — a reference file:

```
tests/golden/expected.json
```

The test compares the result with the reference. Any discrepancy is a visible diff.
This is an oracle for "imprecise" tasks.

## 7. What an oracle doesn't catch

- A test checks what's written in it. A missing case — not caught.
- A linter doesn't see logic errors.
- Green tests don't mean "correct behavior for the business".

That's why an oracle **complements** review, it doesn't replace it.

## 8. Verifying external facts

For things that can't be checked in code (API versions, library behavior):

- run a minimal example;
- open the official documentation;
- check the `--help` of the real CLI.

The model can invent a flag. `--help` can't.

---

## Comprehension checklist

1. Why is an oracle important not only for finding errors, but also for the quality of the agent's answers?
2. Why is it better for a human to write the test for a task?
3. What's wrong with the request "my test is failing, take a look"?
4. Which classes of errors are not caught by tests?

---

# Practice

See [practice.md](practice.md).
