FROM node:23.1.0
WORKDIR /app
COPY package.json /app/
COPY yarn.lock /app/
RUN yarn install
CMD yarn run start
EXPOSE 3000