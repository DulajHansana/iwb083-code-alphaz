# Use the Ballerina base image to start with
FROM ballerina/ballerina:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the backend files into the container
COPY /Backend /app/

# Check file permissions (optional, for debugging)
RUN ls -la /app/

RUN rm -f /app/target

# Remove the Dependencies.toml file if it exists
RUN rm -f /app/Dependencies.toml

# Print Ballerina version (optional)
RUN bal version

# Expose ports
EXPOSE 8080
EXPOSE 21003

# Build the Ballerina project
RUN bal build

# Command to run the Ballerina service
CMD ["bal", "run"]
