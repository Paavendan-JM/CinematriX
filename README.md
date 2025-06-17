# 🎬 CINEMATRIX

![Movie Blasters Banner](./banner2.jpg)

**Cinematrix** is a fast, responsive Vue 3 app for discovering trending, upcoming, and searched movies. Powered by **TMDB** and **OMDB** APIs, it delivers clean UI, trailer links, and detailed movie info in a comic-style theme.

---

## ⚡ Features

- 🔥 Trending & Upcoming Movies (TMDB)
- 🔍 Search by title (OMDB)
- 🎞️ Movie details in a modal (IMDb rating, cast, plot, etc.)
- 📺 Direct trailer link via TMDB
- 🎨 Stylish comics-theme UI (Goblin Green + Black)

---

## 🛠 Tech Stack

- **Frontend**: Vue 3 + Tailwind CSS
- **APIs**: TMDB, OMDB
- **Bundler**: Vite

---

## 🚀 Setup

```bash
git clone https://github.com/your-username/cinematrix.git
cd cinematrix
npm install
```

Create `.env` in the root:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_OMDB_API_KEY=your_omdb_api_key
```

Run locally:

```bash
npm run dev
```

---

## 📁 Structure

```
cinematrix/
├── client/
│   ├── App.vue
│   ├── api.js
│   └── style.css
├── .env
└── README.md
```

---

## 🙌 Author

Built with ♥ by **Paav**
