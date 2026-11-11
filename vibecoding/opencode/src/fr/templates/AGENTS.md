# AGENTS.md

> À copier à la racine du projet et à adapter. Pas plus de 40 lignes.
> Uniquement des règles vérifiables — pas de « écris du bon code ».

# Projet : <nom>

## Stack
- Langage : <version>
- Framework : <nom + version>
- Tests : <pytest / vitest / go test>
- Linter : <ruff / eslint>
- Types : <mypy / tsc>

## Commandes
- tout d'un coup : `./scripts/check.sh`
- tests : `<command>`
- linter : `<command>`
- exécution : `<command>`

## Conventions
- <par exemple : le typage est obligatoire, mypy en mode strict>
- <par exemple : erreurs via AppError, pas raise ValueError>
- <par exemple : tests à côté du code, `test_*.py`>
- <par exemple : aucune nouvelle dépendance sans discussion>

## Interdit
- modifier `.env` et les secrets
- committer sur `main`
- éditer `migrations/` à la main
- désactiver des tests (`skip`, `xfail`) sans raison explicite

## Documentation
- décisions d'architecture : `docs/decisions.md`
- specs : `docs/specs/`

## Processus
- d'abord le plan, ensuite le code
- une étape — un commit
- après une étape — `./scripts/check.sh`
