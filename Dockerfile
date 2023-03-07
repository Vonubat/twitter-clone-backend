FROM node:lts-alpine As build

WORKDIR /app

COPY --chown=node:node package.json package-lock.json ./

RUN npm ci

COPY --chown=node:node . .

ENV NODE_ENV production

RUN npm run build


FROM node:lts-alpine

WORKDIR /app

COPY --chown=node:node --from=build /app/package.json /app/package-lock.json ./
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist

USER node

CMD [ "node", "dist/main.js" ]
