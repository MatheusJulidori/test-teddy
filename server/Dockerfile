FROM node:22-alpine

RUN apk add --no-cache bash curl

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
EXPOSE 9229

CMD ["npm", "run", "start:debug"]