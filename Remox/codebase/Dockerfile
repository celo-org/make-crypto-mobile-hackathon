FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
COPY yarn.lock ./
COPY ./ ./
RUN yarn install 
CMD ["yarn", "start"]