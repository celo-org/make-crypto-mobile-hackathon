FROM node:12.13-alpine

RUN mkdir /app
WORKDIR /app

# Installing required npm packages
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn

# Copying all files
COPY . .

# Building app
RUN yarn build

# Setting production env variables
ENV MODE=PROD
ENV ENABLE_JSON_LOGS=true
ENV PERFORMANCE_TRACKING_LABEL_PREFIX=main

# Running redstone node
CMD yarn start:prod --config ./.secrets/config-redstone.json
