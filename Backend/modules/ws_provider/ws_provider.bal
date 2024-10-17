//import Backend.db_actions_dispatcher as DB;
import Backend.logger_writter as LW;
//import Backend.types as Types;

import ballerina/websocket;

# Description.
public isolated service class WsService {
    *websocket:Service;

    remote isolated function onMessage(websocket:Caller caller, string data) returns error? {
    LW:loggerWrite("info", "Message received.");

    json|error messageData = data.toJson(); // Convert data to json
    

    if (messageData is json) {
        LW:loggerWrite("info", "JSON received: " + messageData.toJsonString());

        // Parse JSON
        json|error parsedJson = messageData.id;
        if (parsedJson is string) {
            LW:loggerWrite("info", parsedJson.toString());
        }
    } else {
        LW:loggerWrite("error", "Failed to parse JSON: ");
    }
}
};
