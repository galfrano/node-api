FROM node:18

WORKDIR /
COPY . .
WORKDIR /app
RUN npm install
CMD npm start