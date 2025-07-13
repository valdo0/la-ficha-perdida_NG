FROM node:17 AS dev-deps
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM node:17 AS build
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY .  .
RUN npm run build

FROM nginx:1.23.3 as prod
EXPOSE 80
COPY --from=build /app/dist/* /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]