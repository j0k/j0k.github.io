# Programme du cours

Format : 8 modules + projet final. 1380 minutes au total.
Théorie 414 min = **30.0%**. Pratique 966 min = **70.0%**.

## Tableau récapitulatif

| # | Module | Théorie | Pratique | Total | Cumul |
|---|---|---|---|---|---|
| 1 | Comment fonctionne vraiment le vibe coding | 45 | 105 | 150 | 150 |
| 2 | Spec et formulation de la tâche | 45 | 105 | 150 | 300 |
| 3 | La boucle : prompt → diff → vérification → commit | 45 | 105 | 150 | 450 |
| 4 | Contexte : comment l'agent voit votre projet | 45 | 105 | 150 | 600 |
| 5 | Débogage quand l'agent tourne en rond | 45 | 105 | 150 | 750 |
| 6 | Tests et protection contre les régressions | 45 | 105 | 150 | 900 |
| 7 | Données, API, environnement, sécurité | 45 | 105 | 150 | 1050 |
| 8 | Déploiement, hygiène git, travail en équipe | 45 | 105 | 150 | 1200 |
| 9 | Projet final : votre propre projet de zéro jusqu'à un lien | 54 | 126 | 180 | 1380 |
| | **Total** | **414 (30.0%)** | **966 (70.0%)** | **1380** | |

---

## Module 1. Comment fonctionne vraiment le vibe coding — 150 min

**Théorie (45 min)**
- Ce que fait vraiment un LLM : il prédit des tokens, il ne « comprend » pas le code.
- Pourquoi un contexte long dégrade la qualité, et ce que cela change dans votre quotidien.
- Trois modes : chat, autocomplétion, agent avec outils. Ce que seul l'agent peut faire.
- Les limites : l'agent écrit avec assurance du code passe-partout et ment tout aussi assurément sur une API qu'il n'a jamais vue.
- Votre rôle : pas programmeur, mais la personne qui formule la tâche et accepte le résultat.

**Pratique (105 min)**
- 20 min — environnement : agent, git, Node, Python, un dossier de projet vide.
- 20 min — premier dépôt, premier commit avant la moindre ligne de code, `.gitignore`.
- 45 min — premier exercice : un utilitaire console de 40–60 lignes à partir d'une spec fournie.
- 20 min — parcours du diff ligne par ligne : ce que vous avez accepté, ce que vous avez rejeté, et pourquoi.

**Résultat :** un dépôt avec un historique de 3 commits ou plus, et la compréhension de pourquoi vous avez besoin d'une spec.

---

## Module 2. Spec et formulation de la tâche — 150 min

**Théorie (45 min)**
- Une spec en 6 blocs : objectif, utilisateur, entrées/sorties, contraintes, critères d'acceptation, ce que nous ne faisons PAS.
- Pourquoi les critères d'acceptation sont le principal levier de qualité : l'agent les vérifie au lieu de deviner.
- Les formulations qui cassent le résultat : « fais quelque chose de beau », « comme Airbnb », « optimise ».
- Décomposition : une tâche que l'agent traite en 15 minutes contre une autre qui lui prend 3 heures.
- Modèle de spec et anti-modèle côte à côte, sur le même exemple.
- `/goal` — l'objectif comme condition d'achèvement : l'agent décide lui-même s'il a terminé, à partir d'un signal vérifiable.

**Pratique (105 min)**
- 30 min — rédiger la spec de votre propre petit projet (pas le projet final), 10 lignes.
- 30 min — deux tentatives d'implémentation : avec une mauvaise formulation et avec une spec ; comparez les diffs.
- 20 min — découper la spec en 5 tâches, chacune avec ses propres critères.
- 15 min — réécrire un critère d'acceptation sous forme de condition pour `/goal` et l'exécuter : tests au vert, diff uniquement dans votre dossier, limite d'étapes.
- 10 min — rétro : ce qui était superflu dans la spec, ce qu'il a fallu préciser en cours de route.

**Résultat :** une spec qu'une autre personne (ou un agent) peut utiliser pour reproduire le résultat sans questions, et la capacité de transformer ses critères en condition pour `/goal`.

---

## Module 3. La boucle : prompt → diff → vérification → commit — 150 min

