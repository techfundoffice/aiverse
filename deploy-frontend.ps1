$env:CLOUDFLARE_API_TOKEN = "cfut_37Xg258IQBTOE9qXt0DdFphiNr6VA3GxKEuLBC0gb51b96d1"
$env:CLOUDFLARE_ACCOUNT_ID = "bc8e15f958dc350e00c0e39d80ca6941"

Write-Host "Building frontend..."
pnpm install
pnpm run build

Write-Host "`nDeploying to Cloudflare Pages..."
npx wrangler pages deploy dist --project-name=aiverse --branch=main

Write-Host "`n✅ Frontend deployed!"
Write-Host "Setting up custom domain..."

# Add custom domain via API
curl -X POST "https://api.cloudflare.com/client/v4/accounts/bc8e15f958dc350e00c0e39d80ca6941/pages/projects/aiverse/domains" `
  -H "X-Auth-Email: webmaster@techfundoffice.com" `
  -H "X-Auth-Key: c96e9abd636ca6e4d7fda2e94efd2ece7306d" `
  -H "Content-Type: application/json" `
  --data "{`"name`":`"mattmarcusai.com`"}"

Write-Host "`n✅ All done! Your site will be live at:"
Write-Host "https://mattmarcusai.com"
