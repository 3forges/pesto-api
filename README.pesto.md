# The `Pesto API`

## Run the `Pesto API` locally
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

* Then you can start the rest api from the `./pesto-api` folder : 

```bash
pnpm i 

export PESTO_MONGO_HOST=mongo.pesto.io
source ./.env.sh

pnpm start
```
* Then you can run the 
```

```bash
pnpm i 

export PESTO_MONGO_HOST=mongo.pesto.io
source ./.env.sh

pnpm start
```

* Then you can test using the `Pesto API`:

```bash
curl -iv -X GET -H 'Accept: application/json' http://localhost:3000/ | tail -n 1 | jq .

curl -iv -X GET -H 'Accept: application/json' http://localhost:3000/pesto-content-type | tail -n 1 | jq .

# ---
# This is how to create a new
# "Pesto Content Type", with a curl : 
curl -iv -X POST -H 'Content-Type: application/json' -d '{ "title" : "robe", "description" : "un autre type de contenu pour mon blog", "identifier" : "robe"}' -H 'Accept: application/json' http://localhost:3000/pesto-content-type | tail -n 1 | jq .

```

## How it was spawned

```bash

# ---
# first install nest cli 
# (does not work with pnpm - 03/10/2023)
npm install -g @nestjs/cli



# --- 
# 
#  $ nest --version
#  10.1.18
# 
# ---





# --- 
# spin up the project

# nest new todo-rest-app
nest new pesto-api --package-manager=pnpm

cd ./pesto-api/

pnpm i

# # --- 
# # --------------------------
# # + Creating "PestoContentType" feature
# # --------------------------
# # --- 

# PestoContentTypeModule
nest g module PestoContentType
# Using alias: nest g mo PestoContentType

# PestoContentTypeService
nest g service PestoContentType
# Using alias: nest g s PestoContentType

# PestoContentTypeController
nest g controller PestoContentType 
# Using alias: nest g co PestoContentType 


# # --- 
# # --------------------------
# # + Creating a "PestoContentType" model/schema
# # --------------------------
# # --- 
pnpm add -D @nestjs/mongoose mongoose

cat <<EOF >./src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest')],
})
export class AppModule {}
EOF


mkdir -p src/content/schemas && touch ./src/content/schemas/PestoContentType.schema.ts

cat <<EOF >./src/content/schemas/PestoContentType.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PestoContentTypeDocument = PestoContentType & Document;

@Schema()
export class PestoContentType {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop()
  completedAt?: Date;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  deletedAt?: Date;
}

export const PestoContentTypeSchema = SchemaFactory.createForClass(PestoContentType);
EOF

# ---
# Then let's create a DTO (Data Object Model) for
# creating and updated a Todo. But first I want to
# create a base class DTO
# ---
# 

mkdir -p ./src/content/dto
touch ./src/content/dto/base-pesto-content-type.dto.ts

cat <<EOF >./src/content/dto/base-pesto-content-type.dto.ts
export class BasePestoContentTypeDto {
   title: string
   description?: string
}
EOF


touch src/content/dto/create-pesto-content-type.dto.ts
touch src/content/dto/update-pesto-content-type.dto.ts

# // ./src/content/dto/create-pesto-content-type.dto.ts
cat <<EOF >./src/content/dto/create-pesto-content-type.dto.ts
import { BasePestoContentType } from "./base-pesto-content-type.dto";

export class CreateTodoDto extends BasePestoContentType {}
EOF

# // ./src/content/dto/update-pesto-content-type.dto.ts

cat <<EOF >./src/content/dto/update-pesto-content-type.dto.ts
import { BasePestoContentType } from './base-pesto-content-type.dto';

export class UpdateTodoDto extends BasePestoContentType {
  completedAt: Date;
}
EOF

```

* Then  i modified the sorurce code to pick a  first env.  var. : 

```bash
export PESTO_DBNAME=pesto
export PESTO_MONGO_USER=pesto
export PESTO_MONGO_SECRET=pesto
export PESTO_MONGO_HOST=mongo.pesto.io
export PESTO_MONGO_PORT=27017

# ---
# export PESTO_MONGODB_URL="mongodb://${PESTO_MONGO_USER}:${PESTO_MONGO_SECRET}@mongo.pesto.io:${PESTO_MONGO_PORT}/${PESTO_DBNAME}"

# ---
# We need not to include the DB NAME in the
#  mongo url for mongoose connection
export PESTO_MONGODB_URL="mongodb://${PESTO_MONGO_USER}:${PESTO_MONGO_SECRET}@mongo.pesto.io:${PESTO_MONGO_PORT}"

pnpm start

```

* Then execute those tests :

```bash
curl -iv -X GET -H 'Accept: application/json' http://localhost:3000/ | tail -n 1 | jq .

curl -iv -X GET -H 'Accept: application/json' http://localhost:3000/pesto-content-type | tail -n 1 | jq .

# ---
# This is how to create a new
# "Pesto Content Type", with a curl : 
curl -iv -X POST -H 'Content-Type: application/json' -d '{ "title" : "robe", "description" : "un autre type de contenu pour mon blog", "identifier" : "robe"}' -H 'Accept: application/json' http://localhost:3000/pesto-content-type | tail -n 1 | jq .


# ---
# Might also work with more modifications : 
# curl -iv -X POST -d 'title=superpesto1&identifier=chaussure&description=un%20premier type%20de%20contenu%20de%20mon%20site%20web' -H 'Accept: application/json' http://localhost:3000/pesto-content-type | tail -n 1 | jq .

# --
# --- 
# ---- 
#  Which gives an answer of the following form :
# ----

# $ curl -iv -X POST -d 'title=superpesto1&description=volonscela' -H 'Accept: application/json' http://localhost:3000/pesto-content-type | tail -n 1 | jq .                                Note: Unnecessary use of -X or --request, POST is already inferred.
#   % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
#                                  Dload  Upload   Total   Spent    Left  Speed
#   0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0*   Trying ::1:3000...
# * Connected to localhost (::1) port 3000 (#0)
# > POST /pesto-content-type HTTP/1.1
# > Host: localhost:3000
# > User-Agent: curl/7.77.0
# > Accept: application/json
# > Content-Length: 40
# > Content-Type: application/x-www-form-urlencoded
# >
# } [40 bytes data]
# * Mark bundle as not supporting multiuse
# < HTTP/1.1 201 Created
# < X-Powered-By: Express
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 130
# < ETag: W/"82-iwCNlOXzxG6u47kbSVxD/lwjl7o"
# < Date: Wed, 04 Oct 2023 01:05:25 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5
# <
# { [130 bytes data]
# 100   170  100   130  100    40   7711   2372 --:--:-- --:--:-- --:--:-- 10625
# * Connection #0 to host localhost left intact
# {
  # "title": "superpesto1",
  # "description": "volonscela",
  # "createdAt": "2023-10-04T01:05:25.530Z",
  # "_id": "651cba5510e7a46f3629356d",
  # "__v": 0
# }
# 

```

## References

* The first tutorial I followed to spin the app : https://dev.to/carlomigueldy/building-a-restful-api-with-nestjs-and-mongodb-mongoose-2165
* The second : https://blog.logrocket.com/understanding-controllers-routes-nestjs/
