# Pratique du cours

966 minutes — 70 % du cours. Chaque exercice se termine par un résultat vérifiable.
Le marqueur `[commit]` signifie : avant de passer à la suite, faites un commit.

---

## Module 1. Environnement et premier résultat — 105 min

### 1.1 Environnement (20 min)

1. Installez un agent avec accès aux fichiers (Claude Code / Cursor / Codex CLI).
2. Vérifiez : `git --version`, `node --version`, `python --version`.
3. Créez `~/projects/vibe-lab` et ouvrez-le avec l'agent.

**Critère :** l'agent, de lui-même et sans vos indices, lit un fichier de ce
dossier après la demande « lis README.md et résume-le en une ligne ».

### 1.2 Premier dépôt (20 min)

1. `git init` dans `vibe-lab`.
2. Créez `.gitignore` (node_modules, .env, .venv, __pycache__, dist).
3. Créez `README.md` avec une ligne sur le projet.
4. `[commit]` — le premier commit **avant** tout code généré par IA.

**Critère :** `git log --oneline` affiche un commit ; `git status` est propre.

### 1.3 Premier utilitaire (45 min)

Tâche pour l'agent — strictement selon la spécification ci-dessous :

```
Objectif : un utilitaire en ligne de commande lit un fichier texte ligne par ligne et affiche des statistiques.

Entrée : le chemin du fichier en argument. Sortie sur stdout :
  lines: N
  words: N
  characters: N
  longest line: <number>: <first 40 characters>

Contraintes : bibliothèque standard Python/Node uniquement, aucune nouvelle dépendance.
Un seul fichier. Pas de sortie colorée, pas d'options, pas de configuration.

Critères d'acceptation :
- un fichier de 3 lignes donne les trois nombres corrects
- fichier vide : tous les zéros, pas de plantage
- fichier absent : message sur stderr et code de sortie 1
- fichier sans droit de lecture : pas de stack trace, message clair

Ce que nous ne faisons pas : pas d'options, pas de lecture depuis stdin, pas de fichiers de log.
```

**Consigne :** demandez d'abord un plan (aucune modification) → puis l'implémentation →
vérifiez les 4 critères à la main → `[commit]`.

### 1.4 Revue du diff (20 min)

Ouvrez `git show` pour le dernier commit et notez dans `notes.md` :
- quels fichiers ont changé et s'ils faisaient tous partie de la tâche ;
- s'il y a des red flags de la théorie (module 3, point 3.2) — pour l'instant, notez-les simplement ;
- ce que vous avez accepté et ce que vous auriez refusé.

**Critère :** au moins 3 observations sur le diff dans `notes.md`.

---

## Module 2. Spécification — 105 min

### 2.1 Spécification du projet (30 min)

Choisissez un petit projet (pas le capstone), par exemple « convertisseur Markdown → HTML »
ou « suivi d'habitudes en console ». Écrivez une spec avec les six blocs de la théorie.

**Critère :** spec ≤ 15 lignes ; le bloc « critères d'acceptation » contient au moins 4 points,
chacun vérifiable par une commande ou par observation ; il existe un bloc « ce que nous ne faisons pas ».

### 2.2 Formulation floue vs spec (30 min)

1. Créez la branche `exp/bad` et donnez à l'agent la demande : « fais un convertisseur
   markdown vers html ». Récupérez le résultat, notez : combien de fichiers, combien de lignes.
2. Revenez en arrière : `git checkout main`.
3. Branche `exp/good`, même projet — selon votre spec.
4. Remplissez le tableau dans `notes.md` :

| | Sans spec | Avec spec |
|---|---|---|
| fichiers modifiés | | |
| lignes de diff | | |
| critères d'acceptation validés | | |
| itérations jusqu'à l'acceptable | | |

**Critère :** le tableau est rempli ; vous savez nommer 2 raisons précises de la différence.

### 2.3 Décomposition (20 min)

Découpez la spec en 5 tâches de 15–20 minutes de travail de l'agent chacune.
Format pour chacune : titre + critère d'acceptation + « ne pas toucher ».

**Critère :** pour chaque tâche, le diff attendu fait < 80 lignes ; aucune tâche
ne contient la conjonction « et » dans son titre (signe de deux tâches collées).

### 2.4 Critère d'acceptation → condition `/goal` (15 min)

Prenez une tâche de la décomposition du 2.3 et réécrivez son critère d'acceptation sous
forme de condition d'arrêt pour l'agent. Exigences pour la condition :

