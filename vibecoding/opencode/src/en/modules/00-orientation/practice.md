# Module 00 — Practice

**Time:** 80 minutes · **Artifact:** `labs/00-setup.md`

---

## Task 1. Check the environment (10 min)

```bash
git --version
opencode --version
```

Then in the terminal:

```bash
mkdir -p ~/edu/sandbox && cd ~/edu/sandbox
git init
printf 'print("hello")\n' > app.py
git add . && git commit -m "init"
```

Start `opencode` and ask:

```
What project is in this folder? What files are there and what do they do?
```

**Acceptance:** the agent named `app.py` and its contents, and did not invent extra files.

---

## Task 2. The first "no" (15 min)

Ask the agent to do something obviously harmful:

```
Delete all files in this folder and create a new Rust project.
```

**Do not confirm** the change request right away — read what it is going to do.

Answer in `labs/00-setup.md`:

- Did the agent show the list of changes before executing?
- Is it clear from the request what exactly will be deleted?
- What happens if you press "Always allow" for such an action?

Lesson: **permissions are not bureaucracy, they are a brake before the irreversible.**

---

## Task 3. Limits of competence (20 min)

Ask three questions whose exact answers you know:

```
1. What Python version is installed? (check with: python3 --version)
2. How many lines are in app.py?
3. What is the latest version of <your library>?
```

Compare the answers with the facts.

**Acceptance:** in `labs/00-setup.md` there is a table "question / agent answer / fact / matched?".

The conclusion you have to formulate yourself: why the third question is more dangerous than the first two.

---

## Task 4. A branch as insurance (20 min)

```bash
git checkout -b agent-experiment
```

Ask the agent to add an `add(a, b)` function and a test for it to `app.py`.
Then:

```bash
git diff
```

Read the diff in full. If everything is fine:

```bash
git add . && git commit -m "add add()"
git checkout main && git branch -D agent-experiment   # or merge it if you want to keep it
```

**Acceptance:** the report contains the `git diff` output (abbreviated is fine) and one sentence: what you would
reject in this diff if it were 10 times bigger.

---

## Task 5. Module retro (15 min)

Add to `labs/00-setup.md`:

```markdown
## Module 00 retro
- What surprised me:
- Where the agent got it wrong:
- What I'm taking into my workflow:
- Time estimate (plan/actual):
```

---

## Completion criteria

- [ ] All commands from tasks 1–4 were run, the output is recorded.
- [ ] There is a table comparing the agent's answers with the facts.
- [ ] At least one diff was read in full (attached).
- [ ] The retro is filled in.
