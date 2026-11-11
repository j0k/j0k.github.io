# Théorie du cours

Cela représente 414 minutes de lecture — 30 % du cours. Chaque bloc est conçu pour 45 minutes.
Lisez un bloc avant la pratique du module correspondant. Ne brûlez pas les étapes.

---

## Module 1. Comment le vibe coding fonctionne réellement

### 1.1 Le modèle ne comprend pas votre code

Un LLM prédit le token suivant. Quand il écrit une fonction, il poursuit le
texte le plus probable qui ressemble à du code. Trois faits pratiques en découlent :

- **Il écrit le code standard mieux que vous.** CRUD, parsing, plomberie de client HTTP,
  regex, configs — ici la probabilité d'une « suite correcte » est élevée,
  parce que les données d'entraînement contiennent des millions d'exemples de ce genre.
- **Il écrit mal le code rare et nouveau.** Une architecture non standard, votre
  framework interne, une API d'il y a trois ans, une bibliothèque de niche — il
  inventera avec assurance, car un ton assuré est statistiquement plus probable qu'un ton prudent.
- **Il ne « se souvient » pas de votre projet.** Il ne voit que ce qui est entré dans le contexte :
  les fichiers ouverts, vos messages, le fichier d'instructions, les résultats de recherche dans le dépôt.

D'où la conclusion principale du cours : **vous ne gérez pas le code, vous gérez le contexte et les critères.**
Plus vous décrivez précisément ce qui doit en sortir, moins le modèle a à deviner.

### 1.2 Pourquoi un contexte long ruine le résultat

Le modèle dispose d'une fenêtre de contexte, et elle n'est pas élastique. Quand 40 messages, trois
tentatives de correction ratées et un log de 2000 lignes s'y accumulent, la qualité des
réponses chute : le modèle commence à s'accrocher à de vieilles hypothèses erronées et à
répéter des solutions qui ont échoué.

Conséquences pratiques :
- Nouvelle tâche — nouveau chat. Toujours, sauf si la tâche est la continuation de la tâche en cours.
- Ne collez pas des fichiers entiers si vous pouvez indiquer un chemin et demander de les lire.
- Ne gardez pas de longs logs dans le chat : trouvez d'abord vous-même les 5 lignes clés.
- Si deux tentatives ont échoué, redémarrer la session avec une description propre du problème
  marche mieux qu'une cinquième tentative de « réparer ».

### 1.3 Trois modes de travail avec l'IA

| Mode | Ce qu'il fait | Où il est utile | Limite |
|---|---|---|---|
| Chat | Répond par du texte | Explications, plans, revues, apprentissage | Ne voit pas le projet, le code est copié à la main |
| Autocomplétion | Complète une ligne/un bloc | Saisie manuelle de code connu | Vous l'écrivez toujours vous-même |
| Agent | Lit les fichiers, modifie, exécute des commandes | Tout le cours | Peut casser beaucoup de fichiers d'un coup |

Le cours repose sur l'**agent** (Claude Code, Cursor, Codex CLI, Windsurf). La différence est
fondamentale : l'agent ouvre lui-même les fichiers, applique lui-même les patchs, lance
lui-même les tests. Votre travail se déplace donc — vous ne tapez pas, vous posez la tâche,
relisez le diff et décidez d'accepter ou d'annuler.

### 1.4 Où l'agent ment avec une assurance particulière

Apprenez cette liste par cœur — elle vous fera gagner des journées :

1. **Les noms des méthodes et paramètres d'API.** Il invente `client.fetchData()` là où
   c'est en réalité `client.get_data()`. Remède : la doc ou un curl avant le code.
2. **Les versions de bibliothèques.** Il propose une syntaxe d'une version ancienne ou inexistante.
   Remède : `package.json` / `pyproject.toml` dans le contexte + « n'utilise que les
   API disponibles dans cette version ».
3. **Les causes des erreurs.** Il nomme une cause avec assurance sans regarder le log. Remède :
   « lis d'abord la stack trace, l'hypothèse ensuite ».
4. **« C'est fait, tout fonctionne. »** Il n'a rien exécuté. Remède : demandez toujours la
   sortie d'une commande, pas une affirmation sur le résultat.
5. **La modification silencieuse des fichiers des autres.** En passant, il a « amélioré » trois fichiers
   que vous n'aviez pas demandés. Remède : lisez le diff, pas seulement le message.

### 1.5 Votre rôle dans le processus

Le vibe coding n'annule pas l'ingénierie, il la déplace à un autre niveau :

- **Avant :** concevoir l'architecture → écrire le code → déboguer → tester.
- **Maintenant :** décrire ce qui doit en sortir → découper en étapes → accepter ou
  rejeter les diffs → vérifier le résultat.

Les compétences qui déterminent réellement la qualité : formuler la tâche, lire un diff,
tester des hypothèses, la discipline du rollback. Programmer au sens de « se souvenir de la syntaxe »
n'est presque plus nécessaire. Comprendre **ce qui** doit se passer est absolument indispensable.

