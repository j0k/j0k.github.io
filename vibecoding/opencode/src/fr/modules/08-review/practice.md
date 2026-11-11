# Module 08 — Pratique : attraper un mauvais diff

**Temps :** 160 minutes · **Livrable :** `labs/08-review/`

---

## Tâche 1. Diffs d'entraînement (40 min)

Créez trois « mauvais » diffs (à la main ou avec un agent) :

**Diff A — trou de sécurité :**

```diff
- if not user.is_active: return 403
+ # no check needed
```

**Diff B — erreur avalée :**

```diff
- raise PaymentError(...)
+ except Exception: pass
```

**Diff C — test ajusté :**

```diff
- assert calculate(2, 3) == 5
+ assert calculate(2, 3) is not None
```

Relisez chacun à l'aide de `templates/review-checklist.md`.

**Critère d'acceptation :** pour chaque diff — une remarque précise avec fichier/ligne et une correction proposée.

---

## Tâche 2. Relire un vrai diff d'agent (40 min)

Prenez le diff du module 07 (migration) ou faites une nouvelle modification avec un agent.

Passez la checklist :

- [ ] toutes les suppressions lues
- [ ] aucun `except: pass`
- [ ] aucun `skip`/`xfail` sans raison
- [ ] aucun stub du genre `return None  # TODO`
- [ ] aucune nouvelle dépendance (ou elles sont justifiées)
- [ ] les tests vérifient un comportement, pas « not None »
- [ ] aucun secret
- [ ] les modifications restent dans le périmètre de la tâche

**Critère d'acceptation :** une checklist remplie + au moins une remarque trouvée.

---

## Tâche 3. Second avis (30 min)

Demandez à **un autre** modèle ou à un sous-agent neuf de relire le diff :

```
You are a strict reviewer. The diff is below. Find problems only:
deleted checks, swallowed errors, useless tests,
out-of-scope changes, secrets. Format: file:line — problem — how to fix.
```

**Critère d'acceptation :** comparez ce que vous avez trouvé et ce que l'agent a trouvé. Notez ce que vous avez manqué.

---

## Tâche 4. Écrire une checklist de relecture (25 min)

Créez `labs/08-review/checklist.md` — votre propre checklist pour votre stack (10 à 15 points).
Ajoutez-la à `AGENTS.md` sous forme de commande :

```markdown
## Review
Before committing, go through `.review-checklist.md` and list the problems you find.
```

**Critère d'acceptation :** la checklist est spécifique à votre projet, pas des mots génériques.

---

## Tâche 5. Garde-fou qualité en CI (25 min)

Ajoutez une CI minimale (GitHub Actions ou un pre-commit local) :

```yaml
- run: ./scripts/check.sh
- run: grep -rn "sk-" --include=*.py . && exit 1 || exit 0
```

**Critère d'acceptation :** le garde-fou échoue sur un commit volontairement cassé et passe sur un commit normal.

---

## Critères de rendu

- [ ] Trois diffs d'entraînement analysés.
- [ ] Un vrai diff est passé par la checklist, avec des remarques.
- [ ] Une comparaison « moi vs l'agent relecteur » existe.
- [ ] Votre propre checklist est branchée dans `AGENTS.md`.
- [ ] Le garde-fou CI fonctionne (échoue/passe).
