# Glossaire

Les concepts du cours. S'enrichit au fil des modules.

---

## A–Z

**AGENTS.md** — un fichier d'instructions projet, lu automatiquement à chaque session.

**Agent** — un LLM dans la boucle « décision → appel d'outil → résultat → décision ».

**Auto (`--auto`)** — un mode qui approuve automatiquement les actions non interdites par les règles. Sandbox uniquement.

---

## V

**Vibe coding** — un développement où le code est en grande partie écrit par un agent, tandis que
l'humain définit la tâche et vérifie le résultat.

**Vérification** — contrôle automatique du résultat (tests, types, linter, exécution).

---

## H

**Hallucination** — une sortie du modèle plausible mais incorrecte. Une conséquence de la conception, pas un « bug ».

---

## D

**Diff** — une représentation ligne à ligne des changements ; l'objet principal de la revue.

**Décomposition** — découpage d'une tâche en étapes vérifiables indépendamment.

---

## C

**Contexte** — tout ce que le modèle voit dans une requête : instructions, fichiers, historique, la question.

**Fenêtre de contexte** — la quantité maximale de contexte en tokens.

**Compaction** — compression automatique de l'historique de session quand le contexte se remplit.

**Cache** — un préfixe stable et mémorisé de la requête ; lire depuis le cache coûte 5 à 10 fois moins cher.

---

## L

**Lost in the middle** — l'effet où une information située au milieu d'un long contexte
est moins bien utilisée qu'au début et à la fin.

---

## M

**MCP (Model Context Protocol)** — un protocole pour connecter des outils externes à l'agent.

**Modèle** — un réseau de neurones qui prédit le token suivant.

---

## O

**Oracle** — une source automatique de « oui/non » : un test, un compilateur, un linter, une exécution.

---

## P

**Permission** — une règle `action + ressource + effet` qui définit ce que l'agent peut faire.

**Plan-first** — l'approche « d'abord le plan, ensuite le code ».

**Prompt** — une instruction textuelle au modèle. Dans ce cours, elle est traitée comme une spécification.

---

## R

**Tokens de raisonnement** — tokens de raisonnement cachés dans les modèles « thinking » ; plus chers, mais meilleurs
sur les tâches complexes.

**Revue** — lecture et vérification d'un diff par un humain.

---

## S

**Session** — un contexte de travail de l'agent ; l'unité d'hygiène.

**Spec** — une description formalisée d'une tâche avec des critères vérifiables.

**Sous-agent** — une session d'agent séparée pour une sous-tâche ; il ne voit pas le contexte principal.

**Skill** — un dossier avec des instructions et des ressources, chargé en fonction de sa description.

---

## T

**Token** — l'unité de texte pour le modèle (3–4 caractères en moyenne).

**Appel d'outils** — le mécanisme par lequel le modèle demande l'exécution d'un outil.

---

## F

**Few-shot** — une technique avec des exemples dans le prompt qui fixent le format ou le style.

**Fast / mini / flash** — la classe des modèles rapides et bon marché.

**Frontier** — la classe des modèles les plus puissants (et les plus chers).

---

## CI

**CI (Continuous Integration)** — vérifications automatiques à chaque commit.

---

## E

**Embedding** — une représentation vectorielle de texte ; utilisée pour la recherche, pas pour la génération.

---

## A

**Ancrage** — l'effet où le modèle répète sa décision antérieure (éventuellement erronée).
