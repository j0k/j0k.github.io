# Module 05 — The agent loop and permissions

**Time:** 4 hours · **Format:** theory 90 min + practice 150 min

---

# Theory

## 1. What an agent is

```
LLM  →  decides which tool to call
     →  the tool returns a result
     →  the result enters the context
     →  repeat until the task is solved
```

This is the **tool calling** loop. The model doesn't "do" — it asks. Hence:

- agent quality = model quality × tool quality × description quality;
- a bad tool breaks the loop harder than a weak model;
- an agent can "get stuck in a loop" — you need an iteration limit.

## 2. Day-one tools

| Tool | What it does |
| --- | --- |
| `read` | reads a file |
| `edit` / `write` | edits and creates files |
| `glob` / `grep` | searches files and contents |
| `shell` | runs commands |
| `webfetch` / `websearch` | pulls in external information |

Practice: the narrower the tool, the more predictable the agent. "Run everything for me" is worse
than "run `pytest tests/test_auth.py`".

## 3. Permissions: the threat model

Every action of the agent is potentially irreversible. Risk categories:

| Risk | Example | What to do |
| --- | --- | --- |
| Irreversible deletion | `rm -rf`, `git reset --hard` | `deny` |
| Publishing outward | `git push`, `docker push`, deploy | `ask` |
| Secrets | reading `.env`, `~/.ssh` | `deny` |
| Money | calling paid APIs in bulk | limits |
| DB migrations | `alembic upgrade` in prod | `ask`/`deny` |
| Changes outside the project | other people's folders | `external_directory` |

## 4. How rules work in OpenCode

A rule = `action` + `resource` + `effect`:

```jsonc
{ "action": "shell",  "resource": "git push *", "effect": "deny" },
{ "action": "shell",  "resource": "git status *", "effect": "allow" },
{ "action": "read",   "resource": "*.env", "effect": "ask" },
{ "action": "external_directory", "resource": "D:/other/*", "effect": "allow" },
```

- They apply **bottom-up**: the last matching rule wins.
- By default — `ask` (if nothing matches).
- "Always allow" in the interface saves the rule at the project level.
- `deny` can't be bypassed with a button.

## 5. The minimal working set

```jsonc
{
  "permissions": [
    { "action": "shell", "resource": "*", "effect": "ask" },
    { "action": "shell", "resource": "git status *", "effect": "allow" },
    { "action": "shell", "resource": "git diff *", "effect": "allow" },
    { "action": "shell", "resource": "./scripts/check.sh", "effect": "allow" },
    { "action": "shell", "resource": "pytest *", "effect": "allow" },
    { "action": "shell", "resource": "git push *", "effect": "deny" },
    { "action": "shell", "resource": "sudo *", "effect": "deny" },
    { "action": "read",  "resource": "*.env*", "effect": "deny" }
  ]
}
```

The logic: allow reading and checks, forbid publishing and irreversible actions.

## 6. Isolation

- **Branch** — the minimum: `git checkout -b agent/<task>`.
- **Worktree** — a separate working copy: the agent works without getting in your way.
- **Container/VM** — for risky experiments.
- **`--auto`** — auto-approve everything that isn't forbidden. Only in an isolated environment.

Rule: the broader the permissions, the narrower the sandbox must be.

## 7. Subagents

A separate session for a subtask. Why:

- reconnaissance on a large repo doesn't pollute the main context;
- parallel work on independent parts;
- a "second opinion" in review.

The price: a subagent can't see your history — it needs a complete standalone brief.

## 8. When the agent is stuck in a loop

Signs: the same edits over and over, repeating errors, a growing number of tool calls.

Actions:

1. Stop.
2. State what is known for certain (files, errors).
3. A new session with that context.
4. If it repeats — the task was stated incorrectly.

---

## Comprehension checklist

1. Why is "the model does" a wrong way to put it?
2. What happens if you set `allow` on `shell: *`?
3. Why `deny` on `git push` if there is review?
4. When is `--auto` acceptable, and when is it not?
5. How does a subagent help, and how does it hurt?

---

# Practice

See [practice.md](practice.md).
