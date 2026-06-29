# Предложение: Усиление безопасности бэкенда

## Цель
Закрыть уязвимости Google Apps Script API: подтверждение через GET (триггерится prefetch-ом), отсутствие серверной валидации, баг с сохранением колонок.

## Область применения
- `gs/Code.gs` — переписать confirm на POST, добавить валидацию полей, исправить индексы колонок
- `src/composables/useGuest.js` — отправлять confirm через POST
- `openspec/specs/backend/spec.md` — обновить доку
- `openspec/specs/rsvp/spec.md` — добавить требование серверной валидации

## Подход
1. Добавить `doPost(e)` — обрабатывает `action=confirm` через POST
2. `doGet(e)` — возвращает ошибку, если `action=confirm` передан через GET
3. В `doPost` проверять: guests (0-4), drink (не пустой), transfer (yes/no)
4. Исправить индексы колонок: C=Присутствует, D=Гостей, E=Трансфер, F=Напиток, G=Аллергия, H=Пожелания
5. Фронтенд: `submitConfirmation` → POST с `Content-Type: application/x-www-form-urlencoded`
