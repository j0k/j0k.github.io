# Module 09 — Customization: skills, commands, subagents, MCP

**Time:** 4 hours · **Format:** 80 min theory + 160 min practice

---

# Theory

## 1. Why customize

The default agent is generic. Your project is specific.
Customization turns the model's general knowledge into your processes.

Four mechanisms:

| Mechanism | What it is | When |
| --- | --- | --- |
| **Skill** | a folder with instructions + resources, loaded by description | repeatable process ("how to deploy", "how to write migrations") |
| **Command** | a named prompt template (`/review`, `/test`) | frequent requests |
| **Subagent** | a separate agent with its own permissions and model | reconnaissance, review, parallel work |
| **MCP** | an external server with tools | Jira, DB, browser, internal APIs |

## 2. Skill

A skill is a `SKILL.md` file with a description of when to apply it:

```markdown
---
name: deploy
description: How to safely roll out a release to staging and prod
---

# Deploy
1. Check that main is green
2. Build the image: ...
3. ...
```

The key: **description** determines when the agent picks up the skill on its own.
A bad description = the skill is never used.

## 3. Command

```jsonc
{
  "commands": {
    "review": {
      "description": "Strict review of the current diff",
      "template": "You are a strict reviewer. Check `git diff` for: ... Problems only."
    }
  }
}
```

Invocation: `/review`. Saves typing and standardizes quality.

## 4. Subagent

A separate session with its own permissions:

```jsonc
{
  "agents": {
    "scout": {
      "description": "Repository reconnaissance without edits",
      "mode": "subagent",
      "permissions": [
        { "action": "edit", "resource": "*", "effect": "deny" },
        { "action": "shell", "resource": "*", "effect": "deny" }
      ]
    }
  }
}
```

The benefit: it doesn't clutter the main context, and it can't accidentally change code.

## 5. MCP

A protocol through which the agent gets external tools. Examples: DB access,
Jira, browser, internal APIs.

Security rules:

- an MCP server is **code running with your permissions** — only trust verified ones;
- prefer OAuth over pasting a key into the config;
- restrict: read-only if you only need to look.

## 6. How not to drown in customization

Start with the problem, not the mechanism:

```
I repeat the same prompt 5 times a week → Command
There's a 10-step process → Skill
I need to isolate reconnaissance → Subagent
I need data from an external system → MCP
```

The reverse order ("I'll build an MCP because it's trendy") leaves garbage in the config.

---

## Comprehension checklist

1. How does a skill differ from a command?
2. Why is a skill's `description` more important than its contents?
3. Why restrict a subagent's permissions?
4. What is the main risk of an MCP server?

---

# Practice

See [practice.md](practice.md).
