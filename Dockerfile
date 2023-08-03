FROM node:lts-alpine as node

WORKDIR /app

COPY . .

RUN npm install --force

RUN npm run build --prod --aot --outputHashing=all

FROM nginx:1.23.3-alpine
COPY /dist/NuevoMundoViajes /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
