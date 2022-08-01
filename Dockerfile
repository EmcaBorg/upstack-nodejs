FROM node:latest

EXPOSE 3001

COPY ["package.json", "."]

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "./dist/src/app.js" ]