FROM ballerina/ballerina:latest

WORKDIR /app

COPY /Backend /app/
RUN ls -la /app/
RUN bal version

EXPOSE 8080
EXPOSE 21003

RUN bal build

CMD ["bal", "run"]