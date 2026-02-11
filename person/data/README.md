# Life Episodes data

- **data/episodes.json** — список id эпизодов по порядку: `["episode_001", "episode_002", ...]`
- **data/episode_XXX/** — папка одного эпизода, внутри файл **episode.json**

## Формат episode.json

```json
{
  "id": "episode_001",
  "type": "chapter",
  "title": "Название",
  "year": "2025",
  "description": "Текст описания. Можно в несколько абзацев.",
  "cover": "img/me_bw_small.jpg",
  "locations": [
    { "name": "Москва", "lat": 55.7558, "lon": 37.6173 }
  ],
  "links": [
    { "label": "Подпись", "url": "https://..." }
  ],
  "photos": ["data/episode_001/photo1.jpg"],
  "events": [
    { "date": "Jan 2025", "label": "Краткое название события" }
  ]
}
```

- **locations** — массив: у каждого пункта обязательны `name`, `lat`, `lon` (координаты для OpenStreetMap).
- **cover** — путь к обложке для карусели (от корня сайта). Если нет — будет плейсхолдер.
- **photos** — пути к фото от корня сайта (например, файлы в папке эпизода).
- **events** — массив событий для горизонтального таймлайна под эпизодом: у каждого объекта поля **date** (подпись даты) и **label** (название события).

Чтобы добавить эпизод: создай папку `data/episode_004/`, положи в неё `episode.json` и добавь `"episode_004"` в **data/episodes.json**.
