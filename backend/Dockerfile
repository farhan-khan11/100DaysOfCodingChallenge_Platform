FROM node:24

# Install C, Python compilers
RUN apt-get update && apt-get install -y \
    gcc \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*
# line - 4 : Downloads the latest list of available packages && Install the listed packages -y means yes to all prompts automatically
    # Deletes the package list cache after installation
    # apt-get update downloaded a big list of packages
    # Once installation is done → that list is useless
    # Deleting it makes Docker image smaller ✅

# Set working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all backend files including build folder
COPY . .

# Expose port
EXPOSE 4060

# Start server
CMD ["node", "index.js"]