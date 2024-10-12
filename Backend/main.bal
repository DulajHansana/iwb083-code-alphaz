import ballerina/http;
import ballerina/io;
import ballerina/websocket;

service /ws on new websocket:Listener(21003) {
    resource function get .(http:Request req) returns websocket:Service|websocket:UpgradeError {
        io:println(req);
        return new WsService();
    }
}

service class WsService {
    *websocket:Service;

    remote isolated function onMessage(websocket:Caller caller, string data) returns websocket:Error? {
        check caller->writeTextMessage(data);
        io:println("ID" + caller.getConnectionId());
    }
}

type Handshake record {
    string requestMethod;
    string httpVersion;
    string|error Host;
    string|error Upgrade;
    string|error Connection;
    string|error SecWebSocketKey;
    string|error SecWebSocketVersion;
};

service / on new http:Listener(8080) {
    resource function get hsrequest(http:Request req) returns http:Response {
        Handshake handshakeRequest = {
            requestMethod: req.method,
            httpVersion: req.httpVersion,
            Host: req.getHeader("Host"),
            Upgrade: req.getHeader("Upgrade"),
            Connection: req.getHeader("Connection"),
            SecWebSocketKey: req.getHeader("Sec-WebSocket-Key"),
            SecWebSocketVersion: req.getHeader("Sec-WebSocket-Version")
        };

        if handshakeRequest.requestMethod == "GET" &&
                handshakeRequest.httpVersion == "1.1" &&
                handshakeRequest.Host == "localhost:8080" &&
                handshakeRequest.Upgrade == "websocket" &&
                handshakeRequest.Connection == "Upgrade" {

            // The handshakeRequest has the given values
            io:println("Handshake request matches the expected values.");
        } else {
            // The handshakeRequest does not match the expected values
            io:println("Handshake request does not match the expected values.");
        }

        http:Response res = new;
        res.statusCode = 200;
        return res;
    }
}
