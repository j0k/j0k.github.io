# Module 07 — Practice: migration without red tests

**Time:** 210 minutes · **Artifact:** `labs/07-refactor/`

---

## Task 1. Dependency map (25 min)

Pick a function/class you want to replace. Build a map:

```bash
grep -rn "old_name" --include=*.py .
```

Fill in a table:

| File | Line | What it does | Risk |
| --- | --- | --- | --- |

**Acceptance:** the map is complete (cross-check with `grep` once more), risks are ranked.

---

## Task 2. Migration plan (25 min)

Write a 5–7 step plan, where each step:

- touches ≤ 2 files;
- ends with `./scripts/check.sh`;
- has its own commit.

**Acceptance:** the plan was approved by you before starting work (record it in the report).

---

## Task 3. Step-by-step migration (90 min)

Execute the steps according to the plan. After each one:

```bash
./scripts/check.sh
git add -A && git commit -m "step N: <what was done>"
```

Rules for the agent:

```
We work one plan step at a time. After the step, stop and show the diff.
Don't touch files outside <path>. Don't change public signatures.
```

**Acceptance:** at least 3 steps, each with green tests and a commit.
In the report — `git log --oneline` and `git diff --stat` for the whole migration.

---

## Task 4. Rollback test (25 min)

Break one step on purpose (tell the agent: "try doing step 4 together with step 5 right away").
Look at how many files were touched and how many tests failed. Roll back:

```bash
git reset --hard HEAD~1
```

**Acceptance:** in the report — a comparison of "one at a time" vs "all at once": number of files,
number of failures, time spent untangling.

---

## Task 5. Removing dead code (45 min)

After the migration:

```
The old code is no longer used. Find all references to <old_name>,
delete them and the code itself. If something still uses it — stop and show me the list.
```

**Acceptance:** tests green, `grep` for the old name is empty, diff reviewed.

---

## Submission criteria

- [ ] The dependency map is complete.
- [ ] A plan with 5+ steps, approved before work.
- [ ] ≥ 3 steps with green tests and commits.
- [ ] The "all at once" experiment + rollback.
- [ ] Dead code removed, repository green.
