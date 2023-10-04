#!/bin/bash

export PESTO_MONGO_USER=${PESTO_MONGO_USER:-"pesto"}
export PESTO_MONGO_SECRET=${PESTO_MONGO_SECRET:-"pesto"}
export PESTO_MONGO_HOST=${PESTO_MONGO_HOST:-"mongo.pesto.io"}
export PESTO_MONGO_PORT=${PESTO_MONGO_PORT:-"27017"}
# ---
# Used by the mongo client used as healthcheck
export PESTODB_CONN_STR=mongodb://${PESTO_MONGO_USER}:${PESTO_MONGO_SECRET}@${PESTO_MONGO_HOST}:${PESTO_MONGO_PORT}/
export CONN_STR=mongodb://${PESTO_MONGO_USER}:${PESTO_MONGO_SECRET}@${PESTO_MONGO_HOST}:${PESTO_MONGO_PORT}/
# ---
# Used by the Pesto API through Mongoose
export PESTO_MONGODB_URL="mongodb://${PESTO_MONGO_USER}:${PESTO_MONGO_SECRET}@mongo.pesto.io:${PESTO_MONGO_PORT}"