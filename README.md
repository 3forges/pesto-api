# The `Pesto API`

## Run the `Pesto API` locally

- Mongo FQDN:

  - on Windows, in git bash:

```bash
export IPADDR_OF_YOUR_VM="192.168.5.202"
export PESTO_MONGO_HOST=mongo.pesto.io
echo "# ---- " | sudo tee -a /etc/hosts
echo "${IPADDR_OF_YOUR_VM}      ${PESTO_MONGO_HOST}" | tee -a /c/Windows/System32/drivers/etc/hosts
export PESTO_AZ_PERIODIC_TABLE_FQDN=azperiodic.pesto.io
echo "# ---- " | sudo tee -a /etc/hosts
echo "${IPADDR_OF_YOUR_VM}      ${PESTO_AZ_PERIODIC_TABLE_FQDN}" | tee -a /c/Windows/System32/drivers/etc/hosts

# ---
# if you're dhcp
# -- IP ADDRESS OF THE VM WHERE MONGO DB RUNS
export OLD_IPADDR_OF_YOUR_VM="192.168.159.202"
export IPADDR_OF_YOUR_VM="192.168.56.202"
sed -i "s#${OLD_IPADDR_OF_YOUR_VM}#${IPADDR_OF_YOUR_VM}#g" /c/Windows/System32/drivers/etc/hosts
# -- IP ADDRESS OF THE HARDWARRE MACHINE 
# - WHERE I HAVE MY [VSCODE] and I 
# - run locally the code in dev mode : 
# - Pesto API and the frontend
export OLD_IPADDR_OF_YOUR_VM="192.168.159.236"
export IPADDR_OF_YOUR_VM="192.168.56.236"
sed -i "s#${OLD_IPADDR_OF_YOUR_VM}#${IPADDR_OF_YOUR_VM}#g" /c/Windows/System32/drivers/etc/hosts

```

- on GNU/Linux, in bash shell:

```bash
export IPADDR_OF_YOUR_VM="192.168.5.202"
export PESTO_MONGO_HOST=mongo.pesto.io
echo "# ---- " | sudo tee -a /etc/hosts
echo "${IPADDR_OF_YOUR_VM}      ${PESTO_MONGO_HOST}" | sudo tee -a /etc/hosts


export OLD_IPADDR_OF_YOUR_VM="192.168.181.202"
export IPADDR_OF_YOUR_VM="192.168.24.202"
sudo sed -i "s#${OLD_IPADDR_OF_YOUR_VM}#${IPADDR_OF_YOUR_VM}#g" /etc/hosts
```

- First, you need to run a mongodb service on a VM of you choice:

```bash
# ---
# The FQDN you are going to configure in your :
#  /C/Windows/System32/drivers/etc/hosts
#  /etc/hosts
#  echo "${IPADDR_OF_YOUR_VM}      ${PESTO_MONGO_HOST}" | tee -a /C/Windows/System32/drivers/etc/hosts
#  echo "# ---- " | tee -a /C/Windows/System32/drivers/etc/hosts
# ---
# export PESTO_MONGO_HOST=mongo.pesto.io
# source ./../.env.sh
# docker-compose up -d

# ---
# or just : 
export PESTO_MONGO_HOST=mongo.myhome.io
pnpm run db:start

# ---
# To restart with an empty database
export PESTO_MONGO_HOST=mongo.myhome.io
pnpm run db:scratch

```

- Then you can start the rest api from the `./pesto-api` folder:

```bash

# ---
# First, install the nestjs cli
npm install -g @nestjs/cli

#---
#
cd ./pesto-api

pnpm i

export PESTO_MONGO_HOST=mongo.pesto.io
source ./../.env.sh

pnpm start
```

- Then you can test using the `Pesto API`:
  - First, you create a Project:

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

curl -iv -X POST -H 'Content-Type: application/json' -d "{ \"name\" : \"astroproject1\", \"description\" : \"un premier projet pesto sur une base de projet astro, mon site portfolio\", \"git_ssh_uri\" : \"${PESTO_PRJ_GIT_SSH_URI}\"}" -H 'Accept: application/json' http://localhost:3000/pesto-project | tail -n 1 | jq .


export PESTO_PRJ_GIT_SSH_URI='git@github.com:3forges/pesto-docs.git'
export GIT_SSH_URI_URL_ENCODED='git%40github.com%3A3forges%2Fpesto-docs.git'

