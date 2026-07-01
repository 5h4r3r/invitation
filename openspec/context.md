# Контекст проекта

## Стек
- **Фронт**: Vue 3 (Vite), SFC, scoped CSS
- **Бэкенд**: Google Apps Script (Web App)
- **Хостинг**: GitHub Pages (ветка `gh-pages`)
- **Деплой**: `npm run build` → `git push origin gh-pages`

## API
- **URL**: указывается в `src/composables/useGuest.js` (константа `API_URL`)
- **Формат**: всегда JSON, Content-Type: `application/json; charset=utf-8`
- **GET** — поиск гостя по токену, список напитков
- **POST** — подтверждение присутствия

## Таблицы Google Sheets

### Лист «Гости»
| Колонка | Заголовок | Формат |
|---------|-----------|--------|
| A | Токен | строка (`code` из URL) |
| B | Имя | строка |
| C | Присутствует | «Да» / «Нет» |
| D | Гостей | число |
| E | Трансфер | «Да» / «Нет» |
| F | Напиток | строка |
| G | Аллергия | строка |
| H | Пожелания | строка |

### Лист «Напитки»
| Колонка | Заголовок | Формат |
|---------|-----------|--------|
| A | Название | строка (с A2, A1 — заголовок) |

## Ключевые правила (не нарушать!)
1. **Русский язык в таблице**: в колонки пишем только «Да»/«Нет», никогда `yes`/`no`
2. **POST для подтверждения**: `doPost()`, а не `doGet()`
3. **Присутствие — always**: передаётся параметр `attending=Да|Нет`
4. **Валидация на фронте**: кнопка disabled, пока не заполнены все поля (гости, трансфер, напиток, аллергия — если `attending=Да`)
5. **Honeypot + тайминг**: защита от ботов (поле `botField`, задержка 2500ms)
6. **localStorage**: кешируем `weddingToken`, `weddingName`, `weddingConfirmed`

## Параметры запроса confirm (POST)
`token`, `action=confirm`, `attending`, `guests`, `drink`, `transfer`, `wishes`, `allergy`

## URL бэкенда (текущий)
`AKfycbwzEQoXSM4kiOzkR29knUgVzCneo9UK9WlcFDtBm8mAfLt_DxZVBz3uoKJ371hbpONSZA/exec`
