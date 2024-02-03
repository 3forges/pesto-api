ARG PNPM_VERSION=$PNPM_VERSION
FROM node:12.19.0-alpine3.9 AS development

# ---
# First, install pnpm
# ---
RUN apk update && apk add bash curl jq
ARG PNPM_VERSION=$PNPM_VERSION
ENV PNPM_VERSION=$PNPM_VERSION
COPY oci/*.sh ./
RUN chmod +x ./install_pnpm.sh && ./install_pnpm.sh

WORKDIR /usr/src/app

COPY package*.json ./

# RUN npm install glob rimraf
RUN pnpm i glob rimraf

# RUN npm install --only=development
RUN pnpm i --only=development

COPY . .

RUN pnpm run build

FROM node:12.19.0-alpine3.9 as production
# ---
# First, install pnpm
# ---
RUN apk update && apk add bash curl jq
ARG PNPM_VERSION=$PNPM_VERSION
ENV PNPM_VERSION=$PNPM_VERSION
COPY oci/*.sh ./
RUN chmod +x ./install_pnpm.sh && ./install_pnpm.sh

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN pnpm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]