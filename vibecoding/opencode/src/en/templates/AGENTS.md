# AGENTS.md

> Copy to the project root and edit. No more than 40 lines.
> Only verifiable rules — no "write good code".

# Project: <name>

## Stack
- Language: <version>
- Framework: <name + version>
- Tests: <pytest / vitest / go test>
- Linter: <ruff / eslint>
- Types: <mypy / tsc>

## Commands
- everything at once: `./scripts/check.sh`
- tests: `<command>`
- linter: `<command>`
- run: `<command>`

## Conventions
- <for example: typing is mandatory, mypy in strict mode>
- <for example: errors via AppError, not raise ValueError>
- <for example: tests next to the code, `test_*.py`>
- <for example: no new dependencies without discussion>

## Forbidden
- changing `.env` and secrets
- committing to `main`
- editing `migrations/` by hand
- disabling tests (`skip`, `xfail`) without an explicit reason

## Documentation
- architecture decisions: `docs/decisions.md`
- specs: `docs/specs/`

## Process
- plan first, code second
- one step — one commit
- after a step — `./scripts/check.sh`