curl -iv -X POST -H 'Content-Type: application/json' -d "{ \"name\" : \"astroprojectTwo2\", \"description\" : \"The pesto project documentation static website\", \"git_ssh_uri\" : \"${PESTO_PRJ_GIT_SSH_URI}\"}" -H 'Accept: application/json' http://localhost:3000/pesto-project | tail -n 1 | jq .

export GIT_SSH_URI_URL_ENCODED='git%40github.com%3A3forges%2Fawesome-obs.git'
export PESTO_PRJ_GIT_SSH_URI='git@github.com:3forges/awesome-obs.git'

curl -iv -X POST -H 'Content-Type: application/json' -d "{ \"name\" : \"Awesome Obs\", \"description\" : \"An awesome list, for the OBS livestreaming opensource tool\", \"git_ssh_uri\" : \"${PESTO_PRJ_GIT_SSH_URI}\"}" -H 'Accept: application/json' http://localhost:3000/pesto-project | tail -n 1 | jq .


# ---
# Get newly created project by name
export PESTO_PRJ_NAME="astroproject1"
curl -iv -X GET -H 'Accept: application/json' "http://localhost:3000/pesto-project/name/${PESTO_PRJ_NAME}" | tail -n 1 | jq .


export PESTO_PRJ_NAME="astroprojectTwo2"
curl -iv -X GET -H 'Accept: application/json' "http://localhost:3000/pesto-project/name/${PESTO_PRJ_NAME}" | tail -n 1 | jq .

# ---
# Get newly created project by Git SSH URI
export PESTO_PRJ_GIT_SSH_URI='git@github.com:3forges/awesome-obs.git'
export GIT_SSH_URI_URL_ENCODED='git%40github.com%3A3forges%2Fawesome-obs.git'

curl -iv -X GET -H 'Content-Type: application/json' -H 'Accept: application/json' "http://localhost:3000/pesto-project/uri/${GIT_SSH_URI_URL_ENCODED}" | tail -n 1 | jq .

export PESTO_PRJ_ID='652205f530323c2bbe4901c3'

# ---
# Now we try and update the [description]
# of the project, from its ID in
# Mongo Database
# ---
#
curl -iv -X PUT -H 'Content-Type: application/json' -d "{\"description\" : \"An absolutely awesome list, for the famous OBS livestreaming opensource tool\"}" -H 'Accept: application/json' "http://localhost:3000/pesto-project/${PESTO_PRJ_ID}" | tail -n 1 | jq .

curl -iv -X GET -H 'Content-Type: application/json' -H 'Accept: application/json' "http://localhost:3000/pesto-project/uri/${GIT_SSH_URI_URL_ENCODED}" | tail -n 1 | jq .

# ---
# Now we try and update the [title]
# of the project, from its ID in
# Mongo Database. But there is no
# [title] property in the DTO Type
# ---
# Expect: that the type validation fails with NestJs 'ValidationPipe'
curl -iv -X PUT -H 'Content-Type: application/json' -d "{\"title\" : \"Whatever i might come up with as an example title fo a pesto project\"}" -H 'Accept: application/json' "http://localhost:3000/pesto-project/${PESTO_PRJ_ID}" | tail -n 1 | jq .

curl -iv -X GET -H 'Content-Type: application/json' -H 'Accept: application/json' "http://localhost:3000/pesto-project/uri/${GIT_SSH_URI_URL_ENCODED}" | tail -n 1 | jq .

# ---
# Now we try and update the [name]
# of the project, from its ID in
# Mongo Database
# ---
#
curl -iv -X PUT -H 'Content-Type: application/json' -d "{\"name\" : \"The Defintive OBS awesome list\"}" -H 'Accept: application/json' "http://localhost:3000/pesto-project/${PESTO_PRJ_ID}" | tail -n 1 | jq .

curl -iv -X GET -H 'Content-Type: application/json' -H 'Accept: application/json' "http://localhost:3000/pesto-project/uri/${GIT_SSH_URI_URL_ENCODED}" | tail -n 1 | jq .

# ---
# Now we try and delete a
# project, from its ID in Mongo Database
# ---
#
export PESTO_PRJ_ID='65217f712b21e8249d82ab51'
curl -iv -X DELETE -H 'Content-Type: application/json' -H 'Accept: application/json' "http://localhost:3000/pesto-project/${PESTO_PRJ_ID}" | tail -n 1 | jq .

