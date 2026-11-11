# Module 02 — Ingénierie du contexte

**Durée :** 4 heures · **Format :** 80 min de théorie + 160 min de pratique

---

# Théorie

## 1. Le contexte est une mémoire de travail, pas un entrepôt

Chaque requête au modèle est assemblée à nouveau à partir de :

```
politique système → instructions du projet → fichiers ouverts → historique → votre question
```

Tout cela est un **budget**. Plus il y a de déchets, moins il reste de place pour l'essentiel.

Modèle mental : l'agent n'a pas de « mémoire du projet », il a un **bureau** sur lequel vous étalez
des papiers à chaque fois. Ce que vous n'y avez pas posé n'y est pas.

## 2. Trois niveaux d'instructions

| Niveau | Fichier | Portée |
| --- | --- | --- |
| Global | `~/.config/opencode/opencode.jsonc` | vos habitudes, vos modèles, vos permissions |
| Projet | `<projet>/AGENTS.md` | stack, commandes, conventions |
| Session | votre requête | la tâche précise |

`AGENTS.md` est le fichier le plus sous-estimé du vibe coding. Il est lu automatiquement
à chaque session, donc 20 lignes y font gagner des heures d'explication.

## 3. Que mettre dans AGENTS.md

Un bon `AGENTS.md` répond aux questions que l'agent chercherait sinon à deviner :

```markdown
# Projet : <nom>
## Stack
Python 3.12, FastAPI, pytest, Ruff
## Commandes
- tests : `pytest -q`
- linter : `ruff check .`
- lancer : `uvicorn app.main:app --reload`
## Conventions
- le typage est obligatoire, `mypy` en mode strict
- aucune nouvelle dépendance sans discussion
- les erreurs passent par `AppError`, pas par `raise ValueError`
## Interdits
- toucher `migrations/` à la main
- modifier `.env`
- faire un commit sur `main`
```

Règles : court, à l'impératif, uniquement ce qui ne peut pas être deviné.

## 4. Hygiène de session

| Signal | Action |
| --- | --- |
| L'agent a oublié une exigence du début | reformulez-la dans la question, ne fouillez pas l'historique |
| 3 tentatives ratées d'affilée | nouvelle session + une description précise |
| Deux tâches se sont mélangées | séparez-les en deux sessions |
| Le contexte est presque plein | compaction ou nouvelle session |

La **compaction** (compression de l'historique) aide, mais elle ne compresse pas tout de manière égale — des détails importants
peuvent se perdre. L'option plus fiable : déplacer le résultat dans un fichier (un plan, `TODO.md`) et repartir de zéro.

## 5. Des liens plutôt que des paraphrases

| Mauvais | Bon |
| --- | --- |
| « On a un module d'auth, c'est comme ça… » | `src/auth/session.py, the refresh_token function` |
| « Je colle le code ici » (500 lignes) | « regarde le fichier, change seulement `parse_date` » |
| « Comment c'est dans notre projet ? » | « comme dans `services/billing.py` » |

Le modèle sait lire les fichiers avec un outil. Donnez-lui un chemin — vous économisez des tokens et obtenez
la version actuelle au lieu de votre paraphrase.

## 6. Une structure de requête qui fonctionne

```
1. Contexte : où on en est, ce qui a déjà été fait (2–3 lignes)
2. Tâche : une phrase
3. Contraintes : ce qui est interdit, ce qui est obligatoire
4. Définition de fini : comment on vérifiera
5. Format de réponse : plan / diff / fichier X uniquement
```

Le point 5 est sous-estimé : « d'abord un plan, pas de code » fait gagner le plus de temps.

## 7. Compaction et mémoire

OpenCode a un réglage `compaction` — la compression automatique de l'historique.
Utile, mais pas gratuit : la compression est un appel de modèle supplémentaire.

Règle pratique : **ne gardez que la tâche en cours dans le contexte**, et rangez la connaissance
de long terme dans des fichiers du dépôt (`AGENTS.md`, `docs/`, `TODO.md`).

---

## Checklist de compréhension

1. Pourquoi « le modèle se souviendra de notre conversation » est-il une idée fausse dangereuse ?
2. Qu'est-ce qui est plus efficace : raconter le module avec des mots ou donner un chemin vers le fichier ? Pourquoi ?
3. Citez trois signes qu'il est temps de fermer la session.
4. Pourquoi « d'abord un plan » économise-t-il du contexte ?

---

# Pratique

Voir [practice.md](practice.md).
