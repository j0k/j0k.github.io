# Module 07 — Refactoring at scale

**Time:** 5 hours · **Format:** 90 min theory + 210 min practice

---

# Theory

## 1. Why large agent edits are dangerous

```
1 file, 30 lines  → you read the diff in 2 minutes
12 files, 900 lines → you read it "diagonally" and miss a deleted check
```

The risk grows nonlinearly: the bigger the diff, the lower the chance you actually read it.

Rule: **diff size is a controllable parameter**. Not "let it do everything", but "do step 1".

## 2. The "green repository" strategy

Every step ends with green tests and a commit:

```
[green] → step → [green] → commit → step → [green] → commit
```

If a step broke the tests and isn't fixed within 2 iterations — roll back and try another approach.
That's cheaper than fixing a cascade of 5 broken steps.

## 3. Migration order

A safe sequence for "replace X with Y":

```
1. Introduce Y alongside X (without deleting X)
2. Move one call site to Y
3. Tests green → commit
4. Move the remaining call sites (one at a time)
5. Delete X
6. Delete dead code
```

The key: **never delete the old before the new is verified.**

## 4. How to constrain the agent

```
Don't touch files outside src/billing/.
Don't change public function signatures.
Don't add dependencies.
One step — one commit.
After each step run ./scripts/check.sh and stop if it's red.
```

Path-based constraints work better than pleading "be careful".

## 5. Finding dependencies

Before migrating — build a map:

```
grep -rn "old_function" src/
```

Give the agent the result and ask for a per-file plan. That's cheaper than "find it yourself
across 500 files", and more accurate.

## 6. Mechanical vs semantic edits

| Type | Example | How to do it |
| --- | --- | --- |
| Mechanical | rename, formatting | can be batched, verification is tests |
| Semantic | changing logic | one file at a time, with review |

Don't mix them: "rename it and improve it while you're at it" = an unverifiable diff.

## 7. Feature flags and reversibility

If the feature is big — put it behind a flag:

```python
if settings.use_new_billing:
    new_path()
else:
    old_path()
```

This lets you merge earlier, roll back instantly, and test incrementally.

---

## Comprehension checklist

1. Why is one big diff more dangerous than the sum of small ones?
2. Why introduce the new before deleting the old?
3. How do mechanical edits differ from semantic ones process-wise?
4. What do you do if a step doesn't go green within 2 iterations?

---

# Practice

See [practice.md](practice.md).