### 1.6 Résumé du module

- Le modèle prédit du texte ; la précision dépend de votre description.
- Le contexte est une ressource rare ; il faut le nettoyer.
- L'agent est l'outil principal ; il fait beaucoup et peut casser beaucoup.
- Votre travail : spec, diff, vérification, commit. Le reste est un détail.

---

## Module 2. La spec et la formulation de la tâche

### 2.1 Pourquoi la spec décide plus que le modèle

Le même modèle sur la même tâche produit des résultats qui varient du simple au quintuple, selon
la formulation. La raison est simple : sans critères d'acceptation, le modèle
optimise pour « ça ressemble à une réponse correcte », et avec des critères — pour un comportement
vérifiable précis.

Mauvais : « écris un script pour traiter un CSV ».
Bon : « le script lit `data.csv` avec les colonnes id,date,amount ; supprime les lignes
dont amount ≤ 0 ; écrit dans `out.csv` le total par mois, trié par ordre décroissant ;
si la colonne amount est absente, il se termine avec le code 2 et un message sur stderr ».

L'agent peut vérifier lui-même la seconde option. La première — seulement vous, avec vos yeux.

### 2.2 Six blocs d'une spec

```
1. OBJECTIF : ce qui devient possible une fois la tâche terminée (1-2 lignes)
2. UTILISATEUR : qui l'utilise et dans quelle situation
3. ENTRÉES/SORTIES : formats, exemples de données, cas limites
4. CONTRAINTES : stack, versions, pas de nouvelles dépendances, ne pas toucher les fichiers X
5. CRITÈRES D'ACCEPTATION : une liste d'affirmations vérifiables, chacune oui/non
6. CE QUE NOUS NE FAISONS PAS : des frontières explicites pour que l'agent n'élargisse pas le périmètre
```

Le bloc 6 est sous-estimé, et c'est celui qui fait le plus gagner : sans lui, l'agent ajoutera « pour faire bonne mesure »
l'authentification, du cache et Docker, parce que « c'est comme ça qu'on fait ».

### 2.3 Les critères d'acceptation : le levier principal

Un critère d'acceptation est une affirmation qui peut être vérifiée par une commande ou par observation.

- Pas un critère : « le code doit être propre », « l'interface doit être pratique ».
- Un critère : « avec une liste vide, le texte “Nothing here yet” s'affiche »,
  « `npm test` passe », « une requête avec un email invalide renvoie 400 ».

Règle : si un critère ne peut pas être vérifié en 30 secondes, il est mal formulé.
De bons critères se transforment automatiquement en tests — c'est le pont vers le module 6.

### 2.4 Les formulations qui cassent le résultat

| Formulation | Ce qui se passe | Comment la reformuler |
|---|---|---|
| « fais joli » | un design aléatoire, puis 10 itérations | « minimaliste, fond blanc, une couleur d'accent, police system-ui » |
| « comme dans Notion » | une copie du produit de quelqu'un d'autre sans vos exigences | listez les 3 éléments précis dont vous avez besoin |
| « optimise » | des micro-modifications sans mesures | « fais passer le temps de réponse de /api/search de 800 ms à <200 ms, mesuré via X » |
| « ajoute la gestion des erreurs » | un `except: pass` silencieux | « sur 4xx affiche le texte d'erreur du serveur, sur 5xx — “try again later”, couvre les deux cas par un test » |
| « refactorise » | tout le projet réécrit | « sors la validation de la route dans un module séparé, le comportement ne change pas, les tests passent » |

### 2.5 La décomposition : la taille des étapes

Repère pour la taille d'une tâche confiée à l'agent :

- **15 minutes** — une fonction, un composant, un endpoint. Un diff de 30–80 lignes.
  Une telle étape passe presque toujours du premier coup.
- **1 heure** — une fonctionnalité dans son ensemble : modèle de données + endpoint + UI minimale.
  Il faut la découper en 3–4 étapes, sinon le diff fait 400+ lignes et vous ne le relirez pas.
- **3 heures et plus** — « construis une appli ». Des détritus presque garantis : l'agent devine
  l'architecture, vous ne pouvez pas relire le diff, le rollback est impossible.

Règle : **une étape doit être telle que le diff se lit en 5 minutes.** S'il ne se lit
pas — coupez.

### 2.6 Modèle de spec (copiez-le)

```markdown
## Objectif
Après la tâche, l'utilisateur peut <action> afin de <valeur>.

## Utilisateur et scénario
Qui : <rôle>. Quand : <situation>. Fait : <étapes>.

## Entrées/sorties
Entrée : <format, exemple>. Sortie : <format, exemple>.
Cas limites : <vide>, <très nombreux>, <mauvais type>, <réseau indisponible>.

## Contraintes
Stack : <...>. Ne pas ajouter de dépendances : <...>. Ne pas modifier les fichiers : <...>.

## Critères d'acceptation
- [ ] <affirmation vérifiable 1>
- [ ] <affirmation vérifiable 2>
- [ ] <affirmation vérifiable 3>

## Ce que nous ne faisons pas
- <exclusion explicite 1>
- <exclusion explicite 2>
```

