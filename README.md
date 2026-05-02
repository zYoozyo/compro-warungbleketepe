# compro-warungbleketepe · Warung Bleketepe

Situs komposisi/resmi untuk **Warung Bleketepe** (Ciwarak, Banyumas).

## Struktur

| Bagian | Keterangan |
|--------|------------|
| **`index.html`**, **`menu.html`**, **`story.html`**, **`contact.html`** | Halaman HTML statis + Tailwind (CDN). |
| **`assets/`** | Gambar, brosur (`menus/`), `css/`, `js/`, PDF menu (`pdf/`). |
| **`landing/`** | SPA React + Vite (hero, carousel menu, Maps, dll.). |

### Landing (Vite)

```bash
cd landing
npm install
npm run dev
```

Deploy: **`vercel.json`** mengarahkan ke **`landing`** (framework Vite, output **`dist`**).
