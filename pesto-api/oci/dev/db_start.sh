#!/bin/bash
export PESTO_MONGO_HOST=${PESTO_MONGO_HOST:-'mongo.pesto.io'}
source .env.sh
echo ""
echo "# --- # --- # --- # --- # --- # --- #"
echo "  env:"
env
echo "# --- # --- # --- # --- # --- # --- #"
echo ""
docker-compose up -d
