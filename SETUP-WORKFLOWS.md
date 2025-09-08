# Настройка GitHub Actions Workflows

## Что было создано

### 1. Workflows
- **`ci.yml`** - Основной CI/CD pipeline
- **`security.yml`** - Проверки безопасности
- **`performance.yml`** - Тестирование производительности
- **`release.yml`** - Создание релизов

### 2. Конфигурационные файлы
- **`.eslintrc.js`** - Настройки ESLint
- **`vitest.config.js`** - Настройки тестов
- **`.lighthouserc.json`** - Настройки Lighthouse
- **`.prettierrc`** - Настройки форматирования
- **`.prettierignore`** - Исключения для Prettier

### 3. Обновленный package.json
- Добавлены новые скрипты для тестирования, линтинга и форматирования
- Добавлены необходимые dev зависимости

## Быстрая настройка

### 1. Установите зависимости

```bash
npm install
```

### 2. Настройте Secrets в GitHub

Перейдите в Settings > Secrets and variables > Actions и добавьте:

- `SNYK_TOKEN` (опционально) - для security scan

### 3. Настройте Environments (опционально)

Создайте environments в Settings > Environments:
- `staging` - для staging деплоя
- `production` - для production деплоя

### 4. Обновите переменные окружения

В файлах workflow обновите:
- `VITE_API_URL` - URL вашего API
- `VITE_GRAPHQL_ENDPOINT` - URL GraphQL endpoint
- Команды деплоя в секциях deploy

## Тестирование локально

### Запуск всех проверок

```bash
# Линтинг
npm run lint

# Форматирование
npm run format:check

# Тесты
npm test

# Сборка
npm run build

# Аудит безопасности
npm run audit
```

### Проверка Docker

```bash
# Сборка образа
docker build -f Dockerfile.simple -t passport-client .

# Запуск контейнера
docker run -p 3000:3000 passport-client

# Проверка health check
curl http://localhost:3000/health
```

## Что проверяет workflow

### При каждом push/PR:
1. ✅ Качество кода (ESLint)
2. ✅ Форматирование (Prettier)
3. ✅ Unit тесты с покрытием
4. ✅ Сборка приложения
5. ✅ Аудит безопасности
6. ✅ Сборка Docker образа
7. ✅ Тестирование Docker контейнера

### При push в develop:
8. ✅ Деплой на staging

### При push в main:
9. ✅ Деплой на production
10. ✅ Health check

### Еженедельно:
11. ✅ Полный security scan
12. ✅ Dependency review

## Кастомизация

### Добавление новых тестов

1. Создайте тест файлы с суффиксом `.test.js` или `.spec.js`
2. Тесты автоматически подхватятся Vitest

### Настройка деплоя

Обновите секции в `ci.yml`:

```yaml
- name: Deploy to staging
  run: |
    # Ваши команды деплоя
    rsync -avz build/ user@staging-server:/var/www/app/
    ssh user@staging-server "cd /var/www/app && docker-compose up -d"
```

### Настройка уведомлений

Добавьте в workflow:

```yaml
- name: Notify on failure
  if: failure()
  uses: 8398a7/action-slack@v3
  with:
    status: failure
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

## Мониторинг

- **Статус**: Actions tab в GitHub
- **Coverage**: Codecov (если настроен)
- **Security**: Security tab в GitHub
- **Performance**: Lighthouse CI reports

## Troubleshooting

### Workflow не запускается
- Проверьте, что файлы находятся в `.github/workflows/`
- Убедитесь, что синтаксис YAML корректен

### Тесты падают
- Запустите `npm test` локально
- Проверьте настройки в `vitest.config.js`

### Сборка падает
- Запустите `npm run build` локально
- Проверьте переменные окружения

### Docker падает
- Проверьте Dockerfile
- Убедитесь, что все файлы скопированы

## Дополнительные возможности

### Автоматическое создание PR
Можно добавить workflow для автоматического создания PR с обновлениями зависимостей.

### Автоматическое тестирование на разных версиях Node.js
Обновите `strategy.matrix` в workflow.

### Интеграция с внешними сервисами
- **Codecov** для coverage reports
- **Snyk** для security scanning
- **Slack/Discord** для уведомлений
- **Jira** для интеграции с задачами
