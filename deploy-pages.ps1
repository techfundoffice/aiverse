$env:CLOUDFLARE_API_TOKEN = "cfut_37Xg258IQBTOE9qXt0DdFphiNr6VA3GxKEuLBC0gb51b96d1"
$env:CLOUDFLARE_ACCOUNT_ID = "bc8e15f958dc350e00c0e39d80ca6941"

Write-Host "Deploying to Cloudflare Pages..."
npx wrangler pages deploy dist --project-name=aiverse --commit-dirty=true

Write-Host "`n✅ Deployment complete!"
