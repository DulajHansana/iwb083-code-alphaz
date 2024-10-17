# Use the Ballerina base image to start with
FROM ballerina/ballerina:latest

# Set the working directory inside the container
WORKDIR /app

# Copy your Ballerina project files from your repository to the container
COPY /Backend /app/

# Build the Ballerina project (this will generate the .jar or binary)
RUN bal build server.bal

# Expose the port your Ballerina HTTP server will listen on
EXPOSE 8080

# Start the application using the generated .jar or binary
CMD ["bal", "run", "target/bin/server.jar"]
