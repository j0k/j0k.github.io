# Module 06 — Economics and model choice

**Time:** 3 hours · **Format:** 60 min theory + 120 min practice

---

# Theory

## 1. What goes into the cost

The price is quoted per **1 million tokens** and splits into:

| Type | What it is | Usually |
| --- | --- | --- |
| input | your context | expensive |
| output | the model's answer | 3–5× more expensive than input |
| cache write | writing to the cache | ≈ input |
| cache read | reading from the cache | 5–10× cheaper than input |

Session formula:

```
cost ≈ (input_tokens × price_in + output_tokens × price_out) / 1_000_000
```

But in an agent loop **input is multiplied by the number of steps**: every step resends
the entire context. 10 steps with a 50k context means 500k input tokens.

## 2. Cache — the main lever for savings

Providers cache the **stable prefix** of a request. If the structure is always:

```
[instructions] [project files] [question]
```

then on repeated steps the prefix is read from the cache, and you pay pennies.

What kills the cache:

- changing instructions mid-session;
- rearranging files;
- inserting the current time/random data at the start;
- starting every step "from a clean slate".

## 3. Latency

It matters for UX, but not only:

- a reasoning model thinks for 30–120 seconds before the first token;
- on short edits that is annoying;
- on architectural tasks it pays off.

## 4. Model classes

| Class | Trait | What for |
| --- | --- | --- |
| fast / mini / flash | cheap, fast | renames, tests by example, search |
| balanced | mid-range | everyday development, refactoring |
| frontier + reasoning | expensive, thinks | architecture, hard debugging, migrations |
| long-context | 500k–2M window | analyzing large repos/logs |

Rule: **80% of tasks are solved by a cheap model** if you have tests and a good spec.

## 5. How to choose in practice

```
1. Is there a check?     no  → oracle first, then the model
2. Routine task?         yes → fast
3. Needs thinking?       yes → reasoning
4. Context > 200k?       yes → long-context is mandatory
5. Many tool-calls?      yes → tool-calling reliability matters, not "smarts"
```

Another nuance: **the model's temperament**. One likes writing tests, another dives straight into the code,
a third is too verbose. You need 2–3 favorite models per task type, not one "best" one.

## 6. Budget and limits

- Set provider limits (a monthly budget).
- Cap `max_tokens` for routine tasks.
- Keep an eye on `opencode stats`.
- A single "vibe session" at 2M tokens can cost as much as a day of work — that's normal
  if the result is worth it, and a disaster if it was a headline edit.

## 7. When an expensive model is cheaper

A paradox: a frontier model over 3 iterations can cost less than a mini model over 15 iterations
plus your time on review. You have to count **total cost**: tokens + your time + bugs.

---

## Comprehension checklist

1. Why is input multiplied by the number of steps in an agent loop?
2. What kills the cache and how do you fix it?
3. Name three tasks where a cheap model is objectively better than an expensive one.
4. How do you compute the "total cost" of a task?

---

# Practice

See [practice.md](practice.md).
