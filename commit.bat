@echo off

if "%~1"=="" (
  echo.
  echo Please provide a commit message.
  echo Example:
  echo    commit.bat "Fix: update delete API"
  echo.
  pause
  exit /b
)

echo.
echo Running ESLint fix...
call npm run lint:fix

echo.
echo Running Prettier format...
call npm run format

echo.
echo Adding changes...
git add .

echo.
echo Committing...
git commit -m "%~1"

echo.
echo Done!
pause