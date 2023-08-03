FROM node:lts-alpine as node
WORKDIR /app
COPY . .
RUN npm install --force
RUN npm run build --prod --aot --outputHashing=all

FROM nginx:1.23.3-alpine
COPY --from=node /app/dist/NuevoMundoViajes /usr/share/nginx/html
