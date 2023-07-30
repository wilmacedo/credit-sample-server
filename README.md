# Will Pay Server

Simple project to test knowlegds.

- [Node.js](https://nodejs.org/en/docs/guides/nodejs-docker-webapp)
- [Express.js](https://expressjs.com/pt-br/)
- [Prisma](https://www.prisma.io/)
- [MongoDB](https://www.mongodb.com/)

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
  pnpm prisma db push
  pnpm prisma generate
```

And finally run dev script

```bash
  pnpm run dev
```

Or build

```bash
  pnpm run build
```

## Environment Variables

If you have any mongo server running in cloud or in another instance, put correct envrionment to .env file using this key

`DATABASE_URL`

## Running Tests

To run tests, run the following command

```bash
  pnpm run test
```
