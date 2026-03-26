$ErrorActionPreference='Stop'
$roots = @('d:/Expense Tracker','d:/Expense Tracker/minify_xx','d:/Expense Tracker/explyra-next/public')

foreach ($root in $roots) {
  Get-ChildItem -Path $root -Recurse -File -Include feed.xml,rss.xml | ForEach-Object {
    $f = $_.FullName
    $c = Get-Content -Raw -LiteralPath $f
    $o = $c
    $c = [regex]::Replace($c,'(<link>https://explyra\.me/[^<]+?)\.html(</link>)','$1$2')
    $c = [regex]::Replace($c,'(<guid>https://explyra\.me/[^<#]+?)\.html((?:#[^<]+)?</guid>)','$1$2')
    if ($c -ne $o) { Set-Content -LiteralPath $f -Value $c -NoNewline }
  }
}

$excluded = @(
  'https://explyra.me/403',
  'https://explyra.me/404',
  'https://explyra.me/500',
  'https://explyra.me/472981346732476',
  'https://explyra.me/avatar-test',
  'https://explyra.me/example-image-seo',
  'https://explyra.me/google1bc6c1d290e2d8b1',
  'https://explyra.me/orig_emp',
  'https://explyra.me/temp',
  'https://explyra.me/test',
  'https://explyra.me/pinterest-66eba',
  'https://explyra.me/yandex_fa0950c8693cbdb7',
  'https://explyra.me/offline'
)

foreach ($root in $roots) {
  Get-ChildItem -Path $root -Recurse -File -Filter sitemap.xml | ForEach-Object {
    $f = $_.FullName
    $c = Get-Content -Raw -LiteralPath $f
    $o = $c
    foreach ($loc in $excluded) {
      $c = [regex]::Replace($c, "<url>\s*<loc>$([regex]::Escape($loc))</loc>[\s\S]*?</url>\s*", "", 'IgnoreCase')
    }
    if ($c -ne $o) { Set-Content -LiteralPath $f -Value $c -NoNewline }
  }
}

Write-Output 'URL_NORMALIZATION_FOLLOWUP_DONE'
