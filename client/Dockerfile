FROM node:latest
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN yarn && yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]