# Module 00 — Orientation

**Durée :** 2 heures · **Format :** 40 min de théorie + 80 min de pratique

---

# Théorie

## 1. Ce qu'est le vibe coding (et ce qu'il n'est pas)

Le **vibe coding** est un développement où l'agent écrit une part significative du code, tandis que
l'humain joue le rôle de définisseur de tâche, de relecteur et de propriétaire du résultat.

Ce n'est **pas** « appuyer sur un bouton — obtenir un produit ». C'est un déplacement de la division du travail :

| Avant | Maintenant |
| --- | --- |
| vous écrivez le code | vous écrivez la spec et le contrôle |
| vous vous souvenez de l'API | vous vérifiez que l'API existe |
| une erreur = une faute de frappe | une erreur = une contre-vérité écrite avec assurance |
| la vitesse = la vitesse de frappe | la vitesse = la qualité du contexte |

Le déplacement clé : **le goulot d'étranglement est passé de la frappe du code à l'énoncé de la tâche et à sa vérification.**

## 2. Trois rôles

Ils ne fonctionnent qu'ensemble :

```
Définisseur de tâche  →  ce qu'on fait, pourquoi, comment on vérifie
Agent                 →  exécutant rapide, ne connaît pas votre contexte
Relecteur             →  lit le diff, attrape les mensonges, valide le commit
```

Si vous cumulez les trois rôles et rognez sur la relecture, vous gagnez en vitesse d'écriture
et en vitesse d'accumulation de dette en même temps.

## 3. Où l'agent est fort et où il échoue

**Fort sur :**
- le code répétitif, le code typique (CRUD, configs, tests par l'exemple) ;
- le portage entre langages et bibliothèques ;
- l'explication du code d'autrui ;
- les modifications massives et répétitives.

**Échoue sur :**
- le contexte interne inconnu (« comment on fait les choses ici ») ;
- les longues chaînes d'exigences sans vérification ;
- les versions exactes d'API absentes des données d'entraînement ;
- les tâches où « correct » = « ce que le métier a décidé », et non « ce que fait internet ».

Conclusion : donnez à l'agent ce qui se vérifie, gardez pour vous ce qui demande du jugement.

## 4. Le modèle n'est pas le facteur principal

Ordre d'influence sur le résultat :

```
contexte et énoncé de la tâche  >  avoir une vérification  >  itération  >  modèle  >  formulation du prompt
```

Les « mots magiques » du genre « réfléchis étape par étape » ont un effet d'un ordre de grandeur inférieur
à un `AGENTS.md` correctement appliqué et à un test qui passe.

## 5. Outils

OpenCode est un agent en ligne de commande : il lit des fichiers, les modifie, exécute des commandes et demande des permissions.

Trois choses à connaître dès le premier jour :

| Chose | Pourquoi |
| --- | --- |
| **Session** | un contexte de travail ; une nouvelle tâche = une nouvelle session |
| **Permissions** | ce que l'agent peut faire sans demander, et ce qu'il ne doit jamais faire |
| **Modèle** | choisi pour la tâche, pas « un seul pour tout » |

---

## Checklist de compréhension

Répondez-vous à vous-même sans regarder en arrière :

1. Pourquoi le goulot d'étranglement s'est-il déplacé de la frappe du code vers l'énoncé de la tâche ?
2. Citez trois types de tâches où l'agent est systématiquement plus faible qu'un humain.
3. Pourquoi économiser sur la relecture du diff est-il une mauvaise économie ?
4. Qu'est-ce qui apporte le plus de gain : changer de modèle ou `AGENTS.md` ? Pourquoi ?

---

# Pratique

Voir [practice.md](practice.md).