```

- Then, you can create `PestoContentType`s:

```bash
curl -iv -X GET -H 'Accept: application/json' http://localhost:3000/ | tail -n 1 | jq .

# ---
# List all Entity instances
curl -iv -X GET -H 'Accept: application/json' http://localhost:3000/pesto-content-type | tail -n 1 | jq .

# ---
#  >>> I FIRST CREATE PESTO CONTENT TYPES
#      THAT ARE RELATED TO NON EXISTING
#      PESTO PROJECTS
# This is how to create a new
# "Pesto Content Type", with a curl :
curl -iv -X POST -H 'Content-Type: application/json' -d '{ "title" : "chaussure", "description" : "un autre type de contenu pour mon site de e-commerce", "identifier" : "chaussure", "project_id" : "rubbishprjid1"}' -H 'Accept: application/json' http://localhost:3000/pesto-content-type | tail -n 1 | jq .

curl -iv -X POST -H 'Content-Type: application/json' -d '{ "title" : "robe", "description" : "un autre type de contenu pour mon site de e-commerce", "identifier" : "robe", "project_id" : "rubbishprjid1"}' -H 'Accept: application/json' http://localhost:3000/pesto-content-type | tail -n 1 | jq .


curl -iv -X POST -H 'Content-Type: application/json' -d '{ "title" : "collier", "description" : "un autre type de contenu pour mon site de e-commerce", "identifier" : "collier", "project_id" : "rubbishprjid1"}' -H 'Accept: application/json' http://localhost:3000/pesto-content-type | tail -n 1 | jq .

curl -iv -X POST -H 'Content-Type: application/json' -d '{ "title" : "chapeau", "description" : "un autre type de contenu pour mon site de e-commerce", "identifier" : "chapeau", "project_id" : "rubbishprjid7"}' -H 'Accept: application/json' http://localhost:3000/pesto-content-type | tail -n 1 | jq .

# ---
# List all Entity instances
curl -iv -X GET -H 'Accept: application/json' http://localhost:3000/pesto-content-type | tail -n 1 | jq .



# ---
#  >>> I THEN CREATE PESTO CONTENT TYPES
#      THAT ARE RELATED TO EXISTING
#      PESTO PROJECTS
#
export PESTO_PRJ_ID="652180e1b90cf34b86350aa9"

# -
export REQ_PAYLOAD="{ \"title\" : \"chaussure\", \"description\" : \"un autre type de contenu pour mon site de e-commerce\", \"identifier\" : \"chaussure\", \"project_id\" : \"${PESTO_PRJ_ID}\"}"

curl -iv -X POST -H 'Content-Type: application/json' -d "${REQ_PAYLOAD}" -H 'Accept: application/json' http://localhost:3000/pesto-content-type | tail -n 1 | jq .

# -
export REQ_PAYLOAD="{ \"title\" : \"robe\", \"description\" : \"un autre type de contenu pour mon site de e-commerce\", \"identifier\" : \"robe\", \"project_id\" : \"${PESTO_PRJ_ID}\"}"

curl -iv -X POST -H 'Content-Type: application/json' -d "${REQ_PAYLOAD}" -H 'Accept: application/json' http://localhost:3000/pesto-content-type | tail -n 1 | jq .

# -
export REQ_PAYLOAD="{ \"title\" : \"collier\", \"description\" : \"un autre type de contenu pour mon site de e-commerce\", \"identifier\" : \"collier\", \"project_id\" : \"${PESTO_PRJ_ID}\"}"

curl -iv -X POST -H 'Content-Type: application/json' -d "${REQ_PAYLOAD}" -H 'Accept: application/json' http://localhost:3000/pesto-content-type | tail -n 1 | jq .

# -
export REQ_PAYLOAD="{ \"title\" : \"chapeau\", \"description\" : \"un autre type de contenu pour mon site de e-commerce\", \"identifier\" : \"chapeau\", \"project_id\" : \"${PESTO_PRJ_ID}\"}"

curl -iv -X POST -H 'Content-Type: application/json' -d "${REQ_PAYLOAD}" -H 'Accept: application/json' http://localhost:3000/pesto-content-type | tail -n 1 | jq .


