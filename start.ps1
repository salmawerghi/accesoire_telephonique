$ErrorActionPreference = "Stop"

Write-Host "Lancement de l'application Accessoires Téléphoniques..." -ForegroundColor Cyan

# Lancement du backend
Write-Host "Démarrage du backend Spring Boot (Maven)..." -ForegroundColor Yellow
Start-Process -FilePath "bash" -ArgumentList "-c", "cd backend && ./mvnw spring-boot:run" -NoNewWindow -PassThru | Out-Null
# Pour Windows, on utilisera mvnw.cmd si disponible, sinon on utilise mvn
Start-Process -NoNewWindow -FilePath "cmd.exe" -ArgumentList "/k cd backend && mvn spring-boot:run" 

Start-Sleep -Seconds 10 # Attendre un peu que le backend s'initialise

# Lancement du frontend
Write-Host "Démarrage du frontend Next.js..." -ForegroundColor Yellow
Start-Process -NoNewWindow -FilePath "cmd.exe" -ArgumentList "/k cd frontend && npm run dev"

Write-Host "L'application est en cours de démarrage !" -ForegroundColor Green
Write-Host " - Backend : http://localhost:8080" -ForegroundColor Blue
Write-Host " - Frontend : http://localhost:3000" -ForegroundColor Blue
Write-Host "Appuyez sur une touche pour fermer cette fenêtre (les processus cmd continueront)..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
