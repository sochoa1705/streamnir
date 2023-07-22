@echo off
echo Hola %USERNAME%

set name="nmviajes"
set url=%CD%

echo "Haciendo el build de la aplicacion"
powershell -Command "npm run build-dev"

echo "Logueandose en el Container"
powershell -Command "az account set --subscription 2ced612a-4052-43e4-a7d8-0cd466127cad"
powershell -Command "az aks get-credentials --resource-group EXP-RG-QA --name exp-k8s-qa"
powershell -Command "az acr login -n expcontainerregistryqa"

echo "Generando la imagen"

powershell -Command "docker build -t nmviajes-dev ."
powershell -Command "docker tag nmviajes-dev expcontainerregistryqa.azurecr.io/nmviajes-dev"

echo "Subiendo la imagen"
powershell -Command "docker push expcontainerregistryqa.azurecr.io/nmviajes-dev"

echo "Cambiando a la carpeta de desarrollo"
cd .\yamls\dev\
echo %CD%

echo "Desplegando al app"
powershell -Command "kubectl apply -f nmviajes.yaml -n viajes"
powershell -Command "kubectl apply -f nmviajes-ingress5.yaml -n viajes"

echo  %USERNAME% la aplicacion se desplego correctamente

powershell -Command "kubectl delete --all pods --namespace=viajes"
powershell -Command "kubectl get pods -n viajes"

pause
