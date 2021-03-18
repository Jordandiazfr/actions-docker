FROM node:14.15.4 as base

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install -g

FROM base as test
COPY . .
CMD [ "npm", "run", "test" ]

FROM base as prod
RUN npm prune --production
COPY . .
CMD [ "npm", "run", "bot" ]