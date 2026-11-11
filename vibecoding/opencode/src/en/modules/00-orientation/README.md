# Module 00 — Orientation

**Time:** 2 hours · **Format:** 40 min theory + 80 min practice

---

# Theory

## 1. What vibe coding is (and what it is not)

**Vibe coding** is development where the agent writes a significant part of the code, while the
human acts as the task setter, the reviewer, and the owner of the result.

It is **not** "press a button — get a product". It is a shift in the division of labor:

| Before | Now |
| --- | --- |
| you write the code | you write the spec and the check |
| you remember the API | you verify that the API exists |
| an error = a typo | an error = confidently written untruth |
| speed = typing speed | speed = quality of context |

The key shift: **the bottleneck moved from typing code to stating the task and verifying it.**

## 2. Three roles

They only work together:

```
Task setter  →  what we do, why, how we verify
Agent        →  fast executor, does not know your context
Reviewer     →  reads the diff, catches lies, commits
```

If you combine all three and cut corners on review, you get writing speed
and debt accumulation speed at the same time.

## 3. Where the agent is strong and where it fails

**Strong at:**
- boilerplate, typical code (CRUD, configs, tests by example);
- porting between languages and libraries;
- explaining someone else's code;
- mass, repetitive edits.

**Fails at:**
- unfamiliar internal context ("how we do things here");
- long chains of requirements without verification;
- exact API versions that are not in the training data;
- tasks where "correct" = "what the business decided", not "what the internet does".

Conclusion: give the agent what can be verified, and keep for yourself what requires judgment.

## 4. The model is not the main factor

Order of influence on the result:

```
context and task statement  >  having a verification  >  iteration  >  model  >  prompt wording
```

"Magic words" like "think step by step" have an effect an order of magnitude smaller
than one properly applied `AGENTS.md` and one working test.

## 5. Tools

OpenCode is a CLI agent: it reads files, edits them, runs commands, and asks for permissions.

Three things you need to know from day one:

| Thing | Why |
| --- | --- |
| **Session** | one working context; a new task means a new session |
| **Permissions** | what the agent may do without asking, and what it may never do |
| **Model** | chosen for the task, not "one for everything" |

---

## Comprehension checklist

Answer to yourself without looking back:

1. Why did the bottleneck move from typing code to stating the task?
2. Name three types of tasks where the agent is consistently weaker than a human.
3. Why is saving on diff review a bad saving?
4. What gives a bigger gain: changing the model or `AGENTS.md`? Why?

---

# Practice

See [practice.md](practice.md).
