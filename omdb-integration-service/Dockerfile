# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json into the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose port 3005 for Node.js with Express
EXPOSE 3005

# Build the React app and start the development server
CMD ["bash", "-c", "npm run build && npm run dev"]