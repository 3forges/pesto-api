#!/bin/bash

export PESTO_HOME=${PESTO_HOME:-"/usr/src/app/"}
echo ""
echo "# --- # --- # --- # --- # --- # --- #"
echo "  PESTO_HOME=[${PESTO_HOME}]"
echo "# --- # --- # --- # --- # --- # --- #"
echo ""
pnpm -v
cd "${PESTO_HOME}/"
pnpm start