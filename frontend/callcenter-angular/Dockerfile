FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other project files
COPY . .

# Expose port 4200 for Angular dev server
EXPOSE 4200

# Run the Angular dev server and bind to 0.0.0.0 so it's accessible outside the container
CMD ["npm", "start", "--", "--host", "0.0.0.0", "--poll", "2000"]
