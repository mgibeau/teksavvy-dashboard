FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production

COPY index.js .
COPY build ./build

EXPOSE 3000

CMD ["node", "index.js"]
