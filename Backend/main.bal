import Backend.ws_provider;
import ballerina/http;
import ballerina/io;
import ballerina/jwt;
import ballerina/websocket;

boolean isWebSocketEnabled = false;
configurable string jwtSecret = ?;

service / on new http:Listener(8080) {
    resource function get .(http:Request req) returns http:Accepted & readonly {
        return http:ACCEPTED;
    }

    resource function get authorize(http:Request req) returns http:Accepted|http:Forbidden|error {
        string authHeader = check req.getHeader("Authorization");

        if authHeader.startsWith("Bearer ") {
            string jwtToken = authHeader.substring(7);
            jwt:ValidatorSignatureConfig signatureConfig = {
                secret: jwtSecret
            };

            jwt:ValidatorConfig validator = {
                signatureConfig: signatureConfig
            };

            jwt:Error|jwt:Payload validationResult =jwt:validate(jwtToken, validator);

            if validationResult is jwt:Payload {
                io:println("JWT validation succeeded: ", req.userAgent);
                return http:ACCEPTED;
            } else {
                io:println("JWT validation failed: ", validationResult.message());
                return http:FORBIDDEN;
            }
        } else {
            io:println("Authorization header missing or not a Bearer token");
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

            io:println("Valid WebSocket handshake request received.");
            io:println(req.getHeader("Sec-WebSocket-Key"), req.getHeader("Sec-WebSocket-Version"));

            return new ws_provider:WsService();
        } else {
            io:println("Invalid WebSocket handshake request. Request will be rejected.");
            return error("Invalid WebSocket handshake request.");
        }
    }

    function init() {
        isWebSocketEnabled = true;
        io:println("WebSocket server started.");
    }
}