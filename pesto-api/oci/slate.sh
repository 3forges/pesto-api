#!/bin/bash

# --
#  https://github.com/slatedocs/slate/wiki/Using-Slate-in-Docker#getting-started
# --
# 
export DOCS_DIST="$(pwd)/docs_dist"
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

git clone https://github.com/slatedocs/slate ${DOCS_DIST}/

cd ${DOCS_DIST}/

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

# docker run --rm --name slate -v $(pwd)/build:/srv/slate/build -v $(pwd)/source:/srv/slate/source slatedocs/slate build
# -v $(pwd)/build:/srv/slate/build -v $(pwd)/source:/srv/slate/source
# ENTRYPOINT ["/srv/slate/slate.sh"]
# CMD ["build"]

echo " SLATE DOCKER CONTAINER STARTING..."
docker run --name slate -itd --restart always stdin_open slate slatedocs/slate /bin/sh
echo " SLATE DOCKER CONTAINER STARTED."
docker cp ${DOCS_DIST}/source/index.html.md slate:/srv/slate/source/index.html.md
echo " index.html.md copied into SLATE DOCKER CONTAINER: COMPLETED."
docker exec -it slate sh -c "/srv/slate/slate.sh build"
echo " SLATE BUILD IN DOCKER CONTAINER: COMPLETED."
mkdir -p ./build/
docker cp slate:/srv/slate/build/. ./build/
echo " SLATE BUILD ASSETS COPIED FROM DOCKER CONTAINER, TO DOCKER HOST: COMPLETED."
docker stop slate && docker rm slate
echo " SLATE DOCKER CONTAINER PRUNED."
# docker cp src/. container_id:/target
# docker cp container_id:/src/. target
echo "# --- "
echo "# --- # --- "
echo "# --- # --- # --- "
echo "# --- # --- # --- # --- "
echo "  HERE THE ISSUE IS THAT YOU CANNOT USE DOCKER VOLUMES INSIDE DOCKER IN DOCKER "
echo "  HERE IS NOW THE GENERATED STATIC WEBSITE: [$(pwd)/build]"
ls -alh $(pwd)/build
echo "# --- "
echo "# --- # --- "
echo "# --- # --- # --- "
echo "# --- # --- # --- # --- "