### 2.7 `/goal` : l'objectif comme condition de complétion

Une requête normale se termine quand le modèle décide qu'il a fini. `/goal` change
cela : vous déclarez une condition vérifiable, et l'agent continue de travailler tour après tour jusqu'à ce que
la condition soit remplie. Le juge n'est pas celui qui a fait le travail, mais un modèle rapide séparé —
il regarde ce que l'agent a déjà montré dans la session : la sortie des tests, les logs de build,
la liste des fichiers modifiés.

```
/goal pytest tests/auth exits with code 0, ruff check src/auth is clean,
git diff --name-only shows only src/auth/, or stop after 15 turns
```

Trois parties sans lesquelles la condition ne fonctionne pas :

1. **Un signal de fin mesurable.** Code de sortie, file vide, lint au vert.
   Pas « rends-le plus propre » ni « pour que ce soit pratique » — il n'y a rien pour les vérifier.
2. **Une preuve dans la session.** La condition doit être vérifiable à partir de ce que l'agent
   peut montrer directement dans le chat. Si la vérification exige votre accès à la prod —
   `/goal` ne convient pas.
3. **Des frontières.** Ce qui ne peut pas être modifié (`only src/auth/`) et une limite de tours
   (`or stop after 15 turns`). Sans limite, une exécution autonome brûle des tokens.

| | Requête normale | `/goal` |
|---|---|---|
| Qui décide que c'est « fini » | le même modèle, en un tour | un évaluateur séparé après chaque tour |
| Tours | un seul, jusqu'à ce que vous la réécriviez | autant que nécessaire jusqu'à ce que la condition soit remplie |
| Où c'est utile | modifications, reconnaissance, questions | migrations, « jusqu'à ce que les tests soient verts », épuisement du backlog |
| Où ça fait mal | — | qualité subjective, reconnaissance, tâches sans frontières |

Conséquences pratiques :

- **`/goal` ne remplace pas la spec, il s'appuie dessus.** Le critère d'acceptation du bloc 5
  est quasiment une condition toute prête. Si un critère ne peut pas être vérifié par une commande, `/goal`
  ne le sauvera pas — il en fera une boucle infinie.
- **Un seul objectif actif par session.** Un nouvel objectif remplace l'ancien et démarre immédiatement un tour.
  Un clic sur le statut affiche la condition, le temps, le nombre de tours, les tokens et la raison
  de la dernière évaluation.
- **Arrêter et effacer :** `clear` (synonymes `stop`, `off`, `reset`, `cancel`).
  `/clear` efface aussi l'objectif actif.
- **Nécessite un espace de travail approuvé.** Si les hooks sont désactivés
  (`disableAllHooks`), la commande ne fonctionne pas.
- **Coûteux non pas en tokens mais en tours.** L'évaluation tourne sur un modèle bon marché,
  mais les tours eux-mêmes tournent sur le modèle complet. Une limite dans la condition est obligatoire.
- **L'autonomie n'est pas toujours nécessaire.** La valeur de `/goal` tient à l'absence de
  « on continue ? » après chaque étape, pas au fait de sauter la revue. Vous relisez toujours le diff
  vous-même, et il existe un rollback pour une tentative autonome ratée.

`/goal` existe dans Claude Code et OpenAI Codex CLI. Il n'existe pas dans Cursor et Windsurf :
là, le rôle de l'objectif est joué par le plan plus des critères explicites dans la requête.

### 2.8 Résumé du module

- Une spec, c'est 10 lignes, six blocs, des critères d'acceptation obligatoires.
- Un critère d'acceptation = un oui/non vérifiable, sinon c'est un souhait.
- Le bloc « ce que nous ne faisons pas » limite la dérive arbitraire du périmètre.
- Une étape dont le diff ne se lit pas en 5 minutes est trop grosse.
- `/goal` est le même critère d'acceptation, mais comme condition d'arrêt pour l'agent.

---

## Module 3. Le cycle : prompt → diff → vérification → commit

### 3.1 Anatomie d'une requête qui fonctionne

Cinq éléments, dans cet ordre :

1. **Contexte** : où nous en sommes, ce qui existe déjà, quels fichiers comptent. Des liens vers des chemins, pas un récit.
2. **Tâche** : une seule action à l'impératif. Pas deux, pas trois.
3. **Contraintes** : ce qui ne peut pas être modifié, quelles API utiliser, quel style.
4. **Format du résultat** : « modifie directement les fichiers », « montre-moi d'abord le plan »,
   « montre seulement le diff », « ajoute un test ».
5. **Une interdiction d'improviser** : « ne refactorise rien en dehors de cette fonction ».

Exemple :
> Dans `src/api/orders.ts`, l'endpoint `GET /orders` renvoie toutes les commandes sans
> filtre. Ajoute un paramètre de requête `status` (valeurs `new`, `paid`, `cancelled`),
> renvoie tout par défaut. Valeur invalide → 400 avec le texte
> `unknown status`. Uniquement ce fichier. Ajoute un test pour le 400. Ne refactorise rien.

