# Use the Ballerina base image to start with
FROM ballerina/ballerina:latest

# Set the working directory inside the container
WORKDIR /app

COPY /Backend /app/
RUN ls -la /app/
RUN bal version

EXPOSE 8080
EXPOSE 21003

RUN bal build

CMD ["bal", "run"]