@echo off
echo Hola %USERNAME%

set name="nmviajes"
set url=%CD%

echo "Haciendo el build de la aplicacion"
powershell -Command "npm run build-qa"

echo "Logueandose en el Container"
powershell -Command "az account set --subscription 2ced612a-4052-43e4-a7d8-0cd466127cad"
powershell -Command "az aks get-credentials --resource-group EXP-RG-QA --name exp-k8s-qa"
powershell -Command "az acr login -n expcontainerregistryqa"

echo "Generando la imagen"

powershell -Command "docker build -t nmviajes-qa ."
powershell -Command "docker tag nmviajes-qa expcontainerregistryqa.azurecr.io/nmviajes-qa"

echo "Subiendo la imagen"
powershell -Command "docker push expcontainerregistryqa.azurecr.io/nmviajes-qa"

echo "Cambiando a la carpeta de qa"
cd .\yamls\qa\
echo %CD%

echo "Desplegando al app"
powershell -Command "kubectl apply -f nmviajes.yaml -n nmviajes"
powershell -Command "kubectl apply -f nmviajes-ingress5.yaml -n nmviajes"

echo  %USERNAME% la aplicacion se desplego correctamente

powershell -Command "kubectl delete --all pods --namespace=nmviajes"
powershell -Command "kubectl get pods -n nmviajes"

pause