# ---
# This is how to delete a
# "Pesto Content Type", using
# its ID, and curl command :
export PESTO_CT_ID="65221946ef33390bae4dbcd3"

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
export PESTO_CT_ID="65220e8ac0840e5aa4173499"

curl -iv -X PUT -H 'Content-Type: application/json' -d '{ "title" : "chapeau", "description" : "je modifie la [description], le [identifier] et le [project_id] du type de contenu [chapeau] de mon site de e-commerce", "identifier" : "hat", "project_id" : "rubbishprjid97modified"}' -H 'Accept: application/json' "http://localhost:3000/pesto-content-type/${PESTO_CT_ID}" | tail -n 1 | jq .

# ---
# List all Entity instances
curl -iv -X GET -H 'Accept: application/json' http://localhost:3000/pesto-content-type | tail -n 1 | jq .


# ---
#  + - + NEW VERY IMPORTANT :
# ---
# Ok now we are going to list all
# [Pesto Content Types] for a given [Project ID]:
# ---
#
export PESTO_PRJ_ID="rubbishprjid3modified"
curl -iv -X GET -H 'Accept: application/json' "http://localhost:3000/pesto-content-type/project/${PESTO_PRJ_ID}" | tail -n 1 | jq .

export PESTO_PRJ_ID="rubbishprjid97modified"
curl -iv -X GET -H 'Accept: application/json' "http://localhost:3000/pesto-content-type/project/${PESTO_PRJ_ID}" | tail -n 1 | jq .

export PESTO_PRJ_ID="652180e1b90cf34b86350aa9"
curl -iv -X GET -H 'Accept: application/json' "http://localhost:3000/pesto-content-type/project/${PESTO_PRJ_ID}" | tail -n 1 | jq .

```

* And finally we can create `PestoContent`:

```bash

# ---
# list all content types, to
# choose among them or not
# ---
curl -iv -X GET -H 'Accept: application/json' http://localhost:3000/pesto-content-type | tail -n 1 | jq .
# ---
# list all projects types, to
# choose among them or not
# ---
curl -iv -X GET -H 'Accept: application/json' http://localhost:3000/pesto-project | tail -n 1 | jq .
# ---
# list all content, to
# choose among them or not
# ---
curl -iv -X GET -H 'Accept: application/json' http://localhost:3000/pesto-content | tail -n 1 | jq .
# ---
#  >>> I THEN CREATE PESTO CONTENT 
#      THAT ARE RELATED TO EXISTING
#      PESTO PROJECTS
#
export PESTO_PRJ_ID="rubbishprojectid1"
# ---
# the one below is wrong
export PESTO_PRJ_ID="65221b6358151424a778bab0"
# ---
# the one below is good
export PESTO_PRJ_ID="652269f22d466869b4a40d73"

# ---
# the one below is wrong
export PESTO_CT_ID='652180e1b81cf34b44350bb9'
# ---
# the one below is good
export PESTO_CT_ID='65221b6358376870a825bab0'

export PESTO_CONTENT_TEXT="# Mon premer markdown un premier contenu pour mon site de e-commerce"
export PESTO_CONTENT_NAME="Mon premier article sur mon site enfin"
# ---
#  required properties:
#   + name
#   + project_id
#   + content_type_id
# ---
#  optional properties:
#   + text :  the markdown content as a string
# -

export REQ_PAYLOAD="{ \"name\" : \"${PESTO_CONTENT_NAME}\", \"text\" : \"${PESTO_CONTENT_TEXT}\", \"content_type_id\" : \"${PESTO_CT_ID}\", \"project_id\" : \"${PESTO_PRJ_ID}\"}"

curl -iv -X POST -H 'Content-Type: application/json' -d "${REQ_PAYLOAD}" -H 'Accept: application/json' http://localhost:3000/pesto-content | tail -n 1 | jq .

# ---
# List all Entity instances, after creation
curl -iv -X GET -H 'Accept: application/json' http://localhost:3000/pesto-content | tail -n 1 | jq .

```

- And you can check the constraints to create a PestoContent, by running:

```bash
# ---
#  >>> I CREATE PESTO CONTENT 
#      THAT ARE RELATED TO EITHER :
#       - NON-EXISTING PESTO PROJECT
#       - EXISTING PESTO CONTENT TYPE
#
export PESTO_PRJ_ID="rubbishprojectid1"
# ---
# the one below is good
export PESTO_PRJ_ID="652269f22d466869b4a40d73"
# ---
# the one below is wrong
export PESTO_PRJ_ID="65221b6358151424a778bab0"

