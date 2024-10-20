# WebSocket Service Implementation

This Ballerina WebSocket service handles real-time communication between a client and the server. The service is designed to process both user and system messages, stream messages from the database, and handle ping/pong requests to maintain an active connection. Below is a detailed overview of its components and their roles:

## Key Features

### 1. **Message Streaming from Database**
   - The service streams messages from the database to the client by retrieving them based on the user's email address.
   - A worker function, `streamWorker`, continuously sends messages retrieved from the database to the WebSocket client.
   - If no messages are found, the service logs this event, ensuring detailed feedback on the message retrieval process.

### 2. **Ping and Pong Handshake**
   - The service supports sending `Ping` and `Pong` messages, ensuring the connection is alive. These heartbeat messages help maintain the WebSocket connection.
   - The `sendPongMessage` and `sendPingMessage` functions handle sending these system messages when necessary.

### 3. **Handling User Messages**
   - User messages are processed through the `handleUserMessage` function. This includes ensuring that the message data is valid and retrieving user information (e.g., user ID, collection name, and message content).
   - Once validated, the message is stored in the database, and feedback is sent to the client about the message's status (e.g., received, stored, or failed).
   - Each message receives a `MessageState`, which tracks its state in the system.

### 4. **Handling System Messages**
   - System messages (indicated by message types starting with `#`) perform specific tasks such as storing email addresses or responding to ping requests.
   - For example:
     - `#email` stores the email in the caller’s attributes and initiates message streaming for that email.
     - `#ping` sends back a `Pong` message to confirm the connection is still alive.
     - `#user` retrieves and returns user information based on the email provided in the message.

### 5. **MessageState Management**
   - The system tracks the state of each message through a `MessageState` object, which includes the message ID and its current state (e.g., received, sent, delivered, failed, etc.).
   - The service uses a utility function `MessageState` to generate a proper state for each message and to handle state transitions.

### 6. **Error Handling and Logging**
   - Throughout the service, detailed logging is implemented to capture both normal operations and errors. For example, the service logs the total number of messages retrieved, whether the connection is alive, and any invalid messages.
   - The `loggerWrite` function records these events, which helps in monitoring the system's behavior and troubleshooting issues.

### 7. **WebSocket Caller Interaction**
   - The `websocket:Caller` object facilitates interaction with the WebSocket client. The service writes messages directly to the client using this caller object, ensuring real-time communication.
   - All responses, whether user messages, system messages, or error notifications, are sent back to the client through the WebSocket connection.

## Conclusion

This WebSocket service efficiently manages real-time communication, ensuring that messages are properly handled, streamed, and tracked. By leveraging robust error handling, state management, and database integration, the service provides a reliable infrastructure for applications requiring persistent WebSocket connections.
