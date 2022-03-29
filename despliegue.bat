@echo off
echo Hola %USERNAME%

set name="nmviajes"
set url=%CD%

echo "Haciendo el build de la aplicacion"
powershell -Command "npm run build"

echo "Logueandose en el Container"
powershell -Command "az acr login -n expertiafrontendreg"

echo "Generando la imagen"
powershell -Command "docker build -t nmviajes ."
powershell -Command "docker tag nmviajes expertiafrontendreg.azurecr.io/nmviajes"

echo "Subiendo la imagen"
powershell -Command "docker push expertiafrontendreg.azurecr.io/nmviajes"

echo "Desplegando al app"
powershell -Command "kubectl apply -f nmviajes.yaml -n nmviajes"
powershell -Command "kubectl apply -f nmviajes-ingress5.yaml -n nmviajes"

echo  %USERNAME% la aplicacion se desplego correctamente

powershell -Command "kubectl get ingress -n nmviajes"

pause
