FROM node:lts-alpine
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY ./ ./
RUN yarn

CMD ["yarn", "run", "start"]