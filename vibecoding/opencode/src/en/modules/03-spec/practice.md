# Module 03 — Practice: from "make it nice" to a spec

**Time:** 200 minutes · **Artifact:** `labs/03-specs/`

---

## Task 1. Break down three tasks (40 min)

Take three vague tasks:

```
A) "Add caching"
B) "Fix the bugs in the API"
C) "Make the interface prettier"
```

For each, write a spec using the `templates/spec.md` template, including the "out of scope" block.

**Acceptance:** each spec has at least 3 verifiable requirements and 2 acceptance criteria
(a command or a test).

---

## Task 2. Comparison in practice (60 min)

Pick one spec (for example, A) and implement the task twice:

**Run 1 — "vibe":**

```
Add caching to the project.
```

**Run 2 — by the spec:**

```
<insert the full spec>
Start with a plan. Don't write code until I confirm.
```

**Record a table:**
| Metric | Run 1 | Run 2 |
| --- | --- | --- |
| files touched | | |
| unnecessary changes | | |
| tests added | | |
| passed on the first try | | |
| cost | | |

**Acceptance:** there is a conclusion about which part of the spec had the biggest effect.

---

## Task 3. Plan before code (30 min)

For spec B (bugs in the API):

```
Don't write code. Give me a plan:
1) which files you'll look at and why;
2) hypotheses about the causes of the bugs;
3) how you'll verify each hypothesis;
4) what might break.
```

Edit the plan (remove the excess, add what's missing), then allow the implementation.

**Acceptance:** the report contains the original plan, your edits, and the final diff.
Compare: how many plan edits vs how many code edits.

---

## Task 4. Decomposition (40 min)

Take task C and break it into 4–6 steps so that each one:

- changes ≤ 2 files;
- has its own verification criterion;
- is committed separately.

**Acceptance:** a list of steps with criteria + at least 2 completed steps with commits.

---

## Task 5. Prompt library (30 min)

Create `labs/03-specs/prompts.md` — 5 reusable templates:

1. "Give me a plan, don't write code"
2. "Explain the existing code"
3. "Add tests for a function"
4. "Find the cause of a failing test"
5. "Review my diff like a strict reviewer"

Format: title, template, when to use it, a filled-in example.

---

## Submission criteria

- [ ] Three specs from the template, with an "out of scope" block.
- [ ] "Vibe vs spec" comparison table.
- [ ] A plan with your edits and the final diff.
- [ ] Decomposition + ≥ 2 commits.
- [ ] `prompts.md` with 5 templates.
