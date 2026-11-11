# Prompt library

Ready-made formulations. Copy them, put your own values in `<...>`.
Every prompt follows the scheme: context → task → constraints → format → prohibition.

---

## 1. Starting out

**1.1 Plan without edits**
```
Read <path/files>. Task: <one sentence>.
Show a plan of 4–6 steps, each with a verifiable result.
Don't change files, don't write code. I'll wait to approve the plan.
```

**1.2 Onboarding into someone else's project**
```
This is the project <name>. Read the README, package.json/pyproject.toml and the folder structure.
Answer: stack, how to run, how to test, the 3 most important files, 3 unclear spots.
Don't change files.
```

**1.3 Project instructions**
```
Create AGENTS.md with the stack, run/test/lint commands, style rules and
prohibitions (don't edit tests, don't touch legacy, don't add dependencies without
approval). Based on the project's actual contents, no guesswork.
```

---

## 2. Framing the task

**2.1 Spec from a raw idea**
```
Idea: <as is, messy>.
Turn it into a spec: goal, user and scenario, inputs/outputs with examples,
edge cases (empty, very large, wrong type), constraints, 4 acceptance criteria
(verifiable yes/no), what we are NOT doing.
Don't write code. Maximum 15 lines.
```

**2.2 Checking a spec for holes**
```
Here is the spec. Find 5 places where the implementer will have to guess: ambiguous
wording, missing edge cases, unverifiable criteria.
Just a list of problems, don't rewrite it.
```

**2.3 Decomposition**
```
Split the task into steps of 15–20 minutes of agent work. For each: name,
files, acceptance criterion, what not to touch. No more than 6 steps.
Don't write code.
```

**2.4 Acceptance criterion → `/goal`**
```
/goal <test command> exits with code 0, <lint> is clean,
git diff --name-only shows only <folder>/, or stop after <N> turns
```
Requirements: a measurable signal, proof in the session output, file
boundaries, a turn limit. Clear the goal: `/goal clear`. Status: `/goal` with no arguments.

**2.5 Checking a criterion for `/goal` fitness**
```
Here is an acceptance criterion: <text>. Check it for three things: (1) can it be verified
by a command or return code, (2) will the agent see the proof in its own output,
(3) which files must be explicitly forbidden to change. If the criterion is unverifiable —
reformulate it into a verifiable one and show the difference.
```

---

## 3. Implementation

**3.1 Minimal edit**
```
In <file>, function <name>: <what to change>.
Requirements: <exact behavior, including boundaries>.
Only this file. Don't refactor, don't change formatting, don't add
dependencies. After the edit show the diff and the verification output.
```

**3.2 New module**
```
Create <file> with <function/class> that <behavior>.
Input: <type, example>. Output: <type, example>. Errors: <which and how>.
Style as in <neighboring file>. No new dependencies. Add 2 tests:
the main scenario and <boundary>.
```

**3.3 Working from a test**
```
Test: <test code>. It fails. Implement the minimal code to make it pass.
Don't change the test. Don't add functionality beyond the test.
Show the test output after the edit.
```

**3.4 Resuming after a pause**
```
State: <A, B> done, commit <hash>. Left: <C>.
Task now: only <C>. Context: <files>.
Don't revisit the decisions on A and B.
```

---

## 4. Verification and review

**4.1 Self-check before handing over**
```
Check your edit against the list and answer item by item:
1) were any checks/validation removed; 2) is there any silent catch/except; 3) is there any
hardcoding or magic constants; 4) were files outside the task touched; 5) were any
dependencies added; 6) were the tests changed.
Don't change code, report only.
```

**4.2 Explain the decision**
```
Explain in 5 lines: why this solution was chosen, which alternatives
were considered, which trade-offs were accepted. Don't change code.
```

**4.3 Checking acceptance criteria**
```
Here are the acceptance criteria: <list>. For each one: met / not met / not checked,
and exactly how to verify it with a command. Don't change code.
```

---

## 5. Debugging

**5.1 Fact first, then hypothesis**
```
Error: <symptom>. Stack trace:
<paste>
First quote 3 lines of the stack trace that point to our code.
Then propose 3 hypotheses. For each one — a verification command.
Make no edits until I choose.
```

