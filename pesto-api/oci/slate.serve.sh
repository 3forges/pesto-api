#!/bin/bash

set -e

# --
#  https://github.com/slatedocs/slate/wiki/Using-Slate-in-Docker#getting-started
# --
# 
export DOCS_DIST="./slate_widdershins_docs"
export WIDDERSHINS_MD=${WIDDERSHINS_MD:-"pesto.widdershins.md"}
export SLATE_VERSION="2.13.1"


echo "# --- "
echo "# --- # --- "
echo "# --- # --- # --- "
echo "# --- # --- # --- # --- "
echo " [ $0 ] REQUIRES DOCKER"
docker --version || exit 7
echo "# --- "
echo "# --- # --- "
echo "# --- # --- # --- "
echo "# --- # --- # --- # --- "


if [ -d ${DOCS_DIST} ]; then
  rm -fr ${DOCS_DIST}
fi;
mkdir -p ${DOCS_DIST}

export WHERE_I_WAS=$(pwd)
git clone https://github.com/slatedocs/slate ${DOCS_DIST}


cd ${DOCS_DIST}

git checkout "v${SLATE_VERSION}"

ls -alh ${DOCS_DIST}/source

cat ${WHERE_I_WAS}/${WIDDERSHINS_MD} | tee ${DOCS_DIST}/source/index.html.md


docker pull slatedocs/slate

docker run --rm --name slate -p 0.0.0.0:4567:4567 -v $PWD/source/index.html.md:/srv/slate/source/index.html.md slatedocs/slate serve

echo "# --- "
echo "# --- # --- "
echo "# --- # --- # --- "
echo "# --- # --- # --- # --- "
echo "  HERE IS NOW THE GENERATED STATIC WEBSITE: [$(pwd)/build]"
ls -alh $(pwd)/build
echo "# --- "
echo "# --- # --- "
echo "# --- # --- # --- "
echo "# --- # --- # --- # --- "
