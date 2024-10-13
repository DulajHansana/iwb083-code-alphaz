import ballerina/websocket;
import ballerina/io;

public isolated service class WsService {
    *websocket:Service;

    remote isolated function onMessage(websocket:Caller caller, string data) returns websocket:Error? {
        check caller->writeTextMessage(data);
        io:println(caller);
    }
};