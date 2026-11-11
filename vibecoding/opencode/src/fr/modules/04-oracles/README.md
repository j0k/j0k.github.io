# Module 04 — Oracles et vérification

**Temps :** 5 heures · **Format :** théorie 90 min + pratique 210 min

---

# Théorie

## 1. L'oracle est l'outil principal

Un **oracle** est une source automatique de « oui/non » sur le résultat. Un test, un compilateur, un linter,
un vérificateur de types, le lancement de l'app, la comparaison avec une référence.

Sans oracle, le vibe coding se transforme en lecture de mensonges bien écrits.

```
Sans oracle :  l'agent dit "terminé" → vous le croyez → un bug une semaine plus tard
Avec oracle :  l'agent dit "terminé" → pytest → 2 échecs → l'agent les corrige
```

Un oracle ne fait pas que détecter des erreurs — il **donne du feedback au modèle**. Ça change tout :
au lieu d'« expliquer avec des mots ce qui ne va pas », vous collez la sortie de la commande.

## 2. La pyramide des vérifications

Du moins cher et rapide au plus cher :

```
1. Syntaxe / compilation           secondes
2. Types (mypy, tsc)               secondes
3. Linter (ruff, eslint)           secondes
4. Tests unitaires                 secondes-minutes
5. Tests d'intégration             minutes
6. Lancement de l'app / e2e        minutes
7. Relecture humaine               minutes
```

Règle : **l'agent doit avoir accès à tous les niveaux 1–5 avec une seule commande.**

## 3. Un point d'entrée, pas dix

Mauvais :

```
"Lance pytest, puis ruff, puis mypy, et vérifie aussi..."
```

Bon — une commande dans `AGENTS.md` :

```bash
make check      # ou : npm run check, ./scripts/check.sh
```

À l'intérieur :

```bash
ruff check . && mypy . && pytest -q
```

L'agent appelle `make check`, reçoit une sortie compacte, corrige. C'est moins cher
et plus fiable que de lui faire mémoriser cinq commandes.

## 4. TDD avec un agent

La boucle classique marche mieux si **un humain écrit le test** (ou si un humain le valide) :

```
1. Humain : spec + un test qui échoue
2. Agent : le code minimal pour faire passer le test
3. Humain : lit le diff
4. Agent : refactoring, les tests restent verts
```

Pourquoi un test écrit par un humain : le test est votre spec sous forme exécutable.
Si l'agent a inventé le test, il vérifie sa propre compréhension de la tâche.

Un compromis pour la vitesse : l'agent écrit les tests **à partir de votre liste de cas**, validée par vous.

## 5. Une erreur est une donnée

La bonne boucle de correction :

```
1. Lancer la vérification
2. Coller la sortie en entier (pas un résumé !)
3. "Corrige la cause, pas le symptôme. Explique en 2 lignes."
4. Répéter
```

Mauvais : « mon test échoue, regarde ». Bon : la sortie pytest complète avec la traceback.

## 6. Fichiers de référence (golden) et comparaison

Pour des tâches du type « générer une config/un rapport/du texte » — un fichier de référence :

```
tests/golden/expected.json
```

Le test compare le résultat avec la référence. Toute divergence est un diff visible.
C'est un oracle pour les tâches « imprécises ».

## 7. Ce qu'un oracle ne détecte pas

- Un test vérifie ce qui est écrit dedans. Un cas manquant — pas détecté.
- Un linter ne voit pas les erreurs de logique.
- Des tests verts ne veulent pas dire « comportement correct pour le métier ».

C'est pourquoi un oracle **complète** la review, il ne la remplace pas.

## 8. Vérifier des faits externes

Pour ce qui ne se vérifie pas dans le code (versions d'API, comportement d'une bibliothèque) :

- lancer un exemple minimal ;
- ouvrir la documentation officielle ;
- consulter le `--help` du vrai CLI.

Le modèle peut inventer un flag. Le `--help`, non.

---

## Checklist de compréhension

1. Pourquoi un oracle est-il important non seulement pour trouver des erreurs, mais aussi pour la qualité des réponses de l'agent ?
2. Pourquoi vaut-il mieux qu'un humain écrive le test pour une tâche ?
3. Qu'est-ce qui ne va pas dans la demande « mon test échoue, regarde » ?
4. Quelles classes d'erreurs ne sont pas détectées par les tests ?

---

# Pratique

Voir [practice.md](practice.md).
