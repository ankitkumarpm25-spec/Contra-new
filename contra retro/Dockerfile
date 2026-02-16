# Use official Node.js image
FROM node:18-slim

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image
COPY package*.json ./

# Install production dependencies
RUN npm install --only=production

# Copy local code to the container image
COPY . .

# Expose the port (Cloud Run defaults to 8080)
ENV PORT 8080
EXPOSE 8080

# Run the web service on container startup
CMD [ "node", "server.js" ]
