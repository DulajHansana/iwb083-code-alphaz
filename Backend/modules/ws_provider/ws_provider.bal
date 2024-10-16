import Backend.db_actions_dispatcher as DB;
import Backend.logger_writter as LW;
import Backend.types as Types;

import ballerina/websocket;

# Description.
public isolated service class WsService {
    *websocket:Service;

    remote isolated function onMessage(websocket:Caller caller, string data) returns error? {
    LW:loggerWrite("info", "Message received.");

    json|error messageData = data.toJson();  // Convert data to json

    if (messageData is json) {
        LW:loggerWrite("info", "JSON parsed successfully: " + messageData.toString());

        // Explicitly cast messageData to map<json>
        map<json>? messageMap = messageData.cloneWithType(map<json>);

        if (messageMap is map<json>) {
            // Extract 'txDetails' and 'message' fields safely
            json? txDetailsField = messageMap["txDetails"];
            json? messageField = messageMap["message"];

            if (txDetailsField is map<json> && messageField is string) {
                json? idField = txDetailsField["id"];
                json? emailField = txDetailsField["email"];

                if (idField is string && emailField is string) {
                    LW:loggerWrite("info", "ID and email extracted successfully: ID = " + idField + ", Email = " + emailField);

                    Types:Message newMessage = {
                        rxId: idField,
                        message: messageField
                    };

                    boolean sendMessageResult = DB:sendMessage(emailField, newMessage);
                    check caller->writeTextMessage(sendMessageResult.toString());
                } else {
                    LW:loggerWrite("error", "Invalid 'id' or 'email' in 'txDetails'.");
                }
            } else {
                LW:loggerWrite("error", "'txDetails' or 'message' is not properly formatted.");
            }
        } else {
            LW:loggerWrite("error", "The message is not a valid JSON mapping.");
        }
    } else {
        LW:loggerWrite("error", "Failed to parse JSON: " + messageData.toString());
    }
}
};
