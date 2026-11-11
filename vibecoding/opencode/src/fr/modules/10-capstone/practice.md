# Module 10 — Pratique et rendu du capstone

**Durée :** 10 heures · **Livrable :** `labs/10-capstone/`

---

## Checklist de fin

### Préparation

- [ ] La tâche est choisie et validée (3 à 10 fichiers, résultat vérifiable).
- [ ] La branche est créée : `git checkout -b capstone/<nom>`.
- [ ] `AGENTS.md` est à jour.

### Spec

- [ ] `labs/10-capstone/spec.md` est rempli à partir du modèle.
- [ ] 5 exigences ou plus, chacune vérifiable.
- [ ] Les critères d'acceptation sont des commandes concrètes.
- [ ] Il y a un bloc « hors périmètre ».

### Plan

- [ ] `labs/10-capstone/plan.md` — 4 à 8 étapes.
- [ ] Pour chaque étape : fichiers, vérification, risque.
- [ ] Le plan est validé avant le début du code.

### Implémentation

- [ ] Chaque étape est un commit séparé.
- [ ] `git log --oneline` se lit comme un historique de changements.
- [ ] `./scripts/check.sh` est vert sur HEAD.
- [ ] Aucune étape n'a demandé > 2 itérations sans revenir en arrière.

### Revue

- [ ] `labs/10-capstone/review.md` — la checklist est remplie.
- [ ] Il y a un second avis (un autre modèle/sous-agent).
- [ ] Toutes les remarques : corrigées ou rejetées avec un argument.

### Merge

- [ ] La description de la PR : quoi/pourquoi/comment cela a été vérifié.
- [ ] La CI est verte.
- [ ] Le diff est lu en entier (confirmez : « lu, N lignes »).
- [ ] Aucun `skip`, `xfail`, `TODO`, `print` dans le nouveau code.

### Rétro

- [ ] `labs/10-capstone/retro.md` à partir du modèle.
- [ ] Les métriques sont remplies avec des chiffres réels.
- [ ] Une règle pour la suite est formulée.

---

## Format du rendu

```
labs/10-capstone/
├── spec.md
├── plan.md
├── review.md
├── retro.md
└── links.md      ← lien vers la PR/la branche + git log --oneline
```

---

## Soutenance (10 minutes)

1. 2 min — la tâche et la spec.
2. 3 min — le plan et pourquoi celui-là précisément.
3. 3 min — **obligatoire** : l'endroit du diff où vous avez rejeté la suggestion de l'agent,
   et pourquoi.
4. 2 min — les métriques et la conclusion.

Sans le point 3, le capstone ne compte pas : cela signifie que la revue était une formalité.
