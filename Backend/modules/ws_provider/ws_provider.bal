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

    remote isolated function onOpen(websocket:Caller caller) returns websocket:Error|error? {
        any|error storedEmail = caller.getAttribute("email");
        if storedEmail is string {
            LW:loggerWrite("info", "Email stored: " + storedEmail);
        } else {
            LW:loggerWrite("error", "10 Invalid message received: " + (typeof storedEmail).toString());
            return;
        }

        final string email = check value:ensureType(storedEmail, string);
        worker messagesStreamer returns error? {
            check self.streamMessagesFromDB(caller, email);
        }

    }

    isolated function streamMessagesFromDB(websocket:Caller caller, json data) returns error? {
        json|error txDetails = data.toJson();

        if txDetails is error {
            LW:loggerWrite("error", "4 Invalid message received: " + txDetails.message());
            return;
        } else {
            string|error email = value:ensureType(txDetails.email, string);

            if email is string {
                int totalMessages = DAD:totalMessages(email);
                final Types:SystemMessage systemMessage = {
                    code: 703,
                    message: "Total messages: " + totalMessages.toString(),
                    value: totalMessages
                };

                check caller->writeMessage(<anydata>systemMessage);
            } else {
                LW:loggerWrite("error", "3 Invalid message received: " + (typeof email).toString());
            }
        }
    }

    remote isolated function onMessage(websocket:Caller caller, json data) returns error? {
        json|error messageData = data.toJson();

        if messageData is error {
            LW:loggerWrite("error", "2 Invalid message received: " + messageData.message());
            return;
        } else {
            string|error messageType = value:ensureType(messageData.messageType, string);

            if messageType is string {
                if messageType == "usermessage" {
                    check self.handleUserMessage(caller, messageData);
                } else if messageType.startsWith("#") {
                    check self.handleSystemMessage(caller, messageData);
                }
            } else {
                LW:loggerWrite("error", "1 Invalid message received: " + (typeof messageType).toString());
                return;
            }
        }
    }

    isolated function handleSystemMessage(websocket:Caller caller, json messageData) returns error? {
        string|error messageType = value:ensureType(messageData.messageType, string);

        if messageType is string {
            if messageType == "#email" {
                caller.setAttribute("email", messageData.email);
                any|error storedEmail = caller.getAttribute("email");
                if storedEmail is string {
                    LW:loggerWrite("info", "Email stored: " + storedEmail);
                } else {
                    LW:loggerWrite("error", "10 Invalid message received: " + (typeof storedEmail).toString());
                }
                //check self.streamMessagesFromDB(caller, messageData);
            }
        } else {
            LW:loggerWrite("error", "5 Invalid message received: " + (typeof messageType).toString());
            return;
        }
    }

    isolated function handleUserMessage(websocket:Caller caller, json messageData) returns error? {
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
                check caller->writeMessage(self.MessageState(messageId, 607));
            }

        } else {
            if messageId is int {
                LW:loggerWrite("error", "6 Invalid message received: " + (typeof collectionName).toString() + " " + (typeof rxId).toString() + " " + (typeof message).toString());
                check caller->writeMessage(self.MessageState(messageId, 607));
            }
        }

        if message is string {
            LW:loggerWrite("info", "Message received: " + message);
        }
    }

    isolated function MessageState(int messageId, 601|602|603|604|605|606|607 state, string? stateDescription = null) returns Types:MessageState {
        do {
            string|error stateText = <string>Types:getStateCode(state.toString());

            if stateText is string {
                Types:MessageState MessageState = {
                    messageId: messageId,
                    state: state,
                    stateText: <"recieved"|"stored"|"sent"|"delivered"|"seen"|"deleted"|"failed"|"unknown">stateText,
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
