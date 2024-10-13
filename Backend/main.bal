import ballerina/io;
import ballerina/http;
import ballerina/websocket;

service /ws on new websocket:Listener(21003) {
    resource function get .(http:Request req) returns websocket:Service|websocket:UpgradeError {
        if req.method == "GET" &&
            req.httpVersion == "1.1" &&
            req.getHeader("Upgrade") == "websocket" &&
            req.getHeader("Connection") == "Upgrade" {
            
            io:println("Valid WebSocket handshake request received.");
            io:println(req.getHeader("Sec-WebSocket-Key"), req.getHeader("Sec-WebSocket-Version"));
            
            return new WsService();
        } else {
            io:println("Invalid WebSocket handshake request. Request will be rejected.");
            return error("Invalid WebSocket handshake request.");
        }
    }
}

service class WsService {
    *websocket:Service;

    remote isolated function onMessage(websocket:Caller caller, string data) returns websocket:Error? {
        check caller->writeTextMessage(data);
        io:println("Received message: " + data);
    }
}