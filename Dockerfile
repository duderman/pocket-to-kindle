FROM node:14.14

RUN apt-get update && apt-get install -y calibre

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn

ADD src ./src
ADD config.js ./

RUN mkdir articles

CMD ["node", "/app/src/index.js"]
