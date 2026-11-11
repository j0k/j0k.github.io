# Module 02 — Practice: context under control

**Time:** 160 minutes · **Artifact:** `labs/02-context/` (AGENTS.md + report)

---

## Task 1. Write AGENTS.md (40 min)

Take your learning project (or `~/edu/sandbox`).

1. Copy the template: `templates/AGENTS.md` → `<project>/AGENTS.md`.
2. Fill it in: stack, commands, conventions, prohibitions.
3. Check that every command actually works:

```bash
pytest -q      # or your test command
ruff check .
```

**Acceptance:**
- All commands from `AGENTS.md` run without errors.
- The file contains no generic words ("write good code") — only verifiable rules.
- No more than 40 lines.

---

## Task 2. The effect of AGENTS.md (30 min)

Do the same task twice in **new** sessions:

```
A) without AGENTS.md (temporarily rename the file)
B) with AGENTS.md
```

The task:

```
Add a function that sums the numbers from a list of strings,
skipping non-numeric values. Write tests.
```

**Record in the report:**
| | A (without) | B (with) |
| --- | --- | --- |
| style matched the project | | |
| the correct test framework was used | | |
| number of iterations | | |
| session cost | | |

**Acceptance:** there is output that shows at least one difference.

---

## Task 3. Links instead of retelling (25 min)

Find a module of 200+ lines in the project. Compare two requests:

```
Bad: "I have a payments module, it does a lot of things,
there are functions for calculating, fix the rounding"

Good: "In src/payments/calc.py the round_amount function rounds
to 2 digits. We need banker's rounding (ROUND_HALF_EVEN). Fix it and add a test."
```

**Record:** which request produced a more precise diff, and how many tokens were spent.

---

## Task 4. Degradation and recovery (40 min)

Run a "dirty" session:

1. Give 4 different tasks in a row in one session.
2. After each, ask for it to be redone "slightly differently".
3. On the 5th task, ask "do the same as in the first task, but for another module".

**Record the result** (quality, style, errors).

Then in a new session:

```
Context: the project has module X, function Y does Z (file src/...).
Task: do the same for module A.
Criterion: tests pass, style like in Y.
```

**Acceptance:** the report contains a comparison of the "dirty" and "clean" sessions on 3 signals
(style, accuracy, cost).

---

## Task 5. Move memory into a file (25 min)

Create `docs/decisions.md` in the project and write 3 architectural decisions there:

```markdown
## ADR-1: Tests only through pytest
## ADR-2: Errors go through AppError
## ADR-3: No ORM magic, only explicit SQL
```

Add a link in `AGENTS.md`:

```markdown
## Documentation
- Decisions: `docs/decisions.md` (read before architectural changes)
```

Check: in a new session, when asked "why do we use AppError?", the agent finds the file.

---

## Completion criteria

- [ ] `AGENTS.md` is created, commands are checked, ≤ 40 lines.
- [ ] There is an A/B comparison table from task 2.
- [ ] There is a "retelling vs link" comparison.
- [ ] There is a report on session degradation with a conclusion.
- [ ] `docs/decisions.md` is created and linked from `AGENTS.md`.
