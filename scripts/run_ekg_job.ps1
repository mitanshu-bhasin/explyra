$token = (gcloud auth print-access-token).Trim()
$url = "https://enterpriseknowledgegraph.googleapis.com/v1/projects/explyras/locations/us-central1/entityReconciliationJobs"
$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}
$body = Get-Content -Raw ekg_request.json
Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body
