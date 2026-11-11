# Module 08 — Relecture et garde-fous qualité

**Temps :** 4 heures · **Format :** 80 min de théorie + 160 min de pratique

---

# Théorie

## 1. La relecture de diff est votre compétence principale

Un agent écrit de façon plausible. La relecture est le seul endroit où vous séparez le vrai du plausible.

Ce qu'il faut regarder, **dans cet ordre** :

```
1. What was deleted (delete lines)   ← the most dangerous
2. What changed in conditions/checks
3. New dependencies
4. Error handling
5. Tests: do they actually check anything
6. Style/formatting                  ← last
```

Vous lisez un diff **de haut en bas à travers les suppressions**, pas les ajouts : les ajouts correspondent
en général exactement à ce qui a été demandé.

## 2. Signaux d'alerte

| Signal | Exemple | Pourquoi c'est grave |
| --- | --- | --- |
| Vérification supprimée | `- if not user: return 403` | trou de sécurité |
| Erreur avalée | `except Exception: pass` | le bug devient invisible |
| Test ajusté au code | `assert result is not None` | ne vérifie rien |
| Stub | `return True  # TODO` | « marche » sur le papier |
| Nouvelle dépendance | `+ import requests` | risque/poids supplémentaire |
| Modification hors périmètre | des éditions dans 10 fichiers sans rapport | invérifiable |
| Secret dans le code | `API_KEY = "sk-..."` | fuite |
| Test désactivé | `@pytest.mark.skip` | suppression silencieuse d'une vérification |
| Nombre magique | `if x > 42:` | personne ne sait d'où il vient |

## 3. Sécurité

- **Secrets :** toujours via l'env ou un coffre de secrets. `grep -rn "sk-"` sur le diff.
- **Injection :** SQL/commandes/templates — paramétrage uniquement.
- **Confiance dans les entrées :** validez à la frontière, pas « au fin fond ».
- **Chaîne d'approvisionnement :** une nouvelle dépendance = un nouveau fournisseur de code. Vérifiez le nom du paquet
  (le typosquatting est une vraie attaque).
- **Permissions :** l'agent ne devrait pas avoir accès à la production.

## 4. Relecture par un agent

Utile en **seconde passe**, mais pas en remplacement de la vôtre :

```
You are a strict reviewer. Here is the diff. Find:
1) deleted checks, 2) swallowed errors, 3) tests that check nothing,
4) out-of-scope changes, 5) secrets. A list of problems only, no praise.
```

Limite : un agent a tendance à être d'accord avec le code qu'il a écrit lui-même. Un « second avis » est donc
plus utile demandé à **un autre modèle** ou à un sous-agent avec un contexte neuf.

## 5. Garde-fous qualité

Ce qui doit être vert avant un merge :

```
[ ] tests
[ ] types
[ ] linter
[ ] review by a human (diff read)
[ ] no secrets
[ ] no disabled tests and no stubs
[ ] changes match the spec
```

Automatisez tout sauf le dernier point. Le dernier est réservé à l'humain.

## 6. Signaler un problème

Mauvais : « il y a un truc qui cloche ici ».
Bon :

```
src/auth.py:42 — the check `if not user.is_active` was deleted.
This lets inactive users log in. Restore the check and add a test.
```

Précision = rapidité de correction.

---

## Checklist de compréhension

1. Pourquoi commencer une relecture par les lignes supprimées ?
2. Citez 5 signaux d'alerte et le risque de chacun.
3. Pourquoi une relecture par le même modèle est-elle plus faible que par un modèle différent ?
4. Quel point du garde-fou qualité ne peut pas être automatisé ?

---

# Pratique

Voir [practice.md](practice.md).
