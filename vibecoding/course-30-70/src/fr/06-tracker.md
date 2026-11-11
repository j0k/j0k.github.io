# Suivi de progression

Rempli à la main. Une marque `[x]` = le critère est rempli, pas « presque ».
Une case vide est une réponse honnête.

Date de début : ____________

Date de fin : ____________

---

## Module 1 — Comment fonctionne le vibe coding (150 min)

- [ ] L'agent lit les fichiers du projet (à vérifier depuis 1.1)
- [ ] Le dépôt est créé, le premier commit est fait avant que l'IA n'écrive du code
- [ ] `.gitignore` est correct, `git status` est propre
- [ ] L'utilitaire fonctionne, 4 critères d'acceptation vérifiés à la main
- [ ] `notes.md` contient au moins 3 observations sur les diffs
- Théorie min : 45 / réel : ____
- Pratique min : 105 / réel : ____
- Ce qui a été difficile : ______________________________________

---

## Module 2 — La spécification (150 min)

- [ ] La spec fait ≤15 lignes, 6 blocs, 4+ critères vérifiables
- [ ] Les branches `exp/bad` et `exp/good` sont créées, toutes deux vérifiées
- [ ] Le tableau de comparaison A/B est rempli
- [ ] 2 raisons précises de la différence sont nommées
- [ ] La spec est découpée en 5 tâches, chacune avec un critère d'acceptation
- [ ] Le critère est reformulé en condition `/goal` et exécuté (signal mesurable, périmètres, limite de tours)
- [ ] Le tableau d'exécution `/goal` est rempli : tours, terminé, fichiers en trop
- [ ] La rétro est écrite
- Théorie min : 45 / réel : ____
- Pratique min : 105 / réel : ____
- Ce qui a été difficile : ______________________________________

---

## Module 3 — La boucle de travail (150 min)

- [ ] 8 formulations sont écrites, les prédictions consignées
- [ ] La fonctionnalité est faite en 4 étapes, 4 commits
- [ ] Chaque diff est lu en 5 minutes (vérifié en pratique)
- [ ] 2+ signaux d'alerte trouvés, chaque danger expliqué
- [ ] Rétro : le nombre de retours en arrière et le temps perdu sont consignés
- Théorie min : 45 / réel : ____
- Pratique min : 105 / réel : ____
- Ce qui a été difficile : ______________________________________

---

## Module 4 — Le contexte (150 min)

- [ ] `AGENTS.md` est créé, l'agent répond à partir de lui dans un nouveau chat
- [ ] Les exécutions A (un chat) et B (trois chats) sont terminées
- [ ] Le tableau A/B est rempli avec les métriques
- [ ] Le modèle de message de réinitialisation est écrit et testé
- [ ] Les règles inutiles ont été retirées des instructions
- Théorie min : 45 / réel : ____
- Pratique min : 105 / réel : ____
- Ce qui a été difficile : ______________________________________

---

## Module 5 — Le débogage (150 min)

- [ ] Trois bugs sont injectés artificiellement, chacun avec un cas reproductible
- [ ] Trois corrections, chacune avec une hypothèse « si…, alors… » avant la modification
- [ ] Après chaque correction, les scénarios voisins ont été vérifiés
- [ ] Une formulation qui pousse l'agent à tester l'hypothèse a été trouvée
- [ ] Rétro : le nombre moyen de cycles jusqu'à la correction est consigné
- Théorie min : 45 / réel : ____
- Pratique min : 105 / réel : ____
- Ce qui a été difficile : ______________________________________

---

## Module 6 — Les tests (150 min)

- [ ] Le lanceur de tests est installé, le premier test est vert
- [ ] La commande de test est consignée dans `AGENTS.md`
- [ ] 5 tests TDD, pour chacun la raison de son échec avant implémentation est consignée
- [ ] Vérification par mutation : au moins un test a attrapé la casse
- [ ] Les tests inutiles ont été identifiés et réécrits
- Théorie min : 45 / réel : ____
- Pratique min : 105 / réel : ____
- Ce qui a été difficile : ______________________________________

---

## Module 7 — Données et API (150 min)

- [ ] `.env` est hors de git, `.env.example` est dans le dépôt
- [ ] Vérifié : la clé n'est pas dans l'historique git
- [ ] Une vraie réponse d'API est capturée avec curl et vit dans `fixtures/`
- [ ] 4 scénarios d'erreur traités et vérifiés
- [ ] Pas un seul champ d'API inventé dans le code
- [ ] 4 tests sur des données invalides, ils échouent quand la validation est retirée
- [ ] Rétro : sur quoi l'agent a menti et comment vous l'avez attrapé
- Théorie min : 45 / réel : ____
- Pratique min : 105 / réel : ____
- Ce qui a été difficile : ______________________________________

---

## Module 8 — Le déploiement (150 min)

- [ ] `main` est protégée, un push direct est refusé
- [ ] Une PR décrivant quoi/pourquoi/comment vérifier
- [ ] Le projet est déployé, le lien s'ouvre depuis un téléphone
- [ ] Les variables d'environnement sont définies dans le panneau d'hébergement
- [ ] La production est cassée exprès puis restaurée de deux façons, le temps mesuré
- [ ] La checklist de revue en 12 points est faite, 1 problème corrigé
- Théorie min : 45 / réel : ____
- Pratique min : 105 / réel : ____
- Ce qui a été difficile : ______________________________________

---

## Module 9 — Le projet final (180 min)

- [ ] Le projet est choisi, une spec de 10 lignes et 4 étapes sont dans le dépôt
- [ ] Le dépôt est sur GitHub, `AGENTS.md` et `.env.example` sont en place
- [ ] Le scénario principal passe en local de bout en bout
- [ ] 3+ scénarios d'erreur traités
- [ ] Le test du scénario principal est vert
- [ ] README : `git clone` → suivre les instructions → ça marche (vérifié dans un dossier propre)
- [ ] Le lien public est en ligne, vérifié depuis un téléphone
- [ ] Il n'y a aucun secret dans le dépôt
- [ ] Les limites connues sont consignées dans le README
- [ ] L'historique des commits se lit clairement : ce qui a été fait et pourquoi est évident
- Théorie min : 54 / réel : ____
- Pratique min : 126 / réel : ____
- Ce qui a été difficile : ______________________________________

---

## Calcul final du ratio

```
Théorie :     ____ min
Pratique :    ____ min
Total :       ____ min
Part théorie :  ____ %   (cible 30 %)
Part pratique : ____ %   (cible 70 %)
```

Si la théorie a dépassé 35 % — vous lisez au lieu de faire. Revenez à la
règle : un minuteur de 45 minutes, puis la pratique.

Si la pratique a dépassé 75 % — vérifiez si les critères d'acceptation ont été sautés
(« fait et non vérifié » n'est pas de la pratique, c'est de l'espoir).

---

## Réflexion finale

1. Quelle compétence s'est révélée la plus difficile ? ______________________
2. Quel prompt de `04-promptoteka.md` avez-vous réécrit pour vous ? ______
3. Que ne ferez-vous plus jamais avec un agent ? ________
4. Lien vers votre projet : ______________________
5. Une phrase qui explique ce qu'est le vibe coding pour vous maintenant :
   __________________________________________________________
