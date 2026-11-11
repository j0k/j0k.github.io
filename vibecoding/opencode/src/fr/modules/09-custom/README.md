# Module 09 — Personnalisation : skills, commandes, sous-agents, MCP

**Durée :** 4 heures · **Format :** 80 min de théorie + 160 min de pratique

---

# Théorie

## 1. Pourquoi personnaliser

L'agent par défaut est générique. Votre projet, lui, est spécifique.
La personnalisation transforme les connaissances générales du modèle en vos processus.

Quatre mécanismes :

| Mécanisme | Ce que c'est | Quand |
| --- | --- | --- |
| **Skill** | un dossier avec des instructions + des ressources, chargé par description | processus répétable (« comment déployer », « comment écrire des migrations ») |
| **Commande** | un modèle de prompt nommé (`/review`, `/test`) | requêtes fréquentes |
| **Sous-agent** | un agent séparé avec ses propres permissions et son propre modèle | reconnaissance, revue, travail en parallèle |
| **MCP** | un serveur externe avec des outils | Jira, DB, navigateur, API internes |

## 2. Skill

Un skill est un fichier `SKILL.md` avec une description du moment où l'appliquer :

```markdown
---
name: deploy
description: Comment livrer une release en staging et en prod sans risque
---

# Deploy
1. Vérifier que main est vert
2. Construire l'image : ...
3. ...
```

Le point clé : la **description** détermine le moment où l'agent va chercher le skill de lui-même.
Une mauvaise description = un skill jamais utilisé.

## 3. Commande

```jsonc
{
  "commands": {
    "review": {
      "description": "Revue stricte du diff courant",
      "template": "Tu es un relecteur strict. Vérifie `git diff` pour : ... Uniquement les problèmes."
    }
  }
}
```

Invocation : `/review`. Évite de retaper et standardise la qualité.

## 4. Sous-agent

Une session séparée avec ses propres permissions :

```jsonc
{
  "agents": {
    "scout": {
      "description": "Reconnaissance du dépôt sans modification",
      "mode": "subagent",
      "permissions": [
        { "action": "edit", "resource": "*", "effect": "deny" },
        { "action": "shell", "resource": "*", "effect": "deny" }
      ]
    }
  }
}
```

Le bénéfice : il n'encombre pas le contexte principal, et il ne peut pas modifier le code par accident.

## 5. MCP

Un protocole par lequel l'agent obtient des outils externes. Exemples : accès à une DB,
Jira, navigateur, API internes.

Règles de sécurité :

- un serveur MCP est **du code qui s'exécute avec vos permissions** — ne faites confiance qu'à ceux qui sont vérifiés ;
- préférez OAuth au collage d'une clé dans la config ;
- restreignez : lecture seule si vous avez seulement besoin de regarder.

## 6. Comment ne pas se noyer dans la personnalisation

Partez du problème, pas du mécanisme :

```
Je répète le même prompt 5 fois par semaine → Commande
Il y a un processus en 10 étapes → Skill
J'ai besoin d'isoler la reconnaissance → Sous-agent
J'ai besoin de données d'un système externe → MCP
```

L'ordre inverse (« je vais faire un MCP parce que c'est à la mode ») laisse des déchets dans la config.

---

## Checklist de compréhension

1. En quoi un skill diffère-t-il d'une commande ?
2. Pourquoi la `description` d'un skill est-elle plus importante que son contenu ?
3. Pourquoi restreindre les permissions d'un sous-agent ?
4. Quel est le risque principal d'un serveur MCP ?

---

# Pratique

Voir [practice.md](practice.md).
