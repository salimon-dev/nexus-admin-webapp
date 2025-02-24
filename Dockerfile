FROM node:alpine as buidler

WORKDIR /app

COPY . .

RUN npm i
RUN npm run build

FROM httpd:alpine

COPY --from=build /app/dist /usr/local/apache2/htdocs/