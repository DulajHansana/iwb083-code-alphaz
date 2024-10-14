import Backend.jsonwebtoken as JWT;
import Backend.ws_provider as WSP;

import ballerina/http;
import ballerina/io;
import ballerina/jwt;
import ballerina/log;
import ballerina/time;
import ballerina/uuid;
import ballerina/websocket;

boolean isWebSocketEnabled = false;
configurable string jwtSecret = ?;
isolated boolean is_logger_ready = true;

type RequestRecord record {
    readonly string connection_id;
    "client"|"websocket" connection_type;
    readonly string authorization;
    readonly time:Utc timestamp = time:utcNow();
};

isolated table<RequestRecord> key(connection_id) requestTable = table [];

public function main() returns () {
    log:Error? outputFile = log:setOutputFile(".resources/server.log", log:APPEND);
    if outputFile is log:Error {
        lock {
	        is_logger_ready = false;
        }
        io:println(outputFile.message());
        return;
    }
}

service / on new http:Listener(8080) {
    function init() {
        loggerWrite("info", "Server started.");
        io:println("Server started.");
    }

    resource function get .(http:Request req) returns http:Accepted & readonly {
        loggerWrite("info", "Authorization request received.");
        io:println("Authorization request received.");
        return http:ACCEPTED;
    }

    isolated resource function get authorize(http:Request req) returns http:Response|http:Forbidden|error {
        string authHeader = check req.getHeader("Authorization");

        if authHeader.startsWith("Bearer ") {
            jwt:Payload|jwt:Error validationResult = JWT:verifyToken(authHeader, jwtSecret);

            if validationResult is jwt:Payload {
                string keepAliveToken = uuid:createRandomUuid();
                RequestRecord request = {connection_id: keepAliveToken, connection_type: "client", authorization: authHeader};
                lock {
                    requestTable.add(request.clone());
                }

                http:Response response = new;
                response.setHeader("keep-alive-token", keepAliveToken);
                response.statusCode = 202;
                
                loggerWrite("info", "Authorization successful.");
                io:println("[success] JWT: ", req.getHeader("Authorization"));
                return response;

            } else {
                loggerWrite("error", validationResult.message());
                io:println("[fail] JWT: ", validationResult.message());
                return http:FORBIDDEN;
            }
        } else {
            loggerWrite("error", "Authorization headers are missing or not a Bearer token");
            io:println("Authorization headers are missing or not a Bearer token");
            return http:FORBIDDEN;
        }
    }
};

service /ws on new websocket:Listener(21003) {
    resource function get .(http:Request req) returns websocket:Service|websocket:UpgradeError {
        if req.method == "GET" &&
            req.httpVersion == "1.1" &&
            req.getHeader("Upgrade") == "websocket" &&
            req.getHeader("Connection") == "Upgrade" {

            loggerWrite("info", "Valid WebSocket handshake request received.");
            io:println("Valid WebSocket handshake request received.");
            io:println(req.getHeader("Sec-WebSocket-Key"), req.getHeader("Sec-WebSocket-Version"));

            return new WSP:WsService();
        } else {
            loggerWrite("error", "Invalid WebSocket handshake request. Request will be rejected.");
            io:println("Invalid WebSocket handshake request. Request will be rejected.");
            return error("Invalid WebSocket handshake request.");
        }
    }

    function init() {
        isWebSocketEnabled = true;
        loggerWrite("info", "WebSocket server started.");
        io:println("WebSocket server started.");
    }
}

public isolated function loggerWrite(string log_level, string message) returns () {
    lock {
	    if !is_logger_ready {
	        return;
	    }
    }

    string stringResult = <string>message;

    match log_level {
        "info" => {
            log:printInfo(stringResult);
        }

        "error" => {
            log:printError(stringResult);
        }

        "warn" => {
            log:printWarn(stringResult);
        }

        "debug" => {
            log:printDebug(stringResult);
        }
    }
}
