FROM node:alpine as builder

WORKDIR /app

COPY . .

RUN npm i
RUN npm run build

FROM httpd:alpine

COPY --from=builder /app/dist /usr/local/apache2/htdocs/