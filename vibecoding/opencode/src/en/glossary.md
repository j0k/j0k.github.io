# Glossary

Course concepts. Grows as you work through the modules.

---

## A–Z

**AGENTS.md** — a file with project instructions, read automatically in every session.

**Agent** — an LLM in the loop "decision → tool call → result → decision".

**Auto (`--auto`)** — a mode that auto-approves actions not forbidden by the rules. Sandbox only.

---

## V

**Vibe coding** — development where the code is largely written by an agent, while the human
sets the task and verifies the result.

**Verification** — automatic checking of the result (tests, types, linter, run).

---

## H

**Hallucination** — a plausible but incorrect model output. A consequence of the design, not a "bug".

---

## D

**Diff** — a line-by-line representation of changes; the main object of review.

**Decomposition** — splitting a task into independently verifiable steps.

---

## C

**Context** — everything the model sees in one request: instructions, files, history, the question.

**Context window** — the maximum amount of context in tokens.

**Compaction** — automatic compression of the session history when the context fills up.

**Cache** — a saved stable prefix of the request; reading from cache is 5–10 times cheaper.

---

## L

**Lost in the middle** — the effect where information in the middle of a long context
is used worse than at the beginning and at the end.

---

## M

**MCP (Model Context Protocol)** — a protocol for connecting external tools to the agent.

**Model** — a neural network that predicts the next token.

---

## O

**Oracle** — an automatic source of "yes/no": a test, a compiler, a linter, a run.

---

## P

**Permission** — an `action + resource + effect` rule that defines what the agent may do.

**Plan-first** — the approach "plan first, code second".

**Prompt** — a text instruction to the model. In this course it is treated as a specification.

---

## R

**Reasoning tokens** — hidden reasoning tokens in "thinking" models; more expensive, but better
on complex tasks.

**Review** — reading and checking a diff by a human.

---

## S

**Session** — one working context of the agent; the unit of hygiene.

**Spec** — a formalized description of a task with verifiable criteria.

**Subagent** — a separate agent session for a subtask; it does not see the main context.

**Skill** — a folder with instructions and resources, loaded based on its description.

---

## T

**Token** — the unit of text for the model (3–4 characters on average).

**Tool calling** — the mechanism by which the model requests a tool call.

---

## F

**Few-shot** — a technique with examples in the prompt that set the format or style.

**Fast / mini / flash** — the class of cheap fast models.

**Frontier** — the class of the strongest (and most expensive) models.

---

## CI

**CI (Continuous Integration)** — automatic checks on every commit.

---

## E

**Embedding** — a vector representation of text; used for search, not for generation.

---

## A

**Anchoring** — the effect where the model repeats its earlier (possibly wrong) decision.