# ---
# the one below is wrong
export PESTO_CT_ID='652180e1b81cf34b44350bb9'
# ---
# the one below is good
export PESTO_CT_ID='65221b6358376870a825bab0'

export PESTO_CONTENT_TEXT="# Mon deuxieme markdown un deuxieme contenu pour mon site de e-commerce, qui ne sera pas enregistre, car soit le [project_id], soit le [content_type_id] ne sont pas corrects (exitants ds la base)"
export PESTO_CONTENT_NAME="Mon deuxieme article sur mon site"
# ---
#  required properties:
#   + name
#   + project_id
#   + content_type_id
# ---
#  optional properties:
#   + text :  the markdown content as a string
# -

export REQ_PAYLOAD="{ \"name\" : \"${PESTO_CONTENT_NAME}\", \"text\" : \"${PESTO_CONTENT_TEXT}\", \"content_type_id\" : \"${PESTO_CT_ID}\", \"project_id\" : \"${PESTO_PRJ_ID}\"}"

curl -iv -X POST -H 'Content-Type: application/json' -d "${REQ_PAYLOAD}" -H 'Accept: application/json' http://localhost:3000/pesto-content | tail -n 1 | jq .

# --- # --- # --- # --- # --- # --- # --- #
# --- # EXPECTED:
# --- # --- # --- # --- # --- # --- # --- #
# < HTTP/1.1 406 Not Acceptable
# < content-type: application/json; charset=utf-8
# < content-length: 261
# < Date: Sun, 08 Oct 2023 08:58:10 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=72
# <
# { [261 bytes data]
# 100   610  100   261  100   349  13118  17541 # --:--:-- --:--:-- --:--:-- 32105
# * Connection #0 to host localhost left intact
# {
# "statusCode": 406,
# "message": "PESTO-CONTENT DATA SERVICE [CREATE] method - No new [PestoContent] was created: No PestoProject of with project_id = [652180e1b81cf34b44350bb9] was found. A PestoContent cannot be created without an existing PestoProject."
# }
# 
# --- # --- # --- # --- # --- # --- # --- #
# --- # --- # --- # --- # --- # --- # --- #

# ---
# List all Entity instances, after creation
curl -iv -X GET -H 'Accept: application/json' http://localhost:3000/pesto-content | tail -n 1 | jq .



# ---
#  >>> I CREATE PESTO CONTENT 
#      THAT ARE RELATED TO EITHER :
#       - EXISTING PESTO PROJECT
#       - NON-EXISTING PESTO CONTENT TYPE
#
export PESTO_PRJ_ID="rubbishprojectid1"
# ---
# the one below is wrong
export PESTO_PRJ_ID="65221b6358151424a778bab0"
# ---
# the one below is good
export PESTO_PRJ_ID="652269f22d466869b4a40d73"

# ---
# the one below is good
export PESTO_CT_ID='65221b6358376870a825bab0'
# ---
# the one below is wrong
export PESTO_CT_ID='652180e1b81cf34b44350bb9'

export PESTO_CONTENT_TEXT="# Mon deuxieme markdown \n un deuxieme contenu pour mon site de e-commerce, qui ne sera pas enregistre, car soit le [project_id], soit le [content_type_id] ne sont pas corrects (exitants ds la base)"
export PESTO_CONTENT_NAME="Mon deuxieme article sur mon site"
# ---
#  required properties:
#   + name
#   + project_id
#   + content_type_id
# ---
#  optional properties:
#   + text :  the markdown content as a string
# -

export REQ_PAYLOAD="{ \"name\" : \"${PESTO_CONTENT_NAME}\", \"text\" : \"${PESTO_CONTENT_TEXT}\", \"content_type_id\" : \"${PESTO_CT_ID}\", \"project_id\" : \"${PESTO_PRJ_ID}\"}"

curl -iv -X POST -H 'Content-Type: application/json' -d "${REQ_PAYLOAD}" -H 'Accept: application/json' http://localhost:3000/pesto-content | tail -n 1 | jq .

