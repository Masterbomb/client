FROM node:14 as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install
RUN npm install @vue/cli -g
COPY . .
RUN npm run build

# production environment
FROM nginx:alpine

LABEL version="1.0.0"
LABEL Christian Sargusingh "https://github.com/cSDes1gn"
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]