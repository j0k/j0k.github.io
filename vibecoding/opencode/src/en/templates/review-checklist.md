# Diff review checklist

Order matters: start with deletions.

## 1. Deletions (−)

- [ ] No check (auth, validation, permissions) has been removed.
- [ ] Error handlers have not been removed.
- [ ] Tests have not been removed without a replacement.
- [ ] No still-used code has been deleted (`grep` by name is empty).

## 2. Logic (+)

- [ ] Conditions (if/else, boundaries) have not been changed unnoticed.
- [ ] No `except Exception: pass`, `catch {}`.
- [ ] No stubs: `return None  # TODO`, `return True`.
- [ ] No magic numbers without explanation.
- [ ] No debug `print` / `console.log`.

## 3. Tests

- [ ] Tests check behavior, not `is not None`.
- [ ] There are edge cases (empty, None, maximum).
- [ ] No `skip` / `xfail` / `only`.
- [ ] The test fails if the code is broken (verified by mutation).

## 4. Security

- [ ] No secrets (`grep -rn "sk-"`, tokens, passwords).
- [ ] SQL/commands are parameterized.
- [ ] Input is validated at the boundary.
- [ ] New dependency: the name has been checked for typosquatting.

## 5. Task boundaries

- [ ] Changes only in the agreed files.
- [ ] No "incidental improvements".
- [ ] Diff size matches the plan.

## 6. Result

- [ ] The diff has been read in full.
- [ ] `./scripts/check.sh` is green.
- [ ] Comments are stated as `file:line — problem — fix`.
