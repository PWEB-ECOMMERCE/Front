ARG node=node:18.20.2-slim
FROM ${node} as deps
WORKDIR /home/app
COPY package*.json yarn.lock ./
RUN yarn install

FROM ${node} as dev
WORKDIR /home/app
COPY --from=deps /home/app/node_modules ./node_modules
COPY package.json ./
COPY . .
CMD [ "npm", "run", "dev"]

# FROM ${node} as builder
# WORKDIR /home/app
# COPY --from=deps /home/app/node_modules ./node_modules
# COPY package.json ./
# COPY . .
# CMD [ "npm", "run", "dev"]