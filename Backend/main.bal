import Backend.jsonwebtoken as JWT;
import Backend.ws_provider as WSP;

import ballerina/http;
import ballerina/io;
import ballerina/jwt;
import ballerina/websocket;
import ballerina/uuid;
import ballerina/time;

boolean isWebSocketEnabled = false;
configurable string jwtSecret = ?;

type RequestRecord record {
    readonly string connection_id;
    "client" | "websocket" connection_type;
    readonly string authorization;
    readonly time:Utc timestamp = time:utcNow();
};

isolated table<RequestRecord> key(connection_id) requestTable = table [];

service / on new http:Listener(8080) {
    resource function get .(http:Request req) returns http:Accepted & readonly {
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

                io:println("[success] JWT: ", req.getHeader("Authorization"));
                http:Response response = new;
                response.setHeader("keep-alive-token", keepAliveToken);
                response.statusCode = 202;
                return response;

            } else {
                io:println("[fail] JWT: ", validationResult.message());
                return http:FORBIDDEN;
            }
        } else {
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

            io:println("Valid WebSocket handshake request received.");
            io:println(req.getHeader("Sec-WebSocket-Key"), req.getHeader("Sec-WebSocket-Version"));

            return new WSP:WsService();
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
