#!/bin/bash

# export SHELL=bash

export PESTO_MONGO_HOST=${PESTO_MONGO_HOST:-'mongo.pesto.io'}
export PESTO_DB_VOLUME=${PESTO_DB_VOLUME:-"pesto_data"}

export CURRENT_FOLDER_NAME=$(echo "$(pwd)" | awk -F '/' '{print $NF}')
export PESTO_DB_VOLUME="${CURRENT_FOLDER_NAME}_${PESTO_DB_VOLUME}"

# source .env.sh
source ./.env.sh
echo ""
echo "# --- # --- # --- # --- # --- # --- #"
echo "  CURRENT_FOLDER_NAME=[${CURRENT_FOLDER_NAME}]"
echo "  PESTO_DB_VOLUME=[${PESTO_DB_VOLUME}]"
echo "# --- # --- # --- # --- # --- # --- #"
echo "  env:"
env
echo "# --- # --- # --- # --- # --- # --- #"
echo ""
docker-compose down && $(docker volume rm ${PESTO_DB_VOLUME} || true) && docker-compose up -d --force-recreate mongodb
