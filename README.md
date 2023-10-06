# The `Pesto API`

## Run the `Pesto API` locally

* Mongo FQDN:

  * on Windows, in git bash:

```bash
export IPADDR_OF_YOUR_VM="192.168.218.202"
export PESTO_MONGO_HOST=mongo.pesto.io
echo "# ---- " | sudo tee -a /etc/hosts
echo "${IPADDR_OF_YOUR_VM}      ${PESTO_MONGO_HOST}" | sudo tee -a /c/Windows/System32/drivers/etc/hosts

# ---
# if you're dhcp
export OLD_IPADDR_OF_YOUR_VM="192.168.218.202"
export IPADDR_OF_YOUR_VM="192.168.218.202"
sed -i "s##${IPADDR_OF_YOUR_VM}#g" /c/Windows/System32/drivers/etc/hosts
sed -i "s#${OLD_IPADDR_OF_YOUR_VM}#${IPADDR_OF_YOUR_VM}#g" /c/Windows/System32/drivers/etc/hosts
```

  * on GNU/Linux, in bash shell:

```bash
export IPADDR_OF_YOUR_VM="192.168.218.202"
export PESTO_MONGO_HOST=mongo.pesto.io
echo "# ---- " | sudo tee -a /etc/hosts
echo "${IPADDR_OF_YOUR_VM}      ${PESTO_MONGO_HOST}" | sudo tee -a /etc/hosts


export OLD_IPADDR_OF_YOUR_VM="192.168.218.202"
export IPADDR_OF_YOUR_VM="192.168.218.202"
sudo sed -i "s#${OLD_IPADDR_OF_YOUR_VM}#${IPADDR_OF_YOUR_VM}#g" /etc/hosts
```

* First, you need to run a mongodb service on a VM of you choice:

```bash
# ---
# The FQDN you are going to configure in your :
#  /C/Windows/System32/drivers/etc/hosts
#  /etc/hosts
#  echo "${IPADDR_OF_YOUR_VM}      ${PESTO_MONGO_HOST}" | tee -a /C/Windows/System32/drivers/etc/hosts
#  echo "# ---- " | tee -a /C/Windows/System32/drivers/etc/hosts
# ---
export PESTO_MONGO_HOST=mongo.pesto.io
source ./.env.sh

docker-compose up -d
```

* Then you can start the rest api from the `./pesto-api` folder:

```bash

# ---
# First, install the nestjs cli
npm install -g @nestjs/cli

#---
# 
cd ./pesto-api

pnpm i 

export PESTO_MONGO_HOST=mongo.pesto.io
source ./.env.sh

pnpm start
```

* Then you can test using the `Pesto API`:

```bash
curl -iv -X GET -H 'Accept: application/json' http://localhost:3000/ | tail -n 1 | jq .

# ---
# List all Entity instances 
curl -iv -X GET -H 'Accept: application/json' http://localhost:3000/pesto-content-type | tail -n 1 | jq .

# ---
# This is how to create a new
# "Pesto Content Type", with a curl : 
curl -iv -X POST -H 'Content-Type: application/json' -d '{ "title" : "chaussure", "description" : "un autre type de contenu pour mon site de e-commerce", "identifier" : "chaussure"}' -H 'Accept: application/json' http://localhost:3000/pesto-content-type | tail -n 1 | jq .

curl -iv -X POST -H 'Content-Type: application/json' -d '{ "title" : "robe", "description" : "un autre type de contenu pour mon site de e-commerce", "identifier" : "robe"}' -H 'Accept: application/json' http://localhost:3000/pesto-content-type | tail -n 1 | jq .

# ---
# List all Entity instances 
curl -iv -X GET -H 'Accept: application/json' http://localhost:3000/pesto-content-type | tail -n 1 | jq .


# ---
# This is how to delete a 
# "Pesto Content Type", using 
# its ID, and curl command : 
export PESTO_CT_ID="651eeb97917663b7229b76ea"

curl -iv -X DELETE -G \
     -d "id=${PESTO_CT_ID}" \
     "http://localhost:3000/pesto-content-type/${PESTO_CT_ID}" | tail -n 1 | jq .

# ---
# List all Entity instances 
curl -iv -X GET -H 'Accept: application/json' http://localhost:3000/pesto-content-type | tail -n 1 | jq .

```

## References

* The first tutorial I followed to spin the app : https://dev.to/carlomigueldy/building-a-restful-api-with-nestjs-and-mongodb-mongoose-2165
* The second : https://site de e-commerce.logrocket.com/understanding-controllers-routes-nestjs/
