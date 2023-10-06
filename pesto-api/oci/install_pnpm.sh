#!/bin/bash

export PNPM_VERSION=${PNPM_VERSION:-"8.7.4"}
echo ""
echo "# --- # --- # --- # --- # --- # --- #"
echo "  PNPM_VERSION=[${PNPM_VERSION}]"
echo "# --- # --- # --- # --- # --- # --- #"
echo ""

curl -fsSL https://get.pnpm.io/install.sh | env PNPM_VERSION="${PNPM_VERSION}" sh -
