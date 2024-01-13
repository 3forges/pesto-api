#!/bin/bash

export SHELL=bash

export PESTO_MONGO_HOST=${PESTO_MONGO_HOST:-'mongo.pesto.io'}
export PESTO_DB_VOLUME=${PESTO_DB_VOLUME:-"pesto_data"}
# source .env.sh
source ./.env.sh
echo ""
echo "# --- # --- # --- # --- # --- # --- #"
echo "  env:"
env
echo "# --- # --- # --- # --- # --- # --- #"
echo ""
docker-compose down mongodb
docker volume rm ${PESTO_DB_VOLUME} || true
docker-compose up -d --force-recreate mongodb
