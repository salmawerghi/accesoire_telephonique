@echo off
echo ==========================================
echo Lancement des tests pour TechStore
echo ==========================================

echo.
echo [1/2] Lancement des tests Backend (JUnit + Mockito + Spring Boot Test)...
cd backend
call mvn test
if %ERRORLEVEL% neq 0 (
    echo [ERREUR] Les tests Backend ont echoue !
    cd ..
    exit /b %ERRORLEVEL%
)
cd ..

echo.
echo [2/2] Lancement des tests Frontend (Cypress E2E)...
cd frontend
call npm run cypress:run
if %ERRORLEVEL% neq 0 (
    echo [ERREUR] Les tests Frontend ont echoue !
    cd ..
    exit /b %ERRORLEVEL%
)
cd ..

echo.
echo ==========================================
echo [SUCCES] Tous les tests sont passes avec succes !
echo ==========================================
pause
