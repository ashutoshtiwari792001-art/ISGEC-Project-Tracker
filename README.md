# ISGEC Project Tracker (M2 wired)

**Backend URL:**  
`https://script.google.com/macros/s/AKfycbxPYhJneZhk0pMwE4X1nDH9pV70MPBHl9qJaL1aWZ3H4E5BZj__N86WZyJVpEiyY9Eq/exec`

## Netlify (GitHub import)
- Build command: `npm run build`
- Publish directory: `dist`

### Works now
- Home → reads live KPIs from Google Sheet (Monthly Targets + Billing sum)
- Add Projects → writes to Projects sheet
- Add Billing → writes to Billing sheet (SO Number required). If Assignments endpoint exists, dropdown will show; otherwise manual entry.

> Add this file in repo root for guaranteed build on Netlify:

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"
[build.environment]
  NODE_VERSION = "18"
```
