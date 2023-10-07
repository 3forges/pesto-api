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
export IPADDR_OF_YOUR_VM="192.168.172.202"
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
source ./../.env.sh

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
  * First, you create a Project:
  
```bash
curl -iv -X GET -H 'Accept: application/json' http://localhost:3000/ | tail -n 1 | jq .

# ---
# List all Entity instances 
curl -iv -X GET -H 'Accept: application/json' http://localhost:3000/pesto-project | tail -n 1 | jq .

# ---
# This is how to create a new
# "Pesto Content Type", with a curl : 
export PESTO_PRJ_GIT_SSH_URI='git@github.com:3forges/poc-redux-thunk.git'
export GIT_SSH_URI_URL_ENCODED='git%40github.com%3A3forges%2Fpoc-redux-thunk.git'

curl -iv -X POST -H 'Content-Type: application/json' -d "{ \"name\" : \"astroproject1\", \"description\" : \"un premier projet pesto sur une base de projet astro, mon site portfolio\", \"git_ssh_uri\" : \"${GIT_SSH_URI_URL_ENCODED}\"}" -H 'Accept: application/json' http://localhost:3000/pesto-project | tail -n 1 | jq .


export PESTO_PRJ_GIT_SSH_URI='git@github.com:3forges/pesto-docs.git'
export GIT_SSH_URI_URL_ENCODED='git%40github.com%3A3forges%2Fpesto-docs.git'

curl -iv -X POST -H 'Content-Type: application/json' -d "{ \"name\" : \"astroprojectTwo2\", \"description\" : \"The pesto project documentation static website\", \"git_ssh_uri\" : \"${GIT_SSH_URI_URL_ENCODED}\"}" -H 'Accept: application/json' http://localhost:3000/pesto-project | tail -n 1 | jq .


# ---
# Get newly created project by name
export PESTO_PRJ_NAME="astroproject1"
curl -iv -X GET -H 'Accept: application/json' "http://localhost:3000/pesto-project/name/${PESTO_PRJ_NAME}" | tail -n 1 | jq .


export PESTO_PRJ_NAME="astroprojectTwo2"
curl -iv -X GET -H 'Accept: application/json' "http://localhost:3000/pesto-project/name/${PESTO_PRJ_NAME}" | tail -n 1 | jq .

```
  * Then, you can create `PestoContentType`s:  
```bash
curl -iv -X GET -H 'Accept: application/json' http://localhost:3000/ | tail -n 1 | jq .

# ---
# List all Entity instances 
curl -iv -X GET -H 'Accept: application/json' http://localhost:3000/pesto-content-type | tail -n 1 | jq .

# ---
# NEXT TODO: OK HERE I NEED TO BE ABLE TO ADD A PESTO CONTENT TYPE INTO A PROJECT BY PROJECT NAME NOT BY PROJECT ID
# This is how to create a new
# "Pesto Content Type", with a curl : 
curl -iv -X POST -H 'Content-Type: application/json' -d '{ "title" : "chaussure", "description" : "un autre type de contenu pour mon site de e-commerce", "identifier" : "chaussure", "project_id" : "rubbishprjid1"}' -H 'Accept: application/json' http://localhost:3000/pesto-content-type | tail -n 1 | jq .

curl -iv -X POST -H 'Content-Type: application/json' -d '{ "title" : "robe", "description" : "un autre type de contenu pour mon site de e-commerce", "identifier" : "robe", "project_id" : "rubbishprjid1"}' -H 'Accept: application/json' http://localhost:3000/pesto-content-type | tail -n 1 | jq .


curl -iv -X POST -H 'Content-Type: application/json' -d '{ "title" : "collier", "description" : "un autre type de contenu pour mon site de e-commerce", "identifier" : "collier", "project_id" : "rubbishprjid1"}' -H 'Accept: application/json' http://localhost:3000/pesto-content-type | tail -n 1 | jq .

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



# ---
# Now let's try to update an 
# existing pesto-content-type by [ID]
export PESTO_CT_ID="65214fb76a508e624578cb28"
export PESTO_CT_ID="65214fb76a508e624578cb29"

curl -iv -X PUT -H 'Content-Type: application/json' -d '{ "title" : "pantalon", "description" : "je modifie la [description] et le [project_id] du type de contenu [pantalon] de mon site de e-commerce", "identifier" : "trousers", "project_id" : "rubbishprjid3modified"}' -H 'Accept: application/json' "http://localhost:3000/pesto-content-type/${PESTO_CT_ID}" | tail -n 1 | jq .


# --- 
#  + - + NEW VERY IMPORTANT :
#  THE NEXT THING I IMPLEMENT IS : 
#    -> PESTO PROJECT FEATURE : it has no foreign key it is a root object of the model
#    -> PESTO CONTENT FEATURE : it has 2 foreign keys, one [project_id] ("FK" to 'PestoProject' entity), and one [type_id] ("FK" to 'PestoContentType' entity) 
#        +-> FIND 'PestoContent' BY 'PestoProject' 
#        +-> FIND 'PestoContent' BY 'PestoContentType'
# 
# --- 
# Ok now we are going to list all 
# [Pesto Content Types] for a given [Project ID]:
# --- 
# 
export PESTO_PRJ_ID="rubbishprjid3modified"
curl -iv -X GET -H 'Accept: application/json' "http://localhost:3000/pesto-content-type/project/${PESTO_PRJ_ID}" | tail -n 1 | jq . 

```


#### Testing the API with FK/PK relationship


Here are the scenarii I want to tests.

_**Scenario 1**_

* I create a new pesto project named `myfirstpestoproject`: 
  * it has a **`name`**, value `myfirstpestoproject`
  * it has a **`description`**
  * it has a **`git url`**
  * it has a **`git service provider`**: `Gitlab` `Gitea`, or `Github`, or CustomGitService. _(custom git service is a service which is ran in private servers, using a different configuration than those of Github Gitea or Gitlab, so i will need the concept of a general Git Service Provider Config, which includes partial API definition, to define how to create a webhook, what is the payload of that webhook, how to integrate a given Git Service Provider event with the pipeline service)_.
  * It has a list of `PestoContentType`s. A Content-Type can be created without any content yet
  * It has a list of `PestoContent`s. No `PestoContent` can be created without an existing `PestoContentType`
* I create a `PestoContentType` named `robe`, in the project named `myfirstpestoproject` : from project creation request, i keep the `_id` of the `myfirstpestoproject` created project, and use it as `project_id`
* I create 2 `PestoContent` of type (`PestoContentType`) is  `robe`, in the project `myfirstpestoproject`:
  * One named `Robe d'été rouge manoukian`
  * One other named `Robe mi-saison verte mango`
* Now I want to list :
  * all `PestoContent` of a given `PestoProject` project:
  * all `PestoContentType` of a given `PestoProject` project.
  * all  `PestoContent` of a given `PestoContentType`, in a `PestoProject` project.

## References

* The first tutorial I followed to spin the app : https://dev.to/carlomigueldy/building-a-restful-api-with-nestjs-and-mongodb-mongoose-2165
* The second : https://blog.logrocket.com/understanding-controllers-routes-nestjs/
* The third set of sources of informations I used, to be able to add Primary Key / Foreign Key relationship : 
  * https://gist.github.com/jmora2612/6f82c537eb957102e925a433ae9f9a4c#file-products-schema-ts-L19
  * cc


Other articles andsources i had a look on, about NestJS and Mongoose : 
* https://medium.com/@kruyvanna/getting-started-with-nestjs-and-mongodb-c81c1be49ac2
* cccc
