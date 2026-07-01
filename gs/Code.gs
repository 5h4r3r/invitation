const SPREADSHEET_ID = '1O1uKTDP6wqcsKjgClGBpzgLTBKU3zsH4xXevhF3hu0M';
const SHEET_NAME = 'Гости';

function doGet(e) {
  // getDrinks не требует токена — обрабатываем до всех проверок
  if (e.parameter.action === 'getDrinks') {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Напитки');
    if (!sheet) {
      return json({ status: 'error', message: 'Лист напитков не найден' });
    }
    const data = sheet.getDataRange().getValues();
    const drinks = [];
    for (let i = 1; i < data.length; i++) {
      if (data[i][0]) drinks.push(data[i][0]);
    }
    return json({ status: 'ok', drinks: drinks });
  }

  const token = e.parameter.token;
  if (!token) {
    return json({ error: 'no token' });
  }

  // GET-подтверждения не принимаем — только POST
  if (e.parameter.action === 'confirm') {
    return json({ status: 'error', message: 'Используйте POST для подтверждения' });
  }

  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  if (!sheet) {
    return json({ error: 'лист не найден' });
  }

  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === token) {
      return json({
        status: 'ok',
        name: data[i][1] || '',
        confirmed: data[i][2] === 'Да'
      });
    }
  }

  return json({ status: 'error', message: 'not found' });
}

function doPost(e) {
  const params = e.parameter;
  const token = params.token;
  if (!token) {
    return json({ status: 'error', message: 'Нет токена' });
  }

  // Валидация
  if (!['Да', 'Нет'].includes(params.attending)) {
    return json({ status: 'error', message: 'Некорректное значение присутствия' });
  }
  var guests;
  if (params.attending === 'Да') {
    guests = parseInt(params.guests);
    if (isNaN(guests) || guests < 0 || guests > 4) {
      return json({ status: 'error', message: 'Некорректное количество гостей' });
    }
    if (!params.drink) {
      return json({ status: 'error', message: 'Укажите напиток' });
    }
    if (!['Да', 'Нет'].includes(params.transfer)) {
      return json({ status: 'error', message: 'Некорректное значение трансфера' });
    }
  } else {
    guests = 0;
  }

  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  if (!sheet) {
    return json({ error: 'лист не найден' });
  }

  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === token) {
      sheet.getRange(i + 1, 3).setValue(params.attending); // C: Присутствует
      sheet.getRange(i + 1, 4).setValue(guests);           // D: Гостей
      sheet.getRange(i + 1, 5).setValue(params.transfer || 'Нет');  // E: Трансфер
      sheet.getRange(i + 1, 6).setValue(params.drink || 'Не пью');  // F: Напиток
      sheet.getRange(i + 1, 7).setValue(params.allergy || '');  // G: Аллергия
      sheet.getRange(i + 1, 8).setValue(params.wishes || '');   // H: Пожелания
      return json({ status: 'ok', message: 'confirmed' });
    }
  }

  return json({ status: 'error', message: 'Гость не найден' });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