# --- # --- # --- # --- # --- # --- # --- #
# --- # EXPECTED:
# --- # --- # --- # --- # --- # --- # --- #
# < HTTP/1.1 406 Not Acceptable
# < content-type: application/json; charset=utf-8
# < content-length: 261
# < Date: Sun, 08 Oct 2023 08:58:10 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=72
# <
# { [261 bytes data]
# 100   610  100   261  100   349  13118  17541 # --:--:-- --:--:-- --:--:-- 32105
# * Connection #0 to host localhost left intact
# {
# "statusCode": 406,
# "message": "PESTO-CONTENT DATA SERVICE [CREATE] method - No new [PestoContent] was created: No PestoContentType of with content_type_id = [652180e1b81cf34b44350bb9] was found. A PestoContent cannot be created without an existing content-type."
# }
# 
# --- # --- # --- # --- # --- # --- # --- #
# --- # --- # --- # --- # --- # --- # --- #

# --- 
# List all Entity instances, after creation
curl -iv -X GET -H 'Accept: application/json' http://localhost:3000/pesto-content | tail -n 1 | jq .

```

* Left TODO:

```bash
# ---
# Left TODO : 
#  + GET ALL BY PROJECT ID: cccc
#  + UPDATE: cccc
#  + DELETE: cccc
# 
# --- 
# 
```

### Testing the API (E2E)

Here are the scenarii I want to tests.

_**Scenario 1**_

- I create a new pesto project named `myfirstpestoproject`:
  - it has a **`name`**, value `myfirstpestoproject`
  - it has a **`description`**
  - it has a **`git url`**
  - it has a **`git service provider`**: `Gitlab` `Gitea`, or `Github`, or CustomGitService. _(custom git service is a service which is ran in private servers, using a different configuration than those of Github Gitea or Gitlab, so i will need the concept of a general Git Service Provider Config, which includes partial API definition, to define how to create a webhook, what is the payload of that webhook, how to integrate a given Git Service Provider event with the pipeline service)_.
  - _[DEPRECATED]_ It has a list of `PestoContentType`s. A Content-Type can be created without any content yet
  - _[DEPRECATED]_ It has a list of `PestoContent`s. No `PestoContent` can be created without an existing `PestoContentType`
- I create a `PestoContentType` named `robe`, in the project named `myfirstpestoproject` : from project creation request, i keep the `_id` of the `myfirstpestoproject` created project, and use it as `project_id`
- I create 2 `PestoContent` of type (`PestoContentType`) is `robe`, in the project `myfirstpestoproject`:
  - One named `Robe d'été rouge manoukian`
  - One other named `Robe mi-saison verte mango`
  - when i create the content type, if the frontmatter in the HTTP POST request payload,is not valid against the JSonSchema of the associated (`content_type_id`) `PestoContentType` (there exists a `React` component called [`react-yaml-form`](https://github.com/MaximeGoyette/react-yaml-form), you give it a `yaml`, you get the form). ideally the validation should happen on client side, so when i fill in the form, when the `content_type_id` is selected, (drop down list), then the content type is fetched, the JSonSchema is used to validate the frontmatter edited by the user filling in the form. the validation is also triggered everytime the JSON is edited. an the rest endpoint also runs the jsonschema validation before updating the mongothrough redux toolkit rtk.
- Now I want to list :
  - all `PestoContent` in a given `PestoProject` project
  - all `PestoContentType` of a given `PestoProject` project.
  - all `PestoContent` of a given `PestoContentType`, in a given `PestoProject` project.

## GEnerate OpenAPI Docs

Run:

```bash
pnpm run generate:docs
```

You will get : 
- The `openapi.jspn`
- A well enriched markdown file, `./pesto-api\pesto.widdershins.md`, compatible with widdershins and reslate / eleventy

## References

- The first tutorial I followed to spin the app : <https://dev.to/carlomigueldy/building-a-restful-api-with-nestjs-and-mongodb-mongoose-2165>
- The second : <https://blog.logrocket.com/understanding-controllers-routes-nestjs/>
- The third set of sources of informations I used, to be able to add Primary Key / Foreign Key relationship :
  - <https://gist.github.com/jmora2612/6f82c537eb957102e925a433ae9f9a4c#file-products-schema-ts-L19>
  - cc

Other articles andsources i had a look on, about NestJS and Mongoose :

- <https://medium.com/@kruyvanna/getting-started-with-nestjs-and-mongodb-c81c1be49ac2>
- cccc
