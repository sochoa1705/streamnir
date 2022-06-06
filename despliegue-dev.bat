@echo off
echo Hola %USERNAME%

set name="nmviajes"
set url=%CD%

echo "Haciendo el build de la aplicacion"
powershell -Command "npm run build-prod"

echo "Logueandose en el Container"
powershell -Command "az acr login -n expertianmviajesdev"

echo "Generando la imagen"

powershell -Command "docker build -t nmviajes-dev ."
powershell -Command "docker tag nmviajes-dev expertianmviajesdev.azurecr.io/nmviajes-dev"

echo "Subiendo la imagen"
powershell -Command "docker push expertianmviajesdev.azurecr.io/nmviajes-dev"

echo "Cambiando a la carpeta de desarrollo"
cd .\yamls\dev\
echo %CD%

echo "Desplegando al app"
powershell -Command "kubectl apply -f nmviajes.yaml -n nmviajes"
powershell -Command "kubectl apply -f nmviajes-ingress5.yaml -n nmviajes"

echo  %USERNAME% la aplicacion se desplego correctamente

powershell -Command "kubectl delete --all pods --namespace=nmviajes"
powershell -Command "kubectl get pods -n nmviajes"

pause