### 3.2 Lire le diff : six signaux d'alarme

Vérifiez chaque diff par rapport à cette liste — 80 % des problèmes se repèrent ici :

1. **Contrôles supprimés ou affaiblis.** Un `if (!user) return 401` supprimé,
   une validation remplacée par « essayons et voyons ». La catégorie la plus dangereuse.
2. **`try/except` autour de tout.** Une gestion silencieuse qui masque l'erreur et
   transforme un bug en « comportement étrange ».
3. **Constantes magiques et valeurs codées en dur.** `if (id === 42)`, des chemins locaux
   `C:\Users\...`, une clé en dur.
4. **Modifications de fichiers hors de la tâche.** L'agent a « amélioré au passage » la config,
   les dépendances, les styles. Chacune de ces modifications est un risque non planifié.
5. **Nouvelles dépendances.** Une nouvelle bibliothèque pour une seule fonction est presque toujours un
   mauvais échange : poids, vulnérabilités, maintenance.
6. **Tests modifiés.** Le test a été ajusté au code, et non l'inverse. C'est la même chose
   que supprimer le contrôle.

En plus : un fichier réécrit entièrement là où une ligne suffisait.
Un diff de 500 lignes au lieu de 5 est le signal que l'étape était trop grosse.

### 3.3 Comment vérifier : trois niveaux

- **Niveau 1 — ça tourne.** Le code démarre, la commande s'exécute sans erreur.
  Le minimum obligatoire.
- **Niveau 2 — le comportement.** Vous vérifiez manuellement exactement les critères d'acceptation
  que vous avez écrits dans la spec. Pas « ça a l'air de marcher », mais point par point.
- **Niveau 3 — le test.** Le critère a été transformé en test automatisé. C'est l'objectif du module 6.

Si l'agent dit « c'est fait » et que vous n'avez pas passé le niveau 1, la réponse n'est pas acceptée.
Demandez la sortie d'une commande, pas une affirmation.

### 3.4 Quand demander une explication et quand refaire

- **Demander une explication** : le diff semble raisonnable, mais on ne comprend pas pourquoi cette
  solution a été choisie. Utile, peu coûteux, révèle souvent une hypothèse erronée.
- **Demander un plan** : la tâche est plus grosse qu'une étape. « Montre-moi un plan en 4 étapes, ne fais
  aucune modification » — vous évite un rollback.
- **Refaire immédiatement** : un signal d'alarme de la liste 3.2, un diff hors de la tâche, un « c'est fait »
  sans exécution, une deuxième tentative de correction au même endroit. Les explications n'aideront pas ici.

Règle des deux tentatives : si la deuxième tentative de correction au même endroit a aussi échoué —
annulez et reformulez la tâche. À la troisième tentative, l'agent consolide un modèle erroné
du problème.

### 3.5 Le commit comme outil, pas comme formalité

- Commitez après chaque étape acceptée. Un point de rollback coûte 5 secondes, le débogage
  d'un mélange cassé coûte une heure.
- Le message de commit est écrit par **vous**, pas par l'agent : `feat(orders): filter by status,
  test for 400` — dans un mois, vous comprendrez ce qui s'est passé et pourquoi.
- Ne commitez pas : secrets, `node_modules`, `.env`, configs locales — ils vont dans
  `.gitignore` avant le premier `git add`.
- Un commit = une raison de changement. « Fonctionnalité + reformatage de tout le projet »
  dans un seul commit, c'est un conflit garanti et un diff illisible.

### 3.6 Résumé du module

- Une requête qui fonctionne : contexte, tâche, contraintes, format, interdiction des extras.
- Le diff se lit à l'aune des six signaux d'alarme ; les tests et les contrôles sont intouchables.
- Vérification : exécution → comportement par rapport aux critères → test automatisé.
- Deux échecs d'affilée = rollback, pas une troisième tentative.
- Commit après chaque étape acceptée, c'est vous qui écrivez le message.

---

## Module 4. Le contexte : comment l'agent voit votre projet

### 4.1 Ce qui entre dans le contexte

L'agent travaille avec ce qui lui est accessible dans la session :

- vos messages et ses réponses précédentes ;
- les fichiers qu'il a lus ou qui sont ouverts ;
- le fichier d'instructions du projet (lu automatiquement) ;
- les résultats de ses propres commandes : sortie de tests, logs, erreurs ;
- la recherche automatique dans le dépôt, si vous avez donné un chemin au lieu de texte.

Ce qui **n'est pas** dans le contexte : votre tête. La stack, les conventions, « chez nous on ne fait pas comme ça »,
la raison pour laquelle `legacy/` ne peut pas être touché — tout cela doit être écrit explicitement.

### 4.2 Le fichier d'instructions du projet

Un fichier à la racine du dépôt. Les noms dépendent de l'outil : `CLAUDE.md`,
`AGENTS.md`, `.cursorrules`, `.github/copilot-instructions.md`. Contenu :

```markdown
# Projet : <nom>
Objectif : <une ligne>

