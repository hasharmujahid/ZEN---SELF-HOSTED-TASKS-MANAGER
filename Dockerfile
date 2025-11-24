# Build Client
FROM node:18-alpine as client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ .
RUN npm run build

# Setup Server
FROM node:18
WORKDIR /app
COPY server/package*.json ./server/
RUN cd server && npm install
COPY server/ ./server/

# Copy Client Build to Server
COPY --from=client-build /app/client/dist ./client/dist

# Expose port
EXPOSE 5000

# Start Server
WORKDIR /app/server
CMD ["node", "index.js"]