**5.2 Against guessing**
```
You are proposing a cause without checking it. Answer: what data confirms this?
Which command will confirm or refute it? If verification is impossible — say so directly.
```

**5.3 Minimal case**
```
Reduce the problem to a minimal reproducible example: 10–15 lines,
without our project, standard library only. Show it and the expected/actual result.
```

**5.4 Dead end**
```
Two attempts haven't moved the problem. We stop.
State: what is known for certain, what has been checked, what remains unchecked,
which 2 options exist. Make no edits — I'll decide whether to roll back or continue.
```

**5.5 Library version**
```
Stack: <library> version <X> (from package.json). Use only the API of this version.
If you are not sure the API exists in this version — say so instead of guessing.
```

---

## 6. Tests

**6.1 Test before code**
```
Write a test for the behavior: <description>. The test must fail now.
Don't implement the functionality. Show that it fails, and for what reason.
```

**6.2 Checking a test for robustness**
```
Break the implementation so that <behavior> stops working. Don't touch the tests.
Say which tests failed. If none failed — the tests are useless, say so directly.
```

**6.3 No editing tests**
```
Tests are the specification. If a test fails, fix the implementation. Changing the test is not allowed.
If you think the expectation in the test is wrong — explain why and wait for my decision.
```

**6.4 Boundaries**
```
Add boundary tests for <function>: empty input, one element, maximum,
wrong type, missing field. One test per case, descriptive names.
```

---

## 7. Data and API

**7.1 From a real response**
```
Here is a real API response (abbreviated):
<paste>
Use only these fields and this structure. Don't invent fields that don't exist.
Build a client with validation and handling of 4xx/5xx/timeout/invalid JSON.
```

**7.2 Secrets**
```
Keys only via environment variables. Add .env.example with the names and no
values. Make sure .env is in .gitignore and didn't get into the git history.
If the key is already in the history — say that the key needs to be revoked.
```

**7.3 Validation at the boundary**
```
Add input validation at the boundary via <zod/pydantic>:
required fields, types, constraints. On invalid data — 400 with a clear
message, no crash. Plus 3 tests for bad data.
```

---

## 8. Deploy and hygiene

**8.1 First deploy**
```
Prepare the project for deployment to <Vercel/Netlify>: check the build command and output
folder, list the environment variables for the panel, state the runtime version.
Don't make anything up about the settings — if you're not sure, say what to check by hand.
```

**8.2 Checklist before merge**
```
Go through PR <number> and answer for each item: checks not weakened, tests
not changed, no silent catches, no secrets, no hardcoded paths, no new
dependencies without justification, no SQL concatenation, no edits outside the task.
Format: item — ok / problem (file:line).
```

**8.3 Commit message / PR description**
```
Write a commit message in the format type(scope): what was done, up to 70 characters.
And a PR description: what changes, why, how to verify (steps), what is out of scope,
which trade-offs were accepted. From the diff, no guesswork.
```

---

## 9. Session restart

**9.1 Clean start**
```
New session. Context: <project, stack, 3 important files>.
Problem: <symptom>. Checked: <facts>. Not checked: <...>.
Stack trace: <...>.
Propose 3 hypotheses with a verification command. Make no edits.
```

**9.2 Handing over state**
```
Session summary: <...> done, commits <hash...>, left <...>.
Open questions: <...>. Known limitations: <...>.
Save this to notes/session-<date>.md so we can continue tomorrow.
```

---

## 10. Antipatterns: how not to do it

| Don't write | Why it doesn't work | Replace with |
|---|---|---|
| "fix the bug" | gives carte blanche to guess | "quote the stack trace, propose 3 hypotheses" |
| "make it pretty" | no criterion | "white background, one accent, system-ui, maximum 2 colors" |
| "optimize it" | no metric | "cut to <200 ms, measured via <command>" |
| "add error handling" | silent `except` | "server text on 4xx, "try again later" on 5xx, a test for each" |
| "refactor it" | the whole project got rewritten | "extract X from Y into Z, behavior unchanged, tests green" |
| "make it like <service>" | a copy without your requirements | list 3 specific elements |
| "improve the code" | unbounded scope | one specific problem + a criterion |
