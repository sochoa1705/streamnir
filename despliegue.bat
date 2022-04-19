@echo off
echo Hola %USERNAME%

set name="nmviajes"
set url=%CD%

@REM echo "Haciendo el build de la aplicacion"
@REM powershell -Command "npm run build-prod"

echo "Logueandose en el Container"
powershell -Command "az acr login -n expertiafrontendreg"

echo "Generando la imagen"
powershell -Command "docker build -t nmviajes ."
powershell -Command "docker tag nmviajes expertiafrontendreg.azurecr.io/nmviajes"

echo "Subiendo la imagen"
powershell -Command "docker push expertiafrontendreg.azurecr.io/nmviajes"

@REM echo "Desplegando al app"
@REM powershell -Command "kubectl apply -f nmviajes.yaml -n nmviajes"
@REM powershell -Command "kubectl apply -f nmviajes-ingress5.yaml -n nmviajes"

echo  %USERNAME% la aplicacion se desplego correctamente

powershell -Command "kubectl delete --all pods --namespace=nmviajes"
powershell -Command "kubectl get pods -n nmviajes"

pause
