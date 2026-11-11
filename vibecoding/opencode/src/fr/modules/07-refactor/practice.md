# Module 07 — Pratique : migrer sans tests rouges

**Temps :** 210 minutes · **Livrable :** `labs/07-refactor/`

---

## Tâche 1. Carte des dépendances (25 min)

Choisissez une fonction/classe que vous voulez remplacer. Construisez une carte :

```bash
grep -rn "old_name" --include=*.py .
```

Remplissez un tableau :

| Fichier | Ligne | Ce qu'elle fait | Risque |
| --- | --- | --- | --- |

**Critère d'acceptation :** la carte est complète (recoupez une fois de plus avec `grep`), les risques sont classés.

---

## Tâche 2. Plan de migration (25 min)

Écrivez un plan en 5 à 7 étapes, où chaque étape :

- touche ≤ 2 fichiers ;
- se termine par `./scripts/check.sh` ;
- a son propre commit.

**Critère d'acceptation :** le plan a été validé par vous avant de commencer le travail (notez-le dans le rapport).

---

## Tâche 3. Migration pas à pas (90 min)

Exécutez les étapes selon le plan. Après chacune :

```bash
./scripts/check.sh
git add -A && git commit -m "step N: <what was done>"
```

Règles pour l'agent :

```
We work one plan step at a time. After the step, stop and show the diff.
Don't touch files outside <path>. Don't change public signatures.
```

**Critère d'acceptation :** au moins 3 étapes, chacune avec des tests verts et un commit.
Dans le rapport — `git log --oneline` et `git diff --stat` pour toute la migration.

---

## Tâche 4. Test de rollback (25 min)

Cassez volontairement une étape (dites à l'agent : « essaie de faire l'étape 4 en même temps que l'étape 5, tout de suite »).
Regardez combien de fichiers ont été touchés et combien de tests ont échoué. Revenez en arrière :

```bash
git reset --hard HEAD~1
```

**Critère d'acceptation :** dans le rapport — une comparaison « une par une » vs « tout d'un coup » : nombre de fichiers,
nombre d'échecs, temps passé à démêler.

---

## Tâche 5. Suppression du code mort (45 min)

Après la migration :

```
The old code is no longer used. Find all references to <old_name>,
delete them and the code itself. If something still uses it — stop and show me the list.
```

**Critère d'acceptation :** tests verts, `grep` sur l'ancien nom vide, diff relu.

---

## Critères de rendu

- [ ] La carte des dépendances est complète.
- [ ] Un plan de 5+ étapes, validé avant le travail.
- [ ] ≥ 3 étapes avec tests verts et commits.
- [ ] L'expérience « tout d'un coup » + rollback.
- [ ] Code mort supprimé, dépôt vert.