- un signal de fin mesurable (code de retour, sortie vide, lint au vert) ;
- la preuve est visible dans la session (l'agent montre lui-même la sortie de la commande) ;
- des frontières : quels fichiers peuvent être modifiés ;
- une limite de tours.

Exemple :

```
/goal pytest tests/ se termine avec le code 0, ruff check src/ est propre,
git diff --name-only ne montre que src/converter/, ou arrête après 12 tours
```

Lancez-la sans intervenir et consignez dans `notes.md` :

| | Fait |
|---|---|
| tours jusqu'à l'arrêt | |
| condition atteinte du premier coup : oui/non | |
| ce que l'agent a modifié en dehors du dossier autorisé | |
| ce qui manquait dans la formulation | |

**Critère :** la condition est écrite dans `notes.md` ; 4 lignes du tableau sont remplies ;
si la condition s'est révélée inatteignable, vous savez nommer quel signal était
invérifiable.

### 2.5 Rétro (10 min)

Dans `notes.md` : ce qui s'est révélé superflu dans la spec, ce qu'il a fallu ajouter en
cours de route, quel critère s'est révélé invérifiable.

`[commit]` — la spec et les notes dans le dépôt.

---

## Module 3. Cycle de travail — 105 min

### 3.1 Huit formulations (25 min)

Une seule tâche pour les huit : « dans l'utilitaire du module 1, la longueur des lignes de
sortie doit être limitée à 40 caractères ». Écrivez 8 variantes de la demande :

1. Trop court : « limite la longueur des lignes ».
2. Trop large : « améliore la sortie de l'utilitaire ».
3. Sans contexte : « ajoute une troncature ».
4. Avec contexte et fichier : « dans `stat.py`, la fonction de sortie… ».
5. Avec un critère : « …une ligne de plus de 40 caractères est tronquée et reçoit `...` ».
6. Avec une frontière : « exactement 40 caractères n'est pas tronqué ».
7. Avec une interdiction : « …ne touche pas au comptage des caractères, ne refactorise rien d'autre ».
8. Avec un format : « montre d'abord le plan, ne modifie rien ».

**Critère :** dans `notes.md`, huit variantes et, à côté de chacune, une prédiction de
ce que fera l'agent (qu'elle se réalise ou non — cochez après avoir lancé 2–3 variantes).

### 3.2 Une fonctionnalité en quatre étapes (40 min)

Prenez une tâche du 2.3 et réalisez-la en exactement quatre étapes, avec une vérification et
un `[commit]` après chacune :

- étape 1 : un test ou une vérification manuelle qui fige le comportement actuel ;
- étape 2 : la modification minimale pour satisfaire le critère ;
- étape 3 : un cas limite (vide / maximum / mauvais type) ;
- étape 4 : un message d'erreur ou le README.

**Critère :** 4 commits ; chaque diff se lit en 5 minutes ; `git log --oneline`
affiche 4 messages différents.

### 3.3 Trouver les red flags (25 min)

Demandez à l'agent : « ajoute la gestion des erreurs à l'utilitaire ». Vous obtiendrez très
probablement un diff avec 2–4 flags. Parcourez la liste du 3.2 et notez ce que vous trouvez
dans `notes.md` avec les numéros de ligne.

**Critère :** au moins 2 flags trouvés ; pour chacun, une note expliquant en quoi il est dangereux.

### 3.4 Rétro (15 min)

Combien de retours en arrière avez-vous faits, à quelle étape avez-vous perdu le plus de temps,
quel élément de la demande (contexte/critère/interdiction) a le plus aidé.

---

## Module 4. Contexte — 105 min

### 4.1 Fichier d'instructions (30 min)

Créez `AGENTS.md` (ou `CLAUDE.md`) à partir du modèle de la théorie 4.2, remplissez-le pour
votre projet : stack, commandes, règles, interdictions.

Vérification : dans un nouveau chat, demandez « quelles sont les commandes de test de ce projet ? » —
l'agent doit répondre à partir du fichier sans vous poser la question.

**Critère :** le fichier est en place, l'agent répond correctement ; `[commit]`.

### 4.2 Un chat ou trois (45 min)

