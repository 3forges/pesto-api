#!/bin/bash

# --
#  https://github.com/slatedocs/slate/wiki/Using-Slate-in-Docker#getting-started
# --
# 
export DOCS_DIST=./docs_dist/
export WIDDERSHINS_MD=${WIDDERSHINS_MD:-"./pesto.widdershins.md"}
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



git clone https://github.com/slatedocs/slate ${DOCS_DIST}

cd ${DOCS_DIST}

git checkout ${SLATE_VERSION}

if [ -f ./index.html.md ]; then
  rm ./index.html.md
fi;


cp ${WIDDERSHINS_MD} ./index.html.md
cp ./index.html.md ${DOCS_DIST}/source/

if [ -f ./index.html.md ]; then
  rm ./index.html.md
fi;

docker pull slatedocs/slate

docker run --rm --name slate -p 4567:4567 -v $(pwd)/source:/srv/slate/source slatedocs/slate serve

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
