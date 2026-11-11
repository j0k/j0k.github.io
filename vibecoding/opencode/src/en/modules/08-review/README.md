# Module 08 — Review and quality gates

**Time:** 4 hours · **Format:** 80 min theory + 160 min practice

---

# Theory

## 1. Diff review is your main skill

An agent writes plausibly. Review is the only place where you separate truth from plausibility.

What to look at, **in this order**:

```
1. What was deleted (delete lines)   ← the most dangerous
2. What changed in conditions/checks
3. New dependencies
4. Error handling
5. Tests: do they actually check anything
6. Style/formatting                  ← last
```

You read a diff **top-down through the deletions**, not the additions: the additions usually
are exactly what was asked for.

## 2. Red flags

| Flag | Example | Why it's bad |
| --- | --- | --- |
| Deleted check | `- if not user: return 403` | security hole |
| Swallowed error | `except Exception: pass` | the bug becomes invisible |
| Test fitted to the code | `assert result is not None` | checks nothing |
| Stub | `return True  # TODO` | "works" on paper |
| New dependency | `+ import requests` | extra risk/weight |
| Out-of-scope change | edits in 10 unrelated files | unverifiable |
| Secret in code | `API_KEY = "sk-..."` | leak |
| Disabled test | `@pytest.mark.skip` | silently removing a check |
| Magic number | `if x > 42:` | nobody knows where it came from |

## 3. Security

- **Secrets:** always via env/secret store. `grep -rn "sk-"` on the diff.
- **Injection:** SQL/commands/templates — parameterization only.
- **Trusting input:** validate at the boundary, not "deep inside".
- **Supply chain:** a new dependency = a new supplier of code. Check the package name
  (typosquatting is a real attack).
- **Permissions:** the agent shouldn't have access to production.

## 4. Review by an agent

Useful as a **second pass**, but not as a replacement for yours:

```
You are a strict reviewer. Here is the diff. Find:
1) deleted checks, 2) swallowed errors, 3) tests that check nothing,
4) out-of-scope changes, 5) secrets. A list of problems only, no praise.
```

Limitation: an agent tends to agree with code it wrote itself. So a "second opinion" is better
solicited from **another model** or a subagent with a fresh context.

## 5. Quality gates

What has to be green before a merge:

```
[ ] tests
[ ] types
[ ] linter
[ ] review by a human (diff read)
[ ] no secrets
[ ] no disabled tests and no stubs
[ ] changes match the spec
```

Automate everything except the last item. The last one is human-only.

## 6. Reporting a problem

Bad: "something's off here".
Good:

```
src/auth.py:42 — the check `if not user.is_active` was deleted.
This lets inactive users log in. Restore the check and add a test.
```

Specificity = speed of fixing.

---

## Comprehension checklist

1. Why start a review with the deleted lines?
2. Name 5 red flags and the risk of each.
3. Why is a review by the same model weaker than one by a different model?
4. Which quality gate item can't be automated?

---

# Practice

See [practice.md](practice.md).
