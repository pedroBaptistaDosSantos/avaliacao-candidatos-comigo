FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

# 3. Gerar cliente do Prisma
RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]