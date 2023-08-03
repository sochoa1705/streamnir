FROM node:lts-alpine as node

WORKDIR /app

COPY . .

RUN npm install --force

RUN npm run build-prod

FROM nginx:1.23.3-alpine
COPY /dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
