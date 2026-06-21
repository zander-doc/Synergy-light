#!/bin/bash

echo ===================================
echo AUTO-GIT: Committing and Pushing
echo ===================================

cd "D:/alexander/arte/Yazmin LUZ/SYNERGYLIGHT1/web_synergy-light"

git add .
git commit -m "Auto-commit: $(date)"
git push origin main

echo ===================================
echo Changes pushed successfully!
echo ===================================
read -p "Press Enter to exit..."