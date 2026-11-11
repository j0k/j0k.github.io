# Vibe coding: the 30/70 course

A course where 30% of the time goes to theory and 70% to practice with an AI agent.
Goal: by the end of the course you can take a working product from idea to deployment
without hand-writing a single function.

## What's inside

| File | What it's for |
|---|---|
| `01-programma.md` | Syllabus: 8 modules + capstone, timing of each part |
| `02-teoriya.md` | All the course theory, condensed, by module |
| `03-praktika.md` | Assignments for each module with acceptance criteria |
| `04-promptoteka.md` | 32 ready-made prompts for specific situations |
| `05-proekty.md` | 10 capstone projects, rated by difficulty |
| `06-tracker.md` | Progress checklist, filled in by hand |

## Timing: how you get exactly 30/70

Total: **1380 minutes (23 hours)**.

- Theory: **414 minutes — 30.0%**
- Practice: **966 minutes — 70.0%**

Inside a module: 150 minutes = 45 theory + 105 practice.
Capstone: 180 minutes = 54 theory (walkthrough) + 126 practice (building).

The rule that matters more than the timing: **theory is not read in advance**. You open
a module, read its theory (45 minutes, no more), and immediately do the practice for the
same module. Haven't done the practice — don't move on.

## How to go through it

1. One module = one evening (2.5 hours) or two evenings of 75 minutes.
2. Everything you do in practice goes into git. The first commit comes before the first
   line of code from the AI.
3. Every assignment ends with a mark in `06-tracker.md`. No mark — the module
   is not passed.
4. Don't start the capstone before module 6.

## What to install in advance

- **An agent with file access**: Claude Code, Cursor, Codex CLI, Windsurf —
  any one that reads and edits files on its own. A browser chat won't work for this
  course: it can't see your project.
- **git** and a GitHub account.
- **Node.js LTS** and **Python 3.12** — all the projects are built on them.
- One free Vercel or Netlify account for deployment.

## Three rules of the course

1. **Don't accept code you can't verify.** Verification is not "looks
   fine", it's a run, a test, or explicitly observed behavior.
2. **Small step = one commit.** If the agent broke something — `git reset --hard` and redo
   the step, not "let's fix 40 more files".
3. **Spec before code.** Until the task is stated in 5–10 lines with readiness
   criteria, the agent will guess and you'll redo the work.

## What you get out of it

- 8 practiced skills: from stating a task to deploying.
- One deployed project with a public link.
- Your own prompt library, extended for your tasks.
- The habit of committing and verifying — the thing that separates vibe coding from roulette.

## How to rebuild the HTML

The pages of this course are built from the Markdown sources in `src/`.
Edit the `.md` files, then from the `src/` folder:

```bash
pip install markdown
python build_html.py
```

The script overwrites the HTML pages next to them (in the root of `course-30-70/`) —
`index.html`, `01-programma.html` … `06-tracker.html`.
To check the result: `python check_html.py`.
