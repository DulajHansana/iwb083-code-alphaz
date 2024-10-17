//import Backend.db_actions_dispatcher as DB;
import Backend.logger_writter as LW;

//import Backend.types as Types;

import ballerina/websocket;
//import ballerina/lang.value;

# Description.
public isolated service class WsService {
    *websocket:Service;

    remote isolated function onMessage(websocket:Caller caller, json data) returns error? {
        json|error messageData = data.toJson();

        if messageData is error {
            LW:loggerWrite("error", "Invalid message received: " + messageData.message());
            return;
        } else {
            //DB:sendMessage(messageData["email"], messageData["message"]);
            json|error message = messageData.message;

            if message is string {
                LW:loggerWrite("info", "Message received: " + message);
            }
            LW:loggerWrite("info", "Message received: ");
            return;
        }
    }
};
