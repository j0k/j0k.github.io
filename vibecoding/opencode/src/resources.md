# Ресурсы

Что читать и смотреть сверх курса. Без «100 ссылок» — только то, что проверено.

---

## Официальная документация

| Тема | Ссылка |
| --- | --- |
| OpenCode V2 — документация | https://opencode.ai/v2/docs/ |
| Конфигурация | https://opencode.ai/v2/docs/config/ |
| Права (permissions) | https://opencode.ai/v2/docs/permissions/ |
| Провайдеры и модели | https://opencode.ai/v2/docs/providers/ |
| MCP-серверы | https://opencode.ai/v2/docs/mcp-servers/ |
| Skills | https://opencode.ai/v2/docs/skills/ |
| Каталог моделей и цен | https://models.dev |

---

## Основы LLM

- **Anthropic, «Building effective agents»** — про циклы и инструменты, без магии.
- **OpenAI Cookbook** — практические рецепты промптинга.
- **«Attention is all you need»** (Vaswani et al.) — если хочется понять устройство.
- **Andrej Karpathy, «Intro to Large Language Models»** (видео) — лучшее объяснение с нуля.

---

## Инженерия процессов

- **Google, «Code Review Developer Guide»** — классика ревью, применима к диффам агента.
- **«Working Effectively with Legacy Code»** (Michael Feathers) — про то, как трогать
  код без тестов; полезно перед миграциями.
- **Trunk-based development** — почему маленькие коммиты важны.
- **12 Factor App** — конфигурация и секреты.

---

## Безопасность

- **OWASP Top 10** — обязательный минимум при ревью.
- **Supply chain attacks** (typosquatting, dependency confusion) — почему новая
  зависимость от агента требует проверки.

---

## Практика

- Собственный `AGENTS.md` в каждом проекте.
- Один эксперимент из модуля 01 раз в месяц: интуиция о моделях быстро устаревает.
- Вести `docs/decisions.md` — через полгода это единственный источник «почему так».

---

## Что НЕ читать в начале

- Списки «100 промптов, которые изменят всё» — противоречат содержанию курса.
- Статьи «мы заменили команду ИИ» — маркетинг, а не методология.
- Гайды по конкретным «чит-кодам» промптинга — устаревают быстрее, чем модели.
