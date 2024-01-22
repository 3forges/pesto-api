
# Using the PEsto API: Pesto _`Project`s_

## Using the `GraphQL` API (with the Apollo browser)

Here are the working verified queries :

### GraphQL API: working with Pesto _`Project`s_

#### **Create a Project** Mutation (with variables)

```GraphQL
mutation createProject($name: String!, $git_ssh_uri: String!, $description: String!) {
  createPestoProject(projectToCreate: {
    name: $name,
    description: $description,
    git_ssh_uri: $git_ssh_uri,
    git_service_provider: "github"
  }){
    _id: _id
    name: name
    git_ssh_uri: git_ssh_uri
    description: description
    git_service_provider: git_service_provider
  }
}
```

_Mutation Variables_ :

```GraphQL
{
  "name": "pendentif",
  "git_ssh_uri": "git@github.com:3forges/tourdivoire.git",
  "description": "ce projet pesto a été créé par Mutaiton dan sle Browser apollo"
}
```

The result of that create mutation in the appollo browser:

![the mutation - apollo browser](./../../images/graphql/projects/mutations/createProjectMutation1.PNG)

![verified mutation - apollo browser](./../../images/graphql/projects/mutations/createProjectMutation2.PNG)

![verified mutation - pesto frontend](./../../images/graphql/projects/mutations/createProjectMutation3.PNG)

#### Get all _`Project`s_ Query

```GraphQL
query GetAllProjectsExample {
  getAllPestoProjects {
    _id
    name
    description
    git_ssh_uri
    git_service_provider
  }
}
```

#### Get a _`Project`_ by `ID` Query

```GraphQL
query GetProjectByID($id: ID!) {
  pestoProject(_id: $id) {
    name
    description
    createdAt
    deletedAt
  }
}
```

_Query Variables_ :

```GraphQL
{ "id": "6526bb5df88cd05417311b3c" }
```

#### Update a _`Project`_ by `ID` Mutation (with variables)

```GraphQL
mutation updateProjectByID($id: ID!, $name: String!, $git_ssh_uri: String!, $description: String!) {
# mutation updateProjectName($id: ID!, $name: String!) {
  updatePestoProject(projectUpdate: {
    _id: $id,
    name: $name,
    # description: "bon on va voir",
    # git_ssh_uri: "git@github.com:3forges/batiment.git",
    description: $description,
    git_ssh_uri: $git_ssh_uri,
    git_service_provider: "github"
  }) {
    _id: _id
    name: name
    git_ssh_uri: git_ssh_uri
    description: description
    git_service_provider: git_service_provider
  }
}
```

_Mutation Variables_ :

```GraphQL
{
  "id": "65a279c5b51cdf03d306bf78",
  "name": "Je change le champs 'name' du projet  par mutation GraphQL",
  "git_ssh_uri": "git@github.com:3forges/nouvelle_valeur_de_git_ssh_uri.git",
  "description": "J'ai modifié la description de ce projet par le browser GraphQL Apollo"
}
```

The result of that update mutation in the appollo browser:

![the mutation - apollo browser](./../../images/graphql/projects/mutations/updateProjectMutation1.PNG)

![verified mutation - apollo browser](./../../images/graphql/projects/mutations/updateProjectMutation2.PNG)

![verified mutation with richer returned data - apollo browser](./../../images/graphql/projects/mutations/updateProjectMutation4.PNG)

![verified mutation - pesto frontend](./../../images/graphql/projects/mutations/updateProjectMutation3.PNG)

#### Delete a _`Project`_ Mutation

Note this is a Very good example of nested response in a GraphQL Mutation

```GraphQL
mutation DeleteProjectByID($id: ID!) {
  deletePestoProject(_id: $id) {
    message
    deletedProject {
      _id
      name
      git_ssh_uri
      description
    }
  }
}
```

_Mutation Variables_ :

```GraphQL
{
  "id": "655a9dab747edd9e5fe67c4a"
}
```

## Using the REST API (with curl)

### REST API: working with Pesto _`Project`s_

#### Create a _`Project`_

