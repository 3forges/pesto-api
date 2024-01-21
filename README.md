# The `Pesto API`

The Pesto API has a double face :

* It's available as a `REST API`,
* And it's available as a `GraphQL` API,

## Run the `Pesto API` locally

### The infrastructure

To run `Pesto API`, with the `Pesto UI`, Locally, you need:

* One Hardware Machine, basically your everyday dev machine, on which you will run both `Pesto UI` and `Pesto API`. The `Pesto API` uses a `MongoDB` database, which will run on a different machine than the `Pesto API`, a VirtualBox VM.
* One VirtualBox VM on which you will run the `MongoDB`, database of the `Pesto API`.
* To configure 3 DNS names: one DNS name for `Pesto API`, one DNS name for `Pesto UI`, and one DNS name for the `MongoDB` database service.

#### Configuring DNS names

* On the Hardware Machine where you run both  `Pesto API` and  `Pesto API`, if it is Windows, in git bash:

```bash

# --- 
# IP address of the VM on which the Mongo DB runs
export IPADDR_OF_YOUR_VM="192.168.37.202"
# --- 
# IP address of the Machine on which the UI and API run
export IPADDR_OF_YOUR_HWMACHINE="192.168.37.236"
# ---
# Add the host for the machine hosting your MongoDB
export PESTO_MONGO_HOST=mongo.pesto.io
echo "# ---- " | sudo tee -a /c/Windows/System32/drivers/etc/hosts
echo "${IPADDR_OF_YOUR_VM}      ${PESTO_MONGO_HOST}" | tee -a /c/Windows/System32/drivers/etc/hosts
export PESTO_UI_FQDN=ui.pesto.io
echo "# ---- " | sudo tee -a /c/Windows/System32/drivers/etc/hosts
echo "${IPADDR_OF_YOUR_HWMACHINE}      ${PESTO_UI_FQDN}" | tee -a /c/Windows/System32/drivers/etc/hosts
export PESTO_API_FQDN=api.pesto.io
echo "# ---- " | sudo tee -a /c/Windows/System32/drivers/etc/hosts
echo "${IPADDR_OF_YOUR_HWMACHINE}      ${PESTO_API_FQDN}" | tee -a /c/Windows/System32/drivers/etc/hosts
# ---
# if you're dhcp, you will need to update the IP Addresses everytime the DHCP server updates the IP Addresses of the machines you run Pesto API and Pesto UI on:  


# --- # --- # --- # --- # --- # --- # --- # --- # --- #
# -- UPDATING IP ADDRESS OF THE VM WHERE MONGO DB RUNS
# --- # --- # --- # --- 
# -- 
export OLD_IPADDR_OF_YOUR_VM="192.168.174.202"
export IPADDR_OF_YOUR_VM="192.168.37.202"
sed -i "s#${OLD_IPADDR_OF_YOUR_VM}#${IPADDR_OF_YOUR_VM}#g" /c/Windows/System32/drivers/etc/hosts

# --- # --- # --- # --- # --- # --- # --- # --- # --- #
# -- UPDATING IP ADDRESS OF THE HARDWARE MACHINE 
# --- # --- # --- # --- 
# - WHERE I HAVE MY [VSCODE] and I 
# - run locally the code in dev mode : 
# - Pesto API and the frontend
export OLD_IPADDR_OF_YOUR_HWMACHINE="192.168.225.236"
export IPADDR_OF_YOUR_HWMACHINE="192.168.37.236"
sed -i "s#${OLD_IPADDR_OF_YOUR_HWMACHINE}#${IPADDR_OF_YOUR_HWMACHINE}#g" /c/Windows/System32/drivers/etc/hosts

```

* On the VirtualBox VM where you run the MongoDB database used by the `Pesto API`, If this machine is a `GNU/Linux`, in bash shell:

