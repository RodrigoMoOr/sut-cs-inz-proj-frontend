FROM node:16

# Create app directory for proj Plutus
WORKDIR /app

# Copy package.json and package-lock.json to install deps
COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]