# Публикация NUR SPA на Vercel

## Вариант 1: Через перетаскивание (30 секунд)

1. Откройте **vercel.com** и войдите
2. Перейдите на **vercel.com/new**
3. Перетащите папку `dist` из `C:\Users\lenovo\Desktop\NUR SPA\dist` в окно браузера
4. Vercel загрузит и опубликует сайт

---

## Вариант 2: Через GitHub (правильный способ, с автодеплоем)

### Шаг 1: Загрузите код на GitHub

Откройте Git Bash в папке проекта и выполните:

```bash
cd "C:/Users/lenovo/Desktop/NUR SPA"

# Создать репозиторий на GitHub
gh repo create nur-spa --public --source=. --remote=origin --push
```

Если `gh` не установлен, создайте репозиторий вручную:

1. Откройте **github.com/new**
2. Название: **nur-spa**
3. Public, без README/gitignore
4. Создайте репозиторий
5. Выполните команды:

```bash
cd "C:/Users/lenovo/Desktop/NUR SPA"
git remote add origin https://github.com/ваш-username/nur-spa.git
git push -u origin main
```

### Шаг 2: Подключите к Vercel

1. Откройте **vercel.com**
2. Нажмите **"Add New Project"**
3. Выберите **"Import Git Repository"**
4. Найдите **nur-spa** → **Import**
5. Framework Preset: **Vite**
6. Build Command: `npm run build`
7. Output Directory: `dist`
8. Нажмите **"Deploy"**

Vercel автоматически соберёт и опубликует сайт (2-3 минуты).

---

## Вариант 3: Через Vercel CLI

```bash
cd "C:/Users/lenovo/Desktop/NUR SPA"
vercel --prod
```

Следуйте инструкциям в терминале.

---

## Готовый локальный сервер

Сайт уже работает локально на **http://localhost:4322**

Продакшен-сборка в папке `dist/` — готова к публикации.
