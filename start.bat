@echo off
color 0b
echo ===================================================
echo     Lancement de l'Application Accessoires        
echo ===================================================

echo.
echo [1] Demarrage du Backend Spring Boot (port 8082)...
start "Backend Spring" cmd /c "cd backend && mvn spring-boot:run"

echo.
echo Patientez pendant l'initialisation du backend...
timeout /t 10 /nobreak >nul

echo.
echo [2] Demarrage du Frontend Next.js (port 3000)...
start "Frontend NextJS" cmd /c "cd frontend && npm run dev"

echo.
echo ===================================================
echo   Application en cours d'execution !
echo   - Backend DB: Assurez-vous que PostgreSQL est allume sur le port 5432
echo   - API : http://localhost:8082/api
echo   - Web : http://localhost:3000
echo ===================================================
echo.
pause
