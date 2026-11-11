# Module 09 — Pratique : votre propre boîte à outils

**Durée :** 160 minutes · **Livrable :** `labs/09-custom/`

---

## Tâche 1. Commande (30 min)

Créez une commande `/check-fix` dans `opencode.jsonc` :

```jsonc
{
  "commands": {
    "check-fix": {
      "description": "Lancer les vérifications et corriger les causes des échecs",
      "template": "Lance ./scripts/check.sh. S'il échoue — corrige la cause, ne désactive pas les vérifications. Répète au maximum 3 fois. À la fin, montre le diff et explique-le en 2 lignes."
    }
  }
}
```

Testez l'invocation de `/check-fix` sur un test cassé.

**Critère d'acceptation :** la commande fonctionne, le test est de nouveau vert, le diff a été relu.

---

## Tâche 2. Skill (40 min)

Créez le skill `.opencode/skills/migrations/SKILL.md` :

```markdown
---
name: migrations
description: Règles de création et d'application des migrations de DB dans ce projet
---

1. Fichier de migration : `migrations/YYYYMMDD_description.sql`
2. Toujours une migration down
3. Interdit : DROP COLUMN sans sauvegarde
4. Après création : `alembic upgrade head` en dev, `pytest -q`
```

Vérification : dans une nouvelle session, demandez « ajoute une migration » — l'agent doit s'appuyer sur les règles.

**Critère d'acceptation :** le skill est bien pris en compte ; le rapport contient une citation de la réponse de l'agent.

---

## Tâche 3. Sous-agent relecteur (40 min)

```jsonc
{
  "agents": {
    "reviewer": {
      "description": "Revue stricte du diff, sans modification",
      "mode": "subagent",
      "permissions": [
        { "action": "edit", "resource": "*", "effect": "deny" },
        { "action": "shell", "resource": "git diff *", "effect": "allow" },
        { "action": "shell", "resource": "*", "effect": "deny" }
      ]
    }
  }
}
```

Donnez-lui le diff du module 07.

**Critère d'acceptation :** le sous-agent a renvoyé une liste de problèmes, les fichiers sont inchangés (`git status` est propre).

---

## Tâche 4. Un modèle adapté à la tâche (25 min)

Mettez en place deux configurations :

```jsonc
{
  "agents": {
    "fast": { "mode": "primary", "model": "<pas-cher>" },
    "think": { "mode": "primary", "model": "<raisonnement>" }
  }
}
```

Comparez-les sur la même tâche.

**Critère d'acceptation :** un tableau « tâche / agent / coût / qualité ».

---

## Tâche 5. MCP ou un refus argumenté (25 min)

Vérifiez la liste des serveurs MCP disponibles :

```bash
opencode mcp list
```

Si vous avez besoin d'un outil externe — connectez-le en lecture seule et décrivez le risque.
Si vous n'en avez pas besoin — écrivez 3 raisons de ne pas le faire dans le rapport (surface d'attaque
supplémentaire, ne résout pas la tâche, il existe un chemin plus simple).

**Critère d'acceptation :** soit un MCP en lecture seule qui fonctionne, soit un refus argumenté.

---

## Critères de soumission

- [ ] La commande `/check-fix` fonctionne.
- [ ] Le skill est pris en compte par l'agent.
- [ ] Le sous-agent relecteur n'a aucune permission de modification.
- [ ] Il y a une comparaison de modèles par agent.
- [ ] MCP est connecté ou rejeté de manière argumentée.
