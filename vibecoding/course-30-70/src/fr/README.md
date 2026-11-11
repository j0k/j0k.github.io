# Vibe coding : le cours 30/70

Un cours où 30% du temps part en théorie et 70% en pratique avec un agent IA.
Objectif : à la fin du cours, vous savez mener un produit qui fonctionne de l'idée au déploiement
sans écrire une seule fonction à la main.

## Ce que contient le cours

| Fichier | À quoi il sert |
|---|---|
| `01-programma.md` | Programme : 8 modules + projet final, minutage de chaque partie |
| `02-teoriya.md` | Toute la théorie du cours, condensée, par module |
| `03-praktika.md` | Exercices pour chaque module avec critères d'acceptation |
| `04-promptoteka.md` | 32 prompts prêts à l'emploi pour des situations précises |
| `05-proekty.md` | 10 projets finaux, classés par difficulté |
| `06-tracker.md` | Checklist de progression, à remplir à la main |

## Le minutage : comment obtenir exactement 30/70

Total : **1380 minutes (23 heures)**.

- Théorie : **414 minutes — 30.0%**
- Pratique : **966 minutes — 70.0%**

À l'intérieur d'un module : 150 minutes = 45 de théorie + 105 de pratique.
Projet final : 180 minutes = 54 de théorie (démonstration guidée) + 126 de pratique (construction).

La règle qui compte plus que le minutage : **la théorie ne se lit pas à l'avance**. Vous ouvrez
un module, vous lisez sa théorie (45 minutes, pas plus), et vous enchaînez immédiatement sur la
pratique du même module. Pratique non faite — on ne passe pas à la suite.

## Comment suivre le cours

1. Un module = une soirée (2,5 heures) ou deux soirées de 75 minutes.
2. Tout ce que vous faites en pratique part dans git. Le premier commit arrive avant la première
   ligne de code de l'IA.
3. Chaque exercice se termine par une marque dans `06-tracker.md`. Pas de marque — le module
   n'est pas validé.
4. Ne commencez pas le projet final avant le module 6.

## Ce qu'il faut installer à l'avance

- **Un agent avec accès aux fichiers** : Claude Code, Cursor, Codex CLI, Windsurf —
  n'importe lequel, du moment qu'il lit et modifie les fichiers tout seul. Un chat dans le navigateur
  ne conviendra pas pour ce cours : il ne voit pas votre projet.
- **git** et un compte GitHub.
- **Node.js LTS** et **Python 3.12** — tous les projets sont construits dessus.
- Un compte Vercel ou Netlify gratuit pour le déploiement.

## Trois règles du cours

1. **N'acceptez pas de code que vous ne pouvez pas vérifier.** Vérifier, ce n'est pas « ça a l'air
   bon », c'est une exécution, un test ou un comportement observé explicitement.
2. **Petit pas = un commit.** Si l'agent a cassé quelque chose — `git reset --hard` et on refait
   le pas, pas « on va corriger 40 fichiers de plus ».
3. **La spec avant le code.** Tant que la tâche n'est pas formulée en 5–10 lignes avec des critères
   de réussite, l'agent va deviner et vous refaites le travail.

## Ce que vous en retirez

- 8 compétences pratiquées : de la formulation d'une tâche au déploiement.
- Un projet déployé avec un lien public.
- Votre propre bibliothèque de prompts, étendue pour vos tâches.
- L'habitude de commiter et de vérifier — ce qui sépare le vibe coding de la roulette.

## Comment reconstruire le HTML

Les pages de ce cours sont générées à partir des sources Markdown dans `src/`.
Modifiez les fichiers `.md`, puis depuis le dossier `src/` :

```bash
pip install markdown
python build_html.py
```

Le script écrase les pages HTML juste à côté (à la racine de `course-30-70/`) —
`index.html`, `01-programma.html` … `06-tracker.html`.
Pour vérifier le résultat : `python check_html.py`.
