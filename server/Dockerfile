# Use a Node.js base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your server code
COPY . .

# Expose the port your server listens on (example 3000)
EXPOSE 3000

# Start your server (adjust the start command as per your project)
CMD ["npm", "start"]
