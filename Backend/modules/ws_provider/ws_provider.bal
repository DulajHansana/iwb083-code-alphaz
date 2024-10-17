//import Backend.db_actions_dispatcher as DB;

import Backend.db_actions_dispatcher as DAD;
import Backend.logger_writter as LW;
import Backend.types as Types;

import ballerina/lang.value;
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
            int|error messageId = value:ensureType(messageData.messageId, int);
            string|error collectionName = value:ensureType(messageData.email, string); // User email is the collection name
            string|error rxId = value:ensureType(messageData.id, string); // Should be changed later
            string|error message = value:ensureType(messageData.message, string);

            if messageId is int {
                final Types:MessageState MessageState = <Types:MessageState>self.MessageState(messageId, 601);
                check caller->writeMessage(MessageState);
            }

            if messageId is int && collectionName is string && rxId is string && message is string {
                Types:Message newMessage = {
                    id: messageId,
                    rxId: rxId,
                    message: message
                };

                boolean sendMessage = DAD:sendMessage(collectionName, newMessage);

                if sendMessage {
                    check caller->writeMessage(self.MessageState(messageId, 602));
                } else {
                    check caller->writeMessage(self.MessageState(messageId, 605));
                }

                //check caller->writeMessage(messageData.toJsonString());
            } else {
                if messageId is int {
                    LW:loggerWrite("error", "Invalid message received: " + (typeof collectionName).toString() + " " + (typeof rxId).toString() + " " + (typeof message).toString());
                    check caller->writeMessage(self.MessageState(messageId, 605));
                }
            }

            if message is string {
                LW:loggerWrite("info", "Message received: " + message);
            }
        }
    }

    public isolated function MessageState(int messageId, 601|602|603|604|605 state, string? stateDescription = null) returns Types:MessageState {
        do {
            string|error stateText = <string>Types:getStateCode(state.toString());

            if stateText is string {
                Types:MessageState MessageState = {
                    messageId: messageId,
                    state: state,
                    stateText: <"recieved"|"sent"|"seen"|"deleted"|"failed"|"unknown">stateText,
                    stateDescription: stateDescription
                };
                return MessageState;

            } else {
                Types:MessageState MessageState = {
                    messageId: messageId,
                    state: state,
                    stateText: "unknown",
                    stateDescription: stateDescription
                };
                return MessageState;

            }
        } on fail var e {
            Types:MessageState MessageState = {
                messageId: messageId,
                state: state,
                stateText: "unknown",
                stateDescription: e.toString()
            };
            return MessageState;
        }

    };
};
