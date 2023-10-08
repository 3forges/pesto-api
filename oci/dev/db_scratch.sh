#!/bin/bash
export PESTO_MONGO_HOST=${PESTO_MONGO_HOST:-'mongo.pesto.io'}
export PESTO_DB_VOLUME=${PESTO_DB_VOLUME:-"pesto_data"}
source .env.sh
echo ""
echo "# --- # --- # --- # --- # --- # --- #"
echo "  env:"
env
echo "# --- # --- # --- # --- # --- # --- #"
echo ""
docker-compose down
docker volume rm ${PESTO_DB_VOLUME}
docker-compose up -d --force-recreate
