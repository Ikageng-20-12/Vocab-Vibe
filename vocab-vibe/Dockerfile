FROM node:18 as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Explicitly install the missing module
RUN npm install @rollup/rollup-linux-x64-gnu || true

# Copy frontend code
COPY . .

# Build with NODE_OPTIONS to increase memory
RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build

# Stage 2: Serve the built app with Nginx
FROM nginx:alpine

# Copy built assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]