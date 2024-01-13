#!/bin/sh

if [ -f ./.env ]; then 
  rm ./.env
fi;

cp ./.env.template ./.env

sed -i "s#PESTO_MONGO_USER_PLACEHOLDER#${PESTO_MONGO_USER}#g" -i .env
sed -i "s#PESTO_MONGO_SECRET_PLACEHOLDER#${PESTO_MONGO_SECRET}#g" -i .env
sed -i "s#PESTO_MONGO_HOST_PLACEHOLDER#${PESTO_MONGO_HOST}#g" -i .env
sed -i "s#PESTODB_CONN_STR_PLACEHOLDER#${PESTODB_CONN_STR}#g" -i .env
sed -i "s#CONN_STR_PLACEHOLDER#${CONN_STR}#g" -i .env
sed -i "s#PESTO_API_HOST_PLACEHOLDER#${PESTO_API_HOST}#g" -i .env
