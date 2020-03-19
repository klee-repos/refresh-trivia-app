FROM node:10-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm install --prefix client

COPY . .

# Build the built version
RUN npm run build --prefix client

CMD [ "node", "server/app"]