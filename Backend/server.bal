import Backend.database as DB;
import Backend.db_actions_dispatcher as DAD;
import Backend.jsonwebtoken as JWT;
import Backend.logger_writter as LW;
import Backend.types as Types;
import Backend.ws_provider as WSP;

import ballerina/http;
import ballerina/jwt;
import ballerina/uuid;
import ballerina/websocket;

boolean isWebSocketEnabled = false;
isolated boolean isDatabaseInitialized = false;
configurable string jwtSecret = ?;
configurable string DB_URI = ?;

isolated table<Types:RequestRecord> key(connection_id) requestsTable = table [];

service / on new http:Listener(8080) {
    function init() {
        lock {
            isDatabaseInitialized = DB:initialize(DB_URI);
        }
        LW:loggerWrite("info", "Server started.");
    }

    resource function get .(http:Request req) returns http:Accepted & readonly {
        LW:loggerWrite("info", "Sever acceptance request received.");
        return http:ACCEPTED;
    }

    isolated resource function get authorize(http:Request req) returns http:Response|http:Forbidden|error {
        string authHeader = check req.getHeader("Authorization");

        if authHeader.startsWith("Bearer ") {
            jwt:Payload|jwt:Error validationResult = JWT:verifyToken(authHeader, jwtSecret);

            if validationResult is jwt:Payload {
                string keepAliveToken = uuid:createRandomUuid();
                Types:RequestRecord request = {connection_id: keepAliveToken, connection_type: "client", authorization: authHeader};
                lock {
                    requestsTable.add(request.clone());
                }

                http:Response response = new;
                response.setHeader("keep-alive-token", keepAliveToken);
                response.statusCode = 202;

                LW:loggerWrite("info", "Authorization successful");
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

    isolated resource function post auth/login(http:Request req) returns http:Response {
        boolean aliveConnection = hasConnectionAlive(req);
        http:Response response = new;

        if aliveConnection {
            LW:loggerWrite("Info", "Connection is alive.");
            json|error requestBody = req.getJsonPayload();

            if requestBody is json {
                return DAD:loginUser(requestBody);
            } else {
                response.statusCode = 400;
                response.reasonPhrase = "Invalid request body. Please try again.";
                return response;
            }

        } else {
            LW:loggerWrite("error", "Connection is not alive.");
            response.statusCode = 403;
            response.reasonPhrase = "Connection is not alive. Retry refreshing the page.";
            return response;
        }
    }

    isolated resource function post auth/signup(http:Request req) returns http:Response {
        boolean aliveConnection = hasConnectionAlive(req);
        http:Response response = new;

        if aliveConnection {
            LW:loggerWrite("Info", "Connection is alive.");
            json|error requestBody = req.getJsonPayload();

            if requestBody is json {
                return DAD:signUpUser(requestBody);
            } else {
                response.statusCode = 400;
                response.reasonPhrase = "Invalid request body. Please try again.";
                return response;
            }

        } else {
            LW:loggerWrite("error", "Connection is not alive.");
            response.statusCode = 403;
            response.reasonPhrase = "Connection is not alive. Retry refreshing the page.";
            return response;
        }

    }
};

isolated function hasConnectionAlive(http:Request req) returns boolean {
    string|http:HeaderNotFoundError authHeader = req.getHeader("keep-alive-token");
    lock {
        if authHeader is string && authHeader != "" {
            Types:RequestRecord|error request = trap requestsTable.get(authHeader);
            if request is Types:RequestRecord {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}

service /ws on new websocket:Listener(21003) {
    resource function get .(http:Request req) returns websocket:Service|websocket:UpgradeError {
        if req.method == "GET" &&
            req.httpVersion == "1.1" &&
            req.getHeader("Upgrade") == "websocket" &&
            req.getHeader("Connection") == "Upgrade" {

            LW:loggerWrite("info", "WebSocket handshake request received.");
            //io:println(req.getHeader("Sec-WebSocket-Key"), req.getHeader("Sec-WebSocket-Version"));

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
