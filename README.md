# Will Pay Server

Simple project to test knowlegds of Node.js, Express.js, Prisma and MongoDB.

## Setuping the environment

Assuming that you have Docker installed on your environment, let's create a mongo db inside an container

Recommend to use PNPM instead NPM

```bash
  docker compose up -d
```

Install all depedencies with your package manager

```bash
  pnpm install
```

And push our schema to container using prisma

```bash
  pnpm primsa db push
```

## Environment Variables

If you have any mongo server running in cloud or in another instance, put correct envrionment to .env file using this key

`DATABASE_URL`

## Running Tests

To run tests, run the following command

```bash
  pnpm run test
```
