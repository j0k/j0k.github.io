# Module 09 — Practice: your own toolset

**Time:** 160 minutes · **Artifact:** `labs/09-custom/`

---

## Task 1. Command (30 min)

Create a `/check-fix` command in `opencode.jsonc`:

```jsonc
{
  "commands": {
    "check-fix": {
      "description": "Run the checks and fix the causes of failures",
      "template": "Run ./scripts/check.sh. If it fails — fix the cause, don't disable the checks. Repeat at most 3 times. At the end, show the diff and explain it in 2 lines."
    }
  }
}
```

Test the `/check-fix` invocation on a broken test.

**Acceptance:** the command works, the test is green again, the diff has been reviewed.

---

## Task 2. Skill (40 min)

Create the skill `.opencode/skills/migrations/SKILL.md`:

```markdown
---
name: migrations
description: Rules for creating and applying DB migrations in this project
---

1. Migration file: `migrations/YYYYMMDD_description.sql`
2. Always a down migration
3. Forbidden: DROP COLUMN without a backup
4. After creating: `alembic upgrade head` in dev, `pytest -q`
```

Verify: in a new session, ask "add a migration" — the agent should reference the rules.

**Acceptance:** the skill is picked up; the report includes a quote from the agent's response.

---

## Task 3. Reviewer subagent (40 min)

```jsonc
{
  "agents": {
    "reviewer": {
      "description": "Strict diff review, no edits",
      "mode": "subagent",
      "permissions": [
        { "action": "edit", "resource": "*", "effect": "deny" },
        { "action": "shell", "resource": "git diff *", "effect": "allow" },
        { "action": "shell", "resource": "*", "effect": "deny" }
      ]
    }
  }
}
```

Give it the diff from module 07.

**Acceptance:** the subagent returned a list of problems, the files are unchanged (`git status` is clean).

---

## Task 4. A model for the job (25 min)

Configure two setups:

```jsonc
{
  "agents": {
    "fast": { "mode": "primary", "model": "<cheap>" },
    "think": { "mode": "primary", "model": "<reasoning>" }
  }
}
```

Compare them on the same task.

**Acceptance:** a "task / agent / cost / quality" table.

---

## Task 5. MCP or a reasoned refusal (25 min)

Check the list of available MCP servers:

```bash
opencode mcp list
```

If you need an external tool — connect it read-only and describe the risk.
If you don't need one — write 3 reasons why not in the report (extra attack surface,
doesn't solve the task, there's a simpler path).

**Acceptance:** either a working read-only MCP or an argued refusal.

---

## Submission criteria

- [ ] The `/check-fix` command works.
- [ ] The skill is picked up by the agent.
- [ ] The reviewer subagent has no edit permissions.
- [ ] There's a model comparison by agent.
- [ ] MCP is connected or reasonably rejected.
