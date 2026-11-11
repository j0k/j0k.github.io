# Module 05 — Pratique : permissions et isolation

**Temps :** 150 minutes · **Artefact :** `labs/05-agent-loop/`

---

## Tâche 1. Construire un modèle de menace (25 min)

Pour votre projet d'apprentissage, notez 10 actions que l'agent **ne doit pas** faire
sans demander. Répartissez-les en trois catégories : `deny`, `ask`, `allow`.

**Acceptation :** un tableau avec une justification pour chaque `deny`.

Exemple :

| Action | Décision | Pourquoi |
| --- | --- | --- |
| `git push` | deny | publication vers l'extérieur |
| lecture de `.env` | deny | secrets |
| `pytest` | allow | sans danger, nécessaire souvent |
| `alembic upgrade` | ask | modifie la base |

---

## Tâche 2. Configurer les règles (30 min)

Ajoutez des règles dans `opencode.jsonc` (projet ou global) et vérifiez :

```bash
opencode debug config | grep -A2 permissions
```

Puis testez-les en action :

1. Demandez `git status` — il ne doit pas demander.
2. Demandez `git push` — il doit refuser.
3. Demandez-lui de lire `.env` — il doit refuser/demander.

**Acceptation :** les trois scénarios se sont comportés comme prévu, le rapport contient captures d'écran/logs.

---

## Tâche 3. Isolation via branche et worktree (40 min)

**Branche :**

```bash
git checkout -b agent/refactor-utils
```

Donnez à l'agent une tâche qui couvre 2–3 fichiers. Vérifiez que `main` n'a pas bougé :

```bash
git diff main --stat
```

**Worktree :**

```bash
git worktree add ../sandbox-agent -b agent/experiment
cd ../sandbox-agent
```

Lancez-y un agent avec une autre tâche. Vérifiez que le dossier principal est propre.

**Acceptation :** le rapport contient la sortie de `git diff main --stat` et de `git worktree list`.

---

## Tâche 4. Une action dangereuse sous contrôle (25 min)

Demandez à l'agent d'exécuter une commande potentiellement dangereuse (dans un sandbox !) :

```
Supprime le dossier de build et reconstruis le projet.
```

Vérifiez : a-t-il demandé, a-t-il montré un plan de ce qui est supprimé exactement.
Puis mettez `deny` sur `rm -rf *` et recommencez — l'agent doit trouver un autre chemin
(par exemple `rm -r build`, ou proposer une commande manuelle).

**Acceptation :** le rapport couvre les deux comportements et la conclusion : pourquoi « l'agent a trouvé un contournement » n'est pas un bug mais un signal.

---

## Tâche 5. Un subagent pour la reconnaissance (30 min)

Donnez au subagent une tâche :

```
Trouve tous les endroits du dépôt où une requête à la base est exécutée directement
(sans la couche repository). Renvoie une liste de fichiers et de lignes, sans modification.
```

Puis utilisez le résultat dans la session principale.

**Acceptation :** le rapport du subagent est une liste compacte ; le contexte principal n'est pas gonflé (comparez
le coût avec un « lis tout le dépôt » direct).

---

## Critères de soumission

- [ ] Modèle de menace : 10 actions avec catégories et justification.
- [ ] Règles appliquées et vérifiées sur 3 scénarios.
- [ ] Branche/worktree utilisé, preuves dans le rapport.
- [ ] Il y a une analyse de l'action dangereuse et du comportement de l'agent.
- [ ] Le subagent a fait la reconnaissance, il y a une comparaison des coûts.
