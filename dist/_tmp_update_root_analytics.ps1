$pattern = '(?s)\s*<!-- Google tag \(gtag\.js\) -->\s*<script async src="https://www\.googletagmanager\.com/gtag/js\?id=G-TFBZ5GZ22C"></script>\s*<script>.*?gtag\(''config'', ''G-TFBZ5GZ22C''\);\s*</script>'
$replacement = @"
    <!-- Google tag (gtag.js): consent-managed -->
    <script src="js/analytics-consent.js"></script>
"@

$updated = @()
Get-ChildItem -Path . -Filter *.html -File | ForEach-Object {
    $content = Get-Content -Raw -LiteralPath $_.FullName
    if ($null -eq $content -or $content.Length -eq 0) {
        return
    }
    $newContent = [regex]::Replace($content, $pattern, $replacement, 1)
    if ($newContent -ne $content) {
        Set-Content -LiteralPath $_.FullName -Value $newContent -NoNewline
        $updated += $_.Name
    }
}

Write-Output "Updated files: $($updated.Count)"
$updated | Sort-Object
