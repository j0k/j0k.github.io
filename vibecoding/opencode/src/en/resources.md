# Resources

What to read and watch beyond the course. No "100 links" — only what has been verified.

---

## Official documentation

| Topic | Link |
| --- | --- |
| OpenCode V2 — documentation | https://opencode.ai/v2/docs/ |
| Configuration | https://opencode.ai/v2/docs/config/ |
| Permissions | https://opencode.ai/v2/docs/permissions/ |
| Providers and models | https://opencode.ai/v2/docs/providers/ |
| MCP servers | https://opencode.ai/v2/docs/mcp-servers/ |
| Skills | https://opencode.ai/v2/docs/skills/ |
| Model and price catalog | https://models.dev |

---

## LLM fundamentals

- **Anthropic, "Building effective agents"** — about loops and tools, no magic.
- **OpenAI Cookbook** — practical prompting recipes.
- **"Attention is all you need"** (Vaswani et al.) — if you want to understand the architecture.
- **Andrej Karpathy, "Intro to Large Language Models"** (video) — the best explanation from scratch.

---

## Process engineering

- **Google, "Code Review Developer Guide"** — the classic of review, applicable to agent diffs.
- **"Working Effectively with Legacy Code"** (Michael Feathers) — about touching
  code without tests; useful before migrations.
- **Trunk-based development** — why small commits matter.
- **12 Factor App** — configuration and secrets.

---

## Security

- **OWASP Top 10** — the mandatory minimum when reviewing.
- **Supply chain attacks** (typosquatting, dependency confusion) — why a new
  dependency from the agent requires checking.

---

## Practice

- Your own `AGENTS.md` in every project.
- One experiment from module 01 once a month: intuition about models goes stale fast.
- Keep `docs/decisions.md` — in six months it will be the only source of "why it is like this".

---

## What NOT to read at the start

- Lists of "100 prompts that will change everything" — they contradict the content of the course.
- Articles "we replaced the team with AI" — marketing, not methodology.
- Guides to specific prompting "cheat codes" — they go stale faster than the models.
