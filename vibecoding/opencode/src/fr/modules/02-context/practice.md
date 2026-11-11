# Module 02 — Pratique : le contexte sous contrôle

**Durée :** 160 minutes · **Artefact :** `labs/02-context/` (AGENTS.md + rapport)

---

## Tâche 1. Écrire AGENTS.md (40 min)

Prenez votre projet d'apprentissage (ou `~/edu/sandbox`).

1. Copiez le modèle : `templates/AGENTS.md` → `<projet>/AGENTS.md`.
2. Remplissez-le : stack, commandes, conventions, interdits.
3. Vérifiez que chaque commande fonctionne vraiment :

```bash
pytest -q      # or your test command
ruff check .
```

**Critère d'acceptation :**
- Toutes les commandes de `AGENTS.md` s'exécutent sans erreur.
- Le fichier ne contient pas de mots génériques (« écris du bon code ») — uniquement des règles vérifiables.
- Pas plus de 40 lignes.

---

## Tâche 2. L'effet d'AGENTS.md (30 min)

Faites la même tâche deux fois dans des sessions **nouvelles** :

```
A) sans AGENTS.md (renommez temporairement le fichier)
B) avec AGENTS.md
```

La tâche :

```
Ajoute une fonction qui additionne les nombres d'une liste de chaînes,
en ignorant les valeurs non numériques. Écris des tests.
```

**Consignez dans le rapport :**
| | A (sans) | B (avec) |
| --- | --- | --- |
| le style correspondait au projet | | |
| le bon framework de test a été utilisé | | |
| nombre d'itérations | | |
| coût de la session | | |

**Critère d'acceptation :** une sortie montre au moins une différence.

---

## Tâche 3. Des liens plutôt que des paraphrases (25 min)

Trouvez un module de plus de 200 lignes dans le projet. Comparez deux requêtes :

```
Mauvais : « J'ai un module de paiements, il fait plein de choses,
il y a des fonctions de calcul, corrige l'arrondi »

Bon : « Dans src/payments/calc.py la fonction round_amount arrondit
à 2 chiffres. Il nous faut un arrondi bancaire (ROUND_HALF_EVEN). Corrige-le et ajoute un test. »
```

**Consignez :** quelle requête a produit le diff le plus précis, et combien de tokens ont été dépensés.

---

## Tâche 4. Dégradation et récupération (40 min)

Menez une session « sale » :

1. Donnez 4 tâches différentes à la suite dans une même session.
2. Après chacune, demandez de la refaire « un peu autrement ».
3. À la 5e tâche, demandez « fais comme dans la première tâche, mais pour un autre module ».

**Consignez le résultat** (qualité, style, erreurs).

Puis dans une nouvelle session :

```
Contexte : le projet a un module X, la fonction Y fait Z (fichier src/...).
Tâche : fais la même chose pour le module A.
Critère : les tests passent, style comme dans Y.
```

**Critère d'acceptation :** le rapport compare les sessions « sale » et « propre » sur 3 signaux
(style, précision, coût).

---

## Tâche 5. Déplacer la mémoire dans un fichier (25 min)

Créez `docs/decisions.md` dans le projet et notez-y 3 décisions d'architecture :

```markdown
## ADR-1 : Des tests uniquement via pytest
## ADR-2 : Les erreurs passent par AppError
## ADR-3 : Pas de magie ORM, seulement du SQL explicite
```

Ajoutez un lien dans `AGENTS.md` :

```markdown
## Documentation
- Décisions : `docs/decisions.md` (à lire avant tout changement d'architecture)
```

Vérifiez : dans une nouvelle session, à la question « pourquoi utilise-t-on AppError ? », l'agent trouve le fichier.

---

## Critères de fin

- [ ] `AGENTS.md` est créé, les commandes sont vérifiées, ≤ 40 lignes.
- [ ] Il y a un tableau de comparaison A/B de la tâche 2.
- [ ] Il y a une comparaison « paraphrase vs lien ».
- [ ] Il y a un compte rendu de la dégradation de session avec une conclusion.
- [ ] `docs/decisions.md` est créé et lié depuis `AGENTS.md`.
