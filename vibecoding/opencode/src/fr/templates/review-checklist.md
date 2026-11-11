# Checklist de revue de diff

L'ordre compte : commencez par les suppressions.

## 1. Suppressions (−)

- [ ] Aucun contrôle (auth, validation, permissions) n'a été supprimé.
- [ ] Aucun gestionnaire d'erreur n'a été supprimé.
- [ ] Aucun test n'a été supprimé sans remplacement.
- [ ] Aucun code encore utilisé n'a été supprimé (`grep` par nom est vide).

## 2. Logique (+)

- [ ] Les conditions (if/else, bornes) n'ont pas été modifiées à votre insu.
- [ ] Pas de `except Exception: pass`, `catch {}`.
- [ ] Pas de stubs : `return None  # TODO`, `return True`.
- [ ] Pas de nombres magiques sans explication.
- [ ] Pas de `print` / `console.log` de debug.

## 3. Tests

- [ ] Les tests vérifient le comportement, pas `is not None`.
- [ ] Il y a des cas limites (vide, None, maximum).
- [ ] Pas de `skip` / `xfail` / `only`.
- [ ] Le test échoue si le code est cassé (vérifié par mutation).

## 4. Sécurité

- [ ] Pas de secrets (`grep -rn "sk-"`, tokens, mots de passe).
- [ ] Les requêtes SQL/commandes sont paramétrées.
- [ ] L'entrée est validée à la frontière.
- [ ] Nouvelle dépendance : le nom a été vérifié pour le typosquatting.

## 5. Périmètre de la tâche

- [ ] Changements uniquement dans les fichiers convenus.
- [ ] Pas d'« améliorations incidentes ».
- [ ] La taille du diff correspond au plan.

## 6. Résultat

- [ ] Le diff a été lu en entier.
- [ ] `./scripts/check.sh` est vert.
- [ ] Les commentaires sont formulés comme `file:line — problème — correction`.
