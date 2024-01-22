FROM node:16.20.1 AS node
WORKDIR /app
COPY . .
RUN npm install --force
RUN npm run build-prod

FROM nginx:1.23.3-alpine
COPY --from=node /app/dist/NuevoMundoViajes /usr/share/nginx/html
COPY ./nginx.conf  /etc/nginx/nginx.conf
