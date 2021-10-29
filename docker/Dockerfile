FROM node:14

LABEL version="1.0.0"
LABEL Christian Sargusingh "https://github.com/cSDes1gn"

# for global npm installs
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

WORKDIR /app

# Install app dependencies
COPY package*.json .
# RUN npm install
# If you are building your code for production
RUN npm config set unsafe-perm true && \
	npm i

CMD ["npm", "run", "serve"]