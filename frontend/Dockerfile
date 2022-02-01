FROM node:16.13-alpine

RUN mkdir /code
WORKDIR /code

COPY package.json /code
RUN npm install

COPY . /code

expose 49153
