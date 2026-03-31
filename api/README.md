# Minimax Aiverse API

Cloudflare Workers API backend for the Aiverse AI tools directory.

## Setup

```bash
cd api
npm install

# Create .dev.vars for local development
echo SUPABASE_URL=https://xxxxx.supabase.co > .dev.vars
echo SUPABASE_ANON_KEY=your-anon-key >> .dev.vars

# Run locally
npm run dev

# Deploy to Cloudflare
npm run deploy
```

## API Endpoints

- `GET /api/tools` - Get all AI tools
- `GET /api/tools/:id` - Get single tool
- `GET /api/categories` - Get all categories
- `GET /api/categories/:slug/tools` - Get tools by category
- `POST /api/tools` - Create new tool
- `GET /health` - Health check

## Environment Variables

Required secrets (set via `wrangler secret put`):
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anon/public API key
