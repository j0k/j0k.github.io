# Module 07 — Refactoring à grande échelle

**Temps :** 5 heures · **Format :** 90 min de théorie + 210 min de pratique

---

# Théorie

## 1. Pourquoi les grosses modifications d'agent sont dangereuses

```
1 file, 30 lines  → you read the diff in 2 minutes
12 files, 900 lines → you read it "diagonally" and miss a deleted check
```

Le risque croît de façon non linéaire : plus le diff est gros, plus la probabilité que vous le lisiez vraiment baisse.

Règle : **la taille du diff est un paramètre contrôlable**. Pas « laisse-le tout faire », mais « fais l'étape 1 ».

## 2. La stratégie du « dépôt vert »

Chaque étape se termine par des tests verts et un commit :

```
[green] → step → [green] → commit → step → [green] → commit
```

Si une étape a cassé les tests et n'est pas réparée en 2 itérations — revenez en arrière et essayez une autre approche.
C'est moins cher que de réparer une cascade de 5 étapes cassées.

## 3. L'ordre de migration

Une séquence sûre pour « remplacer X par Y » :

```
1. Introduce Y alongside X (without deleting X)
2. Move one call site to Y
3. Tests green → commit
4. Move the remaining call sites (one at a time)
5. Delete X
6. Delete dead code
```

L'essentiel : **ne jamais supprimer l'ancien avant que le nouveau soit vérifié.**

## 4. Comment contraindre l'agent

```
Don't touch files outside src/billing/.
Don't change public function signatures.
Don't add dependencies.
One step — one commit.
After each step run ./scripts/check.sh and stop if it's red.
```

Les contraintes par chemin fonctionnent mieux que supplier « fais attention ».

## 5. Trouver les dépendances

Avant de migrer — construisez une carte :

```
grep -rn "old_function" src/
```

Donnez le résultat à l'agent et demandez-lui un plan fichier par fichier. C'est moins cher que « trouve-le toi-même
dans 500 fichiers », et plus exact.

## 6. Modifications mécaniques vs sémantiques

| Type | Exemple | Comment faire |
| --- | --- | --- |
| Mécanique | renommage, formatage | peut être groupé, la vérification ce sont les tests |
| Sémantique | changement de logique | un fichier à la fois, avec relecture |

Ne les mélangez pas : « renomme-le et améliore-le tant que tu y es » = un diff invérifiable.

## 7. Feature flags et réversibilité

Si la fonctionnalité est grosse — mettez-la derrière un flag :

```python
if settings.use_new_billing:
    new_path()
else:
    old_path()
```

Cela permet de merger plus tôt, de revenir en arrière instantanément et de tester de façon incrémentale.

---

## Checklist de compréhension

1. Pourquoi un gros diff est-il plus dangereux que la somme de petits ?
2. Pourquoi introduire le nouveau avant de supprimer l'ancien ?
3. En quoi les modifications mécaniques diffèrent-elles des sémantiques en termes de processus ?
4. Que faites-vous si une étape ne passe pas au vert en 2 itérations ?

---

# Pratique

Voir [practice.md](practice.md).
