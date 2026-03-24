@echo off
mkdir minified_build 2>nul

echo Minifying JS...
for /r %%i in (*.js) do terser "%%i" -o "minified_build\%%~nxi" --compress --mangle

echo Minifying CSS...
for /r %%i in (*.css) do lightningcss --minify --bundle "%%i" -o "minified_build\%%~nxi"

echo Done! Check 'minified_build' folder.
pause