## Stack
Node 20, TypeScript strict, Fastify, PostgreSQL 16, vitest.
Python 3.12 pour les scripts dans /tools.

## Commandes
- run: npm run dev
- tests: npm test
- lint: npm run lint (obligatoire avant commit)

## Règles
- TypeScript strict : pas de any sans un commentaire qui le justifie
- Erreurs d'API : 4xx avec un texte, 5xx sans détails internes
- Nouvelles dépendances uniquement avec accord : proposer d'abord, installer ensuite

## Interdictions
- ne pas modifier /legacy/** sans instruction explicite
- ne pas modifier les tests pour les faire passer
- ne pas toucher .env, les migrations ni les configs de CI
```

Ce fichier est le meilleur retour sur investissement d'une minute dans tout le cours. Écrivez-le
une fois — chaque requête suivante est un tiers plus courte.

### 4.3 Pourquoi l'agent « oublie » et « devient plus bête »

La qualité chute non pas à cause d'une « fatigue du modèle » mais à cause du contexte :

- **40+ messages** : les anciennes hypothèses erronées rivalisent avec les faits nouveaux.
- **De gros fichiers et des logs entiers** : l'utile se noie, le modèle s'accroche à quelque chose d'aléatoire.
- **Mélange de tâches** : des modifications pour la fonctionnalité A et la fonctionnalité B dans un même chat produisent des diffs
  qu'on ne peut ni séparer ni annuler.
- **Un récit au lieu d'un lien** : vous décrivez le code avec des mots — le modèle comble les trous.

Remède : un nouveau chat pour une nouvelle tâche ; un chemin vers le fichier au lieu de son contenu ; 5 lignes
de log clés au lieu de 2000 ; un « on a fini A, on commence B » explicite, à partir d'une page blanche.

### 4.4 Techniques de gestion du contexte

1. **Planifier avant de modifier.** « Montre-moi un plan en 5 étapes, ne change rien » — repérez
   la mauvaise compréhension avant même que le diff existe.
2. **Un fichier par étape.** « Seulement `parser.py` pour l'instant, le reste plus tard ».
3. **Passation d'état explicite.** « Résumé : X et Y faits, Z reste » — quand
   vous continuez dans un nouveau chat.
4. **Une citation ciblée.** Collez 5–10 lignes de code au lieu du fichier entier.
5. **Réinitialisation.** Deux échecs — un nouveau chat + une description minimale du problème + la stack trace.

### 4.5 Résumé du module

- Seul ce qui est dit explicitement entre dans le contexte ; le reste, le modèle le complète.
- Le fichier d'instructions est une partie obligatoire d'un projet, pas un luxe.
- La dégradation de la qualité = un contexte encombré, pas un « mauvais modèle ».
- Un nouveau chat pour une nouvelle tâche ; planifier avant de modifier ; un fichier par étape.

---

## Module 5. Déboguer quand l'agent tourne en rond

### 5.1 Trois cercles de l'enfer

1. **Deviner la cause.** L'agent voit le symptôme et nomme immédiatement une cause sans
   regarder le log. Le correctif tombe à côté, le symptôme reste.
2. **Traiter le symptôme.** « L'erreur n'apparaît plus » — parce qu'un `catch` a été ajouté
   qui l'avale. La cause est toujours vivante.
3. **Casser le voisin.** Le correctif marche mais casse un autre scénario ; le correctif suivant
   casse le premier. Ping-pong classique.

Les trois se soignent par une seule règle.

### 5.2 La règle du fait unique

**D'abord un cas minimal reproductible, ensuite le correctif.**

L'ordre est obligatoire :
1. Une commande qui reproduit le problème de manière fiable (ou des étapes exactes dans l'UI).
2. Le texte complet de l'erreur / la stack trace — dans le contexte.
3. Une hypothèse formulée comme une affirmation vérifiable : « si le problème est un
   tableau vide, alors `[]` dans la requête donnera la même stack trace ».
4. La vérification de l'hypothèse avant le correctif : log, point d'arrêt, `console.log`, curl.
5. Seulement après confirmation — le correctif.

Sans l'étape 3, l'agent modifie tout ce qui ressemble à la cause. En général 3–4 fichiers,
dont 2 allaient très bien.

### 5.3 Comment faire regarder l'agent au lieu de le laisser fantasmer

Formulations qui marchent :

- « Lis d'abord la sortie complète de `npm test` et cite les 3 lignes où ça échoue.
  Ne propose pas d'hypothèse avant de les avoir citées. »
- « Propose 3 hypothèses. Pour chacune — une commande qui la confirme ou
  la réfute. Ne fais aucune modification. »
- « Explique ce que tu as exactement vérifié et ce qui reste non vérifié. »
- « Voici la stack trace. Quelle ligne de notre code y participe ? »

Formulations qui ne marchent pas : « répare », « corrige l'erreur », « ça ne marche pas,
débrouille-toi » — elles donnent carte blanche pour deviner.

### 5.4 Quand annuler (rollback)

Un rollback coûte moins cher qu'un correctif si :

- deux tentatives d'affilée n'ont pas fait bouger le symptôme ;
- le diff s'est étendu à des fichiers qui n'étaient pas dans la tâche ;
- l'agent a commencé à « refactoriser au passage » l'endroit où se trouve le bug ;
- vous ne comprenez pas ce qui se passe dans le diff.

Procédure : `git stash` ou `git reset --hard HEAD`, puis une tâche **reformulée**
avec un fait nouveau (stack trace, cas minimal, version de la bibliothèque). Pas la même
formulation — sinon le résultat se répétera.

### 5.5 Les spécificités du débogage avec l'IA

- **De faux « correctifs »** : le code change, l'erreur quitte ce scénario et
  ressort dans un scénario voisin. Vérifiez non seulement le cas, mais le scénario voisin.
- **Incompatibilité de version** : l'agent propose souvent une syntaxe d'une mauvaise version
  de la bibliothèque. Vérifiez `package.json`/`pyproject.toml`.
- **Erreurs silencieuses** : `except Exception: pass` transforme un crash en données erronées.
  C'est pire qu'un crash — cherchez toujours ces endroits dans le diff.
- **Un correctif sans test** : sans test, le bug reviendra. Chaque correctif implique un test
  de plus (le pont vers le module 6).

### 5.6 Résumé du module

- D'abord la reproduction et le fait, ensuite l'hypothèse, ensuite le correctif. Pas l'inverse.
- « Répare » est un mauvais prompt ; « cite la stack trace et propose 3 hypothèses
  vérifiables » en est un bon.
- Deux échecs d'affilée = rollback et une nouvelle formulation.
- Un correctif sans test n'est pas considéré comme clos.

---

## Module 6. Les tests et la protection contre les régressions

### 6.1 Un test = un critère d'acceptation sous forme exécutable

Le critère « avec une liste vide, le texte “Nothing here yet” s'affiche » peut être trompé avec des mots.
Le test `expect(render([])).toContain('Nothing here yet')` ne peut pas être trompé : il passe
ou il ne passe pas.

Pour le vibe coding, c'est critique, parce que l'agent optimise pour le texte de la tâche.
Si le critère n'existe que sous forme de texte, il peut le « remplir » formellement. Un test est une
spécification qu'on ne peut pas reformuler en sa faveur.

### 6.2 Quels tests écrire (et combien)

Une pyramide adaptée au développement avec l'IA :

- **70 % d'unitaires** — des fonctions pures : parsing, validation, calculs, formatage.
  Rapides, stables, ils attrapent le gros des régressions dues aux modifications de l'agent.
- **20 % d'intégration** — un endpoint ou un composant avec des mocks. Ils vérifient
  la colle : le code de réponse est-il le bon, qu'est-ce qui est arrivé dans la base de données.
- **10 % d'e2e** — un ou deux scénarios de bout en bout : « l'utilisateur a ouvert, a saisi, a vu ».
  Coûteux et fragiles ; vous n'en avez pas besoin de plus de deux ou trois par projet dans ce cours.

**N'écrivez pas** : de snapshots d'UI au début d'un projet — l'agent change la mise en page, vous
obtenez 50 snapshots en échec et vous commencez à les « mettre à jour », c'est-à-dire à désactiver le
contrôle. N'écrivez pas de tests pour les getters ni pour le framework.

### 6.3 Pourquoi tester avant le code

Un agent à qui l'on donne un test travaille fondamentalement différemment d'un agent à qui l'on donne une description
textuelle : il a une rétroaction. Le cycle devient mécanique :

1. Nous écrivons un test pour un comportement qui n'existe pas.
2. Nous l'exécutons — le test échoue (vérifiez bien qu'il échoue **pour la bonne
   raison** : pas « module not found » mais « expected X, got Y »).
3. Nous demandons l'implémentation.
4. Nous l'exécutons — il passe.
5. Nous demandons de casser l'implémentation — le test doit échouer. S'il n'a pas échoué, le test est inutile.

L'étape 5 est la plus sous-estimée. Elle sépare un vrai contrôle d'un contrôle décoratif.

### 6.4 L'interdiction de modifier les tests

La dégradation la plus fréquente en vibe coding : l'agent n'arrive pas à faire passer un test et modifie le test.
Formulation pour le fichier d'instructions et pour la requête :

> Les tests sont une spécification. Si un test échoue, corrige l'implémentation. Tu ne peux modifier un test
> que si je l'ai explicitement demandé, et dans ce cas explique d'abord pourquoi l'ancienne attente
> était fausse.

Vérifiez dans le diff : toute modification dans `*.test.*` / `test_*.py` sans votre demande est le
signal d'alarme n° 1.

### 6.5 La couverture comme métrique trompeuse

100 % de couverture de lignes est atteignable sans un seul contrôle significatif : un test appelle
une fonction et ne vérifie pas le résultat. Il est plus utile de regarder non pas le pourcentage mais les questions :

- Le scénario principal est-il couvert ? (obligatoire)
- Les frontières sont-elles couvertes : vide, très nombreux, mauvais type, pas de réseau ? (obligatoire)
- Y a-t-il un test pour chaque bug que vous avez déjà attrapé ? (obligatoire)
- Y a-t-il un test pour chaque ligne ? (peu importe)

### 6.6 Résumé du module

- Un test est le seul critère d'acceptation qu'on ne peut pas contourner par la formulation.
- 70/20/10 : unitaires — intégration — e2e ; évitez les snapshots d'UI.
- Tester avant le code, vérifier qu'« il échoue pour la bonne raison », contrôle par mutation.
- L'agent ne modifie pas les tests. Point.
- La couverture n'est pas l'objectif ; l'objectif, ce sont des frontières couvertes et des bugs attrapés.

---

## Module 7. Données, API, environnement, sécurité

### 7.1 Les secrets

- Des clés uniquement dans `.env`, et `.env` dans `.gitignore` **avant** le premier commit.
- Le dépôt contient un `.env.example` avec les noms de variables et des valeurs vides.
- Le code lit la configuration depuis l'environnement ; une clé codée en dur dans le code est un signal d'alarme.
- Une clé qui est entrée dans l'historique git est considérée comme compromise : un `git rm` du fichier
  ne la retire pas de l'historique. Il faut révoquer la clé (rotation), pas « on a supprimé le fichier ».
- Sur l'hébergement, les variables se définissent dans le panneau, pas dans le code ; le `.env` local et
  les variables de prod sont deux ensembles différents.

### 7.2 L'agent et les API externes : où il ment

Trois hallucinations typiques :

1. **Une méthode/un endpoint inexistant.** Il écrit avec assurance `api.getUserByEmail()`.
2. **Un paramètre obsolète.** Il utilise `?limit=` là où c'est désormais `?page_size=`.
3. **Des champs de réponse inventés.** Il lit `data.items`, alors que c'est en réalité `data.results`.

Une procédure qui ferme 90 % des problèmes :

1. Ouvrir la doc (ou `openapi.json` / `swagger`).
2. Faire un appel `curl` à la main et regarder la réponse **réelle**.
3. Coller la réponse réelle (abrégée) dans le contexte : « voici la forme de la réponse, n'utilise
   que ces champs ».
4. Seulement ensuite demander le client et la gestion des erreurs.

### 7.3 La validation aux frontières

Toute donnée venant de l'extérieur — saisie utilisateur, réponse d'API, fichier, variable
d'environnement — est non fiable. Validez **à l'entrée**, une fois, en un seul endroit :

- un schéma (zod/pydantic) au lieu de `if` manuels ;
- la vérification des champs obligatoires et des types ;
- un comportement explicite sur des données invalides : 400 avec un message clair, pas un crash ;
- des tests pour « vide », « mauvais type », « trop long ».

Les types en TypeScript/Python sont une protection bon marché à l'intérieur du code, mais ne remplacent pas la validation
aux frontières : les données du réseau arrivent en `any` / `dict`.

### 7.4 Ce qu'il ne faut pas donner à l'agent

- La base de données de prod et les dumps de prod. Une copie locale ou des fixtures.
- Les données privées des utilisateurs, les tokens d'autres personnes, les URL internes.
- Les mots de passe, les clés privées, les certificats.
- Les dépôts sous NDA sans vérifier la politique de l'entreprise.

Vérifiez avant d'envoyer : « si ce message se retrouve dans un log public, est-ce un
problème ? » Si oui — ne l'envoyez pas.

### 7.5 Résumé du module

- `.env` + `.gitignore` + `.env.example` ; une clé dans l'historique = révoquer la clé.
- D'abord curl et la vraie réponse de l'API, ensuite le code.
- Validation aux frontières et tests pour les données invalides.
- Les secrets, la prod et les données personnelles n'entrent pas dans le contexte.

---

## Module 8. Déploiement, hygiène git, travail en équipe

### 8.1 Branches et petites PR

- La branche principale est protégée : pas de push direct, même pour vous.
- Chaque tâche — une branche, chaque changement — une PR. Même si vous travaillez seul :
  une PR est l'endroit où le diff est visible et où vous pouvez annuler en un clic.
- Une PR de 100–300 lignes est relue ; à 1500, c'est un « approuvé sans regarder », donc pas
  relue du tout. Découpez.
- L'agent travaille sur une branche : une branche cassée ne touche pas la branche main de travail.

### 8.2 Le build et l'environnement de prod

« Ça marche sur ma machine » ≠ « c'est déployé ». Les différences qui vous rattrapent au moment du déploiement :

- variables d'environnement : présentes en local, non définies sur l'hôte ;
- version du runtime : Node 22 en local, 18 sur l'hôte ;
- casse dans les chemins : Windows pardonne `Components/Button`, Linux non ;
- dépendances : les `devDependencies` ne sont pas installées dans le build de prod ;
- système de fichiers : en local vous pouvez écrire dans `./data`, en serverless non.

En pratique : le premier déploiement se fait **avant** que le projet soit prêt — sur une app vide ou
presque vide. Ainsi vous séparez les problèmes d'environnement des problèmes de code.

### 8.3 Logs, supervision, rollback

- Les logs sont la seule source de vérité sur la prod ; sans eux, le débogage est impossible.
- Une erreur en prod : d'abord les logs et le code de statut, ensuite les hypothèses (la même règle
  du fait unique qu'au module 5).
- Rollback : `revert` du commit ou redéploiement de la version précédente. Pouvoir annuler en
  2 minutes compte plus que ne jamais se tromper.
- Jamais de « correction de la prod à la main » : la modification passe par une branche et un déploiement, sinon
  l'état de la prod ne correspond plus au dépôt.

### 8.4 Relire du code IA : ce qu'un humain regarde

Une checklist, 12 points, par ordre de priorité :

1. Contrôles et validations supprimés ou affaiblis.
2. Tests modifiés sans demande.
3. Gestion silencieuse des erreurs (`catch`/`except` sans action).
4. Secrets, clés, tokens, chemins locaux.
5. Requêtes SQL : concaténation au lieu de paramètres.
6. Vérifications de droits d'accès là où elles existaient.
7. Nouvelles dépendances : sont-elles nécessaires, qu'est-ce qu'elles tirent.
8. Cas limites : vide, très nombreux, mauvais type.
9. La logique de l'argent, des dates, des fuseaux horaires, des arrondis.
10. Modifications de fichiers hors de la tâche.
11. Lisibilité : comprendrez-vous cela dans un mois.
12. Conformité à la spec : tous les critères d'acceptation fermés.

Les points 1–4 prennent une minute à vérifier et attrapent la plupart des problèmes réels.

### 8.5 Messages de commit et descriptions de PR

- Commit : `type(scope): what was done` — par exemple `fix(orders): 400 on
  unknown status`.
- PR : ce qui change, pourquoi, comment vérifier (les étapes), ce qui est hors périmètre.
- Séparément : « quels compromis ont été faits » — dans un mois, cela vous évitera de mauvaises
  conclusions.

### 8.6 Résumé du module

- Une branche + une PR pour chaque tâche ; la branche main est protégée.
- Le premier déploiement — tôt, pour séparer l'environnement du code.
- Le rollback est une compétence ; on ne débogue qu'à partir des logs.
- Relire du code IA : d'abord les contrôles, les tests, les erreurs, les secrets — ensuite tout le reste.

---

## Module 9. Projet final : l'analyse avant la construction

### 9.1 Comment choisir un projet

Critère : **valeur élevée pour vous / faible inconnue pour l'agent.**
Un mauvais choix, c'est un « clone d'Airbnb » : inconnue énorme, valeur personnelle nulle.
Un bon choix, c'est « un utilitaire qui analyse mon export bancaire et calcule des catégories » :
peu d'inconnue, valeur élevée, de vraies données pour vérifier.

### 9.2 Quatre étapes de construction

Chaque étape se termine par quelque chose d'exécutable :

1. **Squelette.** Dépôt, `.gitignore`, `.env.example`, fichier d'instructions,
   « Hello world » sur la stack choisie. Vérification : ça tourne en local.
2. **Cœur.** Le scénario principal de bout en bout sur des données minimales. Vérification :
   le scénario se déroule entièrement.
3. **Câblage.** Gestion des erreurs, un ou deux tests pour le scénario principal, README.
   Vérification : les tests passent, le README permet de le lancer de zéro.
4. **Déploiement.** Un lien public, les variables d'environnement sur l'hôte, une vérification depuis
   votre téléphone. Vérification : le lien s'ouvre et fonctionne.

### 9.3 Ce qu'il faut couper du MVP

Coupez sans pitié : l'authentification (si ce n'est pas le sujet), un panneau d'administration, le thème sombre,
les réglages, l'export, le multilingue, le « joli ». La première version prouve que
le scénario principal fonctionne. Tout le reste — après le lien.

### 9.4 Checklist de livraison

- [ ] `git clone` + les instructions du README → l'appli se lance de zéro
- [ ] Le scénario principal fonctionne sur de vraies données
- [ ] Il y a au moins un test pour le scénario principal, `npm test` est vert
- [ ] Le lien public est en ligne, vérifié ailleurs que dans votre propre navigateur
- [ ] Il n'y a pas de secrets dans le dépôt, `.env.example` est à jour
- [ ] Le fichier d'instructions du projet est en place
- [ ] L'historique des commits se lit bien : on comprend ce qui a été fait et pourquoi
- [ ] Les limitations connues sont documentées dans le README

### 9.5 Résumé du cours

La compétence que vous avez acquise n'est pas « la capacité d'écrire du code avec l'IA ». C'est la capacité
de **mener une tâche indéfinie jusqu'à un résultat vérifiable** : spec,
petites étapes, lecture du diff, tests, rollback, déploiement. Les modèles changeront,
ce cycle non.
