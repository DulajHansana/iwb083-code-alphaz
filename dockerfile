FROM ballerina/ballerina:latest

COPY Backend/target/bin/Backend.jar /app/

CMD ["bal", "run", "/app/Backend.jar"]