# GitHub Actions Workflows

Этот репозиторий содержит несколько GitHub Actions workflows для автоматизации CI/CD процесса.

## Workflows

### 1. CI/CD Pipeline (`.github/workflows/ci.yml`)

Основной workflow, который выполняется при:
- Push в ветки `main` и `develop`
- Pull Request в ветки `main` и `develop`
- Ручном запуске

**Этапы:**
1. **Lint & Format Check** - Проверка качества кода
2. **Unit Tests** - Запуск unit тестов с покрытием
3. **Build & Security Check** - Сборка приложения и проверка безопасности
4. **Docker Build & Test** - Сборка Docker образа и тестирование
5. **E2E Tests** - End-to-end тесты (отключены по умолчанию)

### 2. Security Scan (`.github/workflows/security.yml`)

Проверка безопасности, выполняется:
- При push и PR
- Еженедельно по понедельникам в 2:00
- Ручном запуске

**Проверки:**
- npm audit для уязвимостей
- Snyk security scan
- Dependency review для PR

### 3. Performance Test (`.github/workflows/performance.yml`)

Тестирование производительности:
- Lighthouse CI для метрик производительности
- Bundle analysis для анализа размера бандла

### 4. Release (`.github/workflows/release.yml`)

Создание релизов:
- При создании тега версии
- Ручном запуске с указанием версии

## Переменные окружения

### Secrets (настройте в Settings > Secrets)

- `SNYK_TOKEN` - Токен для Snyk security scan
- `GITHUB_TOKEN` - Автоматически предоставляется GitHub

### Environment Variables

- `NODE_VERSION` - Версия Node.js (по умолчанию: 18)
- `VITE_API_URL` - URL API сервера
- `VITE_GRAPHQL_ENDPOINT` - URL GraphQL endpoint

## Локальная разработка

### Установка зависимостей

```bash
npm install
```

### Запуск тестов

```bash
# Unit тесты
npm test

# Тесты с покрытием
npm run test:coverage

# Тесты в watch режиме
npm run test:watch
```

### Линтинг и форматирование

```bash
# Проверка линтера
npm run lint

# Исправление ошибок линтера
npm run lint:fix

# Проверка форматирования
npm run format:check

# Форматирование кода
npm run format
```

### Сборка

```bash
# Production сборка
npm run build

# Анализ бандла
npm run analyze

# Preview сборки
npm run preview
```

## Настройка

### 1. Включение E2E тестов

Раскомментируйте секцию `e2e-tests` в `ci.yml` и настройте Playwright.

### 2. Настройка деплоя

Обновите секции `deploy-staging` и `deploy-production` в `ci.yml` с вашими командами деплоя.

### 3. Настройка Snyk

1. Зарегистрируйтесь на [snyk.io](https://snyk.io)
2. Получите токен API
3. Добавьте `SNYK_TOKEN` в Secrets репозитория

### 4. Настройка Lighthouse

Обновите `.lighthouserc.json` с вашими требованиями к производительности.

## Мониторинг

- **Статус workflows**: Actions tab в GitHub
- **Coverage reports**: Codecov (если настроен)
- **Security alerts**: Security tab в GitHub
- **Performance metrics**: Lighthouse CI reports

## Troubleshooting

### Частые проблемы

1. **Tests failing** - Проверьте тесты локально с `npm test`
2. **Build failing** - Проверьте сборку локально с `npm run build`
3. **Docker build failing** - Проверьте Dockerfile и зависимости
4. **Security scan failing** - Обновите уязвимые зависимости

### Логи

Все логи доступны в Actions tab. Для отладки:
1. Откройте failed workflow
2. Нажмите на failed job
3. Разверните failed step для просмотра логов
