# Stage 1: Build the Ballerina project
FROM ballerina/ballerina:latest AS builder

# Set the working directory
WORKDIR /app

# Copy the backend files into the container
COPY ./Backend /app/

# Print Ballerina version (optional)
RUN bal version

USER root

# Build the Ballerina project
RUN bal build

# Stage 2: Run the Ballerina service
FROM ballerina/ballerina:latest

# Set the working directory
WORKDIR /app

# Copy the built artifacts from the builder stage
COPY --from=builder /app/target /app/target
COPY --from=builder /app/Ballerina.toml /app/Ballerina.toml
COPY --from=builder /app/Config.toml /app/Config.toml
COPY --from=builder /app/resources /app/resources

# Expose ports
EXPOSE 8080
EXPOSE 21003

ENV CACHEBUST=1

RUN ls -l /app
RUN ls -l /app/target/bin

# Command to run the Ballerina service
CMD ["bal", "run", "/app/target/bin/Backend.jar"]