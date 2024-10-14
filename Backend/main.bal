import Backend.jsonwebtoken as JWT;
import Backend.ws_provider as WSP;
import Backend.logger_writter as LW;
import Backend.database as DB;
import Backend.types as Types;

import ballerina/http;
import ballerina/io;
import ballerina/jwt;
import ballerina/time;
import ballerina/uuid;
import ballerina/websocket;

boolean isWebSocketEnabled = false;
boolean isDatabaseInitialized = false;
configurable string jwtSecret = ?;
configurable string DB_URI = ?;

type RequestRecord record {
    readonly string connection_id;
    "client"|"websocket" connection_type;
    readonly string authorization;
    readonly time:Utc timestamp = time:utcNow();
};

isolated table<RequestRecord> key(connection_id) requestTable = table [];

service / on new http:Listener(8080) {
    function init() {
        isDatabaseInitialized = DB:initialize(DB_URI);
        LW:loggerWrite("info", "Server started.");
        Types:User user = {
            fullname: "Nivindu Lakshitha",
            email: "nivindulakshitha@nu.edu.pk",
            password: "password",
            websocketId: "1234"
        };
        boolean|string result = DB:insert(databaseName = "chatdb", collectionName = "users", document = user);

        if result == false {
            LW:loggerWrite("info", "User inserted successfully.");
        }

        Types:User?? findOne = DB:findOne(databaseName = "chatdb", collectionName = "users", query = {email: "nivindulakshitha@nu.edu.pk"});
        if findOne is Types:User {
            LW:loggerWrite("info", "User found: " + findOne.toJsonString());
        } else {
            LW:loggerWrite("error", "User not found.");
        }

        boolean removeResult = DB:removeOne(databaseName = "chatdb", collectionName = "users", query = {email: "nivindulakshitha@nu.edu.pk"});
        if removeResult == false {
            LW:loggerWrite("info", "User removed successfully.");
        }

        // update one
        boolean updateResult = DB:updateOne(databaseName = "chatdb", collectionName = "users", query = {email: "nivindulakshitha@nu.edu.pk"}, update = {fullname: "Nivindu"});
        if updateResult == false {
            LW:loggerWrite("info", "User updated successfully.");
        }

    }

    resource function get .(http:Request req) returns http:Accepted & readonly {
        LW:loggerWrite("info", "Authorization request received.");
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

                LW:loggerWrite("info", "Authorization successful: " + authHeader);
                return response;

            } else {
                LW:loggerWrite("error", validationResult.message());
                return http:FORBIDDEN;
            }
        } else {
            LW:loggerWrite("error", "Authorization headers are missing or not a Bearer token");
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

            LW:loggerWrite("info", "Valid WebSocket handshake request received.");
            io:println(req.getHeader("Sec-WebSocket-Key"), req.getHeader("Sec-WebSocket-Version"));

            return new WSP:WsService();
        } else {
            LW:loggerWrite("error", "Invalid WebSocket handshake request. Request will be rejected.");
            return error("Invalid WebSocket handshake request.");
        }
    }

    function init() {
        isWebSocketEnabled = true;
        LW:loggerWrite("info", "WebSocket server started.");
    }
}