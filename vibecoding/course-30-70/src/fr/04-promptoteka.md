# Bibliothèque de prompts

Formulations prêtes à l'emploi. Copiez-les, mettez vos propres valeurs à la place de `<...>`.
Chaque prompt suit le schéma : contexte → tâche → contraintes → format → interdiction.

---

## 1. Pour démarrer

**1.1 Planifier sans modifier**
```
Lis <chemin/fichiers>. Tâche : <une phrase>.
Montre un plan de 4–6 étapes, chacune avec un résultat vérifiable.
Ne modifie pas les fichiers, n'écris pas de code. J'attends la validation du plan.
```

**1.2 Arriver dans le projet de quelqu'un d'autre**
```
Voici le projet <nom>. Lis le README, package.json/pyproject.toml et la structure des dossiers.
Réponds : stack, comment lancer, comment tester, les 3 fichiers les plus importants, 3 points obscurs.
Ne modifie pas les fichiers.
```

**1.3 Instructions du projet**
```
Crée AGENTS.md avec la stack, les commandes de lancement/test/lint, les règles de style et les
interdictions (ne pas modifier les tests, ne pas toucher au legacy, ne pas ajouter de dépendances sans
accord). Base-toi sur le contenu réel du projet, sans suppositions.
```

---

## 2. Cadrer la tâche

**2.1 Spec à partir d'une idée brute**
```
Idée : <telle quelle, en vrac>.
Transforme-la en spec : objectif, utilisateur et scénario, entrées/sorties avec exemples,
cas limites (vide, très volumineux, mauvais type), contraintes, 4 critères d'acceptation
(vérifiables oui/non), ce que nous ne faisons PAS.
N'écris pas de code. Maximum 15 lignes.
```

**2.2 Vérifier une spec : trouver les trous**
```
Voici la spec. Trouve 5 endroits où l'implémenteur devra deviner : formulations
ambiguës, cas limites manquants, critères invérifiables.
Seulement une liste de problèmes, ne la réécris pas.
```

**2.3 Décomposition**
```
Découpe la tâche en étapes de 15–20 minutes de travail de l'agent. Pour chacune : nom,
fichiers, critère d'acceptation, ce qu'il ne faut pas toucher. Pas plus de 6 étapes.
N'écris pas de code.
```

**2.4 Critère d'acceptation → `/goal`**
```
/goal <commande de test> se termine avec le code 0, <lint> est propre,
git diff --name-only ne montre que <dossier>/, ou arrête après <N> tours
```
Exigences : un signal mesurable, une preuve dans la sortie de la session, des frontières
par fichier, une limite de tours. Retirer le goal : `/goal clear`. Statut : `/goal` sans argument.

**2.5 Vérifier qu'un critère convient à `/goal`**
```
Voici un critère d'acceptation : <texte>. Vérifie-le sur trois points : (1) peut-on le vérifier
par une commande ou un code de retour, (2) l'agent verra-t-il la preuve dans sa propre sortie,
(3) quels fichiers faut-il explicitement interdire de modifier. Si le critère est invérifiable —
reformule-le en critère vérifiable et montre la différence.
```

---

## 3. Implémentation

**3.1 Modification minimale**
```
Dans <fichier>, fonction <nom> : <ce qu'il faut changer>.
Exigences : <comportement exact, frontières comprises>.
Uniquement ce fichier. Ne refactorise pas, ne change pas le formatage, n'ajoute pas de
dépendances. Après la modification, montre le diff et la sortie de la vérification.
```

**3.2 Nouveau module**
```
Crée <fichier> avec <fonction/classe> qui <comportement>.
Entrée : <type, exemple>. Sortie : <type, exemple>. Erreurs : <lesquelles et comment>.
Style comme dans <fichier voisin>. Aucune nouvelle dépendance. Ajoute 2 tests :
le scénario principal et <frontière>.
```

**3.3 Travailler à partir d'un test**
```
Test : <code du test>. Il échoue. Implémente le code minimal pour le faire passer.
Ne modifie pas le test. N'ajoute pas de fonctionnalité au-delà du test.
Montre la sortie du test après la modification.
```

**3.4 Reprendre après une pause**
```
État : <A, B> terminés, commit <hash>. Reste : <C>.
Tâche actuelle : uniquement <C>. Contexte : <fichiers>.
Ne remets pas en cause les décisions sur A et B.
```

---

## 4. Vérification et revue

**4.1 Auto-vérification avant de rendre**
```
Vérifie ta modification avec la liste et réponds point par point :
1) des contrôles/validations ont-ils été supprimés ; 2) y a-t-il un catch/except silencieux ; 3) y a-t-il
du hardcoding ou des constantes magiques ; 4) des fichiers hors tâche ont-ils été touchés ; 5) des
dépendances ont-elles été ajoutées ; 6) les tests ont-ils été modifiés.
Ne change pas le code, fais seulement un rapport.
```

**4.2 Expliquer la décision**
```
Explique en 5 lignes : pourquoi cette solution a été choisie, quelles alternatives
ont été envisagées, quels compromis ont été acceptés. Ne change pas le code.
```

**4.3 Vérifier les critères d'acceptation**
```
Voici les critères d'acceptation : <liste>. Pour chacun : rempli / non rempli / non vérifié,
et exactement comment le vérifier avec une commande. Ne change pas le code.
```

---

## 5. Débogage

**5.1 D'abord les faits, ensuite l'hypothèse**
```
Erreur : <symptôme>. Stack trace :
<colle>
Cite d'abord 3 lignes de la stack trace qui pointent vers notre code.
Ensuite, propose 3 hypothèses. Pour chacune — une commande de vérification.
Ne modifie rien avant que je choisisse.
```