**Théorie (45 min)**
- Anatomie d'une bonne requête : contexte, tâche, contraintes, format de réponse, ce qu'il ne faut pas faire.
- Lire un diff : 6 signaux d'alerte (vérifications supprimées, constantes « magiques », `try/except` silencieux, fichiers appartenant à d'autres réécrits, nouvelles dépendances, tests modifiés).
- Taille du pas : pourquoi un pas de plus de 200 lignes de diff part presque toujours à la poubelle.
- Quand demander à l'agent d'expliquer, et quand simplement refaire.
- Le commit comme point de retour arrière ; le message de commit comme documentation.

**Pratique (105 min)**
- 25 min — 8 mini-exercices de 3 minutes chacun : formuler une requête pour une tâche donnée.
- 40 min — une fonctionnalité dans un projet existant en exactement 4 étapes, avec un commit après chacune.
- 25 min — un diff volontairement bancal de l'agent : trouver tous les signaux d'alerte à l'aide de la checklist.
- 15 min — rétro : combien de fois vous avez fait marche arrière et à quelle étape vous avez perdu du temps.

**Résultat :** la capacité de mener une fonctionnalité par petits pas vérifiables, avec retour arrière.

---

## Module 4. Contexte : comment l'agent voit votre projet — 150 min

**Théorie (45 min)**
- Ce qui entre dans le contexte : fichiers ouverts, instructions du projet, historique du chat, recherche automatique dans le dépôt.
- Le fichier d'instructions (`CLAUDE.md` / `AGENTS.md` / `.cursorrules`) : ce qu'il faut y écrire pour ne pas vous répéter à chaque fois.
- Pourquoi l'agent ne connaît pas votre stack tant que vous ne la lui dites pas ; pourquoi il « oublie » après 40 messages.
- Stratégies : un nouveau chat pour une nouvelle tâche, des références aux fichiers plutôt que des re-récits, « montre-moi le plan avant de modifier ».
- Contexte pourri = code pourri : comment les gros fichiers et les logs ruinent une session.

**Pratique (105 min)**
- 30 min — rédiger le fichier d'instructions du projet : stack, commandes de lancement, règles de style, interdictions.
- 45 min — trois tâches d'affilée dans un seul chat, puis les trois mêmes dans des chats séparés ; mesurez la différence.
- 20 min — quand l'agent commence à halluciner : techniques de redémarrage avec un contexte minimal.
- 10 min — rétro : quelles règles du fichier d'instructions ont fait gagner le plus de temps.

**Résultat :** un projet avec un fichier d'instructions que l'agent suit sans rappels.

---

## Module 5. Débogage quand l'agent tourne en rond — 150 min

**Théorie (45 min)**
- Trois cercles de l'enfer : l'agent devine la cause, l'agent « corrige » le symptôme, l'agent casse quelque chose à côté.
- La règle du fait unique : d'abord un cas minimal reproductible, ensuite la correction.
- Comment obliger l'agent à regarder les logs et les stack traces au lieu de fantasmer.
- La technique « explique ce que tu as vérifié » et celle du « propose 3 hypothèses avec une vérification ».
- Quand revenir en arrière et réécrire de zéro coûte moins cher que corriger.

**Pratique (105 min)**
- 20 min — un projet cassé avec 3 bugs connus ; reproduire chacun avec un cas minimal.
- 50 min — corriger les trois, en notant pour chacun : hypothèse → vérification → correction → commit.
- 25 min — donner à l'agent une hypothèse volontairement fausse : voyez s'il argumente, et apprenez à provoquer la discussion.
- 10 min — rétro : combien de cycles avant la correction, et ce qui les aurait divisés par deux.

**Résultat :** trois bugs fermés avec des commits et un algorithme de débogage qui fonctionne.

---

## Module 6. Tests et protection contre les régressions — 150 min

**Théorie (45 min)**
- Le test comme critère d'acceptation sous forme exécutable : une spec que les mots ne peuvent pas tromper.
- La pyramide pour le vibe coding : beaucoup de tests unitaires sur la logique, peu d'e2e, presque pas de snapshots d'interface.
- Le test d'abord, le code ensuite : pourquoi c'est plus facile pour l'agent que l'inverse.
- L'interdiction pour l'agent de modifier les tests sans votre accord — comment la formuler.
- La couverture comme métrique trompeuse : 100% des lignes et zéro vérification du sens.

