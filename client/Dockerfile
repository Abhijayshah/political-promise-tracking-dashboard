# Dockerfile for React Client (Vite)
# Build stage
FROM node:22-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the production application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy the build output to nginx public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a simple nginx configuration for SPA routing
RUN echo "server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files \$uri \$uri/ /index.html; \
    } \
}" > /etc/nginx/conf.d/default.conf

# Expose the client port
EXPOSE 80

# Command to run nginx
CMD ["nginx", "-g", "daemon off;"]
