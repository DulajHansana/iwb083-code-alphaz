FROM ballerina/ballerina:latest

COPY Backend/target/bin/Backend.jar /app/

COPY Backend/Config.toml /app/

CMD ["bal", "run", "/app/Backend.jar", "--config", "/app/Config.toml"]
