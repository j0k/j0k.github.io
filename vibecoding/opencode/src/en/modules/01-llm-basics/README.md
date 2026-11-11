# Module 01 — How LLMs Work

**Time:** 4 hours · **Format:** 90 min theory + 150 min practice

---

# Theory

## 1. The model predicts text

An LLM is a function `next_token(context) → probability distribution`.
Generation is picking from that distribution, token by token.

Three consequences to keep in mind:

1. **The model does not "know", it "continues".** Plausible ≠ true.
2. **The model has no memory between calls.** Anything that did not make it into the context does not exist.
3. **The model does not "understand" your project.** It only sees what you gave it in this request.

## 2. Tokens

Text is cut into tokens — chunks of 3–4 characters (worse for Russian than for English).

```
"Привет, мир"  →  [При, вет, ",", мир]
"hello world"  →  [hello, world]
```

Practical consequences:

- Limits are measured in tokens, not characters: 1,000,000 tokens ≈ 700–900 KB of code.
- Russian text is 20–40% more expensive than English.
- JSON/YAML code is "more expensive" than ordinary code because of punctuation.

**Rule:** if you can explain it shorter — explain it shorter. Every extra token
is multiplied by the number of steps in the agent loop.

## 3. The context window

```
[system prompt][instructions][files][history][your question]
└──────────────────  all of this = context  ──────────────────┘
```

The key property is **"lost in the middle"**: information in the middle of a long context
is used worse than at the beginning and at the end.

In practice:

- The most important requirements go at the beginning or in the question itself.
- A huge file in full is worse than the needed fragment + a path reference.
- When the context fills up, the agent does not get "smarter", it starts getting confused.

## 4. Sampling and non-determinism

The model has generation parameters:

| Parameter | Meaning | When to touch it |
| --- | --- | --- |
| `temperature` | randomness of the choice | code: low; brainstorming: higher |
| `top_p` | truncating the tail of the distribution | almost always leave at default |
| `max_tokens` | length of the answer | limit it so you don't burn budget |

**Important:** `temperature: 0` **does not guarantee** an identical result. Batching, caching,
routing versions, and model updates change the output. "It worked yesterday" is a normal state.

## 5. Reasoning tokens

"Thinking" models have a hidden reasoning phase: the model generates a chain of thought
before answering. It is:

- more expensive (reasoning tokens are billed);
- slower;
- better on "think about it" tasks (architecture, debugging, math);
- almost useless for "rename a variable".

## 6. Hallucinations

A hallucination is not a bug but a consequence of the design: the model generates what is plausible.

Especially dangerous areas:

- **APIs and library versions** — the model remembers old signatures and writes them confidently.
- **CLI flags** — it is easy to invent a flag that does not exist.
- **Numbers and dates** — invented with the same confidence as facts.
- **Links** — URLs are generated from a template and often do not exist.

There is one remedy: **verify against an external source** (compiler, test, documentation, run).

## 7. Knowledge and the cutoff date

The model is trained on data up to a certain date. Everything that appeared later, it
knows poorly or not at all — but it will answer anyway.

In practice: put current documentation into the context instead of relying on the model's memory.

## 8. Why models "get dumb" in a long session

Three reasons:

1. The context is clogged with junk from failed attempts.
2. Early instructions got "diluted" among thousands of tokens.
3. The model anchored on its own wrong decision.

The cure: **a new session + a precise description of what is already known.** This is not a defeat,
it is normal hygiene.

---

## Comprehension checklist

1. Why doesn't `temperature: 0` give reproducibility?
2. What is "lost in the middle" and how does it affect the structure of your request?
3. Why can't hallucinations be "cured with a prompt"?
4. On which tasks do reasoning tokens pay off, and on which do they not?
5. Name three signs that it is time to start the session over.

---

# Practice

See [practice.md](practice.md).
