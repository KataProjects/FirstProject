# FSD React App

Современное React приложение, построенное с использованием архитектуры **Feature-Sliced Design (FSD)**.

## 🚀 Технологии

- **React 19** - современная библиотека для создания пользовательских интерфейсов
- **TypeScript** - типизированный JavaScript
- **Vite** - быстрый инструмент сборки
- **Tailwind CSS** - utility-first CSS фреймворк
- **Feature-Sliced Design** - архитектурная методология

## 📁 Структура проекта (FSD)

```
src/
├── app/           # Инициализация приложения
├── pages/         # Страницы приложения
├── widgets/       # Композитные блоки
├── features/      # Функциональные модули
├── entities/      # Бизнес-сущности
└── shared/        # Переиспользуемый код
    ├── ui/        # UI компоненты
    ├── lib/       # Утилиты
    ├── api/       # API клиенты
    ├── config/    # Конфигурация
    └── types/     # Общие типы
```

## 🏗️ Архитектура FSD

### Слои (сверху вниз):

1. **app/** - Инициализация приложения, провайдеры, роутинг
2. **pages/** - Страницы приложения, композиция виджетов
3. **widgets/** - Композитные блоки, объединяющие features и entities
4. **features/** - Функциональные модули (авторизация, посты и т.д.)
5. **entities/** - Бизнес-сущности (пользователь, пост и т.д.)
6. **shared/** - Переиспользуемый код (UI, утилиты, API)

### Принципы:

- **Сслайсы слоя могут зависеть только от слоев ниже себя**
- **Каждый слайс имеет свою структуру: api/, config/, lib/, model/, ui/**
- **Строгая изоляция между слоями**
- **Переиспользование через shared слой**

## 🎨 UI Компоненты

В `shared/ui` созданы базовые компоненты:

...

## 🚀 Запуск проекта

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Предварительный просмотр сборки
npm run preview

# Проверка с помощью ESLint
npm run lint

# Форматировать все файлы
npm run format

# Проверить форматирование
npm run format:check
```

## 🔧 Разработка

### Добавление нового feature:

1. Создайте папку в `features/`
2. Добавьте `model/`, `ui/`, `lib/` подпапки
3. Создайте типы в `model/types.ts`
4. Реализуйте UI компоненты в `ui/`
5. Экспортируйте через `index.ts`

### Добавление нового entity:

1. Создайте папку в `entities/`
2. Добавьте `model/`, `ui/` подпапки
3. Создайте типы в `model/types.ts`
4. Реализуйте UI компоненты в `ui/`
5. Экспортируйте через `index.ts`

## 📚 Документация

- [Feature-Sliced Design](https://feature-sliced.design/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite](https://vitejs.dev/guide/)

## 🤝 Вклад в проект

1. Fork репозитория
2. Создайте feature ветку (`git checkout -b feature/amazing-feature`)
3. Commit изменения (`git commit -m 'Add amazing feature'`)
4. Push в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

prettier:
✅ Установлен плагин @trivago/prettier-plugin-sort-imports для сортировки импортов:

- React импорты первыми
- Затем внешние библиотеки
- Потом внутренние импорты
- Локальные импорты
  ✅ Правила форматирования в .prettierrc:
- printWidth: 100 - максимальная ширина строки
- tabWidth: 2 - отступ в 2 пробела
- useTabs: false - использовать пробелы вместо табов
- semi: true - добавлять точку с запятой
- singleQuote: true - одинарные кавычки
- trailingComma: "all" - запятые в конце
- bracketSpacing: true - пробелы в скобках
- bracketSameLine: false - закрывающие скобки на новой строке
- arrowParens: "always" - всегда скобки для стрелочных функций
- endOfLine: "lf" - Unix окончания строк
  ✅ .prettierignore для исключения ненужных файлов
