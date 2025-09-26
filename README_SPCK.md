Foodtruck das Nascentes — SPCK-ready static package
--------------------------------------------------
This is a pure frontend static version designed to run inside SPCK Editor preview (or any static server).
It simulates backend actions and allows the owner to edit the menu locally.

How it works:
- Menu data source: `data/menu.json` (initial). When you edit in Admin, changes are stored in `localStorage`.
- Admin: open `admin.html`. Default password: `senha123`. After login you can add/edit items and export JSON.
- Images: Admin stores uploaded images as Base64 data URLs so they work without a server.
- Cart: works via `localStorage`. Carrinho page shows items and allows 'PIX' simulation.
- Donations: `data/doacoes.txt` and `data/money.txt` are read to show donation bars. If you edit these files in SPCK, reload to see updates.
- To persist edits to files in the project: export JSON (button Export) and replace `data/menu.json` in the project with the exported file (or import via Import button in admin).

Running:
1. Open SPCK Editor, import this project folder.
2. Use built-in preview to view `index.html` (the app is static, no server needed).
3. To simulate server fetches of `data/*.txt` and `data/menu.json`, SPCK preview serves files; if preview fails to fetch, the app will fallback to localStorage data.
