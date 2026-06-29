# Delta для бэкенда

## ADDED Requirements

### Requirement: Подтверждение через POST
Система MUST принимать подтверждение присутствия только через HTTP POST. GET-запросы с `action=confirm` MUST отклоняться.

#### Scenario: Confirm через POST
- ДАНО POST-запрос с параметрами `action=confirm&token=abc123&guests=2&drink=Вино`
- КОГДА запрос получен в `doPost()`
- ТОГДА строка гостя обновляется
- И возвращается `{ status: 'ok', message: 'confirmed' }`

#### Scenario: Confirm через GET отклонён
- ДАНО GET-запрос с `?action=confirm&token=abc123`
- КОГДА запрос получен в `doGet()`
- ТОГДА возвращается `{ status: 'error', message: 'Используйте POST для подтверждения' }`

### Requirement: Серверная валидация полей
Система MUST проверять переданные поля перед записью в таблицу.

#### Scenario: Валидация guests
- ДАНО POST-запрос с `guests=10`
- КОГДА значение не в диапазоне 0-4
- ТОГДА возвращается `{ status: 'error', message: 'Некорректное количество гостей' }`
- И данные не записываются

#### Scenario: Валидация drink
- ДАНО POST-запрос с `drink=`
- КОГДА напиток пустой
- ТОГДА возвращается ошибка

