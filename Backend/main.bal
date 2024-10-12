import ballerina/io;
import ballerina/websocket;
import ballerina/http;

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