@echo off
if "%~1"=="" (
    echo Usage: run_k6_test.bat ^<k6_script.js^>
    goto :eof
)

set "SCRIPT_PATH=%~1"
set "SCRIPT_NAME=%~n1" REM Extracts filename without extension
set "OUTPUT_DIR=results" REM Define the output directory here

REM Create the output directory if it doesn't exist
if not exist "%OUTPUT_DIR%" mkdir "%OUTPUT_DIR%"

echo Running k6 script: %SCRIPT_PATH%
echo Output path: %OUTPUT_DIR%\%SCRIPT_NAME%_YYYY_MM_DD.html

set "K6_SCRIPT_NAME=%SCRIPT_NAME%" && k6 run "%SCRIPT_PATH%"