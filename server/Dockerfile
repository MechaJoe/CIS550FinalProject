FROM node:18-alpine

RUN mkdir /templates

WORKDIR /app/

COPY . /app/

RUN npm install

CMD ["npm", "run", "start"]
