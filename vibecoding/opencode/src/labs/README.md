# Labs

Сюда складываются артефакты практики. Структура обязательна — проверяющий ищет файлы по ней.

```
labs/
├── 00-setup.md
├── 01-experiments.md
├── 02-context/
│   ├── AGENTS.md
│   └── report.md
├── 03-specs/
│   ├── spec-a.md
│   ├── spec-b.md
│   ├── spec-c.md
│   └── prompts.md
├── 04-oracles/
│   └── report.md
├── 05-agent-loop/
│   └── report.md
├── 06-economics/
│   └── report.md
├── 07-refactor/
│   └── report.md
├── 08-review/
│   ├── checklist.md
│   └── report.md
├── 09-custom/
│   └── report.md
└── 10-capstone/
    ├── spec.md
    ├── plan.md
    ├── review.md
    ├── retro.md
    └── links.md
```

## Требования к отчёту

Любой `report.md` содержит:

```markdown
# Отчёт: модуль NN

## Задание N
**Ожидал:**
**Факт:**
**Вывод:**

## Метрики
- Время:
- Стоимость:
- Итераций:

## Что заберу в работу
1.
```

Отчёт без раздела «Ожидал / Факт / Вывод» не принимается: важен вывод, а не факт выполнения.
