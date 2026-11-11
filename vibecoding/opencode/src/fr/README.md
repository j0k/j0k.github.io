# Le vibe coding avec OpenCode — un cours pratique

Un cours sur la manière d'obtenir des résultats **prévisibles** avec des agents IA
dans le développement logiciel.
Pas une histoire de « prompts secrets », mais de contexte, de vérification et de discipline
d'ingénierie.

Auteur : l'équipe du cours · Version 1.0 · OpenCode V2

---

## Ce que vous allez apprendre

À la fin du cours, vous saurez :

1. Expliquer comment fonctionne un LLM et pourquoi il se trompe — sans mystique.
2. Formuler une tâche pour que l'agent produise du code fonctionnel dès la première ou la deuxième tentative.
3. Préparer un projet pour l'agent : `AGENTS.md`, permissions, commandes de build et de test.
4. Travailler dans la boucle « spec → plan → petit diff → vérification → commit ».
5. Lire les diffs de l'agent et repérer les changements dangereux.
6. Calculer le coût d'une session et choisir un modèle pour la tâche, pas « le plus intelligent ».
7. Construire vos propres outils : skills, commandes, sous-agents.

---

## À qui s'adresse ce cours

- Étudiants, entrepreneurs, marketeurs, experts, fondateurs.
- Tous ceux qui ont essayé de « demander à ChatGPT d'écrire un projet » et ont obtenu un fouillis.

**Prérequis :** git (branches, diff, revert), un terminal, un langage de programmation
avec des tests (Python/JS/Go/Java — peu importe), OpenCode installé.

Vérification de l'état de préparation :

```bash
git --version
opencode --version
node --version   # ou python3 --version
```

---

## Comment le cours est structuré

```
théorie   ~40%  — concepts et modèles mentaux, sans blabla
pratique  ~60%  — exercices avec critères d'acceptation
```

Chaque module est un dossier avec deux fichiers obligatoires :

| Fichier | Contenu |
| --- | --- |
| `README.md` | théorie : concepts, mini-cours, questions de compréhension |
| `practice.md` | exercices, critères d'acceptation, temps |

**Règle du cours :** un module n'est validé qu'une fois l'artefact déposé dans `labs/`.

---

## Programme

| # | Module | Théorie | Pratique | Heures |
| --- | --- | --- | --- | --- |
| 00 | [Orientation](modules/00-orientation/README.md) | ce qu'est le vibe coding, les rôles, les limites | mettre en place l'environnement, première session | 2 |
| 01 | [Comment fonctionnent les LLM](modules/01-llm-basics/README.md) | tokens, contexte, échantillonnage, hallucinations | des expériences qui cassent votre intuition | 4 |
| 02 | [Ingénierie du contexte](modules/02-context/README.md) | fenêtre, `AGENTS.md`, hygiène de session | écrire `AGENTS.md`, mesurer la dégradation | 4 |
| 03 | [Spec et prompt](modules/03-spec/README.md) | spec-first, critères, plan | transformer 3 tâches en specs | 5 |
| 04 | [Oracles et vérification](modules/04-oracles/README.md) | tests, types, linters, CI | boucle TDD avec un agent | 5 |
| 05 | [Boucle de l'agent et permissions](modules/05-agent-loop/README.md) | appel d'outils, permissions, isolation | liste de refus, worktree, `--auto` | 4 |
| 06 | [Économie et choix du modèle](modules/06-economics/README.md) | prix, cache, fenêtre, latence | calculer le coût, comparer les modèles | 3 |
| 07 | [Refactoring à grande échelle](modules/07-refactor/README.md) | modifications multi-fichiers, dépôt vert | migrer un module avec un agent | 5 |
| 08 | [Revue et portes de qualité](modules/08-review/README.md) | lire les diffs, signaux d'alerte, sécurité | attraper 3 mauvais diffs | 4 |
| 09 | [Personnalisation](modules/09-custom/README.md) | skills, commandes, sous-agents, MCP | construire vos propres outils | 4 |
| 10 | [Projet final](modules/10-capstone/README.md) | — | une fonctionnalité de la spec à la CI + rétrospective | 10 |

Total ≈ 50 heures. L'ordre est obligatoire : 01–04 constituent la base ; sans eux, 05–09 se transforment en un jeu de boutons.

---

## Calendrier

**Semestre (16 semaines, 3 h/semaine) :**

| Semaines | Modules |
| --- | --- |
| 1–2 | 00, 01 |
| 3–4 | 02, 03 |
| 5–6 | 04 |
| 7–8 | 05 |
| 9 | 06 |
| 10–11 | 07 |
| 12–13 | 08 |
| 14 | 09 |
| 15–16 | 10 |

**Intensif (2 semaines, 25 h/semaine) :** un module par jour, le projet final sur les 2 derniers jours.

---

## Évaluation

| Partie | Poids | Ce qui est évalué |
| --- | --- | --- |
| Compréhension | 25 % | réponses aux questions des modules, soutenance orale |
| Pratique | 45 % | artefacts dans `labs/`, conformes aux critères d'acceptation |
| Projet final | 30 % | une fonctionnalité jusqu'à une CI verte + rétrospective fondée sur des métriques |

Score de passage — **70 %**, le projet final est obligatoire. Détails : [rubric.md](rubric.md).

---

## Structure du dépôt

```
Vibecode/opencode/
├── README.md            ← vous êtes ici
├── rubric.md            ← critères d'évaluation
├── glossary.md          ← concepts (s'enrichit au fil du cours)
├── resources.md         ← à lire au-delà du cours
├── progress.md          ← suivi de progression
├── templates/           ← modèles d'artefacts
│   ├── AGENTS.md
│   ├── spec.md
│   ├── review-checklist.md
│   └── retro.md
├── modules/             ← 00..10, chacun avec README.md + practice.md
└── labs/                ← les artefacts vont ici
    └── README.md
```

---

## Trois règles qui comptent plus que tout le reste

1. **N'acceptez jamais un diff que vous n'avez pas lu.** Le vibe coding sans lire le diff, c'est un emprunt à 300 %.
2. **Pas d'oracle — pas de tâche.** Si le résultat ne peut pas être vérifié par une commande, la tâche n'est pas prête pour l'agent.
3. **Une tâche — une session.** Mélanger les objectifs dans un seul contexte est la première raison pour laquelle « le modèle est devenu bête ».

---

## Par où commencer dès maintenant

1. Lisez [modules/00-orientation/README.md](modules/00-orientation/README.md).
2. Remplissez [progress.md](progress.md) — indiquez la date de début.
3. Ouvrez un terminal dans votre projet d'apprentissage et lancez `opencode`.
