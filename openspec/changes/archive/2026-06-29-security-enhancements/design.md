# Дизайн: Усиление безопасности бэкенда

## Подход

### Google Apps Script

В `doGet()` добавить проверку — если пришёл `action=confirm`, возвращать ошибку.

```js
function doGet(e) {
  if (e.parameter.action === 'confirm') {
    return json({ status: 'error', message: 'Используйте POST для подтверждения' })
  }
  // остальная логика (getGuestData, getDrinks) без изменений
}
```

Новая функция `doPost(e)` обрабатывает confirm:

```js
function doPost(e) {
  const params = e.parameter
  const token = params.token
  if (!token) return json({ status: 'error', message: 'Нет токена' })
  if (token === 'unknown') return json({ status: 'error', message: 'not found' })

  // Валидация
  const guests = parseInt(params.guests)
  if (isNaN(guests) || guests < 0 || guests > 4)
    return json({ status: 'error', message: 'Некорректное количество гостей' })
  if (!params.drink)
    return json({ status: 'error', message: 'Укажите напиток' })
  if (!['yes', 'no'].includes(params.transfer))
    return json({ status: 'error', message: 'Некорректное значение трансфера' })

  // Поиск токена
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME)
  if (!sheet) return json({ status: 'error', message: 'Лист не найден' })
  const data = sheet.getDataRange().getValues()

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === token) {
      sheet.getRange(i + 1, 3).setValue('yes')           // C: Присутствует
      sheet.getRange(i + 1, 4).setValue(params.guests)    // D: Гостей
      sheet.getRange(i + 1, 5).setValue(params.transfer)  // E: Трансфер (было: напиток)
      sheet.getRange(i + 1, 6).setValue(params.drink)     // F: Напиток  (было: не заполнялось)
      sheet.getRange(i + 1, 7).setValue(params.allergy || '')  // G: Аллергия
      sheet.getRange(i + 1, 8).setValue(params.wishes || '')   // H: Пожелания
      return json({ status: 'ok', message: 'confirmed' })
    }
  }

  return json({ status: 'error', message: 'Гость не найден' })
}
```

### Фронтенд

В `useGuest.js` функция `api()` уже умеет POST (метод есть). `submitConfirmation` сейчас использует `api('GET', ...)` — меняем на `api('POST', ...)`. POST-логика в `api()` уже есть: добавляет заголовок `Content-Type` и отправляет тело.

```js
async function submitConfirmation(guests, drink, transfer, wishes, allergy) {
  // ... та же проверка токена ...
  const data = await api('POST', params) // было: api('GET', params)
  // ... остальное без изменений ...
}
```

## Порядок реализации
1. `gs/Code.gs` — добавить `doPost()`, исправить `doGet()`, поправить индексы колонок
2. `src/composables/useGuest.js` — сменить GET на POST в `submitConfirmation`
3. Обновить `openspec/specs/backend/spec.md` — новая документация
4. Обновить `openspec/specs/rsvp/spec.md` — добавить серверную валидацию
