# Etapa 1: Compilación de la aplicación Angular
FROM node:14.20.0 as build

WORKDIR /app

# Copia los archivos de la aplicación
COPY ./ /app
# Instala las dependencias y compila la aplicación
RUN npm install
RUN npm run build-qa-delfosti

# Etapa 2: Despliegue de la aplicación en un servidor web ligero
FROM nginx:alpine

# Copia los archivos de construcción desde la etapa 1
COPY --from=build /app/dist/NuevoMundoViajes /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]

# Puerto en el que se ejecutará el servidor Nginx
EXPOSE 80