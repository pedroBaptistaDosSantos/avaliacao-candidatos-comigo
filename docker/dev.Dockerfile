FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma/

RUN npm ci --only=production && npm cache clean --force

RUN npm install --only=dev

RUN npx prisma generate

COPY . .

RUN chmod -R 755 node_modules/.bin

EXPOSE 3000

CMD ["npm", "run", "dev"]