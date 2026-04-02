# Use official Node.js image
FROM node:20-slim

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application
COPY . .

# Expose the port (Cloud Run sets PORT env var)
EXPOSE 8080

# Start the server
CMD [ "node", "generator/server.js" ]
