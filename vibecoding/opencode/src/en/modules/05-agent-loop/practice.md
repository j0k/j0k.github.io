# Module 05 — Practice: permissions and isolation

**Time:** 150 minutes · **Artifact:** `labs/05-agent-loop/`

---

## Task 1. Build a threat model (25 min)

For your learning project, write down 10 actions the agent **must not** do
without asking. Split them into three categories: `deny`, `ask`, `allow`.

**Acceptance:** a table with a justification for each `deny`.

Example:

| Action | Decision | Why |
| --- | --- | --- |
| `git push` | deny | publishing outward |
| reading `.env` | deny | secrets |
| `pytest` | allow | safe, needed often |
| `alembic upgrade` | ask | changes the DB |

---

## Task 2. Configure the rules (30 min)

Add rules to `opencode.jsonc` (project or global) and verify:

```bash
opencode debug config | grep -A2 permissions
```

Then test them in action:

1. Ask for `git status` — it shouldn't ask.
2. Ask for `git push` — it should refuse.
3. Ask it to read `.env` — it should refuse/ask.

**Acceptance:** the three scenarios behaved as intended, the report contains screenshots/logs.

---

## Task 3. Isolation via branch and worktree (40 min)

**Branch:**

```bash
git checkout -b agent/refactor-utils
```

Give the agent a task covering 2–3 files. Make sure `main` is untouched:

```bash
git diff main --stat
```

**Worktree:**

```bash
git worktree add ../sandbox-agent -b agent/experiment
cd ../sandbox-agent
```

Run an agent there with a different task. Check that the main folder is clean.

**Acceptance:** the report contains the output of `git diff main --stat` and `git worktree list`.

---

## Task 4. A dangerous action under control (25 min)

Ask the agent to run a potentially dangerous command (in a sandbox!):

```
Delete the build folder and rebuild the project.
```

Check: did it ask, did it show a plan of what exactly is being deleted.
Then set `deny` on `rm -rf *` and repeat — the agent should find another path
(for example, `rm -r build`, or suggest a manual command).

**Acceptance:** the report covers both behaviors and the conclusion: why "the agent found a workaround" is not a bug but a signal.

---

## Task 5. A subagent for reconnaissance (30 min)

Give the subagent a task:

```
Find all places in the repository where a DB query is executed directly
(without the repository layer). Return a list of files and lines, no edits.
```

Then use the result in the main session.

**Acceptance:** the subagent's report is a compact list; the main context isn't bloated (compare
the cost with a direct "read the whole repository").

---

## Submission criteria

- [ ] Threat model: 10 actions with categories and justification.
- [ ] Rules applied and verified on 3 scenarios.
- [ ] Branch/worktree used, evidence in the report.
- [ ] There is an analysis of the dangerous action and the agent's behavior.
- [ ] The subagent performed the reconnaissance, there is a cost comparison.
