# The Kafka turnpoint

## Why

## Refs.

* How to create the kafka code in the nestjs app:
  * This one is best because clear: https://tamrakar-shreyaa.medium.com/a-deep-dive-into-implementing-kafka-in-nestjs-for-event-driven-f752bc2c1323
  * this one i can look at it to compare architecture details: https://dev.to/devjaime/what-is-kafka-and-how-to-implement-it-in-nestjs-4973
  * official docs: https://docs.nestjs.com/microservices/kafka
* How to launch easily a kafka service with docker:
  * the official apache kafka : 
  * webui: https://docs.kouncil.io/getting-started/installation/deployment
  * there's also a little tutorial docker compose there:  https://dev.to/iamdeepakdev/how-to-implement-kafka-in-nestjs--2p9a

```Yaml
version: '3.8'
networks:
  ev:
    name: "ev"
    driver: bridge
    ipam:
      driver: default
      config:
        - subnet: 10.5.0.0/16
          ip_range: 10.5.0.0/24
          gateway: 10.5.0.1
          aux_addresses:
            kafka: 10.5.0.2
            zookeeper: 10.5.0.3
            kouncil: 10.5.0.4
services:
  # mongodb:
  #   image : mongo:latest
  #   container_name: mongodb
  #   environment:
  #     - MONGO_INITDB_ROOT_PASSWORD= root
  #     - MONGO_INITDB_ROOT_USERNAME= root
  #   volumes:
  #     - ./mongodb:/data/db
  #   ports:
  #     - 27017:27017
  #   restart: unless-stopped
  zookeeper:
    image: 'bitnami/zookeeper:latest'
    container_name: "zookeeper"
    ports:
      - 2181:2181
    # volumes:
    # - ./zookeeper:/var/lib/zookeeper
    networks:
      - "ev"
    environment:
      - ALLOW_ANONYMOUS_LOGIN=yes
  kafka:
    image: bitnami/kafka:latest
    container_name: "kafka"
    ports:
      - 0.0.0.0:9092:9092
    networks:
      - "ev"
      # volumes:
      # - ./kafka:/opt/bitnami/kafka
    restart: unless-stopped
    depends_on:
      - zookeeper
    environment:
      - KAFKA_BROKER_ID=1
      - KAFKA_LISTENERS=PLAINTEXT://:9092
      - ALLOW_PLAINTEXT_LISTENER=yes
      - KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181
      - KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092
      - KAFKA_RESTART_ATTEMPTS=10
      - KAFKA_RESTART_DELAY=5
      - ZOOKEEPER_AUTOPURGE_PURGE_INTERVAL=0
      # - KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1
  
  # docker run -d -p 80:8080 -e bootstrapServers="kafka1:9092" consdata/kouncil:latest

  kouncil:
    image: consdata/kouncil:latest
    restart: always
    container_name: "kouncil"
    ports:
      - 0.0.0.0:80:8080
    environment:
      - bootstrapServers="kafka1:9092"
    networks:
      - "ev"
  redis:
    image: redis:3
    restart: always
    container_name: "redis"
    ports:
      - 6379:6379
    environment:
      - ALLOW_EMPTY_PASSWORD=yes
    volumes: 
      - ./redis:/data
    networks:
      - "ev"
```
