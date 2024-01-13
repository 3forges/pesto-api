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



# ---
# If set to default net interface 0.0.0.0, and 
# with the /etc/hosts config, the api will be available :
# - 
#  REST API > at http://api.pesto.io:3000/api
#  GraphQL API > at http://api.pesto.io:3000/api
# --- 
# 
export PESTO_API_HOST=${PESTO_API_HOST:-"0.0.0.0"}

# ---
# If set to explicit [api.pesto.io] host, and 
# with the /etc/hosts config, the api will be available :
# - 
#  REST API > at http://api.pesto.io:3000/api
#  GraphQL API > at http://api.pesto.io:3000/api
# --- 
# 
export PESTO_API_HOST=${PESTO_API_HOST:-"api.pesto.io"}
# ---
# If set to localhost, the api will be available :
# - 
#  REST API > at http://localhost:3000/api
#  GraphQL API > at http://localhost:3000/api
# --- 
# 
export PESTO_API_HOST=${PESTO_API_HOST:-"localhost"}
