FROM node:18-alpine

RUN mkdir /templates

WORKDIR /app/

COPY . /app/

RUN npm install --production

CMD ["npm", "run", "start"]
