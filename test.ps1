Write-Host "=========================================="
Write-Host "Lancement des tests pour TechStore"
Write-Host "=========================================="

Write-Host "`n[1/2] Lancement des tests Backend (JUnit + Mockito + Spring Boot Test)..."
Set-Location backend
$process = Start-Process "mvn.cmd" -ArgumentList "test" -PassThru -Wait -NoNewWindow
if ($process.ExitCode -ne 0) {
    Write-Host "[ERREUR] Les tests Backend ont echoue !" -ForegroundColor Red
    Set-Location ..
    exit $process.ExitCode
}
Set-Location ..

Write-Host "`n[2/2] Lancement des tests Frontend (Cypress E2E)..."
Set-Location frontend
$process = Start-Process "npm.cmd" -ArgumentList "run cypress:run" -PassThru -Wait -NoNewWindow
if ($process.ExitCode -ne 0) {
    Write-Host "[ERREUR] Les tests Frontend ont echoue !" -ForegroundColor Red
    Set-Location ..
    exit $process.ExitCode
}
Set-Location ..

Write-Host "`n=========================================="
Write-Host "[SUCCES] Tous les tests sont passes avec succes !" -ForegroundColor Green
Write-Host "=========================================="
Read-Host -Prompt "Appuyez sur Entree pour continuer..."
