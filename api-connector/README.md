# Cloudways API — new feature project

Started from the Cloudways Unified Dashboard prototype so new features share the same UI.

- `index.html` — dashboard (all demo states via the top-bar switcher / `#hash` links)
- `login.html` — login, leads to the dashboard
- `api.html` — API page: "Connect your tools" (editors, terminal, MCP) and "API tokens"; reached from Integrations in the side nav
- `assets/` — logos, icons, product art (relative paths, so pages can live side by side)
- `server.js` — tiny dependency-free Node server: `node server.js` (reads `PORT`, default 3000)

New pages: add an `.html` file next to `index.html`, reuse the same `<style>` tokens/top bar/sidebar, and
allow it in the `PUBLIC` check in `server.js`.