```bash

# --- 
# IP address of the VM on which the Mongo DB runs
export IPADDR_OF_YOUR_VM="192.168.37.202"
# --- 
# IP address of the Machine on which the UI and API run
export IPADDR_OF_YOUR_HWMACHINE="192.168.37.236"
# ---
# Add the host for the machine hosting your MongoDB
export PESTO_MONGO_HOST=mongo.pesto.io
echo "# ---- " | sudo tee -a /etc/hosts
echo "${IPADDR_OF_YOUR_VM}      ${PESTO_MONGO_HOST}" | sudo tee -a /etc/hosts
export PESTO_UI_FQDN=ui.pesto.io
echo "# ---- " | sudo tee -a /etc/hosts
echo "${IPADDR_OF_YOUR_HWMACHINE}      ${PESTO_UI_FQDN}" | sudo tee -a /etc/hosts
export PESTO_API_FQDN=api.pesto.io
echo "# ---- " | sudo tee -a /etc/hosts
echo "${IPADDR_OF_YOUR_HWMACHINE}      ${PESTO_API_FQDN}" | sudo tee -a /etc/hosts
# ---
# if you're dhcp, you will need to update the IP Addresses everytime the DHCP server updates the IP Addresses of the machines you run Pesto API and Pesto UI on:  


# --- # --- # --- # --- # --- # --- # --- # --- # --- #
# -- UPDATING IP ADDRESS OF THE VM WHERE MONGO DB RUNS
# --- # --- # --- # --- 
# -- 
export OLD_IPADDR_OF_YOUR_VM="192.168.129.202"
export IPADDR_OF_YOUR_VM="192.168.37.202"
sed -i "s#${OLD_IPADDR_OF_YOUR_VM}#${IPADDR_OF_YOUR_VM}#g" /etc/hosts

# --- # --- # --- # --- # --- # --- # --- # --- # --- #
# -- UPDATING IP ADDRESS OF THE HARDWARE MACHINE 
# --- # --- # --- # --- 
# - WHERE I HAVE MY [VSCODE] and I 
# - run locally the code in dev mode : 
# - Pesto API and the frontend
export OLD_IPADDR_OF_YOUR_HWMACHINE="192.168.225.202"
export IPADDR_OF_YOUR_HWMACHINE="192.168.37.236"
sed -i "s#${OLD_IPADDR_OF_YOUR_HWMACHINE}#${IPADDR_OF_YOUR_HWMACHINE}#g" /etc/hosts

```

#### Start the database

Before starting `Pesto API` (and then `Pesto UI`), you need to provision a **MongoDB** database service on the VirtualBox VM.

* Git clone this repo in the VirtualBox VM, and run this:

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
# export PESTO_MONGO_HOST=mongo.myhome.io
export PESTO_MONGO_HOST=mongo.pesto.io
pnpm run db:start

# ---
# To restart with an empty database
# export PESTO_MONGO_HOST=mongo.myhome.io
export PESTO_MONGO_HOST=mongo.pesto.io
pnpm run db:scratch

```

### Start the Pesto API

* Then you can then start the rest api from the `./pesto-api` folder:

```bash

# ---
# First, install the nestjs cli
npm install -g @nestjs/cli

#---
#
cd ./pesto-api

pnpm i

export PESTO_MONGO_HOST=mongo.pesto.io
export PESTO_API_HOST=api.pesto.io



# pnpm run ci:generate:env
pnpm run ci:env

source ./../.env.sh
pnpm start
```

Finally, you can now start the Pesto UI, see [the `Pesto UI` reporsitory](https://github.com/3forges/pesto-ui).

## Playing with the Pesto API

cf. [the Pesto Api Specs docs in the `./pesto-api/docs/api_specs/` folder](./pesto-api/docs/api_specs/)

## Generate OpenAPI Docs

The Open API Documentation is served at export `http://<PESTO_API_HOST>:3000/api`

Run:

```bash
pnpm run generate:docs
```

You will get :

* The `openapi.json`
* A well enriched markdown file, `./pesto-api/pesto.widdershins.md`, which is no yet used to render a fully fledged static website, as beautiful docs to statically serve.

### OpenAPI Documentation: Next TODO

Ideas to serve the _widdershins_ docs:

* Idea 1:
  * I generate the `./pesto-api/pesto.widdershins.md` file using `pnpm run generate:docs`.
  * Then the problem is to render the `widdershins.md` file into HTML. Basically, historcally, only the Mermaid reslate tool can render that, see :
    * <https://github.com/Mermade/reslate>
    * <https://github.com/Mermade/widdershins>
    * <https://github.com/Mermade/widdershins/issues/223>
  * If reslate is too complicated/not well maintained, and not usable, then I think best is to create an astro website able to render beautifully the `widdershins.md`. I think it is achievable, because the generated `widdershins.md` is rather clean, and clear. Another option is to just use the `openapi.json` file, as an Astro data source, to generate the Astro Website. Maybe with 2 build steps: first generate many markdown files from the `openapi.json`, and then render all those MArkdown files as content files.
  * Once I have a solution to render the `widdershins.md`, I can serve the static content using <https://github.com/nestjs/serve-static>
  * Nota Bene: widdershins relies only on the content of the `openapi.json` file, So if i want to add examples, or anything in OpenAPI docs, I just need to change the `openapi.json`. To change the `openapi.json`, the best is to add annotations on the source code, using the annotations from the  `@nestjs/swagger`, in the Nest controllers.
  * Nota Bene: the only astro theme I found about Open API documentation is not well supported, see <https://github.com/sarasate/gate>
