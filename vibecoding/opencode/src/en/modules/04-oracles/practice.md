# Module 04 — Practice: the TDD loop with an agent

**Time:** 210 minutes · **Artifact:** `labs/04-oracles/`

---

## Task 1. One verification command (30 min)

Assemble `scripts/check.sh` (or `make check`):

```bash
#!/usr/bin/env bash
set -e
ruff check . --output-format=concise
mypy . --no-error-summary
pytest -q
```

Add to `AGENTS.md`:

```markdown
## Checks
- everything: `./scripts/check.sh`
- if it fails: fix the cause, don't disable the check
```

**Acceptance:** `./scripts/check.sh` passes on a clean project in < 60 sec.

---

## Task 2. Failing test → working code (50 min)

1. Pick a function that doesn't exist yet: `normalize_phone(s: str) -> str`.
2. Write the tests **yourself** (5 cases, including edge cases):

```python
def test_normalize_phone():
    assert normalize_phone("+7 (912) 345-67-89") == "+79123456789"
    assert normalize_phone("89123456789") == "+79123456789"
    assert normalize_phone("") == ""
    assert normalize_phone("abc") == ""
    assert normalize_phone("+1 222 333") == "+1222333"
```

3. Make sure the tests fail (`ImportError` is a failure too).
4. Give the agent:

```
The tests in tests/test_phone.py are failing. Implement normalize_phone in src/utils/phone.py.
Minimal code that passes all the tests. Don't change the tests.
```

**Acceptance:** the tests are green, the tests are unchanged (`git diff tests/` is empty).

---

## Task 3. The agent writes tests from your list (40 min)

Take an existing function without coverage. Write the **list of cases** yourself:

```
- None input
- empty list
- negative numbers
- duplicates
- a very large number
```

Then:

```
Write tests for src/x.py::func from the list of cases below. The tests must fail
if the behavior changes. Don't use mocks unless necessary.
```

**Acceptance:** the tests actually catch a mutation — change one line of code,
make sure the test fails, revert it.

---

## Task 4. The "error → fix" loop (40 min)

Break the code on purpose (for example, change a condition). Run the check and hand the agent
the **full output**:

```
./scripts/check.sh is failing. Here's the output:

<paste it in full>

Find the cause and fix it. Explain in two lines what was wrong.
```

Repeat 2 times with different breakages.

**Acceptance:** the report contains the error output, the fix diff, the explanation. Note whether the full output
helped compared to a retelling.

---

## Task 5. Golden test (50 min)

For a function that generates text/JSON/a report:

1. Create the reference `tests/golden/expected.json`.
2. The test:

```python
def test_report_golden():
    assert generate_report(SAMPLE_INPUT) == json.loads(
        open("tests/golden/expected.json").read()
    )
```

3. Ask the agent to change the report format — golden will fail — have it update the reference deliberately.

**Acceptance:** the report contains the reference diff and an explanation of why the change is correct.

---

## Submission criteria

- [ ] `check.sh` works as a single command, time < 60 sec.
- [ ] The tests from task 2 are unchanged, the code is minimal.
- [ ] There is proof that the tests catch a mutation.
- [ ] A report of the "error → fix" loop with the full output.
- [ ] A golden test + a deliberate update of the reference.
