FROM node:16-alpine
WORKDIR /app
COPY package.json .
RUN yarn install --frozen-lockfile --non-interactive
COPY . .
RUN yarn build
CMD ["node", "build"]
