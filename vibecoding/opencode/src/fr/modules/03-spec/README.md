# Module 03 — Spécification et prompt

**Temps :** 5 heures · **Format :** théorie 100 min + pratique 200 min

---

# Théorie

## 1. Un prompt n'est pas une demande, c'est une spécification

La différence entre « fais-le bien » et « fais-le comme ça », c'est la présence de **critères vérifiables**.

```
Tâche sans spec :  "ajouter l'autorisation"
Tâche avec spec :  "endpoint POST /login, accepte {email, password},
                    renvoie 200 {token} ou 401 {error},
                    le mot de passe est haché avec bcrypt, le token vit 24 h,
                    tests : login valide, mauvais mot de passe, email manquant"
```

Le second se vérifie. Le premier — seulement « à l'œil ».

## 2. Anatomie d'une spec

Une spec minimale qui fonctionne, c'est 6 blocs :

```markdown
## Contexte
Ce qui existe déjà, où ça se trouve, ce qui ne doit pas casser.

## Objectif
Une phrase : ce qui doit apparaître.

## Exigences
Une liste numérotée d'affirmations vérifiables.

## Contraintes
Ce qui est interdit : dépendances, fichiers, patterns, style.

## Critères d'acceptation
Des vérifications concrètes : commandes, tests, scénarios.

## Hors périmètre
Un « on ne fait pas ça » explicite — une protection contre la dérive du périmètre.
```

Le bloc « hors périmètre » est celui qui rapporte le plus : l'agent adore « améliorer les choses en passant ».

## 3. Les formulations qui marchent

| Marche | Ne marche pas |
| --- | --- |
| « fonction `parse_date(s: str) -> date` » | « une fonction pour les dates » |
| « renvoyer `None` si le parsing échoue » | « gérer les erreurs » |
| « comme dans `services/billing.py` » | « dans notre style » |
| « pas plus de 50 lignes » | « de façon compacte » |
| « d'abord un plan, ne pas écrire de code » | « fais-le bien » |

Règle : **remplacer chaque adjectif par une condition vérifiable.**

## 4. Le plan d'abord : l'astuce la moins chère

Demandez un plan avant le code :

```
N'écris pas de code. Fais un plan : quels fichiers tu vas toucher, quelles fonctions tu vas
ajouter, comment on va vérifier. Liste les risques et ce qui peut casser.
```

Ce que ça vous donne :

- les malentendus sont visibles en 30 secondes, pas après 300 lignes ;
- le plan se corrige avec des mots ;
- le plan devient une checklist d'acceptation ;
- du contexte est économisé.

Un mauvais plan est une raison de reformuler la tâche, pas d'« expliquer au modèle qu'il a tort ».

## 5. Décomposition

Une grosse tâche → une chaîne d'étapes vérifiables :

```
1. Ajouter le modèle de données + la migration
2. Ajouter la couche d'accès
3. Ajouter l'endpoint + les tests
4. Brancher dans l'UI
5. Supprimer l'ancien code
```

Chaque étape : son propre diff, son propre commit, des tests verts. Ainsi une erreur reste localisée à une étape,
pas « quelque part dans 800 lignes ».

## 6. Exemples (few-shot) et format

Vous voulez un style précis — donnez un exemple de code fini. Le modèle copie la structure
plus fiablement qu'il ne comprend une description.

Vous voulez un format de réponse précis — dites-le explicitement : « diff seulement », « fichier X seulement »,
« un tableau », « pas d'explications ».

## 7. Ce qu'il faut éviter

- **Exigences doubles** : « fais-le vite et de qualité ».
- **Exigences cachées** : « tu vois ce que je veux dire » → le modèle l'a compris à sa façon.
- **Tâches monstres** : 5 objectifs dans une seule demande.
- **Demandes « réécris tout »** : rien à vérifier, tout casse d'un coup.

## 8. Le prompt comme artefact

Une bonne spec survit à la session : vous pouvez la mettre dans `docs/specs/`, en discuter en review,
la réutiliser. Un prompt qui « a marché » est un actif du projet, pas un déchet de l'historique.

---

## Checklist de compréhension

1. En quoi une spec diffère-t-elle d'une demande ? Nommez le trait distinctif.
2. Pourquoi le bloc « hors périmètre » est-il nécessaire ?
3. Pourquoi le plan d'abord coûte-t-il moins cher que d'aller droit au code ?
4. Que faire si le plan est mauvais — et que ne faut-il surtout pas faire ?

---

# Pratique

Voir [practice.md](practice.md).
