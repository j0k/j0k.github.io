# Module 01 — Comment fonctionnent les LLM

**Durée :** 4 heures · **Format :** 90 min de théorie + 150 min de pratique

---

# Théorie

## 1. Le modèle prédit du texte

Un LLM est une fonction `next_token(context) → distribution de probabilités`.
La génération consiste à tirer dans cette distribution, token par token.

Trois conséquences à garder en tête :

1. **Le modèle ne « sait » pas, il « continue ».** Plausible ≠ vrai.
2. **Le modèle n'a aucune mémoire entre deux appels.** Ce qui n'est pas entré dans le contexte n'existe pas.
3. **Le modèle ne « comprend » pas votre projet.** Il ne voit que ce que vous lui avez donné dans cette requête.

## 2. Les tokens

Le texte est découpé en tokens — des fragments de 3 à 4 caractères (pire pour le russe que pour l'anglais).

```
"Привет, мир"  →  [При, вет, ",", мир]
"hello world"  →  [hello, world]
```

Conséquences pratiques :

- Les limites se mesurent en tokens, pas en caractères : 1 000 000 de tokens ≈ 700–900 Ko de code.
- Le texte russe coûte 20 à 40 % plus cher que l'anglais.
- Le code JSON/YAML est « plus cher » que du code ordinaire à cause de la ponctuation.

**Règle :** si vous pouvez l'expliquer plus court — expliquez-le plus court. Chaque token superflu
est multiplié par le nombre d'étapes de la boucle de l'agent.

## 3. La fenêtre de contexte

```
[prompt système][instructions][fichiers][historique][votre question]
└────────────────────  tout ça = le contexte  ─────────────────────┘
```

La propriété clé est le **« perdu au milieu »** : l'information au milieu d'un long contexte
est moins bien utilisée qu'au début et à la fin.

En pratique :

- Les exigences les plus importantes vont au début ou dans la question elle-même.
- Un gros fichier en entier est pire que le fragment nécessaire + une référence de chemin.
- Quand le contexte se remplit, l'agent ne devient pas « plus intelligent », il commence à se perdre.

## 4. Échantillonnage et non-déterminisme

Le modèle a des paramètres de génération :

| Paramètre | Signification | Quand y toucher |
| --- | --- | --- |
| `temperature` | hasard du choix | code : bas ; brainstorming : plus haut |
| `top_p` | tronque la queue de la distribution | laissez presque toujours la valeur par défaut |
| `max_tokens` | longueur de la réponse | limitez-la pour ne pas brûler le budget |

**Important :** `temperature: 0` **ne garantit pas** un résultat identique. Le batching, le cache,
les versions de routage et les mises à jour du modèle changent la sortie. « Ça marchait hier » est un état normal.

## 5. Les tokens de raisonnement

Les modèles « qui réfléchissent » ont une phase de raisonnement cachée : le modèle génère une chaîne de pensée
avant de répondre. C'est :

- plus cher (les tokens de raisonnement sont facturés) ;
- plus lent ;
- meilleur sur les tâches « réfléchis-y » (architecture, débogage, maths) ;
- presque inutile pour « renommer une variable ».

## 6. Les hallucinations

Une hallucination n'est pas un bug mais une conséquence de la conception : le modèle génère ce qui est plausible.

Zones particulièrement dangereuses :

- **Les API et les versions de bibliothèques** — le modèle se souvient d'anciennes signatures et les écrit avec assurance.
- **Les options de CLI** — il est facile d'inventer une option qui n'existe pas.
- **Les nombres et les dates** — inventés avec la même assurance que des faits.
- **Les liens** — les URL sont générées à partir d'un modèle et n'existent souvent pas.

Il n'y a qu'un remède : **vérifier contre une source externe** (compilateur, test, documentation, exécution).

## 7. Connaissances et date de coupure

Le modèle est entraîné sur des données jusqu'à une certaine date. Tout ce qui est apparu plus tard, il
le connaît mal ou pas du tout — mais il répondra quand même.

En pratique : mettez la documentation à jour dans le contexte au lieu de vous fier à la mémoire du modèle.

## 8. Pourquoi les modèles « deviennent bêtes » dans une longue session

Trois raisons :

1. Le contexte s'encrasse avec les déchets des tentatives ratées.
2. Les instructions du début se sont « diluées » parmi des milliers de tokens.
3. Le modèle s'est ancré sur sa propre décision erronée.

Le remède : **une nouvelle session + une description précise de ce qui est déjà connu.** Ce n'est pas une défaite,
c'est de l'hygiène normale.

---

## Checklist de compréhension

1. Pourquoi `temperature: 0` ne donne-t-il pas de reproductibilité ?
2. Qu'est-ce que le « perdu au milieu » et quel effet a-t-il sur la structure de votre requête ?
3. Pourquoi les hallucinations ne peuvent-elles pas se « guérir avec un prompt » ?
4. Sur quelles tâches les tokens de raisonnement sont-ils rentables, et sur lesquelles ne le sont-ils pas ?
5. Citez trois signes qu'il est temps de repartir de zéro dans une nouvelle session.

---

# Pratique

Voir [practice.md](practice.md).
