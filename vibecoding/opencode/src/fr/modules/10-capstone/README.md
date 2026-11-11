# Module 10 — Capstone

**Durée :** 10 heures · **Livrable :** `labs/10-capstone/`

---

## Objectif

Parcourez le cycle complet sur une tâche réelle : **spec → plan → étapes → tests → revue → merge → rétro**.

C'est le seul module qui évalue l'ensemble du processus plutôt qu'une compétence isolée.

---

## Choix de la tâche

Une tâche adaptée est une tâche qui :

- touche 3 à 10 fichiers ;
- a un résultat vérifiable (tests/exécution) ;
- n'est pas critique pour la production (vous travaillez dans une branche) ;
- exige au moins une décision d'architecture.

Exemples :

- ajouter l'export de rapports en CSV/JSON avec un flag CLI ;
- remplacer un client HTTP fait maison par une bibliothèque ;
- ajouter un cache pour un calcul coûteux ;
- sortir un module dans un package séparé avec des tests ;
- ajouter un test de bout en bout sur le parcours d'inscription.

Non adapté : « tout réécrire », « faire du propre », « ajouter de l'IA ».

---

## Étapes et critères

### 1. Spec (1 h)

Utilisez le modèle `templates/spec.md`. Obligatoire :

- le contexte et les limites ;
- 5 exigences vérifiables ou plus ;
- des critères d'acceptation sous forme de commandes ;
- un bloc « hors périmètre ».

**Critère :** un camarade peut dire d'après la spec exactement ce qui sera fait.

### 2. Plan (1 h)

- découpage en 4 à 8 étapes ;
- pour chacune : fichiers, critère de vérification, risque ;
- le plan est validé **avant** le code.

**Critère :** chaque étape touche ≤ 2 fichiers, chacune se termine par une vérification.

### 3. Implémentation (4 h)

- étape par étape, un commit après chacune ;
- `./scripts/check.sh` est vert à chaque étape ;
- pas plus de 2 itérations par étape (sinon, revenez en arrière et repensez).

**Critère :** `git log` montre des étapes qui ont du sens ; le dépôt est vert.

### 4. Revue (2 h)

- votre propre checklist du module 08 ;
- un second avis d'un autre modèle ;
- chaque remarque est soit corrigée, soit rejetée avec un argument.

**Critère :** une checklist remplie + une liste des remarques et des décisions.

### 5. Merge (1 h)

- une PR avec une description : quoi, pourquoi, comment cela a été vérifié ;
- la CI est verte ;
- le diff est lu en entier.

**Critère :** la PR est mergée (ou prête à l'être), sans `skip` ni `TODO` dans le nouveau code.

### 6. Rétro (1 h)

Utilisez le modèle `templates/retro.md` :

```markdown
## Métriques
- Temps : prévu / réel
- Coût en tokens :
- Nombre d'itérations par étape :
- Problèmes trouvés en revue :
- Bugs détectés après le merge :

## Ce qui a marché
## Ce que je ferais autrement
## La règle que j'emporte avec moi
```

---

## Table de notation finale

| Étape | Poids | Ce qui est vérifié |
| --- | --- | --- |
| Spec | 15 % | vérifiabilité, limites |
| Plan | 10 % | décomposition |
| Implémentation | 30 % | étapes vertes, taille du diff |
| Revue | 20 % | vrais problèmes trouvés |
| Merge | 10 % | propreté, CI |
| Rétro | 15 % | honnêteté et conclusions |

Seuil de réussite — 70 %.

---

## Soutenance

10 minutes : montrez la spec, le plan, `git log`, trouvez l'endroit du diff où vous avez rejeté
la suggestion de l'agent et pourquoi. **Ce dernier point est une question obligatoire.**
