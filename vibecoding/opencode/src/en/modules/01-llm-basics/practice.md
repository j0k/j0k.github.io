# Module 01 — Practice: experiments that break your intuition

**Time:** 150 minutes · **Artifact:** `labs/01-experiments.md`

All experiments are done in `~/edu/sandbox` (or any learning repository).
For each one, record the result: what you expected, what you got, the conclusion.

---

## Experiment 1. Non-determinism (20 min)

Ask the agent the same question three times **in three new sessions**:

```
Write a Python function that checks whether a string is a palindrome.
```

Compare the three answers.

**Record:** how they differ (names, case handling, whitespace, tests).
**Conclusion:** reproducibility comes from tests, not from temperature.

---

## Experiment 2. Vagueness vs specificity (30 min)

**Bad request:**

```
Make email validation.
```

**Good request:**

```
Add a validate_email(s: str) -> bool function to app.py.
Requirements:
- the string contains exactly one '@';
- the local part is non-empty, the domain contains a dot;
- Cyrillic is forbidden;
- an empty string → False;
- do not raise exceptions.
Write tests for: "a@b.co" → True, "a@b" → False, "" → False, "тест@mail.ru" → False.
```

**Record** a table: | criterion | bad request | good request | — by columns
"are there tests", "is Cyrillic handled", "is `''` handled", "number of iterations to a working result".

---

## Experiment 3. Needle in a haystack (30 min)

Create a file with 300 lines of irrelevant code (you can have the agent generate it),
and in the middle — one line:

```python
SECRET_CONSTANT = 42  # important rule
```

In one session, ask:

```
Read big.py in full and tell me the value of SECRET_CONSTANT.
```

Then in a new session:

```
Find the SECRET_CONSTANT constant in big.py and tell me its value. Use grep.
```

**Record:** both answers, the time, the approximate cost.
**Conclusion:** a tool (grep) is cheaper and more reliable than "read everything".

---

## Experiment 4. API hallucination (25 min)

Ask:

```
Write an example of using the <pick an obscure library> library with the <invent a method> method.
```

Then check in the official documentation whether the method exists.

Repeat with your main library:

```
How do I do <task> in <your library> <version>?
```

Compare with the documentation.

**Record:** how many fabrications per 3 requests. Which phrasing increased the risk.

---

## Experiment 5. Degradation of a long session (30 min)

In **one** session:

1. Ask it to write 3 functions.
2. Ask it to rewrite two of them "differently" (create 2–3 rounds of edits).
3. Then go back to the task from step 1: "remind me what the requirements for the first function were?"
4. Ask it to add a new function in the same style.

Now repeat step 4 in a **new** session, giving only the final code and the requirements.

**Record:** in which case the style is more consistent, and where there are more deviations from the original requirements.
**Conclusion:** "the model got dumb" = "the context got polluted".

---

## Experiment 6. The price of context (15 min)

Run one task twice:

```
A) "Explain what app.py does" (a 20-line file)
B) the same, but first ask it to read 5 large project files
```

Compare the displayed cost/tokens of the session (in OpenCode, the cost counter,
or `opencode stats`).

**Record:** how many times more expensive variant B is, and whether the explanation got better.

---

## Completion criteria

- [ ] All 6 experiments are done, each with an "expectation / actual / conclusion" section.
- [ ] The report has at least one comparison table.
- [ ] Three personal rules you are taking into your work are formulated.
- [ ] Logs/screenshots of the cost for experiment 6 are attached.
