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

FROM node:12.19.0-alpine3.9 as dev
# ---
# ENV PESTO_HOME=${PESTO_HOME:-"/usr/src/app"}
ARG PESTO_HOME=${PESTO_HOME}
ENV PESTO_HOME=${PESTO_HOME}
RUN mkdir -p ${PESTO_HOME}
# ---
# First, install pnpm
# ---
RUN apk update && apk add bash curl jq
ARG PNPM_VERSION=$PNPM_VERSION
ENV PNPM_VERSION=$PNPM_VERSION
COPY oci/*.sh ./
RUN chmod +x ./install_pnpm.sh && ./install_pnpm.sh

# ARG NODE_ENV=production
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

VOLUME /usr/src/app
WORKDIR /usr/src/app

# RUN pnpm install --only=production
RUN pnpm i

COPY ./oci/dev/start.sh ${PESTO_HOME}
RUN chmod +x ${PESTO_HOME}/*.sh

CMD ["/usr/src/ops/start.sh"]