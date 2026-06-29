# Инфраструктура
Язык: русский

## Purpose
Сборка, деплой, хостинг и среда разработки проекта.

## Requirements

### Requirement: Инструмент сборки
Проект MUST использовать Vite в качестве инструмента сборки с Vue 3.

#### Scenario: Запуск сборки
- ДАНО установлены зависимости
- КОГДА выполняется `corepack npm run build`
- ТОГДА Vite собирает проект в директорию `dist/`

### Requirement: Команда сборки
`corepack npm run build` MUST создавать директорию `dist/` с готовыми к продакшену статическими файлами.

#### Scenario: Результат сборки
- ДАНО проект собран
- КОГДА проверяется директория `dist/`
- ТОГДА в ней находятся все статические файлы для деплоя

### Requirement: Хостинг
Сайт MUST быть размещён на GitHub Pages с CNAME `inv.d-corp.ru`.

#### Scenario: Публикация
- ДАНО ветка `gh-pages` содержит собранный проект
- КОГДА GitHub Pages публикует содержимое
- ТОГДА сайт доступен по адресу `https://inv.d-corp.ru/`

### Requirement: Ветка деплоя
Ветка `gh-pages` MUST содержать содержимое собранной `dist/`. Деплой производится коммитом и пушем в ветку `gh-pages`.

#### Scenario: Деплой
- ДАНО `dist/` содержит актуальную сборку
- КОГДА выполняется `git push origin gh-pages`
- ТОГДА сайт обновляется на GitHub Pages

### Requirement: CNAME
Файл `CNAME` с содержимым `inv.d-corp.ru` MUST существовать в корне публикуемой директории.

#### Scenario: DNS
- ДАНО GitHub Pages опубликовал сайт
- КОГДА DNS запрашивает `inv.d-corp.ru`
- ТОГДА запрос разрешается в GitHub Pages

### Requirement: Node.js
Среда разработки MUST использовать Node.js v22.14.0 (портативная версия, без системной установки) по пути `$env:LOCALAPPDATA\nodejs\node-v22.14.0-win-x64`.

#### Scenario: Проверка версии
- ДАНО Node.js установлен
- КОГДА выполняется `node --version`
- ТОГДА выводится `v22.14.0`

### Requirement: npm
npm MUST использоваться через corepack: `$env:PATH = "$env:LOCALAPPDATA\nodejs\node-v22.14.0-win-x64;$env:PATH"; corepack npm <команда>`

#### Scenario: Установка зависимостей
- ДАНО настроен PATH на портативный Node.js
- КОГДА выполняется `corepack npm install`
- ТОГДА зависимости устанавливаются

### Requirement: Доступность
Приложение MUST быть доступно по адресу https://inv.d-corp.ru/ через GitHub Pages.

#### Scenario: Доступ к сайту
- ДАНО пользователь переходит по адресу https://inv.d-corp.ru/
- КОГДА DNS разрешается
- ТОГДА сайт GitHub Pages загружается
- И страница отображается со всеми секциями, именем гостя (если есть токен) и RSVP-формой

### Requirement: Секреты в репозитории
Файл `gs/Code.gs` MUST быть в `.gitignore`, так как может содержать SPREADSHEET_ID.

#### Scenario: Игнорирование файла
- ДАНО `gs/Code.gs` изменён
- КОГДА выполняется `git status`
- ТОГДА файл не отображается в списке изменений
