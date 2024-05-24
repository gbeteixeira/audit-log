#!/usr/bin/env bash
set -e

source .env

/opt/wait-for-it.sh $DB_HOST:$DB_PORT
npx prisma migrate dev
node src/infra/main.js