```bash
export PESTO_API_HTTP_SCHEME="http" # or "https"
export PESTO_API_HOST=api.pesto.io
export PESTO_API_PORT=3000
export PESTO_API_BASE_URL="${PESTO_API_HTTP_SCHEME}://${PESTO_API_HOST}:${PESTO_API_PORT}"

# ---
# This is how to create a new
# "Pesto Project", with a curl :
export PESTO_PRJ_GIT_SSH_URI='git@github.com:3forges/poc-redux-thunk.git'
export PESTO_PRJ_NAME='astroprojectWiddershins'
export PESTO_PRJ_DESC='Un premier projet pesto sur une base de projet astro, pour une doc Open API à la widdershins'

# export PESTO_PRJ_DESC_URL_ENCODED='Un%20premier%20projet%20pesto%20sur%20une%20base%20de%20projet%20astro%2C%20pour%20une%20doc%20Open%20API%20%C3%A0%20la%20widdershins'

export THE_PAYLOAD="{ 
  \"name\" : \"${PESTO_PRJ_NAME}\", \"description\" : \"${PESTO_PRJ_DESC_URL_ENCODED}\", \"git_ssh_uri\" : \"${PESTO_PRJ_GIT_SSH_URI}\"
}"


export THE_PAYLOAD='{"name":"astroprojectWiddershins","description":"Un premier projet pesto sur une base de projet astro, pour une doc Open API à la widdershins","git_ssh_uri":"git@github.com:3forges/poc-redux-thunk.git"}'

# echo "THE_PAYLOAD=[${THE_PAYLOAD}]"

curl -iv -X POST -H 'Content-Type: application/json; charset=UTF-8' -d "${THE_PAYLOAD}" -H 'Accept: application/json; charset=UTF-8' ${PESTO_API_BASE_URL}/pesto-project | tail -n 1 | jq .

# ---
# Git bash for windows users:
# -
# Note that you might notice something, that some of 
# the UTF-8 characters, might be turned into another 
# character, in the pesto app. 
# 
# For example, the character "à", might be 
# turned into a "�" character.
# 
# But when you create or update a new project using the
# Pesto UI, the characters are preserved properly.
# 
# Similarly, The Characters are well preserved when
# creating/updating a project using the Apollo GraphQL client.
# 
# - 
# This might be caused by Git bash for windows itself, which
# may have some issues with UTF-8
# https://stackoverflow.com/questions/10651975/unicode-utf-8-with-git-bash
# - 
```

#### Get all _`Project`s_

```bash
export PESTO_API_HTTP_SCHEME="http" # or "https"
export PESTO_API_HOST=api.pesto.io
export PESTO_API_PORT=3000
export PESTO_API_BASE_URL="${PESTO_API_HTTP_SCHEME}://${PESTO_API_HOST}:${PESTO_API_PORT}"

# ---
# This is how to list all 
# "Pesto Projects", with a curl :

curl -iv -X GET -H 'Content-Type: application/json' -H 'Accept: application/json' ${PESTO_API_BASE_URL}/pesto-project | tail -n 1 | jq .

```

#### Get a _`Project`_ by `ID`

```bash
export PESTO_API_HTTP_SCHEME="http" # or "https"
export PESTO_API_HOST=api.pesto.io
export PESTO_API_PORT=3000
export PESTO_API_BASE_URL="${PESTO_API_HTTP_SCHEME}://${PESTO_API_HOST}:${PESTO_API_PORT}"


export PESTO_PRJ_ID="65a279c5b51cdf03d306bf78"

# ---
# Get newly created project by name
curl -iv -X GET -H 'Accept: application/json' "${PESTO_API_BASE_URL}/pesto-project/${PESTO_PRJ_ID}" | tail -n 1 | jq .
```

#### Get a _`Project`_ by _`Git SSH URI`_

