FROM node:12.16.3-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g @foal/cli

# build:app command needs dependencies packages so need to run npm install
RUN npm install

COPY . .

RUN npm run build:app

FROM node:12.16.3-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g @foal/cli

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]