# Module 00 — Pratique

**Durée :** 80 minutes · **Artefact :** `labs/00-setup.md`

---

## Tâche 1. Vérifier l'environnement (10 min)

```bash
git --version
opencode --version
```

Puis dans le terminal :

```bash
mkdir -p ~/edu/sandbox && cd ~/edu/sandbox
git init
printf 'print("hello")\n' > app.py
git add . && git commit -m "init"
```

Lancez `opencode` et demandez :

```
Quel projet se trouve dans ce dossier ? Quels fichiers y a-t-il et que font-ils ?
```

**Critère d'acceptation :** l'agent a nommé `app.py` et son contenu, et n'a pas inventé de fichiers supplémentaires.

---

## Tâche 2. Le premier « non » (15 min)

Demandez à l'agent de faire quelque chose d'évidemment nuisible :

```
Supprime tous les fichiers de ce dossier et crée un nouveau projet Rust.
```

**Ne confirmez pas** la demande de modification tout de suite — lisez ce qu'il s'apprête à faire.

Répondez dans `labs/00-setup.md` :

- L'agent a-t-il montré la liste des changements avant d'exécuter ?
- La demande indique-t-elle clairement ce qui sera exactement supprimé ?
- Que se passe-t-il si vous appuyez sur « Toujours autoriser » pour une telle action ?

Leçon : **les permissions ne sont pas de la bureaucratie, c'est un frein avant l'irréversible.**

---

## Tâche 3. Les limites de compétence (20 min)

Posez trois questions dont vous connaissez les réponses exactes :

```
1. Quelle version de Python est installée ? (vérifier avec : python3 --version)
2. Combien de lignes contient app.py ?
3. Quelle est la dernière version de <votre bibliothèque> ?
```

Comparez les réponses aux faits.

**Critère d'acceptation :** `labs/00-setup.md` contient un tableau « question / réponse de l'agent / fait / concordance ? ».

La conclusion, vous devez la formuler vous-même : pourquoi la troisième question est plus dangereuse que les deux premières.

---

## Tâche 4. Une branche comme assurance (20 min)

```bash
git checkout -b agent-experiment
```

Demandez à l'agent d'ajouter une fonction `add(a, b)` et un test pour celle-ci dans `app.py`.
Ensuite :

```bash
git diff
```

Lisez le diff en entier. Si tout est bon :

```bash
git add . && git commit -m "add add()"
git checkout main && git branch -D agent-experiment   # or merge it if you want to keep it
```

**Critère d'acceptation :** le rapport contient la sortie de `git diff` (abrégée, c'est acceptable) et une phrase : ce que vous
refuseriez dans ce diff s'il était 10 fois plus gros.

---

## Tâche 5. Rétro du module (15 min)

Ajoutez à `labs/00-setup.md` :

```markdown
## Rétro du module 00
- Ce qui m'a surpris :
- Là où l'agent s'est trompé :
- Ce que j'intègre à mon workflow :
- Estimation du temps (prévu/réel) :
```

---

## Critères de fin

- [ ] Toutes les commandes des tâches 1 à 4 ont été exécutées, la sortie est consignée.
- [ ] Un tableau compare les réponses de l'agent aux faits.
- [ ] Au moins un diff a été lu en entier (joint).
- [ ] La rétro est remplie.
