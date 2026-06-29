# Задачи

## [backend] Google Apps Script
- [ ] 1.1 Добавить `doPost(e)` с серверной валидацией (guests 0-4, drink не пустой, transfer yes/no)
- [ ] 1.2 В `doGet(e)` добавить проверку: если `action=confirm` — вернуть ошибку
- [ ] 1.3 Исправить индексы колонок при записи (C=Присутствует, D=Гостей, E=Трансфер, F=Напиток, G=Аллергия, H=Пожелания)

## [rsvp] Фронтенд
- [ ] 2.1 В `submitConfirmation` сменить `api('GET', params)` на `api('POST', params)`

## [docs] Спеки
- [ ] 3.1 Обновить `openspec/specs/backend/spec.md` — описать POST + валидацию + исправленные колонки
- [ ] 3.2 Обновить `openspec/specs/rsvp/spec.md` — добавить требование серверной валидации
