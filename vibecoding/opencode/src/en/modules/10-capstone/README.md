# Module 10 — Capstone

**Time:** 10 hours · **Artifact:** `labs/10-capstone/`

---

## Goal

Go through the full cycle on a real task: **spec → plan → steps → tests → review → merge → retro**.

This is the only module that evaluates the whole process rather than an individual skill.

---

## Choosing a task

A suitable task is one that:

- touches 3–10 files;
- has a verifiable result (tests/run);
- isn't critical for production (you work in a branch);
- requires at least one architectural decision.

Examples:

- add report export to CSV/JSON with a CLI flag;
- replace a hand-rolled HTTP client with a library;
- add a cache for an expensive computation;
- move a module into a separate package with tests;
- add an end-to-end test for the signup flow.

Not suitable: "rewrite everything", "make it pretty", "add AI".

---

## Stages and criteria

### 1. Spec (1 h)

Use the `templates/spec.md` template. Required:

- context and boundaries;
- 5+ verifiable requirements;
- acceptance criteria in the form of commands;
- an "out of scope" block.

**Criterion:** a classmate can tell from the spec exactly what will be done.

### 2. Plan (1 h)

- breakdown into 4–8 steps;
- for each: files, verification criterion, risk;
- the plan is approved **before** the code.

**Criterion:** each step touches ≤ 2 files, each ends with a check.

### 3. Implementation (4 h)

- step by step, a commit after each;
- `./scripts/check.sh` is green at every step;
- no more than 2 iterations per step (otherwise revert and rethink).

**Criterion:** `git log` shows meaningful steps; the repository is green.

### 4. Review (2 h)

- your own checklist from module 08;
- a second opinion from another model;
- every remark is either fixed or reasonably rejected.

**Criterion:** a completed checklist + a list of remarks and decisions.

### 5. Merge (1 h)

- a PR with a description: what, why, how it was verified;
- CI is green;
- the diff is read in full.

**Criterion:** the PR is merged (or ready to merge), with no `skip` or `TODO` in the new code.

### 6. Retro (1 h)

Use the `templates/retro.md` template:

```markdown
## Metrics
- Time: planned / actual
- Token cost:
- Number of iterations per step:
- Problems found in review:
- Bugs caught after merge:

## What worked
## What I'd do differently
## The rule I'm taking with me
```

---

## Final grading table

| Stage | Weight | What is checked |
| --- | --- | --- |
| Spec | 15% | verifiability, boundaries |
| Plan | 10% | decomposition |
| Implementation | 30% | green steps, diff size |
| Review | 20% | real problems found |
| Merge | 10% | cleanliness, CI |
| Retro | 15% | honesty and conclusions |

Passing score — 70%.

---

## Defense

10 minutes: show the spec, the plan, `git log`, find the place in the diff where you rejected
the agent's suggestion and why. **The last one is a mandatory question.**
