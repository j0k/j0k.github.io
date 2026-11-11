# Module 08 — Practice: catch a bad diff

**Time:** 160 minutes · **Artifact:** `labs/08-review/`

---

## Task 1. Training diffs (40 min)

Create three "bad" diffs (by hand or with an agent):

**Diff A — security hole:**

```diff
- if not user.is_active: return 403
+ # no check needed
```

**Diff B — swallowed error:**

```diff
- raise PaymentError(...)
+ except Exception: pass
```

**Diff C — fitted test:**

```diff
- assert calculate(2, 3) == 5
+ assert calculate(2, 3) is not None
```

Review each one using the `templates/review-checklist.md`.

**Acceptance:** for each diff — a specific remark with file/line and a proposed fix.

---

## Task 2. Review a real agent diff (40 min)

Take the diff from module 07 (migration) or make a new edit with an agent.

Go through the checklist:

- [ ] all deletions read
- [ ] no `except: pass`
- [ ] no `skip`/`xfail` without a reason
- [ ] no stubs like `return None  # TODO`
- [ ] no new dependencies (or they're justified)
- [ ] the tests check behavior, not "not None"
- [ ] no secrets
- [ ] changes are within the scope of the task

**Acceptance:** a filled-in checklist + at least one remark found.

---

## Task 3. Second opinion (30 min)

Ask **another** model or a fresh subagent to review the diff:

```
You are a strict reviewer. The diff is below. Find problems only:
deleted checks, swallowed errors, useless tests,
out-of-scope changes, secrets. Format: file:line — problem — how to fix.
```

**Acceptance:** compare what you found and what the agent found. Write down what you missed.

---

## Task 4. Write a review checklist (25 min)

Create `labs/08-review/checklist.md` — your own checklist for your stack (10–15 items).
Add it to `AGENTS.md` as a command:

```markdown
## Review
Before committing, go through `.review-checklist.md` and list the problems you find.
```

**Acceptance:** the checklist is specific to your project, not generic words.

---

## Task 5. Quality gate in CI (25 min)

Add a minimal CI (GitHub Actions or a local pre-commit):

```yaml
- run: ./scripts/check.sh
- run: grep -rn "sk-" --include=*.py . && exit 1 || exit 0
```

**Acceptance:** the gate fails on a deliberately broken commit and passes on a normal one.

---

## Submission criteria

- [ ] Three training diffs analyzed.
- [ ] A real diff went through the checklist, with remarks.
- [ ] A "me vs reviewing agent" comparison exists.
- [ ] Your own checklist is wired into `AGENTS.md`.
- [ ] The CI gate works (fails/passes).