Prenez 3 petites tâches (par exemple : ajouter un compteur de mots ; corriger le format de sortie ;
ajouter une vérification de l'encodage du fichier).

- Run A : les trois tâches à la suite dans un seul chat, sans nettoyer.
- Run B (`git reset` entre les deux) : chaque tâche dans un nouveau chat.

Notez : le nombre d'itérations jusqu'au passage des critères, le nombre de modifications
supplémentaires, combien de fois l'agent s'est appuyé sur du code obsolète.

**Critère :** un tableau de comparaison A/B dans `notes.md` + une conclusion en une ligne.

### 4.3 Réinitialisation de session (20 min)

Prenez une situation cassée quelconque (ou une situation artificielle : demandez à l'agent
de faire une modification volontairement fausse). Entraînez-vous à la technique : nouveau
chat + 3 faits (ce qui se passe, ce que vous attendiez, la stack trace) + « propose 3
hypothèses vérifiables, ne modifie rien ».

**Critère :** `notes.md` contient le modèle de message de réinitialisation qui a fonctionné.

### 4.4 Rétro (10 min)

Quelle règle des instructions vous a fait gagner le plus de temps ? Laquelle s'est révélée
inutile ? Supprimez les inutiles.

---

## Module 5. Débogage — 105 min

### 5.1 Trois bugs (20 min)

Créez vous-même un projet cassé — demandez à l'agent : « ajoute trois bugs à l'utilitaire :
plantage sur un fichier vide, comptage de mots faux avec un trait d'union, boucle infinie sur
un fichier sans saut de ligne final. Ne dis pas où exactement ».

Pour chaque bug : la commande/le fichier qui le reproduit.

**Critère :** trois cas reproductibles consignés dans `bugs.md`.

### 5.2 Trois corrections (50 min)

Pour chaque bug — strictement selon le cycle : hypothèse → vérification → correction → `[commit]`.
L'hypothèse doit être formulée avant la correction et consignée dans `bugs.md`
sous la forme « si …, alors … ».

**Critère :** 3 commits ; pour chaque bug, il est noté si l'hypothèse a été confirmée ;
après chaque correction, les deux scénarios voisins sont vérifiés à la main.

### 5.3 Provoquer une contradiction (25 min)

Donnez à l'agent une hypothèse volontairement fausse : « le problème vient de l'encodage du
fichier, corrige la lecture en latin-1 ». Voyez s'il vous contredit.

S'il vous contredit — très bien. Sinon — apprenez à formuler : « avant de corriger, vérifie
cette hypothèse et dis si elle est confirmée. Sinon, ne modifie rien ».

**Critère :** `notes.md` contient la formulation après laquelle l'agent a commencé à
vérifier l'hypothèse au lieu de l'exécuter.

### 5.4 Rétro (10 min)

Combien de cycles jusqu'à une correction en moyenne ? Qu'est-ce qui diviserait ce nombre par deux ?

---

## Module 6. Tests — 105 min

### 6.1 Lanceur de tests (20 min)

Installez vitest (Node) ou pytest (Python). Un test pour une fonction existante
du module 1. Lancez-le.

**Critère :** `npm test` / `pytest` est au vert ; la commande est consignée dans `AGENTS.md`.

### 6.2 Cycle TDD, 5 tests (45 min)

Nouvelle fonctionnalité : dans l'utilitaire — une option `--top N` affichant les N lignes les plus longues.

Pour chacun des 5 tests : écrire le test → confirmer qu'il échoue **pour la bonne
raison** → implémentation → vert → `[commit]`.

Tests : (1) sans l'option, le comportement est inchangé ; (2) `--top 3` donne 3 lignes ;
(3) `--top 0` — sortie vide, code 0 ; (4) `--top abc` — erreur, code 1 ;
(5) un fichier de 2 lignes et `--top 5` — 2 lignes.

**Critère :** 5 commits ; pour chaque test, `notes.md` consigne la raison de son échec
avant l'implémentation (pas « module not found »).

### 6.3 Vérification de robustesse (30 min)

Demandez à l'agent : « casse l'implémentation de `--top` — renvoie toutes les lignes. Les tests
doivent attraper ça. Ne touche pas aux tests ».

- S'ils ont attrapé la casse — restaurez l'implémentation, `[commit]`.
- S'ils ne l'ont pas attrapée — le test est décoratif, réécrivez-le et recommencez.

**Critère :** au moins un test a attrapé la casse ; dans `notes.md` — quels tests
se sont révélés inutiles et pourquoi.

### 6.4 Rétro (10 min)

Combien de tests par ligne de code avez-vous au final ? Combien de frontières sont couvertes :
vide / maximum / mauvais type / pas de réseau ?

---

## Module 7. Données, API, sécurité — 105 min

### 7.1 Secrets (20 min)

`.env` avec une clé de test, `.env.example` sans valeur, `.gitignore` avec `.env`.
Vérification : `git status` ne voit pas `.env` ; `git log --all -p | grep <clé>` est vide.

**Critère :** la clé est absente de l'historique git ; `.env.example` est dans le dépôt.

### 7.2 API : curl → client → erreurs (50 min)

Prenez une API publique sans clé (par exemple, des taux de change ou la météo en accès libre).

1. `curl` à la main, enregistrez la réponse réelle dans `fixtures/sample.json`.
2. Donnez ce fichier à l'agent : « voici la forme de la réponse réelle, utilise uniquement ces champs ».
3. Client + validation de la réponse.
4. Gestion des erreurs : 4xx, 5xx, timeout, JSON invalide.

**Critère :** 4 scénarios d'erreur traités et vérifiés à la main ; pas un seul champ
absent de `sample.json`.

### 7.3 Tests pour les mauvaises données (25 min)

Tests : réponse vide, champ obligatoire manquant, une chaîne au lieu d'un nombre,
timeout. Comportement : une erreur claire, pas de plantage, pas de `except` silencieux.

**Critère :** 4 tests au vert ; quand on retire la validation, ils échouent.

### 7.4 Rétro (10 min)

Sur quoi l'agent a-t-il menti (méthode, paramètre, champ) et comment l'avez-vous attrapé ?

`[commit]` — le tout.

---

## Module 8. Déploiement et hygiène — 105 min

### 8.1 Branches et PR (15 min)

`main` est protégée (dans les paramètres GitHub). Travaillez uniquement via une branche et une PR.
Faites une PR pour une tâche du module 6.

**Critère :** un push direct sur `main` est rejeté ; la PR contient une description : quoi/pourquoi/comment
vérifier.

### 8.2 Déploiement (40 min)

Déployez le projet sur Vercel ou Netlify : connectez le dépôt, renseignez les
variables d'environnement dans le panneau, attendez le build, ouvrez le lien.

**Critère :** le lien s'ouvre depuis un téléphone ; le scénario principal fonctionne
en production, pas seulement en local.

### 8.3 Casser et revenir en arrière (35 min)

1. Déployez un commit avec une casse évidente (par exemple, ça plante sur la page principale).
2. Confirmez que la production est cassée.
3. Rollback n° 1 : redéployez la version précédente depuis le panneau. Chronométrez.
4. Rollback n° 2 : `git revert` dans une branche → PR → merge → autodeploy. Chronométrez.
5. Consignez les deux temps dans `notes.md`.

**Critère :** les deux méthodes ont fonctionné ; le temps de chaque mesure est consigné.

### 8.4 Revue par checklist (15 min)

Prenez votre dernière PR et parcourez les 12 points de revue de la théorie 8.4.
Les problèmes — dans un commentaire de PR, la correction — dans un commit séparé.

**Critère :** la checklist est complète, au moins un problème trouvé et corrigé.

---

## Module 9. Capstone — 126 min de pratique

### 9.1 Démarrage (16 min)

- Choisissez un projet dans `05-proekty.md`.
- Une spec de 10 lignes + 4 étapes de construction (d'après la théorie 9.2).
- `git init`, `.gitignore`, `.env.example`, `AGENTS.md`, brouillon de README.
- `[commit]`

**Critère :** la spec et le plan sont dans le dépôt ; le dépôt est créé sur GitHub.

### 9.2 Cœur (60 min)

Le scénario principal de bout en bout sur des données minimales. Branche → 4 commits → vérifiez
le scénario principal à la main à chaque étape.

**Critère :** le scénario principal passe entièrement en local.

### 9.3 Finalisation (30 min)

- Gestion des erreurs : au moins 3 scénarios.
- Un test pour le scénario principal (+ un pour une frontière, si vous avez le temps).
- README : lancement de zéro, limitations connues.

**Critère :** `npm test` est au vert ; le README permet de lancer le projet de zéro
(vérifiez dans un dossier propre : `git clone` → suivez les instructions → ça marche).

### 9.4 Déploiement et rendu (20 min)

- Déployez, variables d'environnement sur l'hébergeur.
- Ouvrez le lien depuis un téléphone, parcourez le scénario principal.
- Parcourez la checklist de rendu de la théorie 9.4, cochez les points dans `06-tracker.md`.
- `[commit]` + `[merge PR]`

**Critère :** le lien public est en ligne, la checklist de rendu est entièrement cochée.

---

## Comment savoir qu'un module est terminé

Un module est considéré comme terminé quand **tous** ses critères de pratique sont remplis et
que les cases sont cochées dans `06-tracker.md`. Pas « en grande partie », pas « presque » — un
critère est soit rempli, soit non. C'est la même discipline que vous exigez de l'agent.
