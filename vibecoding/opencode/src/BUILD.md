# Сборка сайта курса «Вайбкодинг с OpenCode»

HTML-версия курса собирается из Markdown-исходников этого каталога (`src/`).
Внешних зависимостей у сайта нет: только общий `assets/style.css`.

## Структура сайта

```
opencode/
├── index.html                  обзор курса: программа, расписание, оценки
├── modules/
│   ├── NN-slug.html            теория модуля
│   └── NN-slug-practice.html   практика модуля
├── templates/*.html            шаблоны артефактов
├── templates.html              оглавление шаблонов
├── rubric.html                 критерии оценки
├── glossary.html               глоссарий
├── resources.html              что читать дальше
├── progress.html               трекер прогресса
├── labs.html                   куда сдавать артефакты
├── build.html                  эта страница
├── assets/style.css            общий стиль
└── src/                        markdown-исходники и сборщик
```

## Как пересобрать

Правьте Markdown в `src/`, затем:

```bash
cd src
python build.py
```

Нужен пакет `markdown`:

```bash
pip install markdown
```

Сборщик сам переписывает ссылки `*.md` во внутренние `.html`, подставляет
правильные относительные пути и собирает навигацию по модулям.
Руками ссылки в HTML трогать не нужно — следующая сборка их перезапишет.

## Что добавляется при сборке

- Единый сайдбар: все модули (теория + практика) и материалы курса.
- Переходы «теория ↔ практика» в шапке страницы модуля и пейджер внизу.
- Чек-листы `- [ ]` кликабельные; прогресс хранится в `localStorage`
  отдельно для каждой страницы.
- Чекбоксы в таблицах (трекер прогресса) тоже кликабельные.
- `Ctrl+P` даёт чистую версию: без сайдбара, пейджера и прогресс-бара.

## Файлы исходников

| Файл | Страница |
| --- | --- |
| `README.md` | `index.html` |
| `modules/NN-slug/README.md` | `modules/NN-slug.html` |
| `modules/NN-slug/practice.md` | `modules/NN-slug-practice.html` |
| `templates/*.md` | `templates/*.html` |
| `rubric.md` | `rubric.html` |
| `glossary.md` | `glossary.html` |
| `resources.md` | `resources.html` |
| `progress.md` | `progress.html` |
| `labs/README.md` | `labs.html` |
| `BUILD.md` | `build.html` |
