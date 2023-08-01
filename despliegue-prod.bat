@echo off
echo Hola %USERNAME%

set name="nmviajes"
set url=%CD%

echo "Logueandose en el Container"

powershell -Command "az account set --subscription 81d154b1-513f-4090-beeb-1043171b78a8"
powershell -Command "az acr login -n psharecreus2a935"

echo "Generando la imagen"

powershell -Command "docker build -t nmviajes ."
powershell -Command "docker tag nmviajes psharecreus2a935.azurecr.io/nmviajes:latest"

echo "Subiendo la imagen"
powershell -Command "docker push psharecreus2a935.azurecr.io/nmviajes:latest"

pause
