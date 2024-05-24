#!/usr/bin/env bash
set -e

/scripts/wait-for-it.sh postgres:${DB_PORT-5432}
npx prisma migrate dev
pnpm run start:prod