**Pratique (105 min)**
- 20 min — installer un runner de tests (vitest/pytest), premier test pour une fonction existante.
- 45 min — un cycle TDD sur une nouvelle fonctionnalité : 5 tests, chacun échouant avant l'implémentation.
- 30 min — demander à l'agent de casser la fonctionnalité et vérifier que les tests l'ont détecté.
- 10 min — rétro : quels tests se sont révélés inutiles et pourquoi.

**Résultat :** un projet avec des tests qui échouent sur une régression, et l'habitude du « test avant le code ».

---

## Module 7. Données, API, environnement, sécurité — 150 min

**Théorie (45 min)**
- Secrets : `.env`, `.gitignore`, pourquoi une clé dans l'historique git = une clé compromise.
- L'agent et les API externes : méthodes hallucinées, paramètres obsolètes, champs de réponse inventés.
- Vérifier une API à la main : documentation, curl, une vraie réponse avant la moindre ligne de code.
- Valider les données d'entrée à la frontière ; les types comme protection à bas coût.
- Ce qu'il ne faut jamais donner à l'agent : bases de données de production, données privées, tokens d'autres personnes.

**Pratique (105 min)**
- 20 min — `.env`, `.env.example`, lecture de la config, vérification que la clé n'est pas arrivée dans git.
- 50 min — intégration avec une API publique : d'abord curl, puis le client, puis la gestion des erreurs.
- 25 min — validation des réponses et des données d'entrée, tests sur des données malformées.
- 10 min — rétro : sur quoi l'agent a menti et comment vous l'avez démasqué.

**Résultat :** une intégration API qui fonctionne, des secrets hors du dépôt, des erreurs gérées.

---

## Module 8. Déploiement, hygiène git, travail en équipe — 150 min

**Théorie (45 min)**
- Branches et petites PR : pourquoi un agent sur une branche est plus sûr qu'un agent sur main.
- Build et environnement de production : pourquoi « ça marche chez moi » ne veut pas dire « c'est déployé ».
- Variables d'environnement sur l'hébergeur, logs, retour au déploiement précédent.
- Relire du code IA : ce qu'un humain doit vérifier en premier.
- Comment écrire les messages de commit et les descriptions de PR pour ne pas deviner un mois plus tard.

**Pratique (105 min)**
- 15 min — branche, PR, protection de main contre les push directs.
- 40 min — déployer le projet sur Vercel/Netlify avec des variables d'environnement.
- 35 min — casser volontairement la production et revenir en arrière : d'abord par un redéploiement, puis par un revert.
- 15 min — une checklist de relecture de code IA en 12 points, appliquée à votre propre PR.

**Résultat :** un lien public vers un projet qui fonctionne et la capacité de revenir en arrière en 2 minutes.

---

## Module 9. Projet final — 180 min

**Théorie, démonstration guidée (54 min)**
- Choisir un projet selon le critère « valeur / incertitude », pas selon « ce qui en jette ».
- Le plan de construction : 4 étapes, chacune se terminant par quelque chose d'exécutable.
- Ce qu'il faut retirer du MVP pour tenir dans 126 minutes de pratique.
- La checklist de livraison : ça tourne, le lien est en ligne, README, tests, aucun secret divulgué.

**Pratique (126 min)**
- 16 min — une spec de 10 lignes + une liste de 4 étapes + le dépôt.
- 60 min — le cœur : le scénario principal fonctionne en local, 4 commits.
- 30 min — les finitions : gestion des erreurs, un test pour le scénario principal, README.
- 20 min — déployer, vérifier le lien depuis votre téléphone, commit final.

**Résultat :** un projet déployé et une checklist de livraison complétée.

---

## Comment garder le ratio 30/70 en pratique

- Mettez un minuteur pour la théorie. 45 minutes écoulées — fermez-la et passez au travail.
- Si vous bloquez en pratique plus de 20 minutes, ce n'est pas une raison pour lire plus de théorie,
  c'est une raison pour réduire le pas et revenir à une spec courte.
- Une pratique sautée ne se reporte pas sur le module suivant : sans elle, le module suivant
  n'a aucun sens, car ils s'appuient tous sur la compétence précédente.
