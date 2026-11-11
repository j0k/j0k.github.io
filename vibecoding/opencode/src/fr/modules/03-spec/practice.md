# Module 03 — Pratique : de « fais-le bien » à une spec

**Temps :** 200 minutes · **Artefact :** `labs/03-specs/`

---

## Tâche 1. Décomposer trois tâches (40 min)

Prenez trois tâches vagues :

```
A) "Ajouter du cache"
B) "Corriger les bugs de l'API"
C) "Rendre l'interface plus jolie"
```

Pour chacune, écrivez une spec avec le modèle `templates/spec.md`, en incluant le bloc « hors périmètre ».

**Acceptation :** chaque spec a au moins 3 exigences vérifiables et 2 critères d'acceptation
(une commande ou un test).

---

## Tâche 2. Comparaison en pratique (60 min)

Choisissez une spec (par exemple A) et implémentez la tâche deux fois :

**Run 1 — « vibe » :**

```
Ajoute du cache au projet.
```

**Run 2 — par la spec :**

```
<insérez la spec complète>
Commence par un plan. N'écris pas de code avant ma validation.
```

**Remplissez un tableau :**
| Métrique | Run 1 | Run 2 |
| --- | --- | --- |
| fichiers touchés | | |
| changements inutiles | | |
| tests ajoutés | | |
| réussi du premier coup | | |
| coût | | |

**Acceptation :** il y a une conclusion sur la partie de la spec qui a eu le plus d'effet.

---

## Tâche 3. Un plan avant le code (30 min)

Pour la spec B (bugs de l'API) :

```
N'écris pas de code. Donne-moi un plan :
1) quels fichiers tu vas regarder et pourquoi ;
2) des hypothèses sur les causes des bugs ;
3) comment tu vas vérifier chaque hypothèse ;
4) ce qui peut casser.
```

Modifiez le plan (retirez l'excès, ajoutez ce qui manque), puis autorisez l'implémentation.

**Acceptation :** le rapport contient le plan initial, vos modifications et le diff final.
Comparez : combien de retouches du plan vs combien de retouches du code.

---

## Tâche 4. Décomposition (40 min)

Prenez la tâche C et découpez-la en 4–6 étapes pour que chacune :

- modifie ≤ 2 fichiers ;
- ait son propre critère de vérification ;
- soit commitée séparément.

**Acceptation :** une liste d'étapes avec critères + au moins 2 étapes réalisées avec commits.

---

## Tâche 5. Bibliothèque de prompts (30 min)

Créez `labs/03-specs/prompts.md` — 5 modèles réutilisables :

1. « Donne-moi un plan, n'écris pas de code »
2. « Explique le code existant »
3. « Ajoute des tests pour une fonction »
4. « Trouve la cause d'un test qui échoue »
5. « Relis mon diff comme un reviewer strict »

Format : titre, modèle, quand l'utiliser, un exemple rempli.

---

## Critères de soumission

- [ ] Trois specs issues du modèle, avec un bloc « hors périmètre ».
- [ ] Tableau de comparaison « vibe vs spec ».
- [ ] Un plan avec vos modifications et le diff final.
- [ ] Décomposition + ≥ 2 commits.
- [ ] `prompts.md` avec 5 modèles.
