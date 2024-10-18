# Use the Ballerina base image to start with
FROM ballerina/ballerina:latest

# Set the working directory inside the container
WORKDIR /app

# Copy your Ballerina project files from your repository to the container
COPY /Backend /app/
RUN ls -la /app/
RUN bal version

# Build the Ballerina project (this will generate the .jar or binary)
RUN bal build