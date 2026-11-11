# Module 05 — La boucle d'agent et les permissions

**Temps :** 4 heures · **Format :** théorie 90 min + pratique 150 min

---

# Théorie

## 1. Qu'est-ce qu'un agent

```
LLM  →  décide quel outil appeler
     →  l'outil renvoie un résultat
     →  le résultat entre dans le contexte
     →  on répète jusqu'à ce que la tâche soit résolue
```

C'est la boucle de **tool calling**. Le modèle ne « fait » pas — il demande. D'où :

- qualité de l'agent = qualité du modèle × qualité des outils × qualité des descriptions ;
- un mauvais outil casse la boucle plus fort qu'un modèle faible ;
- un agent peut « rester bloqué dans une boucle » — il faut une limite d'itérations.

## 2. Les outils dès le premier jour

| Outil | Ce qu'il fait |
| --- | --- |
| `read` | lit un fichier |
| `edit` / `write` | modifie et crée des fichiers |
| `glob` / `grep` | cherche des fichiers et du contenu |
| `shell` | exécute des commandes |
| `webfetch` / `websearch` | récupère de l'information externe |

En pratique : plus l'outil est étroit, plus l'agent est prévisible. « Lance tout pour moi » est pire
que « lance `pytest tests/test_auth.py` ».

## 3. Permissions : le modèle de menace

Chaque action de l'agent est potentiellement irréversible. Catégories de risque :

| Risque | Exemple | Que faire |
| --- | --- | --- |
| Suppression irréversible | `rm -rf`, `git reset --hard` | `deny` |
| Publication vers l'extérieur | `git push`, `docker push`, deploy | `ask` |
| Secrets | lecture de `.env`, `~/.ssh` | `deny` |
| Argent | appels massifs à des API payantes | limites |
| Migrations de base | `alembic upgrade` en prod | `ask`/`deny` |
| Modifications hors projet | dossiers d'autres personnes | `external_directory` |

## 4. Comment les règles fonctionnent dans OpenCode

Une règle = `action` + `resource` + `effect` :

```jsonc
{ "action": "shell",  "resource": "git push *", "effect": "deny" },
{ "action": "shell",  "resource": "git status *", "effect": "allow" },
{ "action": "read",   "resource": "*.env", "effect": "ask" },
{ "action": "external_directory", "resource": "D:/other/*", "effect": "allow" },
```

- Elles s'appliquent **de bas en haut** : la dernière règle qui correspond gagne.
- Par défaut — `ask` (si rien ne correspond).
- « Toujours autoriser » dans l'interface enregistre la règle au niveau du projet.
- `deny` ne se contourne pas avec un bouton.

## 5. L'ensemble minimal qui fonctionne

```jsonc
{
  "permissions": [
    { "action": "shell", "resource": "*", "effect": "ask" },
    { "action": "shell", "resource": "git status *", "effect": "allow" },
    { "action": "shell", "resource": "git diff *", "effect": "allow" },
    { "action": "shell", "resource": "./scripts/check.sh", "effect": "allow" },
    { "action": "shell", "resource": "pytest *", "effect": "allow" },
    { "action": "shell", "resource": "git push *", "effect": "deny" },
    { "action": "shell", "resource": "sudo *", "effect": "deny" },
    { "action": "read",  "resource": "*.env*", "effect": "deny" }
  ]
}
```

La logique : autoriser la lecture et les vérifications, interdire la publication et les actions irréversibles.

## 6. Isolation

- **Branche** — le minimum : `git checkout -b agent/<task>`.
- **Worktree** — une copie de travail séparée : l'agent travaille sans vous gêner.
- **Conteneur/VM** — pour les expériences risquées.
- **`--auto`** — approuve automatiquement tout ce qui n'est pas interdit. Uniquement dans un environnement isolé.

Règle : plus les permissions sont larges, plus le sandbox doit être étroit.

## 7. Les subagents

Une session séparée pour une sous-tâche. Pourquoi :

- la reconnaissance sur un gros repo ne pollue pas le contexte principal ;
- du travail en parallèle sur des parties indépendantes ;
- un « second avis » en review.

Le prix : un subagent ne voit pas votre historique — il lui faut un brief complet et autonome.

## 8. Quand l'agent reste bloqué dans une boucle

Signes : les mêmes modifications encore et encore, des erreurs qui se répètent, un nombre d'appels d'outils qui grimpe.

Actions :

1. Arrêter.
2. Énoncer ce qui est certain (fichiers, erreurs).
3. Une nouvelle session avec ce contexte.
4. Si ça se répète — la tâche a été mal énoncée.

---

## Checklist de compréhension

1. Pourquoi « le modèle fait » est-il une formulation incorrecte ?
2. Que se passe-t-il si vous mettez `allow` sur `shell: *` ?
3. Pourquoi `deny` sur `git push` s'il y a une review ?
4. Quand `--auto` est-il acceptable, et quand ne l'est-il pas ?
5. En quoi un subagent aide-t-il, et en quoi nuit-il ?

---

# Pratique

Voir [practice.md](practice.md).
