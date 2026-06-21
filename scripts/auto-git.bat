@echo off
echo ===================================
echo AUTO-GIT: Committing and Pushing
echo ===================================

cd /d "D:\alexander\arte\Yazmin LUZ\SYNERGYLIGHT1\web_synergy-light"

git add .
git commit -m "Auto-commit: %date% %time%"
git push origin main

echo ===================================
echo Changes pushed successfully!
echo ===================================
pause