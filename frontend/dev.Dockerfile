FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm@10.2.0

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

EXPOSE 5173

CMD ["pnpm", "dev", "--host"]