# Module 06 — Practice: calculate and choose

**Time:** 120 minutes · **Artifact:** `labs/06-economics/`

---

## Task 1. Manual calculation (20 min)

Given:

```
model A: input $0.25 / 1M, output $1.25 / 1M
model B: input $5.00 / 1M, output $30.00 / 1M
```

The task: an agent loop of 8 steps, each with ~40k input tokens
and ~500 output tokens.

Calculate:

1. The cost of model A.
2. The cost of model B.
3. How many times more expensive B is.
4. At what number of steps B becomes cheaper, if B solves the task in 3 steps and A in 12?

**Acceptance:** the calculation, with formulas, in the report.

---

## Task 2. Measure a real session (30 min)

Do the same task two ways:

```
A) one big session with 3 tasks
B) three separate sessions
```

Compare:

```bash
opencode stats
```

or the cost counter in the interface.

**Record:** input/output tokens, cost, time. Draw a conclusion: which is cheaper and why.

---

## Task 3. Cache in action (25 min)

Make 5 similar edits in a row in one session (for example, a rename
across 5 files), without changing the instructions.

Then do the same thing, but change `AGENTS.md` between steps.

**Record:** the difference in cost (cache hits are visible in the provider/OpenCode statistics).
**Conclusion:** how to structure requests so that the cache works.

---

## Task 4. Model selection table (30 min)

Build a table for your project:

| Task | Model | Why | Expected cost |
| --- | --- | --- | --- |
| rename | fast | template | $ |
| new tests | fast/balanced | by example | $ |
| new feature | balanced | needs context | $ |
| architectural refactoring | frontier | needs thinking | $ |
| incident analysis from logs | long-context | 500k tokens | $ |

**Acceptance:** at least 5 rows with a justification, not "the smartest one".

---

## Task 5. Compare two models on the same task (15 min)

Take a medium-complexity task. Do it on a cheap model and on an expensive one.
Compare:

| | cheap | expensive |
| --- | --- | --- |
| iterations to green tests | | |
| cost | | |
| your time on review | | |
| diff quality (1–5) | | |

**Conclusion:** which model is more cost-effective for this class of tasks.

---

## Submission criteria

- [ ] Manual calculation with formulas and an answer to the 3 vs 12 steps question.
- [ ] Real measurements of the two session strategies.
- [ ] Analysis of the cache effect.
- [ ] Model selection table with 5+ rows.
- [ ] Comparison of two models with a conclusion.
