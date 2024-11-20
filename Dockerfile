FROM node:23.1.0
WORKDIR /app
COPY . /app/
RUN yarn install
RUN yarn run build
CMD yarn run start:prod
EXPOSE 3000