**5.2 Contre la devinette**
```
Tu proposes une cause sans l'avoir vérifiée. Réponds : quelle donnée confirme cela ?
Quelle commande la confirmera ou l'infirmera ? Si la vérification est impossible — dis-le directement.
```

**5.3 Cas minimal**
```
Réduis le problème à un exemple minimal reproductible : 10–15 lignes,
sans notre projet, bibliothèque standard uniquement. Montre-le et le résultat attendu/obtenu.
```

**5.4 Impasse**
```
Deux tentatives n'ont pas fait avancer le problème. On arrête.
État : ce qui est certain, ce qui a été vérifié, ce qui reste non vérifié,
quelles 2 options existent. Ne modifie rien — je déciderai s'il faut revenir en arrière ou continuer.
```

**5.5 Version d'une bibliothèque**
```
Stack : <bibliothèque> version <X> (d'après package.json). Utilise uniquement l'API de cette version.
Si tu n'es pas sûr que l'API existe dans cette version — dis-le au lieu de deviner.
```

---

## 6. Tests

**6.1 Le test avant le code**
```
Écris un test pour le comportement : <description>. Le test doit échouer maintenant.
N'implémente pas la fonctionnalité. Montre qu'il échoue, et pour quelle raison.
```

**6.2 Vérifier la robustesse d'un test**
```
Casse l'implémentation pour que <comportement> cesse de fonctionner. Ne touche pas aux tests.
Dis quels tests ont échoué. Si aucun n'a échoué — les tests sont inutiles, dis-le directement.
```

**6.3 Ne pas modifier les tests**
```
Les tests sont la spécification. Si un test échoue, corrige l'implémentation. Modifier le test est interdit.
Si tu penses que l'attendu du test est faux — explique pourquoi et attends ma décision.
```

**6.4 Frontières**
```
Ajoute des tests de frontière pour <fonction> : entrée vide, un seul élément, maximum,
mauvais type, champ manquant. Un test par cas, des noms explicites.
```

---

## 7. Données et API

**7.1 À partir d'une réponse réelle**
```
Voici une vraie réponse d'API (raccourcie) :
<colle>
Utilise uniquement ces champs et cette structure. N'invente pas de champs qui n'existent pas.
Construis un client avec validation et gestion des 4xx/5xx/timeout/JSON invalide.
```

**7.2 Secrets**
```
Les clés uniquement via des variables d'environnement. Ajoute .env.example avec les noms et aucune
valeur. Vérifie que .env est dans .gitignore et n'est pas entré dans l'historique git.
Si la clé est déjà dans l'historique — dis que la clé doit être révoquée.
```

**7.3 Validation à la frontière**
```
Ajoute une validation des entrées à la frontière via <zod/pydantic> :
champs obligatoires, types, contraintes. Sur des données invalides — 400 avec un message
clair, pas de plantage. Plus 3 tests pour les mauvaises données.
```

---

## 8. Déploiement et hygiène

**8.1 Premier déploiement**
```
Prépare le projet pour un déploiement sur <Vercel/Netlify> : vérifie la commande de build et le dossier
de sortie, liste les variables d'environnement pour le panneau, indique la version du runtime.
N'invente rien sur les réglages — si tu n'es pas sûr, dis ce qu'il faut vérifier à la main.
```

**8.2 Checklist avant merge**
```
Parcours la PR <numéro> et réponds pour chaque point : contrôles non affaiblis, tests
non modifiés, pas de catch silencieux, pas de secrets, pas de chemins codés en dur, pas de nouvelles
dépendances sans justification, pas de concaténation SQL, pas de modifications hors tâche.
Format : point — ok / problème (fichier:ligne).
```

**8.3 Message de commit / description de PR**
```
Écris un message de commit au format type(scope): ce qui a été fait, jusqu'à 70 caractères.
Et une description de PR : ce qui change, pourquoi, comment vérifier (étapes), ce qui est hors périmètre,
quels compromis ont été acceptés. À partir du diff, sans suppositions.
```

---

## 9. Redémarrage de session

**9.1 Démarrage propre**
```
Nouvelle session. Contexte : <projet, stack, 3 fichiers importants>.
Problème : <symptôme>. Vérifié : <faits>. Non vérifié : <...>.
Stack trace : <...>.
Propose 3 hypothèses avec une commande de vérification. Ne modifie rien.
```

**9.2 Transmettre l'état**
```
Résumé de session : <...> terminé, commits <hash...>, reste <...>.
Questions ouvertes : <...>. Limitations connues : <...>.
Enregistre cela dans notes/session-<date>.md pour qu'on puisse continuer demain.
```

---

## 10. Antipatterns : comment ne pas faire

| À ne pas écrire | Pourquoi ça ne marche pas | À remplacer par |
|---|---|---|
| « corrige le bug » | donne carte blanche à la devinette | « cite la stack trace, propose 3 hypothèses » |
| « rends-le joli » | aucun critère | « fond blanc, un accent, system-ui, 2 couleurs maximum » |
| « optimise-le » | aucune métrique | « ramène à <200 ms, mesuré via <commande> » |
| « ajoute la gestion des erreurs » | `except` silencieux | « texte serveur sur 4xx, “réessaie plus tard” sur 5xx, un test pour chacun » |
| « refactorise » | tout le projet a été réécrit | « extrais X de Y vers Z, comportement inchangé, tests au vert » |
| « fais comme <service> » | une copie sans vos exigences | liste 3 éléments précis |
| « améliore le code » | périmètre non borné | un problème précis + un critère |
