# Module 10 — Practice and capstone submission

**Time:** 10 hours · **Artifact:** `labs/10-capstone/`

---

## Completion checklist

### Preparation

- [ ] The task is chosen and agreed (3–10 files, verifiable result).
- [ ] The branch is created: `git checkout -b capstone/<name>`.
- [ ] `AGENTS.md` is up to date.

### Spec

- [ ] `labs/10-capstone/spec.md` is filled in using the template.
- [ ] 5+ requirements, each verifiable.
- [ ] Acceptance criteria are concrete commands.
- [ ] There's an "out of scope" block.

### Plan

- [ ] `labs/10-capstone/plan.md` — 4–8 steps.
- [ ] For each step: files, check, risk.
- [ ] The plan is approved before coding starts.

### Implementation

- [ ] Each step is a separate commit.
- [ ] `git log --oneline` reads like a change history.
- [ ] `./scripts/check.sh` is green on HEAD.
- [ ] No step required > 2 iterations without a revert.

### Review

- [ ] `labs/10-capstone/review.md` — the checklist is filled in.
- [ ] There's a second opinion (another model/subagent).
- [ ] All remarks: fixed or reasonably rejected.

### Merge

- [ ] The PR description: what/why/how it was verified.
- [ ] CI is green.
- [ ] The diff is read in full (confirm: "read it, N lines").
- [ ] No `skip`, `xfail`, `TODO`, `print` in the new code.

### Retro

- [ ] `labs/10-capstone/retro.md` using the template.
- [ ] The metrics are filled in with real numbers.
- [ ] One rule for the future is formulated.

---

## Submission format

```
labs/10-capstone/
├── spec.md
├── plan.md
├── review.md
├── retro.md
└── links.md      ← link to the PR/branch + git log --oneline
```

---

## Defense (10 minutes)

1. 2 min — the task and the spec.
2. 3 min — the plan and why exactly that one.
3. 3 min — **mandatory**: the place in the diff where you rejected the agent's suggestion,
   and why.
4. 2 min — metrics and conclusion.

Without item 3 the capstone doesn't count: it means the review was a formality.
