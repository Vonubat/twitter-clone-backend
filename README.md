# Deploy:

https://twitter-clone-back-end.up.railway.app/docs

## Local setup

0. Install docker and docker-compose using the instruction https://docs.docker.com/get-docker/

1. Install dependencies

```bash
$ npm install
```

2. Running the Docker with PostgreSQL service:

```bash
# for start
$ docker-compose up -d

# for stop
$ docker-compose down
```

3. Running the backend service

```bash
$ npm run start:dev
```

4. Seed DB (optional)

```bash
$ npm run seed
```
