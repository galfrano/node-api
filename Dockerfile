FROM node:18

WORKDIR /
COPY . .
WORKDIR /app
RUN npm install && npm run compile
CMD npm start