```bash
export PESTO_API_HTTP_SCHEME="http" # or "https"
export PESTO_API_HOST=api.pesto.io
export PESTO_API_PORT=3000
export PESTO_API_BASE_URL="${PESTO_API_HTTP_SCHEME}://${PESTO_API_HOST}:${PESTO_API_PORT}"

# ---
# Get newly created project by Git SSH URI
export PESTO_PRJ_GIT_SSH_URI='git@github.com:3forges/awesome-obs.git'
export PESTO_PRJ_GIT_SSH_URI='git@github.com:3forges/poc-redux-thunk.git'
export PESTO_PRJ_GIT_SSH_URI='git@github.com:3forges/astro-widdershins.git'

export PESTO_PRJ_GIT_SSH_URI_URL_ENCODED='git%40github.com%3A3forges%2Fawesome-obs.git'
export PESTO_PRJ_GIT_SSH_URI_URL_ENCODED='git%40github.com%3A3forges%2Fpoc-redux-thunk.git'
export PESTO_PRJ_GIT_SSH_URI_URL_ENCODED='git%40github.com%3A3forges%2Fastro-widdershins.git'

curl -iv -X GET -H 'Content-Type: application/json' -H 'Accept: application/json' "${PESTO_API_BASE_URL}/pesto-project/uri/${PESTO_PRJ_GIT_SSH_URI_URL_ENCODED}" | tail -n 1 | jq .

```

#### Get a _`Project`_ by `name`

```bash
export PESTO_API_HTTP_SCHEME="http" # or "https"
export PESTO_API_HOST=api.pesto.io
export PESTO_API_PORT=3000
export PESTO_API_BASE_URL="${PESTO_API_HTTP_SCHEME}://${PESTO_API_HOST}:${PESTO_API_PORT}"


export PESTO_PRJ_NAME="I changed the name of the project, using curl"
export URL_ENCODED_PESTO_PRJ_NAME="I%20changed%20the%20name%20of%20the%20project%2C%20using%20curl"
# ---
# Get newly created project by name
curl -iv -X GET -H 'Accept: application/json' "${PESTO_API_BASE_URL}/pesto-project/name/${URL_ENCODED_PESTO_PRJ_NAME}" | tail -n 1 | jq .




```

#### Update a _`Project`_ by `ID`

```bash

export PESTO_API_HTTP_SCHEME="http" # or "https"
export PESTO_API_HOST=api.pesto.io
export PESTO_API_PORT=3000
export PESTO_API_BASE_URL="${PESTO_API_HTTP_SCHEME}://${PESTO_API_HOST}:${PESTO_API_PORT}"


export PESTO_PRJ_ID='65acf1e2fb664af546bf8bc9'

# ---
# Now we try and update the [description]
# of the project, from its ID in
# Mongo Database
# ---
#
curl -iv -X PUT -H 'Content-Type: application/json' -d "{\"description\" : \"I Changed the description of the project using curl\"}" -H 'Accept: application/json' "${PESTO_API_BASE_URL}/pesto-project/${PESTO_PRJ_ID}" | tail -n 1 | jq .

curl -iv -X GET -H 'Content-Type: application/json' -H 'Accept: application/json' "${PESTO_API_BASE_URL}/pesto-project/uri/${GIT_SSH_URI_URL_ENCODED}" | tail -n 1 | jq .

# ---
# Now we try and update the [name]
# of the project, from its ID in
# Mongo Database
# ---
#
curl -iv -X PUT -H 'Content-Type: application/json' -d "{\"name\" : \"I changed the name of the project, using curl\"}" -H 'Accept: application/json' "${PESTO_API_BASE_URL}/pesto-project/${PESTO_PRJ_ID}" | tail -n 1 | jq .

curl -iv -X GET -H 'Content-Type: application/json' -H 'Accept: application/json' "${PESTO_API_BASE_URL}/pesto-project/uri/${GIT_SSH_URI_URL_ENCODED}" | tail -n 1 | jq .


```

#### Delete a _`Project`_

```bash
export PESTO_API_HTTP_SCHEME="http" # or "https"
export PESTO_API_HOST=api.pesto.io
export PESTO_API_PORT=3000
export PESTO_API_BASE_URL="${PESTO_API_HTTP_SCHEME}://${PESTO_API_HOST}:${PESTO_API_PORT}"

export PESTO_PRJ_ID='65a437c050b3df1a9861e3a8'
curl -iv -X DELETE -H 'Content-Type: application/json' -H 'Accept: application/json' "${PESTO_API_BASE_URL}/pesto-project/${PESTO_PRJ_ID}" | tail -n 1 | jq .
```