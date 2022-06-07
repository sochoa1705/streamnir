@echo off
echo Hola %USERNAME%

set name="nmviajes"
set url=%CD%

echo "Haciendo el build de la aplicacion"
powershell -Command "npm run build-prod"

echo "Logueandose en el Container"

powershell -Command "az account set --subscription f7864d4b-f7ba-4627-976f-a749d462f414"
powershell -Command "az aks get-credentials --resource-group EXPERTIA-NMVIAJES-DEV --name ExpertiaFrontEnd"
powershell -Command "az acr login -n expertiafrontendreg"

echo "Generando la imagen"

powershell -Command "docker build -t nmviajes ."
powershell -Command "docker tag nmviajes expertiafrontendreg.azurecr.io/nmviajes"

echo "Subiendo la imagen"
powershell -Command "docker push expertiafrontendreg.azurecr.io/nmviajes"

echo "Cambiando a la carpeta de produccion"
cd .\yamls\prod\
echo %CD%

echo "Desplegando al app"
powershell -Command "kubectl apply -f nmviajes.yaml -n nmviajes"
powershell -Command "kubectl apply -f nmviajes-ingress5.yaml -n nmviajes"

echo  %USERNAME% la aplicacion se desplego correctamente

powershell -Command "kubectl delete --all pods --namespace=nmviajes"
powershell -Command "kubectl get pods -n nmviajes"

pause
