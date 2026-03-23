# Dockerfile for Express Server
FROM node:22-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the server port
EXPOSE 5001

# Command to run the application
CMD ["npm", "start"]
