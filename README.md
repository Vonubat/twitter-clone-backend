## Installation

```bash
$ npm install
```

## Running in the dev mode

**Install docker and docker-compose using the instruction https://docs.docker.com/get-docker/**

1. Running the Docker with PostgreSQL service:

```bash
# for start
$ docker-compose up -d

# for stop
$ docker-compose down
```

2. Running the backend service

```bash
$ npm run start:dev
```

3. Seed DB (optional)

```bash
$ npm run seed
```
