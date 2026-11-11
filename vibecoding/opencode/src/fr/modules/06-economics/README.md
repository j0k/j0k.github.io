# Module 06 — Économie et choix du modèle

**Temps :** 3 heures · **Format :** 60 min de théorie + 120 min de pratique

---

# Théorie

## 1. Ce qui entre dans le coût

Le prix est donné pour **1 million de tokens** et se décompose ainsi :

| Type | Ce que c'est | En général |
| --- | --- | --- |
| input | votre contexte | cher |
| output | la réponse du modèle | 3–5× plus cher que l'input |
| cache write | écriture dans le cache | ≈ input |
| cache read | lecture depuis le cache | 5–10× moins cher que l'input |

Formule d'une session :

```
cost ≈ (input_tokens × price_in + output_tokens × price_out) / 1_000_000
```

Mais dans une boucle d'agent, **l'input est multiplié par le nombre d'étapes** : chaque étape renvoie
tout le contexte. 10 étapes avec un contexte de 50k = 500k de tokens d'input.

## 2. Le cache — le principal levier d'économie

Les fournisseurs mettent en cache le **préfixe stable** d'une requête. Si la structure est toujours :

```
[instructions] [project files] [question]
```

alors, sur les étapes répétées, le préfixe est lu depuis le cache et vous payez des clopinettes.

Ce qui tue le cache :

- modifier les instructions en cours de session ;
- réorganiser les fichiers ;
- insérer l'heure courante ou des données aléatoires au début ;
- repartir « de zéro » à chaque étape.

## 3. La latence

Elle compte pour l'UX, mais pas seulement :

- un modèle de raisonnement réfléchit 30 à 120 secondes avant le premier token ;
- sur des modifications courtes, c'est pénible ;
- sur des tâches d'architecture, ça vaut le coup.

## 4. Les classes de modèles

| Classe | Trait | Pour quoi faire |
| --- | --- | --- |
| fast / mini / flash | bon marché, rapide | renommages, tests par l'exemple, recherche |
| balanced | milieu de gamme | développement quotidien, refactoring |
| frontier + reasoning | cher, réfléchit | architecture, debugging difficile, migrations |
| long-context | fenêtre de 500k–2M | analyse de gros dépôts/journaux |

Règle : **80 % des tâches sont résolues par un modèle bon marché** si vous avez des tests et une bonne spec.

## 5. Comment choisir en pratique

```
1. Is there a check?     no  → oracle first, then the model
2. Routine task?         yes → fast
3. Needs thinking?       yes → reasoning
4. Context > 200k?       yes → long-context is mandatory
5. Many tool-calls?      yes → tool-calling reliability matters, not "smarts"
```

Autre nuance : **le tempérament du modèle**. L'un aime écrire des tests, l'autre plonge directement dans le code,
un troisième est trop bavard. Il vous faut 2 à 3 modèles favoris par type de tâche, pas un seul « meilleur ».

## 6. Budget et limites

- Fixez des limites chez le fournisseur (un budget mensuel).
- Plafonnez `max_tokens` pour les tâches routinières.
- Gardez un œil sur `opencode stats`.
- Une seule « session vibe » à 2M de tokens peut coûter autant qu'une journée de travail — c'est normal
  si le résultat en vaut la peine, et c'est une catastrophe si c'était une modification de titre.

## 7. Quand un modèle cher revient moins cher

Un paradoxe : un modèle frontier sur 3 itérations peut coûter moins qu'un modèle mini sur 15 itérations
plus votre temps de relecture. Il faut compter le **coût total** : tokens + votre temps + bugs.

---

## Checklist de compréhension

1. Pourquoi l'input est-il multiplié par le nombre d'étapes dans une boucle d'agent ?
2. Qu'est-ce qui tue le cache et comment y remédier ?
3. Citez trois tâches où un modèle bon marché est objectivement meilleur qu'un modèle cher.
4. Comment calculez-vous le « coût total » d'une tâche ?

---

# Pratique

Voir [practice.md](practice.md).
