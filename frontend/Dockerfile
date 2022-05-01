FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY ./ ./
RUN yarn install

EXPOSE 3333

CMD ["yarn", "start"]